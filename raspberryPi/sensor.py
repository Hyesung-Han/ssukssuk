from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
from PyQt5 import QtSql
import time
import atexit
import time

from sense_emu import SenseHat
from time import sleep

sense = SenseHat()

class pollingThread(QThread):
    def __init__(self,dbConnect, farm_no, user_id):
        super().__init__()
        
        self.farm_no=farm_no
        self.user_id=user_id
        self.dbConnect=dbConnect

    def run(self): 
        while True:
            #time.sleep(10)
            time.sleep(60*10)
            self.dbInit()
            self.setQuery()
            
    def dbInit(self):
        self.db = QtSql.QSqlDatabase.addDatabase('QMYSQL')
        self.db.setHostName("i6a103.p.ssafy.io")
        self.db.setDatabaseName("jeans")
        self.db.setUserName("ssukssuk")
        self.db.setPassword("cjdcnsdmsqkfhwlrma")
        ok = self.db.open()
        print(ok)

    def setQuery(self):
        temp = sense.get_temperature()
        humidity = sense.get_humidity()        
        
        msg = "  Temp : " + str(temp) + "  Humid : " + str(humidity)
        print(msg)
        self.query = QtSql.QSqlQuery();
        self.query.prepare("insert into sensor_data_t (farm_no, user_id, temperature, humidity, sensor_date) values (:farm_no, :user_id, :temperature, :humidity, :sensor_date)");
        time = QDateTime().currentDateTime()
        self.query.bindValue(":farm_no", self.farm_no)
        self.query.bindValue(":user_id", self.user_id)
        self.query.bindValue(":temperature", temp)
        self.query.bindValue(":humidity", humidity)
        self.query.bindValue(":sensor_date", time)
        self.query.exec()
