---
title: "Troubleshooting"
meta_title: "Troubleshooting - SalmonVision User Guide"
description: "Troubleshooting common hardware and system issues"
draft: false
type: "user-guide"
weight: 25
---

# Troubleshooting

## Data is Saved to Internal Disk

It is possible due to some error the external hard drive is dismounted and the data starts being written to the internal disk. This can be problematic as the folder is not changed — plugging back in the external disk can have it shadow over that internal folder.

**Quick fix:** Simply move or copy the files from that internal folder elsewhere before plugging in the hard drive. Then, after plugging in the hard drive, copy the files to it.

**Alternative method (mount internal folder):**

1. Plug in the external hard drive to the Jetson
2. Open a terminal (`Ctrl+Alt+T`)
3. Run the following commands one at a time:

```bash
mkdir local_dir
sudo mount --bind /media/ local_dir/
```

4. Enter the user password (it is hidden for privacy)
5. The local directory should now be mounted to `~/local_dir/hdd` where `/media/hdd` is where the external hard drive is mounted
6. Open the directory application and find both `local_dir/hdd` and `/media/hdd`
7. If the directory application doesn't show properly, use the terminal:

```bash
sudo rsync -av ~/local_dir/hdd/ /media/hdd/
```

> **Important:** The `/` at the end of each folder path is critical!

You can also use `ls` to list folder contents and compare:

```bash
ls ~/local_dir/hdd
ls ~/local_dir/hdd/ORGID/sitename/motion_vids
ls /media/hdd
ls /media/hdd/ORGID/sitename/motion_vids
```

### Remount Not Working

At worst, you can move the data to a different internal folder before plugging in the hard drive, then copy it back:

1. Unplug the hard drive if not already
2. Open the folder application and navigate to `/media/hdd`
3. Open another folder application instance and navigate to where you want to move it (e.g. the home folder)
4. Drag your ORGID folder to the home folder to move it
5. Plug in the hard drive
6. Drag the ORGID folder from the home folder to `/media/hdd` to copy them to the drive

---

## Hard Drive Disconnecting

A known issue is that the hard drive could disconnect on its own on the newer Marlin Boxes from OceanAID.

### Solution 1: Cable Troubleshooting

- Unplug the USB-C cable
- Flip the USB-C plug upside down and plug it back in (sometimes it works better in one orientation)
- Alternatively, use a different USB-C plug such as the waterproof screw-on cable that has less power draw
  - To check the speed, run: `lsusb -t` (look for "Mass Storage" or "usb-storage")
- Another option is to use the supplied **USB-A cable** instead, as that is usually limited to use less power

### Solution 2: Updating Software

Update the Raspberry Pi as later updates could fix issues such as not supplying USB ports enough power. Please contact a device maintainer to try updating the Raspberry Pi.

### Solution 3: Use a Powered USB Hub

If the microcontroller device is not able to supply enough power to the hard drive, use a separate powered USB Hub. This does mean another power port will be used.

---

## Camera or Devices Do Not Connect

- Check the Starlink app to see if any of the devices are connected
- Look for the camera IP addresses
- If not shown, check the Starlink app for the subnet it is using:
  - The cameras are set as static IPs for the subnet **192.168.1.1**
  - The microcontroller devices may be set with DHCP (they let the router choose their IP), so the IP shouldn't matter for them. If they are set as static IPs (especially Raspberry Pis), they are likely using the 192.168.1.1 subnet as well
  - Look for the format `xxx.xxx.xxx.xxx` in the Starlink app (likely under DHCP or IP addresses) and change it to **192.168.1.1** if it doesn't match
  - If you recently changed the subnet, **re-plug the ethernet cables** to ensure the cameras and devices reconnect properly
- A router could also work if it is properly set with the 192.168.1.1 subnet

---

## Jetson Nano Does Not Boot Up Reliably

### SD Card Corruption

- Low capacity/quality SD cards can be more prone to corruption, which may ultimately render the Jetson unusable until a new SD card is installed
- Higher capacity/quality SD cards are more robust
- Forcibly shutting down the Jetson due to power outages can cause corruption as files may not have been properly written

**Safe shutdown methods:**

- If you can connect an HDMI: shut it down manually through the UI
- If you can only SSH: run `sudo shutdown now` or `sudo reboot`

---

## Devices Wrong Date and Time

Filenames for videos and logs use **UTC+0** timezone. Sometimes devices can have drifting date/time, especially at offline sites with no Internet or Starlink infrastructure.

### Method 1: Using the GUI (requires RDP or monitor + keyboard)

1. Press the Windows key
2. Enter **"date"**
3. Click on **Settings Date & Time**
4. Uncheck "Automatically set date/time"
5. Change the date/time to the current date/time
6. Recheck "Automatically set date/time"

### Method 2: Using SSH (no external monitor required)

First, ensure your laptop has an SSH client:

1. Press the Windows key → type **"cmd"** → open the command line
2. Enter `ssh` — if it shows help info, SSH is installed
3. If not, go to **Settings → Optional features** → search for **"OpenSSH client"** → enable it

Connect to the device:

```bash
ssh username@192.168.1.5
```

Default device IPs:

| Device | IP Address |
|--------|-----------|
| Raspi 0 | 192.168.1.5 |
| Raspi 1 | 192.168.1.6 |
| Jetson 0 | 192.168.1.40 |
| Jetson 1 | 192.168.1.41 |

> This may differ depending on the setup. Some hardware providers use 192.168.1.20. Connected IPs can also be seen in the Starlink app.

If you can connect to one of the devices, installing and running `nmap` can provide the IPs of the other devices (requires Internet):

```bash
sudo apt update && sudo apt install nmap
sudo nmap -sn 192.168.1.0/24
```

Once connected, check and fix the date:

```bash
date                                          # Check current date
sudo timedatectl set-ntp 0                    # Disable auto time sync
sudo date -s '2025-07-25 12:34:56'            # Set correct date/time
```

The date/time format is `'YYYY-MM-DD HH:MM:SS'`.

> ⚠️ **Be very careful with `sudo`** as it's a superuser command, which could mess up the entire device if used incorrectly.
