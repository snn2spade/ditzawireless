#!/usr/bin/env python
import socket
from time import sleep
import json
import datetime
import requests
address = ('192.168.255.255', 10101)
client_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
#client_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
client_socket.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
client_socket.settimeout(0.7)
station_id=raw_input("station ID:")
sleep_time= 1
while True:
    recv_data=0
    msg= "hi"
    client_socket.sendto(msg, address)
    sleep(sleep_time)
    try:
        recv_data, addr = client_socket.recvfrom(2048)
    except:
        #print "##no data##"
        sleep_time=0.3
    while(recv_data):
        if(recv_data):
            sleep_time=1
            if(not recv_data=="hi"):
                data = {}
                tup=tuple(recv_data[1:-1].split(','))
                data['serial']=tup[0]
                data['brand']=tup[1]
                data['color']=tup[2]
                data['tower']=station_id
                data['date']=str(datetime.datetime.utcnow())
                json_data = json.dumps(data)
                r = requests.post('http://ditzawireless.tk/carreply', data = data)
                print recv_data+" : "+str(datetime.datetime.utcnow())+" data to send ::"+json_data
                client_socket.sendto("ok", addr)
            else:
                print "no receive"

        else:
            print "###!!!!###"
        try:
            recv_data=0
            recv_data, addr = client_socket.recvfrom(2048)
        except:
            print "#######"
