# Architecture

## Overview

threshpad is a GNOME Shell extension that manages ThinkPad battery charge thresholds.

```
┌─────────────────────────────────────┐
│           GNOME Shell               │
│  ┌──────────────────────────────┐   │
│  │      ThreshpadPanel          │   │
│  │  (PanelMenu.Button)          │   │
│  │                              │   │
│  │  • Live BAT0/BAT1 charge %   │   │
│  │  • Preset action menu        │   │
│  └──────────┬───────────────────┘   │
└─────────────┼───────────────────────┘
              │
     ┌────────┴────────┐
     │                 │
  Reads             Writes
     │                 │
     ▼                 ▼
 sysfs files       batctl CLI
 (Gio.File)    (Gio.Subprocess)
```

## Read/Write Split

**Reads** go directly to sysfs via `Gio.File.load_contents()`. This avoids subprocess
overhead for the 30-second polling loop and is safe because sysfs reads are non-privileged.

**Writes** go through the `batctl` binary via `Gio.Subprocess`. This is required because
writing to threshold files needs the `battery` group (granted via udev rules), and
`batctl` is the authoritative interface for this hardware.

## Permissions

The udev rule in `udev/99-threshpad.rules` grants the `battery` group write access
to `charge_control_start_threshold` and `charge_control_end_threshold` for all BAT*
devices. The installer adds the user to this group, eliminating any sudo requirement
at runtime.

## Mock Mode

Setting `THRESHPAD_MOCK=1` redirects all sysfs reads to `test/fixtures/BAT{0,1}/`
and makes batctl invocations no-ops (logging to the journal instead). This allows
development and testing on machines without ThinkPad battery hardware.
