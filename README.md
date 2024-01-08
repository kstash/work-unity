# WorkUnity
### 근태 관리를 위한 HR 솔루션

WorkUnity 사이드 프로젝트에서 NestJs 프레임워크를 사용하여 API 서버를 구성합니다.

AWS RDS로는 PostgreSQL을 사용하여 SVG VPC를 허용하도록 수정하였습니다.

main 브랜치에 해당하는 docker 이미지가 빌드된 후 AWS ec2 인스턴스에 컨테이너로 배포되도록 CI/CD가 Github Actions의 workflow를 통해 적용될 예정입니다.

서버가 배포될 AWS ec2 인스턴스에는 Elastic IP를 적용하여 인스턴스 재시작 이후에도 Public IP가 변경되지 않도록 하였습니다.

CI/CD 처리에 사용될 수 있는 민감한 정보는 Settings에 Secrets로 설정하도록 하여 주의합니다.
