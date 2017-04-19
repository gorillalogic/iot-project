#!/bin/bash 

scp {Dockerfile,main.go,thing.go} ec2-user@34.208.5.75:~/go
ssh ec2-user@34.208.5.75 "sudo docker stop iotproject && sudo docker rm iotproject "
ssh ec2-user@34.208.5.75 "pushd go && sudo docker build -t iotproject ."
ssh ec2-user@34.208.5.75 "sudo docker run --name iotproject -p9090:9090 iotproject -d"

