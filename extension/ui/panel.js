import GLib from 'gi://GLib';
import Gio from 'gi://Gio';
import GObject from 'gi://GObject';
import St from 'gi://St';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

import { applyPreset, PRESETS, presetSummary } from './presets.js';

const POLL_INTERVAL_SECONDS = 30;

const MOCK = GLib.getenv('THRESHPAD_MOCK') === '1';
const SYSFS_BASE = MOCK
    ? GLib.build_filenamev([GLib.get_current_dir(), 'test/fixtures'])
    : '/sys/class/power_supply';

/**
 * Read a sysfs file and return its trimmed string value, or null on error.
 *
 * @param {string} path
 * @returns {string|null}
 */
function readSysfs(path) {
    try {
        const file = Gio.File.new_for_path(path);
        const [, contents] = file.load_contents(null);
        return new TextDecoder().decode(contents).trim();
    } catch (e) {
        logError(e, `threshpad: failed to read ${path}`);
        return null;
    }
}

/**
 * Enumerate present BAT* devices under SYSFS_BASE, sorted.
 *
 * @returns {string[]}
 */
function detectBatteries() {
    try {
        const dir = Gio.File.new_for_path(SYSFS_BASE);
        const enumerator = dir.enumerate_children(
            'standard::name,standard::type',
            Gio.FileQueryInfoFlags.NONE,
            null
        );
        const batteries = [];
        let info;
        while ((info = enumerator.next_file(null)) !== null) {
            const name = info.get_name();
            if (/^BAT\d+$/.test(name))
                batteries.push(name);
        }
        enumerator.close(null);
        return batteries.sort();
    } catch (e) {
        logError(e, 'threshpad: failed to enumerate batteries');
        return [];
    }
}

/**
 * Read capacity, status, and current thresholds for a battery.
 *
 * @param {string} bat
 * @returns {{ capacity: string|null, status: string|null, start: string|null, stop: string|null }}
 */
function readBattery(bat) {
    const base = `${SYSFS_BASE}/${bat}`;
    return {
        capacity: readSysfs(`${base}/capacity`),
        status: readSysfs(`${base}/status`),
        start: readSysfs(`${base}/charge_control_start_threshold`),
        stop: readSysfs(`${base}/charge_control_end_threshold`),
    };
}

/**
 * Top-bar panel button showing live battery state and preset actions.
 */
export const ThreshpadPanel = GObject.registerClass(
class ThreshpadPanel extends PanelMenu.Button {
    _init(extension) {
        super._init(0.0, 'threshpad');
        this._extension = extension;
        this._pollId = null;
        this._batteries = detectBatteries();

        this._label = new St.Label({
            text: '⚡',
            y_align: 2, // Clutter.ActorAlign.CENTER
        });
        this.add_child(this._label);

        this._buildMenu();
        this._refresh();
        this._startPolling();
    }

    /** Build the popup menu structure. */
    _buildMenu() {
        // Header
        this.menu.addMenuItem(new PopupMenu.PopupMenuItem('threshpad', { reactive: false }));
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        // One status item per detected battery
        this._batItems = {};
        for (const bat of this._batteries) {
            const item = new PopupMenu.PopupMenuItem(`${bat}: —`, { reactive: false });
            this._batItems[bat] = item;
            this.menu.addMenuItem(item);
        }
        this.menu.addMenuItem(new PopupMenu.PopupSeparatorMenuItem());

        // Presets with threshold summary
        for (const [name, preset] of Object.entries(PRESETS)) {
            const summary = presetSummary(preset, this._batteries);
            const item = new PopupMenu.PopupMenuItem(`${name}  ${summary}`);
            item.connect('activate', () => {
                applyPreset(preset, this._batteries);
            });
            this.menu.addMenuItem(item);
        }
    }

    /** Poll battery state and update label + menu items. */
    _refresh() {
        const states = this._batteries.map(bat => ({ bat, ...readBattery(bat) }));

        // Top-bar label: "⚡ 98% [75–80]" or "⚡ 98% / 72% [75–80]"
        const capacityParts = states.map(({ capacity }) => `${capacity ?? '?'}%`);
        const threshParts = states.map(({ start, stop }) =>
            (start !== null && stop !== null) ? `${start}–${stop}` : '?–?'
        );
        // Show thresholds once if all batteries share the same values, else per-battery
        const allSameThresh = threshParts.every(t => t === threshParts[0]);
        const threshLabel = threshParts.length > 0
            ? ` [${allSameThresh ? threshParts[0] : threshParts.join(' / ')}]`
            : '';

        this._label.set_text(
            capacityParts.length > 0
                ? `⚡ ${capacityParts.join(' / ')}${threshLabel}`
                : '⚡ —'
        );

        // Menu status items: "BAT1: 98% (Not charging) · 75–80"
        for (const { bat, capacity, status, start, stop } of states) {
            let text = `${bat}: `;
            if (capacity !== null) {
                text += `${capacity}% (${status ?? '?'})`;
                if (start !== null && stop !== null)
                    text += ` · ${start}–${stop}`;
            } else {
                text += 'N/A';
            }
            this._batItems[bat]?.label.set_text(text);
        }
    }

    _startPolling() {
        this._pollId = GLib.timeout_add_seconds(
            GLib.PRIORITY_DEFAULT,
            POLL_INTERVAL_SECONDS,
            () => {
                this._refresh();
                return GLib.SOURCE_CONTINUE;
            }
        );
    }

    destroy() {
        if (this._pollId !== null) {
            GLib.source_remove(this._pollId);
            this._pollId = null;
        }
        super.destroy();
    }
});
