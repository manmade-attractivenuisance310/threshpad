# Changelog

All notable changes to threshpad will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning follows [Semantic Versioning](https://semver.org/).

## [Unreleased]
### Added
- Initial project scaffold
- Extension entry point with enable/disable lifecycle
- Live BAT0/BAT1 charge and status display in panel
- Desk Mode and Balanced presets via batctl
- Travel Prep preset (full charge mode)
- udev rules for non-root threshold writes via `battery` group
- install.sh end-user installer
- THRESHPAD_MOCK=1 test mode with sysfs fixtures
