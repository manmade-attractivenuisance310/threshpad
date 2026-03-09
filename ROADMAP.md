# Roadmap

## Phase 1 — Functional MVP
- [x] Extension scaffold + metadata.json (GNOME 45 target)
- [x] udev rules + install script
- [x] Panel widget: live BAT0/BAT1 charge % and status from sysfs
- [x] Desk Mode and Balanced presets via batctl
- [x] THRESHPAD_MOCK=1 test mode

## Phase 2 — Polish
- [ ] GSettings schema for persistent user-defined thresholds
- [ ] Travel Prep mode with "fully charged" desktop notification
- [ ] Graceful handling when BAT1 is absent
- [ ] Verify and implement independent BAT0/BAT1 control on T480 hardware

## Phase 3 — Distribution
- [ ] Release on extensions.gnome.org
- [ ] Automated install script covering batctl dependency
- [ ] Fedora/Debian packaging (stretch goal)
