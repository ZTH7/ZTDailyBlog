---
author: "ZT"
title: Offline Password Cracking
description: "Introduction of Offline Password Cracker"
image: pwd-attack.png
date: 2023-06-13T14:11:49+02:00
categories:
    - Cybersecurity
    - StudyNotes
math: false
draft: false
---

## Introduction

What Is Offline Password Cracking? 
Offline password cracking technique involves recovering passwords from an already obtained password hash file. And the cracked objects involve password hash in Linux shadow file, SSH private key, zip, rar and other compressed package files, NTLM Hash, AS-REP/TGS-REP Hash and so on. Here I will introduce two famous Hash cracking tools: [Hashcat](https://github.com/hashcat/hashcat) and [John the Ripper](https://github.com/openwall/john). Through these two tools, you can specify your own wordlist for brute force cracking.



## Hashcat

Hashcat is world's fastest password hash cracker, and supports many kinds of password hash. You need to specify your password hash type when you are using this tool. You can use command `hashcat --help` to list all password types supported by hashcat, and use `hashcat --help | grep -i [your hash type]` to search for the number corresponding to your hash type.

For example, to crack Net-NTLMv2 Hash, you can use `hashcat --help | grep -i NTLMv2` to find the number corresponding to your hash type (which is 5600).

Then, you can use `hashcat -m 5600 [your hash file] /usr/share/wordlists/rockyou.txt --force` to brute force cracking this hash. 

You can use the same steps to try to crack the AS-REP/TGS-REP Hash, password hash in Linux shadow file, etc.



## John the Ripper

John the Ripper is a very versatile tool, it has many modules that allow you to extract password hashes from various files. For example: zip2john, ssh2john, pdf2john... You can find them all by using `ls -la /bin/ | grep 2john` command.

John the Ripper is very easy to use, for example, to crack a SSH private key, you can use `ssh2john [SSH file] > hash` to extract the password hash.

Then, you can use `john [file] -w="/usr/share/wordlists/rockyou.txt"` to crack the password for the corresponding SSH private key.

You can use the same steps to try to crack the password of zip, rar, pdf, etc.



## By the way

With this tools, you can no only specify your wordlist, but also apply your own password rule. The most commonly used rule is `/usr/share/hashcat/rules/best64.rule`.

If you feel that these two tools are too slow to run locally, you can use web cracking. These web pages can quickly search for hash values through their own rainbow tables. For example: [DES CRACKER](https://crack.sh/) and [Crack Station](https://crackstation.net/)