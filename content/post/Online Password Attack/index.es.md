---
author: "ZT"
title: Online Password Attack
description: "Introduction of Online Password Attack"
image: pwd-attack.jpg
date: 2023-07-01T20:53:06+08:00
categories:
    - Cybersecurity
    - StudyNotes
tags:
    - OSCP
    - PwdAttack
math: false
draft: false
---

## Introduction

**What is Online Password Attack?** 

An online password attack consists of trying a large number of username/password combinations against the login portal in hopes of guessing the correct password. The attack targets include a website's login portal, SSH/FTP/RDP and other services that need to interact with the server. Since each password attempt need to interact with the remote server, the remote server can easily spot your behavior and ban your IP address.



## Hydra

[Hydra](https://github.com/facebookresearch/hydra) is a useful and powerful login cracker, it supports various protocols to attack like SSH, RDP, FTP, SMB, MySQL and so on. Here I will introduce some common arguments and show you some example about how to use this tool.

- Useful arguments：
  - `-l`: Specify a single username
  - `-L`: Specify a username list file
  - `-p`: Specify a single password
  - `-P`: Specify a password list file
  - `-s`: Specify port
  - `-S`: Use SSL to connect server
  - `-t`: Specify number of threads
  - `-n`: Try null password
  
- Common protocol:
  - SSH, RDP, FTP, SMB, Telnet, MySQL, MSSQL...
  - http-head, http-get, http[s]-[post|get]-form, 

- Placeholder:
  - For the HTTP protocol, we can use placeholders to specify where the corresponding username/password should be located in the http link/form. We can use `\^USER\^` and `\^PASS\^` as placeholder.

  - Usage: "[/path/of/your/target.php]:[form-content]:[failure string]" 

  - Example: `/admin/login.php:fm_usr=^USER^&fm_pwd=^PASS^:Login failed`

- Example:
  - For the ftp server: `hydra -L /usr/share/seclists/Usernames/top-usernames-shortlist.txt -p /usr/share/wordlists/rockyou.txt [ip address] -s 21 ftp -t 5 `

  - For the http post form:`hydra -l admin -P /usr/share/wordlists/rockyou.txt [ip address] http-post-form "/index.php:fm_usr=^USER^&fm_pwd=^PASS^:Login failed"`




## By the way

For password attacks on web portals, there is another powerful tool called [Burp Suite](https://portswigger.net/burp). It support Proxy, Intruder, Repeater, and so on. These tools can help us analyze network traffic, proxy network requests, forward network requests and other functions. It is used by a majority of pentesters and is dedicated mainly to pentesting web applications. If you are interested in this, please don't miss it.

