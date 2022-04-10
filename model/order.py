from sqlalchemy import *
from dotenv import *
from flask import jsonify
from process_images import ImagesList
from datetime import *
import sqlalchemy.pool as pool
import os, json, mysql.connector, requests
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

class OrderModel:
    def postOrder(data,email):
        sessionEmail = email

        orderTime = datetime.now()
        orderId = "O" + orderTime.strftime("%Y%m%d%H%M%S")
        attrPrice = data["order"]["price"]
        attrName = data["order"]["trip"]["attraction"]["name"]
        date = data["order"]["trip"]["date"]
        time = data["order"]["trip"]["time"]
        contactName = data["order"]["contact"]["name"]
        contactEmail = data["order"]["contact"]["email"]
        phoneNums = data["order"]["contact"]["phone"]
        attractionId = data["order"]["trip"]["attraction"]["id"]

        if sessionEmail:
            try:
                conn = mypool.connect()
                cursor = conn.cursor(dictionary=True)
                cursor.execute(
                    """
                    INSERT INTO orders (order_time, order_id, status, price, name, date, time, contact_name, contact_email, contact_phone, attraction_id)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """, (orderTime,orderId,'1',attrPrice,attrName,date,time,contactName,contactEmail,phoneNums,attractionId)
                )	
                conn.commit()
            except:
                return jsonify({
                    "error":True,
                    "message":"訂單建立失敗，輸入不正確或其他原因"
                }), 400 
            finally:
                cursor.close()
                conn.close() 

            payByPrimeUrl =  "https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime"
            prime = data["prime"]
            headers = {
                "Content-Type": "application/json",
                "x-api-key": "partner_A3eYphu549gxbOFvO8GBkD8R5xi7B43k9EQtRrQe8ZTEOlzOPYk8JibK",
            }
            body = {
                "prime":prime,
                "partner_key":"partner_A3eYphu549gxbOFvO8GBkD8R5xi7B43k9EQtRrQe8ZTEOlzOPYk8JibK",
                "merchant_id":"yunnie123_TAISHIN",
                "details":"tapPay Test",
                "amount":attrPrice,
                "cardholder":{
                    "phone_number":phoneNums,
                    "name":contactName,
                    "email":contactEmail,
                },
            }

            response = requests.post(payByPrimeUrl, json=body, headers=headers, timeout=30)
            print(response.json())

            if response.json()['status'] == 0:
                conn = mypool.connect()
                cursor = conn.cursor(dictionary=True)
                cursor.execute(
                    """
                    UPDATE orders
                    SET status = %s
                    WHERE contact_name = %s
                    """, ('0',contactName,)
                )	

                cursor.execute(
                    """
                    SELECT id 
                    FROM user
                    WHERE email = %s
                    """, (sessionEmail,)
                )	
                result = cursor.fetchone()
                userId = result['id']

                cursor.execute(
                    """
                    DELETE FROM booking
                    WHERE user_id = %s
                    """, (userId,)
                )	

                conn.commit()
                cursor.close()
                conn.close()  

                return jsonify({
                    "data":{
                        "number":orderId,
                        "payment":{
                            "status":0,
                            "message":"付款成功"
                        }
                    }
                }), 200
            else:
                return jsonify({
                    "data":{
                        "number":orderId,
                        "payment":{
                            "status":1,
                            "message":"付款失敗"
                        }
                    }
                }), 200 
        else:
            return jsonify({
                "error":True,
                "message":"未登入系統，拒絕存取"
            }), 403

    def getOrder(orderNumber,email):
        orderNumber = orderNumber
        sessionEmail = email

        if sessionEmail:
            try:
                conn = mypool.connect()
                cursor = conn.cursor(dictionary=True)
                cursor.execute(
                    """
                    SELECT o.order_id, o.price, o.date, o.time, o.contact_name, o.contact_email, o.contact_phone, o.status, a.id, a.name, a.address FROM orders o
                    JOIN attraction a ON o.attraction_id = a.id
                    WHERE o.order_id = %s
                    """, (orderNumber,)
                )
                result = cursor.fetchone()
                attractionImage = ImagesList[result['id']-1][0]
                return jsonify({
                    "data":{
                        "number":result['order_id'],
                        "price":result['price'],
                        "trip":{
                            "attraction":{
                                "id":result['id'],
                                "name":result['name'],
                                "address":result['address'],
                                "image":attractionImage
                            },
                            "date":result['date'],
                            "time":result['time']
                        },
                        "contact":{
                            "name":result['contact_name'],
                            "email":result['contact_email'],
                            "phone":result['contact_phone']
                        },
                        "status":result['status']
                    }
                })
            except:
                return None
            finally:
                cursor.close()
                conn.close()
        else:
            return jsonify({
                "error":True,
                "message":"未登入系統，拒絕存取"
            }), 403


