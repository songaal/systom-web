#!/bin/bash

pid=`ps -ef|grep node|grep server|grep -v grep|awk '{print $2}'`
if [ ! -z "$pid" ] ; then
    echo "kill $pid"
    kill $pid || kill -9 $pid
    sleep 2
fi
sleep 1

trap '' 1
node ./server.js  >> ./output.log 2>&1 &
