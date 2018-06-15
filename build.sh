#! /bin/bash


for (( ; ; ))
do
   #echo "infinite loops [ hit CTRL+C to stop]"
   npm run build
   echo "빌드 성공!! 30분후 재 빌드 합니다. 취소 CTRL+C"
   sleep 1800
done



