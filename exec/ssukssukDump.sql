-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: i6a103.p.ssafy.io    Database: jeans
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `c_comment_t`
--

DROP TABLE IF EXISTS `c_comment_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `c_comment_t` (
  `comment_no` int NOT NULL AUTO_INCREMENT,
  `comment_user_nickName` varchar(45) NOT NULL,
  `community_no` int NOT NULL,
  `comment_text` varchar(100) DEFAULT NULL,
  `comment_date` datetime DEFAULT NULL,
  `comment_user_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`comment_no`),
  KEY `community_no_idx` (`community_no`),
  KEY `c_comment_userid_idx` (`comment_user_id`),
  CONSTRAINT `c_comment_userid` FOREIGN KEY (`comment_user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `community_no` FOREIGN KEY (`community_no`) REFERENCES `community_t` (`community_no`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `c_comment_t`
--

LOCK TABLES `c_comment_t` WRITE;
/*!40000 ALTER TABLE `c_comment_t` DISABLE KEYS */;
INSERT INTO `c_comment_t` VALUES (25,'수박농장',10,'ㅋㅋ유머러스하시네요^^','2022-02-11 11:28:22','junga'),(26,'수박농장',5,'진짜 농부시면서 그런것도 모르시나요??!','2022-02-11 11:29:08','junga'),(27,'호호',10,'시골에 계신 저희 할아버지가 생각나네요 ^^ 덕분에 오랜만에 할아버지한테 전화 드립니다!','2022-02-11 11:29:12','asdfasdf'),(28,'수박농장',2,'콩나물 어두운 곳에서 기르지 않나요?!! 주방에서 작게 키워보세요~~','2022-02-11 11:30:19','junga'),(29,'수박농장',4,'콩나물 추천합니다!!','2022-02-11 15:06:46','junga'),(30,'채소좋아',12,'와~~~ 소통 많이 해요 !!','2022-02-11 15:49:26','jeanssowon'),(32,'채소좋아',8,'헉 저도 방울토마토 키우다가 약을 안쳤더니 병충해로 죽더라구요 ㅜㅜ ','2022-02-11 15:51:16','jeanssowon'),(33,'채소좋아',4,'방울토마토 어때요??','2022-02-11 15:53:11','jeanssowon'),(34,'채소좋아',2,'검은 천으로 싸서 음지에서 키워야 됩니당!! 아니면 초록색 콩나물됨..','2022-02-11 15:56:28','jeanssowon'),(35,'채소좋아',5,'ㅋㅋㅋ밑에분 넘 공격적이야.. 저 파테크하고 있는데 대충 사와서 흙에 꽂아놨더니 알아서 잘 자라던데요? 난이도 1인듯','2022-02-11 15:57:02','jeanssowon'),(36,'채소좋아',9,'알비료는 모지 알트비트는 많이 해봤는데','2022-02-11 16:01:59','jeanssowon'),(37,'수박농장',13,'파랑 상추 추천 드려요! 키우시는 분들도 많아 정보도 많을 것이라고 생각됩니다!!','2022-02-11 16:13:34','junga'),(38,'수박농장',9,'필요하시다면 사보셔도 괜찮을 것이라고 생각되는데 다만 굳이 비료가 필수적인 상황이 아니라면 추천드리지 않습니다!','2022-02-11 16:15:40','junga'),(39,'수박농장',10,'깔깔깔 한여름에 보았으면 좋았을 유머네요~ 어우 추워라','2022-02-11 16:16:31','junga'),(41,'채소좋아',10,'ㅋㅋㅋㅋ아 이거에 웃은거 열받네요','2022-02-11 16:20:01','jeanssowon'),(42,'채소좋아',6,'재배하시면 저한테 파시죠','2022-02-11 16:20:33','jeanssowon'),(43,'수박농장',11,'저도 같은 점이 궁금한데 혹시 답을 알게 되면 저한테도 답글 남겨주시면 감사하겠습니다!!!','2022-02-11 16:22:32','junga'),(48,'한글로 시작하면 수정에서 별명은 !특수문자 A대문자 a소문자 1숫자 도 가능',8,'노래를 불러주는건 어떠신가요? 전 가끔 제 작물들에게 노래를 불러줘요 애들이 좋아서 잘자라는건지 얼른 뽑히고 차라리 저세상가고싶어서 잘자라는건지..쩝','2022-02-13 03:02:43','hanhs4544'),(50,'한글로 시작하면 수정에서 별명은 !특수문자 A대문자 a소문자 1숫자 도 가능',1,'전 가끔 설탕물을 뿌려줘요! 벌레가 많이 꼬이는 것이 단점이지만 그게 또 달아서 그런거니 어쩔 수 없는 것같아요,,,ㅠㅠ 더 좋은 방법 찾으시면 저에게도 공유 부탁드려요 : )','2022-02-13 03:04:23','hanhs4544'),(52,'농부왕한애성',12,'안녕하세요~~ 혹시 뭐 키우시나요~~??','2022-02-14 11:35:45','hanhs4544'),(53,'농부왕한애성',7,'저는 집 주변으로 했어요! 회사쪽은 근처도 가기 싫거든요','2022-02-14 11:37:47','hanhs4544'),(54,'농부왕한애성',4,'아보카도 추천드려요!!','2022-02-14 11:39:07','hanhs4544'),(55,'소현',12,'이번에 딸기를 키워보기로 했습니다! 앞으로 잘부탁드립니다~','2022-02-14 15:00:31','sohyeon'),(57,'사과같이예쁜나',9,'다이소 알비료 글쎄요... 시장만 나가도 좋은 비료 많으니 조금 걸어보시는거 어떨까요??^^','2022-02-16 14:40:39','apple'),(59,'정아농장',17,'비료를 써보시는건 어떤가요?','2022-02-16 14:42:13','junga'),(60,'사과같이예쁜나',17,'온도와 습도가 적당한데 마르는 거면 잎마름병인 것 같네요!! ','2022-02-16 14:42:16','apple'),(61,'사과같이예쁜나',13,'제일 좋아하는 채소를 키우세요! 애정이 있어야 무럭무럭 자란답니다~~^^','2022-02-16 14:42:53','apple'),(62,'사과같이예쁜나',12,'안녕하세요 반가워요~~^^','2022-02-16 14:43:05','apple'),(65,'사과같이예쁜나',11,'한 달에 한 번 줘도 잘 자란답니다~ 제일 좋은 방법은 주고 까먹는 거에요!','2022-02-16 14:45:11','apple'),(66,'사과같이예쁜나',10,'ㅋㅋㅋㅋ이런 재미나신 분들도 계시네요^^','2022-02-16 14:45:40','apple'),(67,'사과같이예쁜나',8,'다들 작물이 시들었는데 왜 잘 관리하고 계시다고 하는 걸까요^^ 쑥쑥 사용하고 계시면 설문내역보시면서 다시 체크하시는 것도 좋을 것 같네요','2022-02-16 14:46:41','apple'),(70,'정아농장',19,'딸기 넘 좋아하는데 멀어서 아쉽네요ㅠㅠ 꼭 도움주실 분 찾으시길 바랍니다!!','2022-02-17 11:47:57','junga');
/*!40000 ALTER TABLE `c_comment_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `code_t`
--

DROP TABLE IF EXISTS `code_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `code_t` (
  `code_id` varchar(10) NOT NULL,
  `code_type` varchar(45) DEFAULT NULL,
  `code_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`code_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `code_t`
--

LOCK TABLES `code_t` WRITE;
/*!40000 ALTER TABLE `code_t` DISABLE KEYS */;
INSERT INTO `code_t` VALUES ('C01','COMMUNITY','일반질문'),('C02','COMMUNITY','멘토질문'),('N01','NOTICE','공지사항'),('N02','NOTICE','문의하기'),('U01','USER','일반'),('U02','USER','멘토'),('U03','USER','운영자'),('U04','USER','관리자');
/*!40000 ALTER TABLE `code_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `community_t`
--

DROP TABLE IF EXISTS `community_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `community_t` (
  `community_no` int NOT NULL AUTO_INCREMENT,
  `community_title` varchar(100) DEFAULT NULL,
  `community_author` varchar(45) DEFAULT NULL,
  `community_date` datetime DEFAULT NULL,
  `community_content` varchar(2000) DEFAULT NULL,
  `community_hit` int DEFAULT '0',
  `community_code` varchar(45) NOT NULL,
  `community_user_id` varchar(45) NOT NULL,
  PRIMARY KEY (`community_no`),
  KEY `community_code_idx` (`community_code`),
  KEY `community_user_id_idx` (`community_user_id`),
  CONSTRAINT `community_code` FOREIGN KEY (`community_code`) REFERENCES `code_t` (`code_id`),
  CONSTRAINT `community_user_id` FOREIGN KEY (`community_user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `community_t`
--

LOCK TABLES `community_t` WRITE;
/*!40000 ALTER TABLE `community_t` DISABLE KEYS */;
INSERT INTO `community_t` VALUES (1,'수박 당도 높게 하는 방법 아시는 분!','수박농장','2021-11-11 10:20:02','현재 김포에서 주말농장으로 수박을 기르고 있는데 너무 달지 않아 걱정입니다. 혹시 수박의 당도를 조절할 수 있는 방법이 있을까요?? 멘토님들 도와주세요',9,'C02','junga'),(2,'콩나물 꿀팁','인천딸기농부','2021-11-11 13:30:20','이번에 집 베란다에서 콩나물을 길러보려하는데 혹시 꿀팁있으신 분 사소한 거라도 다 적어주세요!!',5,'C01','hanhs12'),(3,'다이소 식물 키우기 키트 사용 팁','소현','2021-11-13 10:35:10','다이소나 마트에서 파는 식물키우기 키트로 길러보시는 분들이 많은데 여기서 꿀팁은 흙입니다! 흙의 질을 보고 다른 흙들과 섞어주면 더 잘 자랄 수 있고 어느정도 자라면 화분이 작을 수 있으니 화분을 바꿔주세요!',5,'C02','sohyeon'),(4,'키우기 쉬운 입문 식물 추천해주세요','농부지망생','2021-11-16 10:38:08','이번에 방학을 맞아 주말농장에서 식물이나 과일을 키워보고 싶습니다. 입문자들도 쉽게 할 수 있는게 뭐가 있을까요? 가장 무난한 걸로 추천해주시면 감사하겠습니다.',37,'C01','user3'),(5,'파테크 기간','내가진짜농부','2021-11-18 19:42:43','요즘 유행하는 파테크를 시작해보려고 합니다. 다른 식물들은 많이 키워봤는데 파는 처음이라 긴장되네요 혹시 파 키우면 언제쯤 먹을 수 있을까요?',10,'C02','realfarmer'),(6,'키위재배','인천딸기농부','2021-11-22 10:46:55','제주도에서 키위재배 해보신 분 계시나요? 키위가 대략 어느정도로 자라는지, 팔게되면 어느정도의 이득인지 알려주실 분 구합니다',18,'C01','hanhs12'),(7,'주말농장 지역이 어디가 좋을까요?','소현','2021-11-22 14:50:39','주말농장을 신청해보고 싶은데 다들 어느 지역에서 하시나요? 제가 주말에도 가끔 출근을 해서 회사 주변으로 알아볼지 집 주변으로 알아볼지 고민이네요..ㅠ',7,'C01','sohyeon'),(8,'방울토마토 기운차리게 하는 방법 알려주세요','땍택','2021-11-23 11:02:23','베란다에서 방울토마토를 기르고 있는데 왜 점점 시들시들해질까요? 물도 주고 흙도 관리해주고 온도, 습도도 잘 관리하고 있습니다ㅠㅠ 제가 놓친게 뭐가 있을까요?',115,'C02','xoem00'),(9,'다이소 알비료 쓸만한가요?','농부지망생','2021-11-25 13:10:15','현재 집에서 상추키우기를 해보고 있는데 비료를 줘보고 싶어서 알아보다가 다이소에 있는 알비료를 알게되었습니다! 가격도 엄청 싸고 모든 품종에 상관없다고 해서 사보고 싶은데 혹시 효과가 있을까요?',14,'C02','user3'),(10,'수박의 유래를 아십니까?','내가진짜농부','2021-11-28 10:11:20','그럴수박에',43,'C01','realfarmer'),(11,'다육이 물 주는 기간','땍택','2021-11-29 15:10:57','마당에서 다육이를 키워보려고 하는데 며칠에 한번 주는건가요? 제',36,'C02','xoem00'),(12,'초보 농부 인사드립니다','소현','2022-02-11 15:29:28','안녕하세요~! 이번에 한번 집에서 작물을 키워보려고 합니다.\n모르는 것이 많았는데 이 커뮤니티를 알게 되어 가입하게 되었습니다.\n앞으로 많은 도움 부탁드립니다:) 감사합니다',104,'C01','sohyeon'),(13,'아 진짜 고민입니다','채소좋아','2022-02-11 16:01:18','제가 채소를 넘 좋아하는데 채소 가격이 올라서 직접 키우고 싶거든요..\n근데 어떤 걸 심어야 실패를 안 할 지 고민입니다! 지금 후보는 깻잎, 상추, 파 등등... 추천 해주세요',130,'C01','jeanssowon'),(17,'대파가 계속 시들어요...','파농부','2022-02-14 17:39:13','안녕하세요 현재 주말농장에서 대파를 키우고 있습니다.\n대파가 계속 말라 비틀어가는데 뭐가 문제일까요? 온도와 습도는 적당한 것으로 보입니다.\n도와주세요 멘토님',54,'C02','hanhs4544'),(19,'도와주세요ㅠ','사과같이예쁜나','2022-02-16 14:35:06','담양에서 작은 딸기 하우스를 하는데\n허리를 삐끗해서 일하기가 쉽지않네요...\n주변사시는 분이나 딸기 좋아하시는 분들 도움 좀 주세요...\n',45,'C01','apple');
/*!40000 ALTER TABLE `community_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `live_image_t`
--

DROP TABLE IF EXISTS `live_image_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `live_image_t` (
  `farm_no` int NOT NULL,
  `file_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`farm_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `live_image_t`
--

LOCK TABLES `live_image_t` WRITE;
/*!40000 ALTER TABLE `live_image_t` DISABLE KEYS */;
/*!40000 ALTER TABLE `live_image_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_farm_device`
--

DROP TABLE IF EXISTS `my_farm_device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_farm_device` (
  `user_id` varchar(45) NOT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `user_address` varchar(100) DEFAULT NULL,
  `user_phone` varchar(45) DEFAULT NULL,
  `state` tinyint(1) DEFAULT '0',
  `regi_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `device_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_farm_device`
--

LOCK TABLES `my_farm_device` WRITE;
/*!40000 ALTER TABLE `my_farm_device` DISABLE KEYS */;
INSERT INTO `my_farm_device` VALUES ('dlehdwns','이동준','남천동','010-9957-2443',0,'2022-02-15 23:54:30'),('hanhs4544','한애성','인천광역시 부평대로 165번길 40','010-8583-9612',0,'2022-02-14 14:33:59'),('jeanssowon','최소원','사랑시 고백구 행복동','01000000000',0,'2022-02-15 10:42:18'),('junga','이정아','서울','010-0000-0000',0,'2022-02-14 10:40:53'),('user3','asdf','asdf','asdf',0,'2022-02-16 15:27:13');
/*!40000 ALTER TABLE `my_farm_device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `my_farm_t`
--

DROP TABLE IF EXISTS `my_farm_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `my_farm_t` (
  `farm_no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) DEFAULT NULL,
  `serial_no` varchar(100) DEFAULT NULL,
  `farm_name` varchar(45) DEFAULT NULL,
  `farm_regidate` datetime DEFAULT NULL,
  `farm_text` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`farm_no`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `my_farm_t`
--

LOCK TABLES `my_farm_t` WRITE;
/*!40000 ALTER TABLE `my_farm_t` DISABLE KEYS */;
INSERT INTO `my_farm_t` VALUES (2,'sohyeon','10000000f1c11b58\n','test','2022-02-04 23:22:57','되나'),(3,'asdfasdf','10000000f1c11b58\n','test','2022-02-04 23:22:57','되나'),(9,'junga','100000002c89f121\n','정아농장','2022-02-10 13:49:26','농장에 가면 사과도 있고 바나나도 있고 딸기도 있고 ~ 근데 정아 농장엔 수박 심을 꺼야 !'),(13,'jeanssowon','100000002c89f121\n','정아농장','2022-02-15 11:20:57','농장에 가면 사과도있고 바나나도 있고 딸기도 있고~ 근데 정아 농장엔 수박 심을꺼야!'),(14,'user3','100000002c89f121\n','안녕','2022-02-16 15:27:16','반가워워');
/*!40000 ALTER TABLE `my_farm_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myfarm_image_t`
--

DROP TABLE IF EXISTS `myfarm_image_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myfarm_image_t` (
  `farm_no` int NOT NULL,
  `file_name` varchar(100) DEFAULT NULL,
  `file_path` varchar(1000) DEFAULT NULL,
  `file_type` varchar(45) DEFAULT NULL,
  `file_size` double DEFAULT NULL,
  `file_date` datetime NOT NULL,
  PRIMARY KEY (`farm_no`),
  CONSTRAINT `myfarmimage` FOREIGN KEY (`farm_no`) REFERENCES `my_farm_t` (`farm_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myfarm_image_t`
--

LOCK TABLES `myfarm_image_t` WRITE;
/*!40000 ALTER TABLE `myfarm_image_t` DISABLE KEYS */;
INSERT INTO `myfarm_image_t` VALUES (2,'2721644989942021.png','https://ssukimg.s3.ap-northeast-2.amazonaws.com/2721644989942021.png','image/png',96313,'2022-02-16 14:39:02'),(9,'7551644900274615.jpg','https://ssukimg.s3.ap-northeast-2.amazonaws.com/7551644900274615.jpg','image/jpeg',17972,'2022-02-15 13:44:34');
/*!40000 ALTER TABLE `myfarm_image_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `n_comment_t`
--

DROP TABLE IF EXISTS `n_comment_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `n_comment_t` (
  `comment_no` int NOT NULL AUTO_INCREMENT,
  `comment_user_nickName` varchar(45) NOT NULL,
  `notice_no` int NOT NULL,
  `comment_text` varchar(100) DEFAULT NULL,
  `comment_date` datetime DEFAULT NULL,
  `comment_user_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`comment_no`),
  KEY `notice_no_idx` (`notice_no`),
  KEY `n_comment_userid_idx` (`comment_user_id`),
  CONSTRAINT `n_comment_userid` FOREIGN KEY (`comment_user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `notice_no` FOREIGN KEY (`notice_no`) REFERENCES `notice_t` (`notice_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `n_comment_t`
--

LOCK TABLES `n_comment_t` WRITE;
/*!40000 ALTER TABLE `n_comment_t` DISABLE KEYS */;
INSERT INTO `n_comment_t` VALUES (8,'호호',1,'안녕하세요호호호ㅎㅎㅎ','2022-02-04 16:42:05','asdfasdf'),(9,'호호',1,'ㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅇㅁㄴㄹㄴㅇㅂㅂㅂ','2022-02-04 16:44:17','asdfasdf'),(11,'호호',1,'됐따~~~~~~~수정완룎!@!@!!@ㅁㅁ','2022-02-04 16:47:21','asdfasdf'),(13,'호호',1,'다른계정','2022-02-04 17:00:29','asdfasdf'),(14,'호호',1,'ㅎㅇㅎㅇ','2022-02-04 17:00:38','asdfasdf'),(41,'수박농장',1,'수정 잘됐네용','2022-02-10 12:06:30','junga'),(44,'관리자3',7,'접수 후 1주일 후면 기기가 출고됩니다! 출고 후에는 2~3일이면 도착하니 조금만 기다려주세요~~!!','2022-02-16 20:59:28','asdfasdf'),(45,'관리자3',6,'내 농장 페이지 클릭 시 IoT 기기 신청창이 추가되었습니다. 신청 폼을 작성해주시면 기기를 수령하실 수 있습니다','2022-02-16 21:00:33','asdfasdf'),(46,'관리자3',2,'문의하신 부분 수정 완료하였습니다!^^','2022-02-16 21:00:47','asdfasdf');
/*!40000 ALTER TABLE `n_comment_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notice_t`
--

DROP TABLE IF EXISTS `notice_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notice_t` (
  `notice_no` int NOT NULL AUTO_INCREMENT,
  `notice_title` varchar(100) DEFAULT NULL,
  `notice_author` varchar(45) DEFAULT NULL,
  `notice_date` datetime DEFAULT NULL,
  `notice_content` varchar(2000) DEFAULT NULL,
  `notice_hit` int DEFAULT '0',
  `notice_code` varchar(45) DEFAULT NULL,
  `notice_user_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notice_no`),
  KEY `notice_no_idx` (`notice_code`),
  KEY `notice_user_idx` (`notice_user_id`),
  CONSTRAINT `notice_code` FOREIGN KEY (`notice_code`) REFERENCES `code_t` (`code_id`),
  CONSTRAINT `notice_userid` FOREIGN KEY (`notice_user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notice_t`
--

LOCK TABLES `notice_t` WRITE;
/*!40000 ALTER TABLE `notice_t` DISABLE KEYS */;
INSERT INTO `notice_t` VALUES (1,'멘토 변경 문의합니다.','호호','2022-02-03 09:03:09','멘토 변경 문의합니다. 멘토신청을 어떻게 하는것인가요?',16,'N02','asdfasdf'),(2,'내 농장 수정 문의합니다.','호호','2022-02-03 14:41:40','내 농장 수정을 하는데 오류가 발생합니다.',307,'N02','asdfasdf'),(3,'[공지]내 농장 설정 공지','호호','2022-02-03 16:47:08','내 농장 페이지 설정에 있어 페이지상에선 수정이 불가능 합니다. 기기를 발급 받고 기기를 통해 등록해주시기 바랍니다.',29,'N01','asdfasdf'),(4,'[긴급] 온습도 센서 이상 발생 공지','호호','2022-02-03 17:11:25','온습도 기록이 정상적으로 들어오지 않는다는 문의가 많습니다. 빠르게 확인중에 있습니다. 양해 부탁드립니다.',141,'N01','asdfasdf'),(5,'[공지] 서비스 오픈 이벤트','호호','2022-02-03 17:11:25','쑥쑥 서비스를 이용해 주시는 여러분 감사합니다. 서비스 오픈에 힘입어 작은 이벤트를 진행하려 합니다.',23,'N01','asdfasdf'),(6,'기기는 어떻게 받을 수 있나요?','소현','2022-02-11 15:34:38','IoT 기기를 받고 싶은데 어떻게 받을 수 있나요?',41,'N02','sohyeon'),(7,'기기 수령할 주소 입력한 후','농부왕한애성','2022-02-14 14:33:32','기기 받을 주소 입력 후 얼마나 기다려야 수령받을 수 있나요?',27,'N02','hanhs4544');
/*!40000 ALTER TABLE `notice_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sensor_data_t`
--

DROP TABLE IF EXISTS `sensor_data_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensor_data_t` (
  `sensor_data_no` int NOT NULL AUTO_INCREMENT,
  `farm_no` int DEFAULT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  `temperature` double DEFAULT NULL,
  `humidity` int DEFAULT NULL,
  `sensor_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`sensor_data_no`),
  KEY `myfarmsensor_idx` (`farm_no`),
  KEY `sensorsuserid_idx` (`user_id`),
  CONSTRAINT `myfarmsensor` FOREIGN KEY (`farm_no`) REFERENCES `my_farm_t` (`farm_no`),
  CONSTRAINT `sensorsuserid` FOREIGN KEY (`user_id`) REFERENCES `user_t` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=540 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensor_data_t`
--

LOCK TABLES `sensor_data_t` WRITE;
/*!40000 ALTER TABLE `sensor_data_t` DISABLE KEYS */;
INSERT INTO `sensor_data_t` VALUES (260,2,'sohyeon',25,45,'2022-02-04 16:47:50'),(261,2,'sohyeon',16,78,'2022-02-04 16:47:51'),(262,2,'sohyeon',16.015625,79,'2022-02-04 16:47:53'),(263,2,'sohyeon',16,79,'2022-02-04 16:47:54'),(264,2,'sohyeon',15.984375,79,'2022-02-04 16:47:55'),(291,2,'sohyeon',16.015625,79,'2022-02-04 16:51:29'),(292,2,'sohyeon',15.984375,78,'2022-02-04 16:51:30'),(293,2,'sohyeon',15.96875,78,'2022-02-04 16:51:31'),(294,2,'sohyeon',15.96875,78,'2022-02-04 16:51:32'),(295,2,'sohyeon',15.96875,78,'2022-02-04 16:51:33'),(296,2,'sohyeon',15.96875,78,'2022-02-04 16:51:34'),(297,2,'sohyeon',15.984375,79,'2022-02-04 16:51:35'),(298,2,'sohyeon',15.984375,79,'2022-02-04 16:51:36'),(299,2,'sohyeon',25,45,'2022-02-04 17:11:19'),(300,2,'sohyeon',25,45,'2022-02-04 17:11:20'),(301,2,'sohyeon',25,45,'2022-02-04 17:11:21'),(302,2,'sohyeon',25.015625,45,'2022-02-04 17:11:22'),(303,2,'sohyeon',25,45,'2022-02-04 17:11:23'),(304,2,'sohyeon',24.984375,45,'2022-02-04 17:13:08'),(305,2,'sohyeon',24.96875,45,'2022-02-04 17:13:09'),(306,2,'sohyeon',24.96875,45,'2022-02-04 17:13:10'),(307,2,'sohyeon',24.96875,45,'2022-02-04 17:13:11'),(317,2,'sohyeon',24.984375,45,'2022-02-04 17:18:19'),(318,2,'sohyeon',24.96875,45,'2022-02-04 17:18:21'),(319,2,'sohyeon',25,45,'2022-02-04 17:18:22'),(320,2,'sohyeon',25,45,'2022-02-04 17:18:23'),(321,2,'sohyeon',25,45,'2022-02-04 17:18:24'),(322,2,'sohyeon',24.984375,45,'2022-02-04 17:18:25'),(323,2,'sohyeon',25,44,'2022-02-04 17:18:26'),(324,2,'sohyeon',24.984375,45,'2022-02-04 17:18:27'),(325,2,'sohyeon',24.96875,45,'2022-02-04 17:18:28'),(326,2,'sohyeon',24.984375,45,'2022-02-04 17:18:29'),(327,2,'sohyeon',24.96875,45,'2022-02-04 17:18:30'),(328,2,'sohyeon',24.953125,45,'2022-02-04 17:18:31'),(329,2,'sohyeon',24.984375,45,'2022-02-04 17:18:32'),(330,2,'sohyeon',24.984375,45,'2022-02-04 17:18:33'),(331,2,'sohyeon',25.015625,45,'2022-02-04 17:18:35'),(332,2,'sohyeon',24.984375,45,'2022-02-04 17:18:36'),(333,2,'sohyeon',24.984375,45,'2022-02-04 17:18:38'),(334,2,'sohyeon',25,45,'2022-02-04 17:18:39'),(335,2,'sohyeon',25,45,'2022-02-04 17:18:40'),(336,2,'sohyeon',25,45,'2022-02-04 17:18:41'),(337,2,'sohyeon',24.984375,45,'2022-02-04 17:18:42'),(338,2,'sohyeon',25,45,'2022-02-04 17:18:43'),(339,2,'sohyeon',24.984375,45,'2022-02-04 17:18:44'),(340,2,'sohyeon',24.984375,45,'2022-02-04 17:18:45'),(341,2,'sohyeon',24.984375,45,'2022-02-04 17:18:46'),(342,2,'sohyeon',24.984375,45,'2022-02-04 17:18:47'),(343,2,'sohyeon',25.015625,45,'2022-02-04 17:18:49'),(344,2,'sohyeon',25,45,'2022-02-04 17:18:50'),(345,2,'sohyeon',25,45,'2022-02-04 17:18:51'),(346,2,'sohyeon',25,45,'2022-02-04 17:18:52'),(347,2,'sohyeon',25,45,'2022-02-04 17:18:53'),(348,2,'sohyeon',25.015625,45,'2022-02-04 17:18:54'),(349,2,'sohyeon',25,45,'2022-02-04 17:18:55'),(350,3,'asdfasdf',25,45,'2022-02-04 17:28:50'),(351,3,'asdfasdf',25,45,'2022-02-04 17:28:51'),(352,3,'asdfasdf',25,45,'2022-02-04 17:28:53'),(353,3,'asdfasdf',25,45,'2022-02-04 17:28:54'),(354,3,'asdfasdf',25,45,'2022-02-04 17:28:55'),(355,3,'asdfasdf',24.984375,45,'2022-02-04 17:28:56'),(356,3,'asdfasdf',25,45,'2022-02-04 17:40:43'),(357,3,'asdfasdf',24.96875,45,'2022-02-04 17:40:44'),(358,3,'asdfasdf',24.96875,45,'2022-02-04 17:40:45'),(372,2,'sohyeon',-3.53125,13,'2022-02-08 05:37:56'),(373,2,'sohyeon',-3.5,13,'2022-02-08 05:47:57'),(374,2,'sohyeon',-3.359375,14,'2022-02-08 05:57:57'),(375,2,'sohyeon',-3.46875,13,'2022-02-08 06:08:00'),(376,2,'sohyeon',-3.578125,14,'2022-02-08 06:18:01'),(377,2,'sohyeon',-3.484375,13,'2022-02-08 06:28:01'),(378,2,'sohyeon',-3.328125,14,'2022-02-08 06:38:02'),(379,2,'sohyeon',-3.625,14,'2022-02-08 06:48:02'),(380,2,'sohyeon',-3.515625,13,'2022-02-08 06:58:04'),(381,2,'sohyeon',-3.515625,13,'2022-02-08 07:08:05'),(382,2,'sohyeon',-3.453125,13,'2022-02-08 07:18:06'),(383,2,'sohyeon',-3.453125,13,'2022-02-08 07:28:06'),(384,2,'sohyeon',-3.4375,13,'2022-02-08 07:38:07'),(385,2,'sohyeon',-3.484375,13,'2022-02-08 07:48:07'),(386,2,'sohyeon',-3.5,13,'2022-02-08 07:58:07'),(387,2,'sohyeon',-3.421875,13,'2022-02-08 08:08:07'),(388,2,'sohyeon',-3.421875,14,'2022-02-08 08:18:08'),(389,2,'sohyeon',-3.453125,14,'2022-02-08 08:28:08'),(390,2,'sohyeon',-3.609375,13,'2022-02-08 08:38:08'),(391,2,'sohyeon',-3.5,13,'2022-02-08 08:48:09'),(392,2,'sohyeon',-3.5625,14,'2022-02-08 08:58:09'),(393,2,'sohyeon',-3.328125,14,'2022-02-08 09:08:09'),(394,2,'sohyeon',-3.421875,13,'2022-02-08 09:18:09'),(395,2,'sohyeon',-3.4375,13,'2022-02-08 09:28:10'),(396,2,'sohyeon',-3.53125,13,'2022-02-08 09:38:10'),(397,2,'sohyeon',-3.421875,14,'2022-02-08 09:48:10'),(398,2,'sohyeon',-3.46875,14,'2022-02-08 09:58:11'),(399,2,'sohyeon',-3.5625,14,'2022-02-08 10:08:11'),(400,2,'sohyeon',20.984375,40,'2022-02-10 02:33:24'),(401,2,'sohyeon',21,40,'2022-02-10 02:43:25'),(402,2,'sohyeon',23.1875,40,'2022-02-10 02:53:25'),(403,2,'sohyeon',23.203125,40,'2022-02-10 03:03:26'),(404,2,'sohyeon',23.1875,40,'2022-02-10 03:13:26'),(405,2,'sohyeon',23.171875,39,'2022-02-10 03:23:27'),(406,2,'sohyeon',23.1875,40,'2022-02-10 03:33:29'),(407,2,'sohyeon',23.1875,40,'2022-02-10 03:43:34'),(408,2,'sohyeon',23.171875,40,'2022-02-10 03:53:34'),(409,2,'sohyeon',23.15625,40,'2022-02-10 04:03:35'),(410,2,'sohyeon',18,40,'2022-02-10 04:13:36'),(411,2,'sohyeon',25,40,'2022-02-10 04:23:36'),(412,2,'sohyeon',3.5,29,'2022-02-10 05:31:43'),(413,2,'sohyeon',3.515625,30,'2022-02-10 05:41:43'),(414,2,'sohyeon',-2.375,13,'2022-02-10 05:51:43'),(415,2,'sohyeon',-2.265625,13,'2022-02-10 06:01:43'),(416,2,'sohyeon',-2.359375,13,'2022-02-10 06:11:44'),(417,2,'sohyeon',-2.3125,13,'2022-02-10 06:21:44'),(418,9,'junga',61.875,45,'2022-02-10 06:31:17'),(419,9,'junga',61.765625,45,'2022-02-10 06:31:20'),(420,9,'junga',61.734375,45,'2022-02-10 06:31:22'),(421,9,'junga',61.796875,45,'2022-02-10 06:31:25'),(422,9,'junga',61.828125,45,'2022-02-10 06:31:27'),(423,9,'junga',62.046875,45,'2022-02-10 06:31:34'),(424,9,'junga',61.984375,45,'2022-02-10 06:31:36'),(425,9,'junga',61.859375,45,'2022-02-10 06:31:38'),(426,9,'junga',61.84375,45,'2022-02-10 06:31:40'),(427,2,'sohyeon',-2.375,13,'2022-02-10 06:31:44'),(428,2,'sohyeon',-2.296875,13,'2022-02-10 06:41:44'),(429,2,'sohyeon',-2.4375,13,'2022-02-10 06:51:44'),(430,2,'sohyeon',-2.4375,12,'2022-02-10 07:01:45'),(431,2,'sohyeon',-2.375,13,'2022-02-10 07:11:45'),(432,2,'sohyeon',10.640625,13,'2022-02-10 07:21:45'),(433,2,'sohyeon',10.578125,13,'2022-02-10 07:31:46'),(434,2,'sohyeon',10.59375,13,'2022-02-10 07:41:46'),(435,9,'junga',25,45,'2022-02-10 07:45:00'),(436,2,'sohyeon',10.5625,13,'2022-02-10 07:51:47'),(437,2,'sohyeon',10.546875,13,'2022-02-10 08:01:47'),(438,2,'sohyeon',10.59375,13,'2022-02-10 08:11:48'),(439,2,'sohyeon',10.578125,13,'2022-02-10 08:21:48'),(440,2,'sohyeon',10.546875,13,'2022-02-10 08:31:49'),(441,2,'sohyeon',10.578125,12,'2022-02-10 08:41:49'),(442,2,'sohyeon',10.625,12,'2022-02-10 08:51:50'),(443,2,'sohyeon',10.6875,13,'2022-02-10 09:01:50'),(444,2,'sohyeon',10.5625,13,'2022-02-10 09:11:50'),(445,2,'sohyeon',10.59375,13,'2022-02-10 09:21:51'),(446,2,'sohyeon',10.5625,13,'2022-02-10 09:31:51'),(447,2,'sohyeon',10.578125,12,'2022-02-10 09:41:51'),(448,2,'sohyeon',10.671875,12,'2022-02-10 09:51:52'),(449,2,'sohyeon',10.546875,13,'2022-02-10 10:01:52'),(450,9,'junga',10.09375,54,'2022-02-11 16:11:30'),(451,9,'junga',10.09375,54,'2022-02-11 16:11:40'),(452,9,'junga',10.046875,54,'2022-02-11 16:11:51'),(453,9,'junga',10.140625,54,'2022-02-11 16:12:01'),(454,9,'junga',10.078125,54,'2022-02-11 16:12:11'),(455,9,'junga',10.109375,54,'2022-02-11 16:12:22'),(456,9,'junga',10.09375,54,'2022-02-11 16:12:32'),(457,9,'junga',10.046875,54,'2022-02-11 16:12:42'),(458,9,'junga',10.109375,54,'2022-02-11 16:12:52'),(459,9,'junga',10.15625,54,'2022-02-11 16:13:03'),(460,9,'junga',10.140625,54,'2022-02-11 16:13:14'),(461,9,'junga',10.15625,54,'2022-02-11 16:13:24'),(462,9,'junga',10.15625,54,'2022-02-11 16:13:34'),(463,9,'junga',10.109375,54,'2022-02-11 16:17:01'),(464,9,'junga',10.09375,54,'2022-02-11 16:17:11'),(465,9,'junga',10.109375,54,'2022-02-11 16:17:21'),(466,9,'junga',10.09375,54,'2022-02-11 16:17:32'),(467,9,'junga',10.046875,54,'2022-02-11 16:17:42'),(468,9,'junga',10.1875,54,'2022-02-11 16:17:52'),(469,2,'sohyeon',25,45,'2022-02-13 14:23:48'),(470,2,'sohyeon',25.015625,45,'2022-02-13 14:33:49'),(471,2,'sohyeon',25,45,'2022-02-13 14:43:49'),(472,2,'sohyeon',24.96875,44,'2022-02-13 14:53:49'),(473,2,'sohyeon',24.984375,45,'2022-02-13 15:03:50'),(474,2,'sohyeon',25.015625,45,'2022-02-13 15:13:50'),(475,2,'sohyeon',24.96875,45,'2022-02-13 15:23:50'),(476,2,'sohyeon',25.015625,45,'2022-02-13 15:33:51'),(477,2,'sohyeon',25,45,'2022-02-13 15:43:52'),(478,2,'sohyeon',25.015625,45,'2022-02-13 15:53:53'),(479,2,'sohyeon',25.015625,45,'2022-02-13 16:03:54'),(480,2,'sohyeon',24.984375,45,'2022-02-13 16:13:55'),(482,2,'sohyeon',25.015625,45,'2022-02-14 11:24:13'),(483,2,'sohyeon',24.984375,45,'2022-02-14 13:21:23'),(484,2,'sohyeon',24.984375,45,'2022-02-14 15:26:24'),(485,2,'sohyeon',24.96875,45,'2022-02-14 15:36:35'),(486,2,'sohyeon',25,45,'2022-02-14 15:46:45'),(487,2,'sohyeon',24.984375,45,'2022-02-14 15:56:56'),(488,2,'sohyeon',25.015625,45,'2022-02-14 23:47:04'),(489,2,'sohyeon',25.015625,45,'2022-02-15 10:42:44'),(491,13,'jeanssowon',7.875,36,'2022-02-15 11:21:07'),(492,2,'sohyeon',24.984375,45,'2022-02-15 11:47:10'),(493,2,'sohyeon',25,45,'2022-02-15 11:53:47'),(494,9,'junga',24.984375,45,'2022-02-15 11:58:12'),(495,9,'junga',24.984375,45,'2022-02-15 12:04:33'),(496,9,'junga',24.984375,45,'2022-02-15 12:05:48'),(497,9,'junga',24.984375,45,'2022-02-15 12:13:54'),(498,9,'junga',25,45,'2022-02-15 12:17:03'),(499,9,'junga',24.984375,45,'2022-02-15 12:19:08'),(500,9,'junga',24.984375,45,'2022-02-15 12:21:13'),(501,9,'junga',24.984375,45,'2022-02-15 12:22:02'),(502,9,'junga',25.015625,45,'2022-02-15 13:38:11'),(503,9,'junga',25.015625,45,'2022-02-15 13:41:49'),(504,9,'junga',24.984375,45,'2022-02-15 15:33:40'),(505,9,'junga',24.984375,45,'2022-02-15 15:43:50'),(506,9,'junga',24.984375,45,'2022-02-15 16:04:11'),(507,9,'junga',25.015625,45,'2022-02-15 16:55:01'),(508,9,'junga',25,45,'2022-02-15 17:25:31'),(509,2,'sohyeon',24.984375,45,'2022-02-16 14:39:49'),(510,2,'sohyeon',-0.359375,45,'2022-02-16 14:43:28'),(511,2,'sohyeon',25.390625,45,'2022-02-16 14:46:06'),(512,2,'sohyeon',25.375,45,'2022-02-16 14:51:34'),(513,2,'sohyeon',25.390625,45,'2022-02-16 15:25:57'),(515,14,'user3',25.375,45,'2022-02-16 15:31:06'),(516,9,'junga',24.984375,45,'2022-02-16 15:52:14'),(517,9,'junga',25,45,'2022-02-16 16:11:33'),(518,9,'junga',24.96875,45,'2022-02-16 17:46:07'),(519,9,'junga',24.953125,45,'2022-02-16 17:50:26'),(520,9,'junga',24.984375,45,'2022-02-16 17:52:55'),(521,9,'junga',24.984375,45,'2022-02-17 10:16:25'),(522,9,'junga',25,45,'2022-02-17 10:18:06'),(523,9,'junga',18.25,44,'2022-02-17 10:43:19'),(524,9,'junga',18.296875,44,'2022-02-17 10:55:06'),(526,9,'junga',24.96875,45,'2022-02-17 11:36:23'),(527,9,'junga',25,45,'2022-02-17 11:41:40'),(528,9,'junga',25,45,'2022-02-17 11:45:45'),(529,9,'junga',24.984375,45,'2022-02-17 11:50:59'),(530,9,'junga',23.1,59,'2022-02-17 12:05:07'),(531,9,'junga',23.1,59,'2022-02-17 12:55:32'),(532,9,'junga',23.1,59,'2022-02-17 13:08:45'),(533,9,'junga',23.1,59,'2022-02-17 13:35:27'),(534,9,'junga',23.1,59,'2022-02-17 13:38:18'),(535,9,'junga',23.1,59,'2022-02-17 13:45:45'),(539,9,'junga',23.1,59,'2022-02-17 15:50:58');
/*!40000 ALTER TABLE `sensor_data_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `survey_t`
--

DROP TABLE IF EXISTS `survey_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `survey_t` (
  `survey_no` int NOT NULL AUTO_INCREMENT,
  `farm_no` int NOT NULL,
  `temperature` double DEFAULT NULL,
  `humidity` int DEFAULT NULL,
  `survey_result` int DEFAULT NULL,
  `survey_etc` varchar(50) DEFAULT NULL,
  `survey_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`survey_no`),
  KEY `fk_Survey_T_Survey_Image_T1_idx` (`survey_etc`),
  KEY `myfarmsurvey_idx` (`farm_no`),
  CONSTRAINT `myfarmsurvey` FOREIGN KEY (`farm_no`) REFERENCES `my_farm_t` (`farm_no`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `survey_t`
--

LOCK TABLES `survey_t` WRITE;
/*!40000 ALTER TABLE `survey_t` DISABLE KEYS */;
INSERT INTO `survey_t` VALUES (29,2,16,78,1,'안녕','2022-02-04 15:53:51'),(30,2,15,78,1,'살려줘','2022-02-04 16:30:54'),(32,2,25,45,1,'도망쳐','2022-02-04 17:13:11'),(34,2,24,45,0,'등록','2022-02-04 17:18:34'),(37,3,10,50,0,'test1','2022-02-08 04:19:32'),(38,3,15,50,0,'test2','2022-02-08 04:19:41'),(39,3,20,50,0,'test2','2022-02-08 04:19:43'),(40,3,20,10,0,'test2','2022-02-08 04:19:46'),(41,3,20,13,1,'tasdf','2022-02-08 04:19:52'),(42,3,26,100,1,'tasdf','2022-02-08 04:20:31'),(43,3,26,50,1,'asdkfjsdk','2022-02-08 04:20:42'),(44,3,10,50,1,'asdkfjsdk','2022-02-08 04:20:44'),(45,2,-3,13,2,'상태가 좋지 않다','2022-02-08 05:30:01'),(46,2,-4,13,2,'상태가 좋지 않다','2022-02-08 05:30:02'),(47,2,-5,13,2,'상태가 좋지 않다','2022-02-08 05:30:03'),(48,2,-2,10,2,'상태가 좋지 않다','2022-02-08 05:30:05'),(49,2,-4,5,2,'상태가 좋지 않다','2022-02-08 05:30:06'),(50,2,-3,14,2,'상태가 좋지 않다','2022-02-08 05:30:07'),(51,2,-3,20,2,'상태가 좋지 않다','2022-02-08 05:30:08'),(52,2,-1,15,2,'상태가 좋지 않다','2022-02-08 05:30:09'),(53,2,1,17,2,'상태가 좋지 않다','2022-02-08 05:30:10'),(54,2,3,19,2,'상태가 좋지 않다','2022-02-08 05:30:12'),(55,2,25,44,1,'상태가 보통이다','2022-02-10 02:23:47'),(56,2,20,33,1,'상태가 보통이다','2022-02-10 02:23:51'),(57,2,21,52,0,'상태가 좋다','2022-02-10 02:24:15'),(58,2,25,50,0,'상태가 좋다','2022-02-10 02:24:19'),(59,2,25,23,0,'상태가 좋다','2022-02-10 02:24:22'),(60,2,24,34,0,'상태가 좋다','2022-02-10 02:24:27'),(61,2,23,44,0,'상태가 좋다','2022-02-10 02:24:36'),(62,2,22,32,0,'상태가 좋다','2022-02-10 02:24:41'),(63,2,21,44,0,'상태가 좋다','2022-02-10 02:24:43'),(64,2,24,43,0,'상태가 좋다','2022-02-10 02:25:23'),(65,2,19,43,0,'상태가 좋다','2022-02-10 02:25:30'),(66,2,20,42,0,'상태가 좋다','2022-02-10 02:25:37'),(68,2,34,39,1,'너무 더워','2022-02-10 05:12:02'),(69,2,34,44,1,'너무 더워','2022-02-10 05:12:07'),(70,2,34,52,1,'너무 더워','2022-02-10 05:12:12'),(71,2,35,51,1,'너무 더워','2022-02-10 05:12:17'),(72,2,37,51,1,'너무 더워','2022-02-10 05:12:22'),(73,2,5,32,1,'쌀쌀','2022-02-10 05:12:48'),(74,2,5,32,1,'쌀쌀','2022-02-10 05:12:53'),(75,2,5,32,1,'쌀쌀','2022-02-10 05:12:58'),(76,2,5,32,1,'쌀쌀','2022-02-10 05:13:03'),(77,2,13,29,1,'쌀쌀','2022-02-10 05:13:14'),(81,9,15,62,0,'수박 모종을 샀다 ! 귀여워...','2021-04-17 06:13:20'),(82,9,17,62,0,'주말농장 신청해서 수박 모종올 옮겨심었다 아직 작지만 싱싱함','2021-04-24 04:20:20'),(83,9,14,64,1,'요즘 비가 안와서 그런지 땅이 건조하다 수박 모종이 약간 힘이 없어진 것 같다','2021-05-01 02:26:20'),(84,9,11,64,2,'봄이라서 옮겨심은건데 냉해가 와서 상태가 안좋다.....ㅜㅜ','2021-05-08 07:26:20'),(85,9,13,64,0,'처음에 샀던 모종은 냉해로 시들어버려서 새로 모종을 샀다 이번엔 따뜻해지면 옮겨심어야지','2021-05-15 02:11:11'),(86,9,16,63,0,'아직까지는 화분에서 싱싱하게 잘 자라고 있다 언제쯤 옮겨심지...','2021-05-22 07:11:11'),(87,9,18,62,0,'날씨가 제법 따듯해져서 옮겨심었다 이번엔 잘자라라...','2021-05-29 06:21:11'),(88,9,23,72,0,'오 뭔가 일주일만에 잎이 많아졌다. 쑥쑥 자라라!!','2021-06-05 05:41:11'),(89,9,23,74,1,'이번주는 땅이 건조해서 그런지 좀 시들해졌다. 물 듬뿍 주고 잎도 많길래 쫌 잘라냈다','2021-06-12 01:12:11'),(90,9,24,72,0,'쑥쑥 자라있다 저번에 물을 듬뿍 줘서 그런지 다시 싱싱하다','2021-06-19 05:12:11'),(91,9,26,74,1,'올 때마다 쑥쑥 자라있어서 좋은데 곁순인가? 그것도 많이 나있어서 많이 잘라내줬다','2021-06-26 06:25:11'),(92,9,25,75,0,'오 드디어 꽃봉오리가 나왔다!! 평일동안 꽃이 피려나..','2021-07-03 02:25:11'),(93,9,26,73,0,'꽃이 활짝 피어있다! 싱싱하기도한 걸 보니 이번엔 성공인가 ㅎㅎ','2021-07-08 05:25:11'),(94,9,24,74,1,'오잉.. 잎은 싱싱한데 꽃은 왜 다 시들어있다.. 수박이 안열린건가?','2021-07-17 02:25:11'),(95,9,27,76,0,'오! 꽃 하나 밑에 무엇인가 열매가 생긴 것 같다','2021-07-24 06:25:11'),(96,9,25,75,0,'수정 안해줘서 걱정했는데 운좋게 하나가 자라는 중이다','2021-07-31 01:55:11'),(97,9,28,73,0,'수박 수확할 생각에 벌써 기분좋네..저번보다 커진듯','2021-08-07 05:05:11'),(98,9,27.5,75,0,'가끔 비가 내려줘서 수박이 싱싱하게 자라고 있다','2021-08-14 01:05:41'),(99,9,29,79,0,'근데 수박 성장이 멈춘 것 같은 건 기분탓일까?..','2021-08-21 07:45:41'),(100,9,32,78,0,'수확하긴 했는데... 수박이 왜..멜론크기지?...','2021-08-28 06:12:41'),(102,2,25,45,0,'오늘의 날씨는 맑음! 화창한 날씨로 작물이 잘 자랄 것 같아요','2022-02-14 11:24:20'),(106,13,7,35,1,'날씨 나쁨 ㅠㅠ','2022-02-15 11:21:29'),(107,14,25,45,0,'','2022-02-16 15:31:00'),(108,14,25,45,1,'','2022-02-16 15:31:02'),(109,14,25,45,2,'','2022-02-16 15:31:04'),(110,14,25,45,2,'특이사항','2022-02-16 15:31:09'),(111,14,25,45,1,'특이사항','2022-02-16 15:31:11'),(112,14,25,45,0,'특이사항','2022-02-16 15:31:13'),(113,14,17,44,0,'특이사항','2022-02-16 15:31:22');
/*!40000 ALTER TABLE `survey_t` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_t`
--

DROP TABLE IF EXISTS `user_t`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_t` (
  `user_id` varchar(45) NOT NULL,
  `user_pw` varchar(255) DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `user_nickName` varchar(45) DEFAULT NULL,
  `user_email` varchar(45) DEFAULT NULL,
  `user_code` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_code_idx` (`user_code`),
  CONSTRAINT `user_code` FOREIGN KEY (`user_code`) REFERENCES `code_t` (`code_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_t`
--

LOCK TABLES `user_t` WRITE;
/*!40000 ALTER TABLE `user_t` DISABLE KEYS */;
INSERT INTO `user_t` VALUES ('admin','$2b$10$Mgo9kjGFOwQvVZWP7VI8c.OG.s8hiewxFU9WEXyyB.DMy.btTAL12','관리자','관리자','admin@ssukssuk.com','U04'),('apple','$2b$10$.Fr80mna19G7cIY0tCMkzu2I./QbiSM8wJU7XpZuHNzhs6BmYuoKW','김사과','사과같이예쁜나','wjddk@naver.com','U02'),('asdfasdf','$2b$10$4zpYxa73IUwepv7Qa83bGeDaYNRfFDG.Kiyx/ZF/flrq1qAAWYROq','이정아','관리자3','wjddk@naver.com','U04'),('dlehdwns','$2b$10$AtO0ZDnPKrUO1phy/H.el.tHSaTGofq52UENRF2yMJKXm.NTWYWhu','이동준','티끌모아파산','ehdwnsdl1210@gmail.com','U03'),('hanhs12','$2b$10$.gx/DDXCPIr6ronv0p9PDuzj2Kvcn2tfKjT5b9ZcWf.hg6ZW/QZha','한혜성','인천딸기농부','hanhs4544@gmail.com','U01'),('hanhs4544','$2b$10$lQQzpI1GbWJoVA8ymQo56uIZNZh.A4e0qnWAi6MdB9UBRIpq9tVKW','한애성','파농부','hanhs4544@hanmail.net','U02'),('hoho','$2b$10$R4MltMjYPKylCQlRXoKFlO3CErwimYEafmx3jdJOSyFr6U0CXED2u','서요셉','서호호셉','tjdytpq0310@gmail.com','U01'),('jeanssowon','$2b$10$To0Df2nNtPqL92XppvMQWeAwvbfnZnCiF8kwNyG7eqKDwVfcBl6..','최소원','채소좋아','sowonwow2@gmail.com','U03'),('junga','$2b$10$pc/qM1nRO5zhakVR22uMY.Vjj9tBRdZhXnxpAJ4Rfod7AkyfYhGyq','이정아','정아농장','wjddk7507@naver.com','U01'),('realfarmer','$2b$10$lQiHBEOx.dt4ewmW6T5V0uDzulXsLR.NK3eNfwP9Qq5TwoWCOk7qS','조득오','내가진짜농부','hanhs4544@naver.com','U02'),('sohyeon','$2b$10$ccpLbQy3mrPRvlxUPdqcnuk6OlXuejauLewISmwmSgXAPl7Z7sAXC','황소현','소현','t01081418141@naver.com','U03'),('ssukadmin','$2b$10$vv0j61errIhiTkcEZtlIOu5FYcRJQV9GRYW.mxSHqihn51YNgelSa','관리자','관리자','hanhs4544@naver.com','U02'),('user3','$2b$10$znsVWGcVgElgl1F8B3DAT.sjOASvQEIw7zIXMAsafpmikkWf7WiW.','김귀농','농부지망생','earnong@gmail.com','U01'),('xoem00','$2b$10$XX.NJBorjg6Tgo4Rvk2j.uCIhmeTwUwW9517SdEs7Ld9DHrUCdqfW','오윤택','땍택','xoem00@gmail.com','U03');
/*!40000 ALTER TABLE `user_t` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-17 15:55:40
