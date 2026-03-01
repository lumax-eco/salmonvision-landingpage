---
title: "Remote Access"
meta_title: "Remote Access - SalmonVision User Guide"
description: "Guide to remote desktop and network configuration for SalmonVision devices"
draft: false
type: "user-guide"
weight: 24
---

# Remote Access

## Change Network

The microcontroller devices may be set to use static IPs to facilitate communications between them. If it is required for that device to communicate with the Internet on a router that is not the Starlink router, you can change the network settings to use DHCP:

1. Log into the microcontroller device after connecting a monitor and keyboard + mouse
2. Click on the top right network icon and click either the gear icon or **Settings**
3. Navigate to **Network settings**
4. Go to **IPv4** and check the **Automatic (DHCP)** box
5. Restart the device

![Network settings](/images/user-guide/image039.gif)

---

## Remote Desktop on Devices

Some devices will be set up with Remote Desktop Protocol (RDP) software to allow easy remote access to the device without using SSH.

> **Important considerations:**
> - You must **log out** each time (don't just close the window). If you do not properly log out, when you try to log in next time it will just give a frozen screen as it thinks you are still logged in. If this happens you will need to SSH in and manually log out the user, or simply run `sudo reboot` to restart the system.
> - Be careful to **not power off**. If the box is powered off, there is no way to power it back on without unplugging and re-plugging the power or tripping the power to the box (unless you have a smart power switch installed).
> - **Only one user at a time.**

### Steps to Connect via RDP

1. Install [Tailscale](https://tailscale.com/) on your computer
2. Ask for a Tailscale invite link to the device you want to access
3. Click on the invite link and create an account
4. Press the Windows key and type **"rdp"**
5. Click on **Remote Desktop Connection**
6. Find the IP address or domain name:
   - **Option A:** Go to the [Tailscale console](https://login.tailscale.com/admin) and look at the name under "MACHINE" or the IP address under "ADDRESSES"
   - **Option B:** Right-click the Tailscale icon in your taskbar (the icon with 3 dots in a T) → **Network devices** → Click on the device to automatically copy the IP to clipboard
7. Enter the IP address or domain name and the proper username:
   - If it's from OceanAID: `oceanaid`
   - Otherwise: `netlabmedia`
8. Configure the display settings: reduce the screen size and the pixel depth so the GUI is not as laggy
9. Once connected you will arrive at the **xrdp login page** — enter the password (device default pass is `oceanaid`)
10. It should take a few seconds and then you should arrive on the home page. You can click cancel, or reenter the password a couple times to authenticate access.

![RDP configuration](/images/user-guide/image040.gif)

> **Always log out when you are done.**
