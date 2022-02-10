from PyQt5.QtWidgets import *
from PyQt5.uic import *
from PyQt5.QtCore import *
from PyQt5 import QtSql
from dbConnect import dbConnect

from sensor import pollingSensorThread
from sense_emu import SenseHat
from firebase import pollingCameraThread

class survey(QMainWindow):
    def __init__(self, dbConnect,user_id,farm_no):
        super().__init__()
        loadUi("survey.ui",self)
                 
        self.sensor=pollingSensorThread(farm_no,user_id)
        self.sensor.start()
        
        self.firebase = pollingCameraThread(farm_no, user_id)
        self.firebase.start()
        
        self.sense = SenseHat()
        # 버튼 연결
        self.cancel_btn.clicked.connect(self.onClickCancel)
        self.regi_btn.clicked.connect(self.onClickRegi)
        
        # farm_no
        self.farm_no=farm_no
        self.user_id=user_id
        
        # 품질의 디폴트는 상
        self.quality_good.setChecked(True)
        
        self.msg = QMessageBox()
        self.run()
        
        self.dbConnect=dbConnect
        
    def run(self):
        # 텍스트 포커스
        self.etc_text.setFocus()

        # 센서 데이터 값 변경
        self.getSensorData()
        self.temp_value.setText(str(self.temp)+"°C")
        self.humi_value.setText(str(self.humi)+"%")
        
    def getSensorData(self):
        self.temp=(int)(self.sense.get_temperature())
        self.humi=(int)(self.sense.get_humidity())

    def onClickCancel(self):
        print("갱신")
        self.run()
        
        self.msg.setText("온도/습도 데이터가 갱신 되었습니다      ")
        self.msg.exec()

    def onClickRegi(self):
        print("등록")

        quality=0;
        if self.quality_average.isChecked():
            quality=1;
        elif self.quality_bad.isChecked():
            quality=2;
        
        self.dbConnect.surveyRegi(self.farm_no, self.temp, self.humi, quality,self.etc_text.toPlainText(),QDateTime().currentDateTime())
        
        self.msg.setText("설문이 등록되었습니다      ")
        self.msg.exec()

#app = QApplication([])
#win = survey()
#win.show()
#app.exec()
