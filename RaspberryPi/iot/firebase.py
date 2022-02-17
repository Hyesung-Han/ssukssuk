# _*_ coding: utf-8 _*_
from picamera import PiCamera
from time import sleep
import datetime
import sys, os
import requests
import firebase_admin
from firebase_admin import credentials
from firebase_admin import storage
from uuid import uuid4
#import schedule
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5 import QtSql
import time
 
PROJECT_ID = "jeans-ec286"
#my project id
 
cred = credentials.Certificate("/home/pi/jeans-ec286-firebase-adminsdk-szk7j-97c813abc5.json") #(키 이름 ) 부분에 본인의 키이름을 적어주세요.
default_app = firebase_admin.initialize_app(cred,{'storageBucket':f"{PROJECT_ID}.appspot.com"})
#버킷은 바이너리 객체의 상위 컨테이너이다. 버킷은 Storage에서 데이터를 보관하는 기본 컨테이너이다.
bucket = storage.bucket()#기본 버킷 사용


class pollingCameraThread(QThread):
    num=0
    filename=''
    def __init__(self,farm_no, user_id):
        super().__init__()
        
        print("hellow")
        print(user_id,farm_no)
        self.user_id=user_id
        self.farm_no = farm_no
    
    def dbInit(self):
        self.db = QtSql.QSqlDatabase.addDatabase('QMYSQL')
        self.db.setHostName("i6a103.p.ssafy.io")
        self.db.setDatabaseName("jeans")
        self.db.setUserName("ssukssuk")
        self.db.setPassword("cjdcnsdmsqkfhwlrma")
        ok = self.db.open()
        print(ok)  
        

    def run(self):
        #query run        
        while True:
            time.sleep(3)
            self.getQuery()
            if self.num == 1:
                self.execute_camera()
                self.setQuery()
           
    def fileUpload(self,file):
        blob = bucket.blob('image_store/'+file) #저장한 사진을 파이어베이스 storage의 image_store라는 이름의 디렉토리에 저장
        #new token and metadata 설정
        new_token = uuid4()
        metadata = {"firebaseStorageDownloadTokens": new_token} #access token이 필요하다.
        blob.metadata = metadata
     
        #upload file
        blob.upload_from_filename(filename='/home/pi/image_store/'+file, content_type='image/png') #파일이 저장된 주소와 이미지 형식(jpeg도 됨)
        #debugging hello
        print("hello ")
        print(blob.public_url)
 
    def execute_camera(self):
        
        #사진찍기
        #중복없는 파일명 만들기
        self.filename = "farm"+str(self.farm_no) + ".png"
        #suffix = datetime.datetime.now().strftime("%Y%m%d_%H%M%S") + '.png'
        #filename = "_".join([basename, suffix])
     
        camera = PiCamera()
        camera.resolution = (640, 480)
        camera.start_preview()
        #이미지에 텍스트를 새겨 넣자.
        camera.annotate_text = "jeans_ssukssuk" + datetime.datetime.now().strftime("%Y%m%d_%H:%M:%S")
        camera.annotate_text_size = 20
        sleep(1)
        #사진을 찍어서 저장한다. 파일의 중복되지 않도록 날짜시간을 넣어서 만듬
        camera.capture('/home/pi/image_store/' + self.filename)
        #사진 파일을 파이어베이스에 업로드 한다.
        self.fileUpload(self.filename)
        #로컬 하드의 사진을 삭제한다.
        camera.stop_preview()
        camera.close()
     
    #메모리 카드의 파일을 정리 해 주자.
    def clearAll(self):
        #제대로 할려면 용량 체크 하고 먼저 촬영된 이미지 부터 지워야 할것 같지만 여기선 폴더안에 파일을 몽땅 지우자.
        path = '/home/pi/image_store'
        os.system('rm -rf %s/*' % path)
        
        
    def setQuery(self):   
        
        msg = "insert" + self.filename
        print(msg)
        self.query = QtSql.QSqlQuery();
        self.query.prepare("update live_image_t set file_name =:file_name where farm_no= :farm_no");
        self.query.bindValue(":farm_no", self.farm_no)
        self.query.bindValue(":file_name", self.filename)
        self.query.exec()
        
        
    
    def getQuery(self):        
        #while True:
        #time.sleep(0.5)
        #print(self.farm_no)
        self.dbInit()
        self.query = QtSql.QSqlQuery();
        self.query.prepare("select farm_no from live_image_t where farm_no=:farm_no");
        self.query.bindValue(":farm_no", self.farm_no)
        self.query.exec()
        self.num = self.query.size()
        print(self.num)


        
             
#th = pollingCameraThread()
#th.start()

#app = QApplication([])

#infinity loop
#while True: 
#  pass
