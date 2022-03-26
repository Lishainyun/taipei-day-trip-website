from sqlalchemy import *
from dotenv import *
from flask import jsonify
import sqlalchemy.pool as pool
import os, json, mysql.connector
# DB

def getconn():
	
	c = mysql.connector.connect(
            
        host="localhost",
        user="yun",
        password="Ksm,xmc10kdKS)%&(KS,ks9",
        database="taipei_day_trip_website"

    )
	return c

mypool = pool.QueuePool(getconn, max_overflow=10, pool_size=5)
        
conn = mypool.connect()
cursor = conn.cursor(dictionary=True)

cursor.execute(
    """
    SELECT * 
    FROM user
    """
)

# l = []
# l2 = []
result = cursor.fetchone()

# for i in range(len(result)):
#     l.append(result[i]['name'])
#     l2.append(result[i]['email'])

print(result)