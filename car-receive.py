#!/usr/bin/env python
import socket
from time import sleep
import socket
address = ('', 10101)
server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR,1)
server_socket.bind(address)
serial=raw_input("serial:")
brand=raw_input("brand:")
color=raw_input("color:")
addr_old=""
while True:
    recv_data, addr = server_socket.recvfrom(2048)
    if(recv_data=='hi' and not addr_old==addr[1]):
        server_socket.sendto(str((serial,brand,color)), addr)
	print 'data received'
        addr_old=addr[1]
	print addr_old
        print addr,':',recv_data
        sleep(1)
        #server_socket.sendto("*"+recv_data, addr)
    elif(recv_data=="ok"):
        print "recv ok"
        print "send data success"
