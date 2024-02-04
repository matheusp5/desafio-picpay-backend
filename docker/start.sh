#!/bin/bash
docker-compose up -d redis mysql
sleep 10 
docker-compose up -d app
