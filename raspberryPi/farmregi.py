from PyQt5.QtWidgets import *
from PyQt5.uic import *
from PyQt5.QtCore import *
from PyQt5 import QtSql
import os, sys
import subprocess
import time

from survey import survey

class farmregi(QMainWindow):
    def __init__(self, dbConnect,user_id):
        super().__init__()
        loadUi("farmregi.ui",self)
        
        self.dbConnect=dbConnect
        self.user_id=user_id

    def setQuery(self):
        #farm_no, serial_no, farm_name, farm_text, farm_regidate, user_id
        serial_no = subprocess.check_output("cat /proc/cpuinfo |grep Serial|awk '{print $3}'", shell=True)
        serial_no= serial_no.decode('utf-8')
        print(serial_no)              
        
        farm_l = self.farm_line.text()
        farm_t = self.farm_text.toPlainText()
        
        if(farm_l== '' or farm_t == ''):
            self.msg = QMessageBox()
            self.msg.setText("Please fill in the blanks      ")
            self.msg.exec()
        
        self.dbConnect.farmRegi(self.user_id,serial_no,farm_l,farm_t,QDateTime().currentDateTime());

    def push(self):
        self.setQuery()
        self.close()
        
        farm_no=self.dbConnect.findFarm(self.user_id);
        
        self.survey=survey(self.dbConnect,self.user_id,farm_no)
        self.survey.show()
        

