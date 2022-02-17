<img src="https://img.shields.io/badge/REACT-17.0.0-76B900?style=for-the-badge&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/REDUX-4.1.2-76B900?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/MATERIAL UI-5.2.8-76B900?style=for-the-badge&logo=mui&logoColor=white"/> <img src="https://img.shields.io/badge/STYLED COMPONENTS-5.3.3-76B900?style=for-the-badge&logo=styledcomponents&logoColor=white"/>

<img src="https://img.shields.io/badge/NODE.JS-16.13.2-93b023?&style=for-the-badge&logo=node.js&logoColor=white"/> <img src="https://img.shields.io/badge/SWAGGER-6.1.0-93b023?&style=for-the-badge&logo=swagger&logoColor=white"/> <img src="https://img.shields.io/badge/jwt-8.5.1-93b023?&style=for-the-badge&logo=&logoColor=white"/> <img src="https://img.shields.io/badge/EXPRESS.JS-4.17.1-93b023?&style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/mybatis-0.6.5-93b023?&style=for-the-badge&logo=&logoColor=white"/> <img src="https://img.shields.io/badge/cors-2.8.5-93b023?&style=for-the-badge&logo=&logoColor=white"/> <img src="https://img.shields.io/badge/multer-1.4.4-93b023?&style=for-the-badge&logo=&logoColor=white"/>

<img src="https://img.shields.io/badge/qt-5.0.0-93b023?&style=for-the-badge&logo=qt&logoColor=white"/> <img src="https://img.shields.io/badge/raspberry pi-4.0.0-93b023?&style=for-the-badge&logo=raspberrypi&logoColor=white"/> <img src="https://img.shields.io/badge/linux-11.0.0-93b023?&style=for-the-badge&logo=linux&logoColor=white"/>

<img src="https://img.shields.io/badge/MYSQL-8.0.28-93b023?&style=for-the-badge&logo=mysql&logoColor=white"/> <img src="https://img.shields.io/badge/docker-20.10.12-93b023?&style=for-the-badge&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/jenkins-2.319.2-93b023?&style=for-the-badge&logo=jenkins&logoColor=white"/> 



#  🥕 쑥쑥

[[_TOC_]]



## 1. 쑥쑥 소개

- 개발 기간 : 2022년 1월 10일 [월] ~ 2022년 2월 17일 [목]
- 주제 : **웹** 커뮤니티와 **IoT**를 통한 실시간 내농장 정보 확인 기능을 연계한 통합 서비스
- 개발 인원 : 최소원, 오윤택, 한혜성, 이정아, 황소현, 이동준
- 역할 [팀명 : 👖 청바지! (**청**춘은 **바**로 **지**금)]

![image-20220217110821914](/uploads/7e90f703863f90c8c09d410b7b65086e/image-20220217110821914.png)





## 2. 개요

🥕 내 손안의 **농장,** **쑥쑥!**

> 😷 코로나 시국이 장기화 됨에 따라 도시 속에서 **친환경적인 취미**에 관심을 가지는 사람들이 늘어나고 있습니다.
>
> 그 중에서도 **도시농업**과 **주말농장**에 대한 수요가 늘어나고 있으며 특히, 1인가구에서는 옥상에 작은 **텃밭**을 가꾸어
> 자급자족하기도하며 가족 단위로는 주말농장에 텃밭을 신청해서 **농작물**을 키우기도 합니다.
>
> 위와 같은 취미를 가지는 고객들이 좀 더 나은 환경에서 농작물을 키울 수 있도록 하기 위해 📝 **농작물의 기록과 관리**를
> 수월하게 해주고, **커뮤니티**를 통해 같은 관심사를 가진 사람들끼리 💬 **소통**을 할 수 있는 장을 마련해주고자 했습니다.



### 쑥쑥 기획 배경

![image-20220217142354401](/uploads/c61f4b9bc77668e5981038f5aa75b7ef/image-20220217142354401.png)



### 쑥쑥 기능

![image-20220217141932047](/uploads/3b76d761b4b3864babaf9cefe83eb8ec/image-20220217141932047.png)





