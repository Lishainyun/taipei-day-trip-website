from sqlalchemy import *
from dotenv import *
from flask import jsonify
from flask.ext.bcrypt import Bcrypt
from process_images import ImagesList
import sqlalchemy.pool as pool
import os, json, mysql.connector
# DB

load_dotenv("env.env")
dbUsername = os.getenv('MYSQL_USERNAME')
dbPassword = os.getenv('MYSQL_PASSWORD')

def getconn():
	
	c = mysql.connector.connect(
            
        host="localhost",
        user=dbUsername,
        password=dbPassword,
        database="taipei_day_trip_website"

    )
	return c

mypool = pool.QueuePool(getconn, max_overflow=10, pool_size=5)

class UserModel:
    def logIn(data):
        email = data["loginEmail"]
        password = data["loginPassword"]

        try:
            conn = mypool.connect()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(
                """
                SELECT email, password 
                FROM user
                WHERE email = %s
                """,(email,)
            )
            result = cursor.fetchall()

            emailList = []
            passwordList = []
            for i in range(len(result)):
                emailList.append(result[i]["email"])
                passwordList.append(result[i]["password"])
            
            if (email in emailList) and (emailList.index(email) == passwordList.index(password)):
                return jsonify({"ok":True}), 200
            else:
                return jsonify({"error":True,"message":"登入失敗，帳號或密碼錯誤或其他原因"}), 400  
        except:
            return jsonify({"error":True,"message":"伺服器內部錯誤"}), 500
        finally:
            cursor.close()
            conn.close() 

    def signUp(data,pw_hash):
        name = data["signupName"]
        email = data["signupEmail"]
        pw_hash = pw_hash
        
        try:
            conn = mypool.connect()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(
                """
                SELECT email 
                FROM user
                WHERE email = %s
                """,(email,)
            )
            result = cursor.fetchone()
        
            if result == None:
                cursor.execute(
                    """
                    INSERT INTO user (name, email, password)
                    VALUES (%s, %s, %s)
                    """, (name, email, password)
                )	
                conn.commit()
                return jsonify({"ok":True}), 200
            else:
                return jsonify({"error":True,"message":"註冊失敗，重複的 Email 或其他原因"}), 400
        except:
            return jsonify({"error":True,"message":"伺服器內部錯誤"}), 500
        finally:
            cursor.close()
            conn.close()

    def getInfo(email):
        email = email

        try:
            conn = mypool.connect()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(
                """
                SELECT id, name, email
                FROM user
                WHERE email = %s
                """,(email,)
            )
            result = cursor.fetchone()
            return jsonify({"data":result}), 200
        except:
            return jsonify({"data":None}), 500
        finally:
            cursor.close()
            conn.close()            


