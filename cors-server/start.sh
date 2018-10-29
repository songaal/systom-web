#!/bin/bash

pid=`ps -ef|grep node|grep index|grep -v grep|awk '{print $2}'`
if [ ! -z "$pid" ] ; then
    echo "kill $pid"
    kill $pid || kill -9 $pid
    sleep 2
fi
sleep 1


trap '' 1
node ~/csa/index.js > ./logs/output.log 2>&1 &

#nohup $NODE_HOME/bin/node ~/csa/index.js > ./logs/output.log 2>&1 &
#node index.js

#tail -f logs/output.log
