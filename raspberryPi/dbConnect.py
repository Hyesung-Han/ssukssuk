from PyQt5 import QtSql
import bcrypt

class dbConnect:
    def __init__(self):
        super().__init__()
        #self.dbInit()
        print("hi")
        
    def dbInit(self):
         self.db = QtSql.QSqlDatabase.addDatabase('QMYSQL')
         self.db.setHostName("i6a103.p.ssafy.io") 
         self.db.setDatabaseName("jeans")
         self.db.setUserName("ssukssuk")
         self.db.setPassword("cjdcnsdmsqkfhwlrma")
         ok = self.db.open()
         print(ok)
    
    def checkid(self, id_l):
        self.dbInit()
        
        self.query = QtSql.QSqlQuery();
        self.query.prepare("select user_id from user_t where user_id = :id")
        self.query.bindValue(":id", id_l)
        self.query.exec()
        
        if self.query.size()==0:
            return False;
        
        self.query.next()
        return True;
    
    def checkpw(self, id_l, pw_l):
        self.dbInit()
        
        self.query = QtSql.QSqlQuery();
        self.query.prepare("select user_pw from user_t where user_id = :id")
        self.query.bindValue(":id", id_l)
        self.query.exec()
        
        self.query.next()
        hashpw = self.query.value(0)

        pw_l = pw_l.encode('utf-8')
        hashpw = hashpw.encode('utf-8')
        
        result=bcrypt.checkpw(pw_l,hashpw)
        
        #print("기존:"+str(pw_l)+" 해쉬:"+str(hashpw))
        #print(result)
        
        return result
    
    def surveyRegi(self, farm_no, temp, humi, quality, etc_text, date):
        self.dbInit()
        
        self.query=QtSql.QSqlQuery("select * from survey_t")
        
        self.query.prepare("insert into jeans.survey_t(farm_no,temperature,humidity,survey_result,survey_etc, survey_date) VALUES(:farm_no, :temp, :humi, :survey_result, :survey_etc, :date)");
        self.query.bindValue(":farm_no",farm_no)
        self.query.bindValue(":temp",(int)(temp))
        self.query.bindValue(":humi",(int)(humi))
        self.query.bindValue(":survey_result",quality)
        self.query.bindValue(":survey_etc",etc_text)
        self.query.bindValue(":date",date)
        self.query.exec()
        
    def farmRegi(self,user_id,serial_no,farm_l,farm_t,time):
        self.dbInit()
        
        msg = "  Serial : " + str(serial_no) + "  user_id : " + str(user_id)+"  farm_name : " + str(farm_l) + "  farm_text : " + str(farm_t)
        #print(msg)
        
        self.query = QtSql.QSqlQuery();
        self.query.prepare("insert into my_farm_t (user_id, serial_no, farm_name, farm_regidate, farm_text) values (:user_id, :serial_no, :farm_name, :farm_regidate, :farm_text)")
        self.query.bindValue(":user_id", user_id)
        self.query.bindValue(":serial_no", serial_no)
        self.query.bindValue(":farm_name", farm_l)
        self.query.bindValue(":farm_regidate", time)
        self.query.bindValue(":farm_text", farm_t)        
        self.query.exec()
        
    def findFarm(self,user_id):
        self.dbInit()
        
        self.query=QtSql.QSqlQuery();
        
        self.query.prepare("select farm_no from jeans.my_farm_t where user_id=:user_id limit 1")
        self.query.bindValue(":user_id", user_id)
        self.query.exec()
        
        print(self.query.lastError().text())
        
        if self.query.size()==0:
            return -1
        else:
            self.query.next()
            farm_no = self.query.value(0)
            return farm_no;
    
    def saveSensorData(self,farm_no,user_id,temp,humidity,time):
        self.dbInit()
        
        msg = "  Temp : " + str(temp) + "  Humid : " + str(humidity)
        self.query = QtSql.QSqlQuery();
        self.query.prepare("insert into sensor_data_t (farm_no, user_id, temperature, humidity, sensor_date) values (:farm_no, :user_id, :temperature, :humidity, :sensor_date)");
        self.query.bindValue(":farm_no", farm_no)
        self.query.bindValue(":user_id", user_id)
        self.query.bindValue(":temperature", temp)
        self.query.bindValue(":humidity", humidity)
        self.query.bindValue(":sensor_date", time)
        self.query.exec()
        