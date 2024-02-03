---
author: "ZT"
title: VMware Install OpenWrt
description: "VMware安装OpenWrt教程"
image: openwrt.png
date: 2023-05-02T14:23:48+02:00
categories:
    - Others
math: true
draft: false
---

## 前言

本教程将会简单介绍我们该如何在VMWare上安装OpenWrt，适用于家里只有台 Windows Server 物理机，又想用它跑软路由的小伙伴们。尽管教程会教，但我还是建议小伙伴们直接用ESXi来安装你的OpenWrt和其它服务，这会简单方便得多~



## 前提条件 

- 宿主机有至少2个网口
- 安装好[VMWare](https://www.vmware.com/products/workstation-pro/workstation-pro-evaluation.html)
- 下载[OpenWrt](https://openwrt.org/downloads)适用于VMWare的固件(.vmdk)



## 下载 OpenWrt

作为一个开源系统，获取OpenWrt固件有很多种方式。大佬们可以直接按需自行编译，而小白可以直接下载编译好的固件。在这里我推荐一个[网站](https://openwrt.ai/)，可以下载各种格式的OpenWrt固件，还可以自定义插件，自动编译定制固件等，简单易用。通过这个网站，你可以直接下载到.vmdk格式的固件。如果你想从[官网](https://openwrt.org/downloads)下载固件，那还需要下载[StarWind V2V Converter](https://www.starwindsoftware.com/starwind-v2v-converter)，它可以帮你将.img.gz格式的固件转换为.vmdk格式。



## 导入 OpenWrt 至 VMWare

1. 打开VMWare，选择创建新的虚拟机，然后点击典型（推荐）的配置
2. 选择稍后安装操作系统，之后选择操作系统类型时选择 Linux -> Linux 5.x 64位
3. 给虚拟机命名（随便起名）
4. 指定磁盘容量：默认值。下面选择将虚拟机储存为单个文件
5. 点击完成，然后打开这个虚拟机设置，在左侧硬件栏点击 添加 -> 硬盘
6. 选择使用现有虚拟磁盘，然后选择你下载好的.vmdk固件，点击完成
7. 在虚拟机设置中点击网络适配器，在网络连接里，选择自定义：特定虚拟网络，选择一个空闲的VMnet
8. 添加一个网络适配器，同样在网络连接里，选择自定义：特定虚拟网络，选择另一个空闲的VMnet
9. 你希望OpenWrt利用多少个物理网口，就添加多少个网络适配器..
10. 完成设置，在VMWare主界面左上角点击 编辑 -> 虚拟网络编辑器 -> 添加网络 -> 选择你刚刚添加的那些VMnet
11. 选择桥接模式，并选择好你希望对应的物理网卡（不要选择自动判断，不选择仅主机模式是因为这会限制OpenWrt对内网其它设备的访问）
12. 设置对应的子网IP，对于你希望的wan口，请使用与上游路由器相同的子网范围。对于你希望的lan口，使用另一个不冲突的子网范围
13. 添加好需要的VMnet后，选择确定
14. 然后开启虚拟机，将你设置的lan口与电脑相连，就可以访问OpenWrt的后台啦！



## 踩坑

1. 当你不打算做旁路路由，有两个或以上网口时：

   - 创建虚拟网络的时候，不能有虚拟网络选择桥接(Bridge)并选择自动判断，自动判断会带上所有的物理网口，会导致你单独创建的，和其他网口进行单独桥接的虚拟网络失效。

   - 只能每个network对应一个网口，然后在虚拟机的设置里添加多个网络适配器以对应这些VMnet

2. openwrt在初始化时，第一个网口（eth0）为lan口，第二个网口（eth1）为wan口。这是固定的。哪怕你有更多的网口，初始化时有用的只有第一个网口（lan）和第二个网口（wan）。其它要等初始化完之后进openwrt的界面进行设置。
