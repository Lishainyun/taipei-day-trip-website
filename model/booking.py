from sqlalchemy import *
from dotenv import *
from flask import jsonify
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

class BookingModel:
    def postBooking(data):
        userId = data["userId"]
        attractionId = data["attractionId"]
        date = data["date"]
        time = data["time"]
        price = data["price"]

        try:
            conn = mypool.connect()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(
                """
                SELECT user_id FROM booking 
                WHERE user_id = %s 
                """, (userId,)
            )	
            result = cursor.fetchone()

            if not result and userId and attractionId and date and time and price:
                cursor.execute(
                    """
                    INSERT INTO booking (user_id, attraction_id, booking_date, time, price)
                    VALUES (%s, %s, %s, %s, %s)
                    """, (userId, attractionId, date, time, price)
                    )	
                conn.commit()
                return jsonify({"ok":True}), 200
            elif result != "" and userId and attractionId and date and time and price:
                cursor.execute(
                    """
                    UPDATE booking
                    SET attraction_id = %s, booking_date = %s, time = %s, price = %s
                    WHERE user_id = %s
                    """, (attractionId, date, time, price, userId,)
                    )	
                conn.commit()
                return jsonify({"ok":True}), 200
            elif not userId:
                return jsonify({"error":True,"message":"未登入系統，拒絕存取"}), 403
            else:
                return jsonify({"error":True,"message":"建立失敗，輸入不正確或其他原因"}), 400
        except:
            return jsonify({"error":True,"message":"建立失敗，輸入不正確或其他原因"}), 500
        finally:
            cursor.close()
            conn.close() 

    def getBooking(email):
        email = email 
        try:
            if email:
                conn = mypool.connect()
                cursor = conn.cursor(dictionary=True)
                cursor.execute(
                    """
                    SELECT u.email, a.id, a.name, a.address, b.booking_date, b.time, b.price FROM user u
                    JOIN booking b ON u.id = b.user_id
                    JOIN attraction a ON a.id = b.attraction_id
                    WHERE u.email = %s  
                    """,(email,)
                )
                result = cursor.fetchone()
                attractionImage = ImagesList[result['id']-1][0]

                date = result['booking_date'].strftime("%Y-%m-%d")
                time = ""
                if result['time'] == "上半天":
                    time = "forenoon"
                else:
                    time = "afternoon"

                return jsonify({"data":{"attraction":{
                    "id":result['id'],
                    "name":result['name'],
                    "address":result['address'],
                    "image":attractionImage
                }},"date":date,"time":time,"price":result['price']}), 200
            else:
                return jsonify({"error":True,"message":"未登入系統，拒絕存取"}), 403
        except:
            return jsonify({"data":None}), 500
        finally:
            cursor.close()
            conn.close()

    def deleteBooking(email):
        email = email 
        try:
            conn = mypool.connect()
            cursor = conn.cursor(dictionary=True)
            cursor.execute(
                """
                SELECT id FROM user
                WHERE email = %s
                """,(email,)
            )

            result = cursor.fetchone()
            userId = result['id']

            if email:
                cursor.execute(
                    """
                    DELETE FROM booking 
                    WHERE user_id = %s  
                    """,(userId,)
                )
                conn.commit()
                return jsonify({"ok":True})
            else:
                return jsonify({"error":True,"message":"未登入系統，拒絕存取"}), 403
        except:
            return jsonify({"data":None}), 500
        finally:
            cursor.close()
            conn.close()                 


