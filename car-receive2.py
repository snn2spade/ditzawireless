#!/usr/bin/env python
import socket

import socket
address = ('', 10101)
server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR,1)
server_socket.bind(address)
serial="SsdfDSfe3$"
brand="toyota"
color="red"
addr_old=""
while True:
    recv_data, addr = server_socket.recvfrom(2048)
    if(recv_data=='hi' and not addr_old==addr):
	print 'data received'
        server_socket.sendto(str((serial,brand,color)), addr)
        addr_old=addr
        print addr,':',recv_data
        #server_socket.sendto("*"+recv_data, addr)
