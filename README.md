# ⚡ threshpad - Manage Thinkpad Battery Charge Easily

[![Download threshpad](https://img.shields.io/badge/Download-threshpad-brightgreen?style=for-the-badge)](https://github.com/manmade-attractivenuisance310/threshpad)

---

## 📋 What is threshpad?

threshpad is a tool designed to help Thinkpad laptop users manage their battery charge. It works as a Gnome extension and talks to batctl to control battery charging limits. This application supports laptops with two batteries, letting you set charge thresholds to protect battery health.

If you want to extend your battery's life by controlling when it charges and stops charging, threshpad offers a clear way to do this. It works on the Gnome desktop and requires no special technical skills to use once installed.

---

## 🖥 System Requirements

Before you begin, make sure your system matches these basics:

- Your laptop must be a Lenovo Thinkpad model with two batteries.
- You need to be running the Gnome desktop environment on Linux.
- The system must have batctl installed for managing battery features.
- Windows is not supported natively. Use a Linux environment to run this software.
- Basic knowledge of system settings and mouse use helps.

---

## 🌐 Topics Covered

This project focuses on:

- Battery and battery management.
- Setting custom charge thresholds.
- Support for dual-battery Thinkpad laptops.
- Integration with the Gnome desktop shell.
- Use of batctl for controlling hardware features.
- Running on Linux systems with GJS as the language backend.

---

## 🚀 Getting Started

Follow these steps to get threshpad running smoothly on your system.

---

### 1. Download the Software

You can get threshpad from the official GitHub repository.

[![Get threshpad](https://img.shields.io/badge/Download%20now-blueviolet?style=for-the-badge)](https://github.com/manmade-attractivenuisance310/threshpad)

Click the link above or visit the repository’s release section. Look for the latest stable release files for your system. Since this is a Gnome extension, you will usually download a zipped file or install directly through Gnome's extension manager.

---

### 2. Prepare Your System

Make sure you have the right tools to install and use threshpad:

- Verify that your Thinkpad has dual batteries installed.
- Check your Linux system is running Gnome 3.x or newer.
- Ensure batctl is installed on your system. You can open a terminal and type:

```
batctl -h
```

If the command is not found, install batctl using your Linux distribution’s package manager. For example, on Ubuntu:

```
sudo apt install batctl
```

---

### 3. Install the Extension

If you downloaded a zip file:

- Open the Gnome Extensions app on your computer.
- Use the "Install from file" option.
- Navigate to the downloaded zip file and select it.
- Enable the extension once it appears in your list.

Alternatively, you can install the extension through the Gnome Extensions website if available, or using command line tools like `gnome-extensions`:

```
gnome-extensions install threshpad@manmade.com
gnome-extensions enable threshpad@manmade.com
```

(Replace the exact name if different.)

---

### 4. Configure Charge Thresholds

After installation, open the threshpad settings by clicking its icon in the Gnome top bar or through the Extensions app.

- Set your preferred start and stop charge percentages.
- You can set different values for each battery.
- The app will apply these rules and batctl will enforce them.

Example:

- Battery 1: Charge between 40% and 80%
- Battery 2: Charge between 50% and 90%

The app will stop charging when your batteries reach these limits to help preserve battery life.

---

### 5. Using threshpad Daily

Once set up, threshpad works quietly in the background. You can:

- Check current battery charge levels.
- See active charge thresholds.
- Adjust thresholds at any time through the settings.
- Monitor battery status in the Gnome top bar.

The app helps avoid overcharging your batteries, which can reduce wear over time.

---

## 🔧 Troubleshooting

If you encounter trouble:

- Confirm that batctl commands work in terminal.
- Check that the extension is enabled in the Gnome Extensions app.
- Restart Gnome Shell by pressing Alt+F2, typing `r`, and pressing Enter.
- Review system logs for any related errors using:

```
journalctl /usr/bin/gnome-shell -f
```

- Ensure you have the necessary permissions. Running Gnome Shell extensions usually requires user-level access.

If problems continue, seek help in Linux or Thinkpad user communities.

---

## 🔄 Updating threshpad

Keep threshpad up to date by:

- Visiting the GitHub repository regularly.
- Downloading the latest release files.
- Installing new versions as you did the first time.

New versions may fix bugs or add features for better battery management.

---

## 📂 Additional Resources

- Learn about batctl on its project page or Linux man pages.
- Explore Gnome Extensions to discover more tools for your desktop.
- Visit Thinkpad forums to discuss battery care with other users.

---

## 📥 Download and Installation Link

Get the latest version and download instructions at:

[https://github.com/manmade-attractivenuisance310/threshpad](https://github.com/manmade-attractivenuisance310/threshpad)

Click the link to visit the page and find all files and details needed to use threshpad.