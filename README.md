#  SSAFY 공통 PJT [Web-IoT]

[[_TOC_]]



## ✅ PJT 소개

### 일정/진행사항

---

- **시작 날짜** : 2022년 1월 10일 (월) 09:00
- **완료 날짜** : 2022년 2월 17일 (목) 24:00 [총 **6주**]

- **진행사항**

    |               |  　　　　　　　　　　　　　　　　　완료       |      　　　  예정 [2월 10일 (목) ~ ]         |
    | :-----------: | :----------------------------------------------------------: | :-------------------------------------: |
    | **Front-End** | Layout/Auth/User/Search/Board/Community/Notice/Comment/Admin 구현 및 Redux 적용 | Main/MyFarm 구현 후, 추가 기능 구현, QA |
    | **Back-End**  | DB생성 및 Server 설치, REST API 구축 및 Swagger 적용,  CI/CD 자동배포 |           추가 기능 구현, QA            |
    |   **Kiosk**   |                Raspberry Pi DB/Firebase 연동                 |                    -                    |
    |   **기타**    |                       PJT 산출물 정리                        |         UCC 제작, 최종발표 준비         |





### 목표

---

- **`임베디드 KIT를 연동한 "실시간 설문조사 플랫폼"을 웹으로 개발하여 실제 사용 가능한 수준의 서비스를 만드는 것`**

- 유저(주말농장을 운영하는)가  자신의 농작물 정보를 입력하고 정보를 공유할 수 있는 **웹/IoT 서비스** 제작

  1️⃣ **농작물 기록** : 설문을 통해 유저 자신의 농작물의 상태 변화를 기록할 수 있는 서비스

  2️⃣ **농작물 관리** : IoT 기기를 이용하여 멀리서도 농작물의 환경을 확인할 수 있는 서비스

  3️⃣ **커뮤니티** : 농작물 관련된 이야기를 공유할 수 있는 커뮤니티가 있는 서비스

  4️⃣ **멘토링** : 농사가 처음인 유저는 멘토에게 자문을 받을 수 있는 서비스





### 내 농장 속 IoT 쑥쑥

---

- **컨셉** : **농사를 짓는 모든 사람들을 위한 커뮤니티, 내 농장 속 IoT 쑥쑥**
    ```python
    # 그린하비(green-hobby)
    코로나 시국이 장기화 됨에 따라 도시 속에서 친환경적인 취미에 관심을 가지는 사람들이 늘어나고 있다.
    그 중에서도 도시농업과 주말농장에 대한 수요가 늘어나고 있으며 특히, 1인가구에서는 옥상에 작은 텃밭을 가꾸어
    자급자족하기도하며 가족 단위로는 주말농장에 텃밭을 신청해서 농작물을 키우기도 한다.
    위와 같은 취미를 가지는 고객들이 좀 더 나은 환경에서 농작물을 키울 수 있도록 하기 위해 농작물의 기록과 관리를
    수월하게 해주고, 커뮤니티를 통해 같은 관심사를 가진 사람들끼리 소통을 할 수 있는 장을 마련해주고자 한다.
    ```



- **주요기능**

  - [**내농장 페이지**]

    IoT 기기를 통한 **자동 온/습도 기록**

    **실시간**으로 농장 상태 확인 가능

    IoT 기기를 통해서 완료된 **내 농작물 상태 설문** 기록을 웹 페이지에서 확인

    **농장 별로 상태를 관리**할 수 있으며, 기온 이상이 생기면 알림 발생

  <br>

  - **[커뮤니티 페이지]**

    농작물에 관한 고민, 자신의 농작물 자랑, 농작물을 잘 키우는 팁 등의 이야기들을 유저들과 자유롭게 소통할 수 있는 **자유 게시판**

    자신의 농작물을 어떻게 키울지 고민될 때, 실력을 인정받은 멘토에게 자문을 구할 수 있는 **멘토 게시판**

    관리자에게 요청하고 싶은 문의사항을 게시하거나 공지사항을 확인할 수 있는 **문의사항 게시판**






### Tech-Stack / Version

---

- **Tech-Stack / Tools**

    | 　영역    |      　　　　　　　　　　　　　　　　　　　　 스택                             |
    | :-------: | :----------------------------------------------------------: |
    | Front-End | <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/> <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white"/> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/> |
    | Back-End  | <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white"/> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/> <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white"/>  **MYBATIS** |
    |   Kiosk   | <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Qt_logo_2016.svg" alt="qt" width="50" height="28"/> <img src="https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=Raspberry%20Pi&logoColor=white"/> <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black"/> <img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black"/> |
    |  DevOps   | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="50" height="28"/> <img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white"/> <img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"/> <img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/> |



