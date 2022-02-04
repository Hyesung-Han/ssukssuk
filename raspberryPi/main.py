from PyQt5.QtWidgets import *
from PyQt5.uic import *
from PyQt5.QtCore import *

from survey import survey
from login import login
from dbConnect import dbConnect

app = QApplication([])

class main(QMainWindow):
    def __init__(self):
        super().__init__()
        self.dbConnect=dbConnect()
        
        self.login=login(self.dbConnect)
        self.login.show()
        
        self.survey=survey(self.dbConnect)
        self.survey.show()
        

win = main()
app.exec()
