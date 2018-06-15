#! /bin/bash

cd /Projects/coincloud/coincloud-web/

systom_server=13.125.127.145
backup_name=backup_$(date +%Y)_$(date +%m)_$(date +%d)_$(date +%H)_$(date +%M)

echo $systom_server "시스텀 배포를 시작합니다!"

echo "압축 진행"
tar -zcvf dist.tar.gz ./dist/*

echo "서버 전송 ~~"
rsync --progress ./dist.tar.gz ec2-user@$systom_server:/home/ec2-user/ -e "ssh -i ~/aws-pem/gncloud-io.pem"

echo "압축 해제"
ssh ec2-user@13.125.127.145 -i ~/aws-pem/gncloud-io.pem "sudo tar zxvf /home/ec2-user/dist.tar.gz"
ssh ec2-user@13.125.127.145 -i ~/aws-pem/gncloud-io.pem "sudo rm -rf /home/ec2-user/dist.tar.gz"

echo "기존 파일 백업: /usr/share/nginx/backup/$backup_name/"
ssh ec2-user@13.125.127.145 -i ~/aws-pem/gncloud-io.pem "sudo mkdir -p /usr/share/nginx/backup/$backup_name"
ssh ec2-user@13.125.127.145 -i ~/aws-pem/gncloud-io.pem "sudo mv /usr/share/nginx/html/* /usr/share/nginx/backup/$backup_name/"

echo "새버전 파일 이동"
ssh ec2-user@13.125.127.145 -i ~/aws-pem/gncloud-io.pem "sudo mv /home/ec2-user/dist/* /usr/share/nginx/html/"

rm -rf dist.tar.gz

echo "successful. buy~!"


