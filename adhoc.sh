#!/bin/bash
interface='wlan1'
ifconfig $interface down
iwconfig $interface mode ad-hoc
iwconfig $interface essid magurow
iwconfig $interface txpower 2
r1=$RANDOM
r1=$((r1%254))
r2=$RANDOM
r2=$((r2%254))
ifconfig $interface 192.168.$r1.$r2 netmask 255.255.0.0
ifconfig $interface up
