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

class AttractionModel:
    def searchWithoutKeyword(page,keyword):
        
        conn = mypool.connect()
        cursor = conn.cursor()
        
        offset = int(page) * 12
        nextPage = int(page) + 1

        cursor.execute(
            """
            SELECT id, name, category, description, address, transport, mrt, latitude, longitude, images 
            FROM attraction 
            LIMIT 13 OFFSET %s
            """, (offset,)
        )		
        result = cursor.fetchall()
        resultLength = len(result)

        finalData = []

        if resultLength >= 12:

            for i in range(12):
                rowHeaders = [x[0] for x in cursor.description]
                rowData = [x for x in list(result[i])]
                data = dict(zip(rowHeaders,rowData))
                finalData.append(data)

            for i in range(12):
                finalData[i]['images'] = ImagesList[i+finalData[0]['id']-1]
            cursor.close()
            conn.close()

        else:
            for i in range(resultLength):
                rowHeaders = [x[0] for x in cursor.description]
                rowData = [x for x in list(result[i])]
                data = dict(zip(rowHeaders,rowData))
                finalData.append(data)

            for i in range(resultLength):
                finalData[i]['images'] = ImagesList[i+finalData[0]['id']-1]
            cursor.close()
            conn.close()

        if result == []:
            r = jsonify({"error":True,"message":"無此頁面"})
            return r, 500
        elif resultLength < 12:
            r = jsonify({"nextPage":None, "data":finalData})
            return r, 200
        else:
            r = jsonify({"nextPage":nextPage, "data":finalData})
            return r, 200


    def searchWithKeyword(page,keyword):

        conn = mypool.connect()
        cursor = conn.cursor()

        finalData = []
        keyword = keyword
        offset = int(page) * 12
        nextPage = int(page) + 1

        cursor.execute(
            """
            SELECT id, name, category, description, address, transport, mrt, latitude, longitude, images 
            FROM attraction 
            WHERE name LIKE %s
            LIMIT 13 OFFSET %s
            """, ("%"+keyword+"%", offset,)
        )
        result = cursor.fetchall()
        resultLength = len(result) 

        if resultLength >= 12:
            for i in range(12):
                rowHeaders = [x[0] for x in cursor.description]
                rowData = [x for x in list(result[i])]
                data = dict(zip(rowHeaders,rowData))
                finalData.append(data)

            for i in range(12):
                finalData[i]['images'] = ImagesList[finalData[i]['id']-1]
            cursor.close()
            conn.close()
        
        else:
            for i in range(resultLength):
                rowHeaders = [x[0] for x in cursor.description]
                rowData = [x for x in list(result[i])]
                data = dict(zip(rowHeaders,rowData))
                finalData.append(data)

            for i in range(resultLength):
                finalData[i]['images'] = ImagesList[finalData[i]['id']-1]
            cursor.close()
            conn.close()
        
        if result == []:
            r = jsonify({"error":True,"message":"無此頁面"})
            return r, 500
        elif resultLength < 12:
            r = jsonify({"nextPage":None, "data":finalData})
            return r, 200
        else:
            r = jsonify({"nextPage":nextPage, "data":finalData})
            return r, 200

    def getIdsList():

        conn = mypool.connect()
        cursor = conn.cursor()

        cursor.execute("SELECT id FROM attraction")
        result = cursor.fetchall()

        idsList = []
        
        for i in range(len(result)):
            idsList.append(result[i][0])
        cursor.close()
        conn.close()
        return idsList

    def inIdsList(attractionId):

        conn = mypool.connect()
        cursor = conn.cursor()
        attractionId = attractionId

        cursor.execute(
            """
            SELECT id, name, category, description, address, transport, mrt, latitude, longitude, images 
            FROM attraction 
            WHERE id = %s
            """, (attractionId,)
        )
        result = cursor.fetchone()
        resultLength = len(result)
        
        rowHeaders = [x[0] for x in cursor.description]
        rowData = [x for x in result]
        data = dict(zip(rowHeaders,rowData))

        data['images'] = ImagesList[data['id']-1]
        cursor.close()
        conn.close()
        return jsonify({"data":data}), 200