## 3. 기술 스택

![image-20220217111527030](/uploads/3627a683775b974b7d33c09c0c8f85de/image-20220217111527030.png)





## 4. 형상 관리

### [`Notion`](https://www.notion.so/5934c5579cec4460818bad76641363d0?v=700fdcd203754c4088ba9a5bd50e91aa)

![image-20220217135053385](/uploads/cd58f97ae4411b1eb1896aacafd2a842/image-20220217135053385.png)

![image-20220217135147963](/uploads/46462d80a92d04ad5efbb5463baef8dc/image-20220217135147963.png)



### [`Jira`](https://www.notion.so/JIRA-1d2c1288517c45719a3fc98346f8d153)

![image-20220217140116170](/uploads/6c05b99db730c2853aec2166d25a7b14/image-20220217140116170.png)

![image-20220217140801762](/uploads/575c47660ab163879d80fe3f5f9dfd76/image-20220217140801762.png)





## 5. 주기능 소개

### 사용자별 권한 및 역할

- U01 [일반] / U02 [멘토] : 게시글/댓글 작성, IoT 기기 신청, 내농장 관리
- U03 [운영자] : 공지사항 게시, 회원 댓글 수정, 게시판 수정, 문의사항 수정
- U04 [관리자] : 공지사항 게시, 회원 댓글 수정, 유저 강퇴, 유저 등급 변경
- 공통 권한 : 회원가입, 로그인, 로그아웃, 내정보 조회/수정, 비밀번호 변경, 회원탈퇴
- 비회원 이용 가능 서비스 : 회원가입, 게시판 조회, 문의사항 조회



### 주기능 1-1. 내농장 히스토리

![image-20220217142504927](/uploads/b4786bc64d1ff59c3ec72cec8956d836/image-20220217142504927.png)



### 주기능 1-2. 내농장 상태

![image-20220217142600236](/uploads/3ba7c33341f066170d8a8b1f96ec36b3/image-20220217142600236.png)



### 주기능 1-3. 내농장 이미지

![image-20220217142623686](/uploads/cea5f51704e3f34ca6c0ad97e30fe822/image-20220217142623686.png)



### 주기능 2. 커뮤니티

![image-20220217142715089](/uploads/cce638001599b29098506f78b9f433ce/image-20220217142715089.png)





## 6. ERD [DB Modeling]

![image-20220217162548594](/uploads/d3ea2396a391b9cd4fd2e0b795c8e781/image-20220217162548594.png)





## 7. 실행 방법

### Back-End

1. 디렉토리 이동

```bash
cd backend
```



2. 필요한 패키지 설치 [`node-modules` 설치]

```bash
npm install
```



3. 실행

```bash
npm start
```

---



### Front-End

1. 디렉토리 이동

```bash
cd frontend
```



2. 필요한 패키지 설치 [`node-modules` 설치]

```bash
npm install
```



3. 실행

```bash
npm start
```

---



### Raspberry Pi

1. 설치 [모듈]

```bash
1.한글 / 2.pyQt5 / 3.Qtsql / 4.senseHat, senseEmu  / 5.bcrypt
6.hashlib / 7.firebase / 8.PiCamera / 9.matchbox-keyboard
```



2. 실행

```bash
sudo python3 [다운받은 폴더 경로]/login.py
```





## 8. 트리 구조

- [Back-End](Outputs/FileTree/백엔드파일구조.md)
- [Front-End](Outputs/FileTree/프론트엔드파일구조.md)





## 9. Contributors

- 🦆 Choi Sowon : sowonwow2@gmail.com / https://github.com/sowonlevelup
- 🐫 O YunTaek : xoem00@gmail.com / https://github.com/xordbs
- 🐹 Han Hyesung : hanhs4544@gmail.com / https://github.com/Hyesung-Han
- 🐸 Lee Junga : wjddk7507@naver.com / https://github.com/wjddk7507
- 🐂 Hwang Sohyeon : t01081418141@naver.com / https://github.com/thgus
- 🦍 Lee Dongjune : ehdwnsdl1210@gmail.com / https://github.com/Dorororodong
