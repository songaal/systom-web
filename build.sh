#! /bin/bash

for (( ; ; ))
do
   #echo "infinite loops [ hit CTRL+C to stop]"
   npm run build
   echo "빌드 성공!!"
   for i in {1..1800}
   do
     let t=1800-$i
     echo -n -e "\r다음빌드 대기중..  남은 시간: $t s [취소 CTRL-C]"
     sleep 1
   done
done



