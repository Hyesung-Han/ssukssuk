from PyQt5.QtWidgets import *
from PyQt5.uic import *
from PyQt5.QtCore import *
from PyQt5 import QtSql
import hashlib

from farmregi import farmregi
from survey import survey
from dbConnect import dbConnect

class login(QMainWindow):
    def __init__(self):
        super().__init__()
        loadUi("loginpage.ui",self)
        
        self.dbConnect=dbConnect()
    
    def get_hash(self,msg):
        h=hashlib.sha512()
        h.update(msg)
        h=h.hexdigest()
        print(h)
        return h
                
    def check(self):
        id_l = self.id_line.text()
        pw_l = self.pw_line.text()
        
        hv=self.get_hash(pw_l.encode())
        
        if self.dbConnect.checkid(id_l)==False or self.dbConnect.checkpw(id_l,hv)==False:
            self.msg = QMessageBox()
            self.msg.setText("Please check id/pw again      ")
            self.msg.exec()
        else:
            # 아이디랑 비밀번호가 맞으면
            # 기기등록창 아니면 로그인창 
            self.close()
            
            farm_no = self.dbConnect.findFarm(id_l)
            
            if farm_no==-1:
                self.farmregi=farmregi(self.dbConnect,id_l)
                self.farmregi.show()
            else:
                self.survey=survey(self.dbConnect,id_l,farm_no)
                self.survey.show()
                pass

app = QApplication([])
win = login()
win.show()
app.exec()