- **Version**

    |　영역    | 　　　　　　　　　　　　　　　　　　　　　　　　　　　　스택     |
    | :-------: | :----------------------------------------------------------: |
    | Front-End | <img src="https://img.shields.io/badge/REACT-17.0.0-76B900?style=for-the-badge&logo=react&logoColor=white"/> <img src="https://img.shields.io/badge/REDUX-4.1.2-76B900?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/MATERIAL UI-5.2.8-76B900?style=for-the-badge&logo=mui&logoColor=white"/> <img src="https://img.shields.io/badge/STYLED COMPONENTS-5.3.3-76B900?style=for-the-badge&logo=styledcomponents&logoColor=white"/> |
    | Back-End  | <img src="https://img.shields.io/badge/NODE.JS-16.13.2-93b023?&style=for-the-badge&logo=node.js&logoColor=white"/> <img src="https://img.shields.io/badge/SWAGGER-6.1.0-93b023?&style=for-the-badge&logo=swagger&logoColor=white"/> <img src="https://img.shields.io/badge/jwt-8.5.1-93b023?&style=for-the-badge&logo=&logoColor=white"/> <img src="https://img.shields.io/badge/EXPRESS.JS-4.17.1-93b023?&style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/mybatis-0.6.5-93b023?&style=for-the-badge&logo=&logoColor=white"/> <img src="https://img.shields.io/badge/cors-2.8.5-93b023?&style=for-the-badge&logo=&logoColor=white"/> <img src="https://img.shields.io/badge/multer-1.4.4-93b023?&style=for-the-badge&logo=&logoColor=white"/> |
    |   Kiosk   | <img src="https://img.shields.io/badge/qt-5.0.0-93b023?&style=for-the-badge&logo=qt&logoColor=white"/> <img src="https://img.shields.io/badge/raspberry pi-4.0.0-93b023?&style=for-the-badge&logo=raspberrypi&logoColor=white"/> <img src="https://img.shields.io/badge/linux-11.0.0-93b023?&style=for-the-badge&logo=linux&logoColor=white"/> |
    |  DevOps   | <img src="https://img.shields.io/badge/docker-20.10.12-93b023?&style=for-the-badge&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/MYSQL-8.0.28-93b023?&style=for-the-badge&logo=mysql&logoColor=white"/> <img src="https://img.shields.io/badge/jenkins-2.319.2-93b023?&style=for-the-badge&logo=jenkins&logoColor=white"/> |





### 팀원/역할

---

- **팀명** : **청바지** [**청**춘은 **바**로 **지**금!]

    |  　이름   |         　　　　　      　  역할                 |     　　 내용       |
    | :------: | :----------------------------------: | :-------------: |
    | 🦆 최소원 | **팀장** / 백엔드 개발 / Kiosk 개발  |    기획 총괄    |
    | 🐫 오윤택 |           **백엔드 리더**            |   백엔드 총괄   |
    | 🐹 한혜성 |       백엔드 개발 / 백엔드 QA        |                 |
    | 🐸 이정아 |         **프론트엔드 리더**          | 프론트엔드 총괄 |
    | 🐂 황소현 | 프론트 개발 / Kiosk 개발 / 프론트 QA |                 |
    | 🦍 이동준 |       프론트 개발 / Jira 관리        |                 |



- **협업 링크**

    | <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white"/> | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> | <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> | <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> | <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white"/> |
    | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
    | [**`Daily Scrum`**](https://www.notion.so/5934c5579cec4460818bad76641363d0?v=700fdcd203754c4088ba9a5bd50e91aa) | [**`Front-End`**](https://www.notion.so/7d5b4d3e84124c64958ed97303ce58fd?v=00ee4f8f6580469eb70adea42717ac00) | [**`Back-End`**](https://www.notion.so/c4cc58fb3024432aa3bd71a0e670e05d?v=9995e22893534bb9ab2d5edfc1e4ff51) | [**`Git`**](https://www.notion.so/GIT-15a1490c08fb4a89b1e1eca7494a0787) | [**`Jira`**](https://www.notion.so/JIRA-1d2c1288517c45719a3fc98346f8d153) |





## ✅ PJT 산출물

### 화면 정의서

---

- [**`화면정의서`**](Outputs/화면정의서/화면정의서.pdf)





### WireFrame

---

- [**`WireFrame 링크`**](https://www.figma.com/file/wJljaT4emh58AyRgm6U667/%EC%91%A5%EC%91%A5?node-id=0%3A1)





### Sequence Diagram

---

- **내 농장 IoT** 

![Sequence_Diagram1](/uploads/cc68a739ecfbcfe1c9d787ae1337c450/Sequence_Diagram1.png)



-  **커뮤니티 (Board)**

![Sequence_Diagram2](/uploads/bfc0ac9a172937bae4759cce34479dd2/Sequence_Diagram2.PNG)




### DB Modeling [ERD]

---

![ERD](/uploads/e0d2c3e6cdc3360129f785be00f0c0de/ERD.png)




### 시스템 구성도

---

- **시스템 아키텍처 (System Architecture)**

![System_Technology](/uploads/e663cb85e01461ef2d95500d05bcd018/System_Technology.png)




### Project File Structure

---
- [**`프론트엔드 구조`**](https://bronzed-gateway-8e0.notion.site/9f89212c19d94ea599a571e9501b7bac)
- [**`백엔드 구조`**](https://bronzed-gateway-8e0.notion.site/91042099bb6440fd88c4bfa48a3e4dcd)






### Rest API URL (Node.js with Express)

---

- [**`Swagger 링크`**](http://52.79.38.33:3001/api-docs/#/)

![Swagger](/uploads/ce2786b26961e2cc8c74ed64aced33ee/Swagger.png)

