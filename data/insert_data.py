import os, json, mysql.connector
from dotenv import load_dotenv

load_dotenv("../env.env")
dbUsername = os.getenv('MYSQL_USERNAME')
dbPassword = os.getenv('MYSQL_PASSWORD')

def getData():
    with open('taipei-attractions.json', 'r', encoding='utf-8') as jsonF:
        rawData = json.load(jsonF)
        return rawData['result']['results']
    

def insertData():

    data = getData()
    dataLength = len(data)
    dataList = []

    for i in range(dataLength):

        dataList.append((data[i]['stitle'], data[i]['CAT2'], data[i]['xbody'], data[i]['address'].replace(" ",""), data[i]['info'], data[i]['MRT'], data[i]['latitude'], data[i]['longitude'], data[i]['file']))

    try:

        con = mysql.connector.connect(
            
            host="localhost",
            user=dbUsername,
            password=dbPassword,
            database="taipei_day_trip_website"

        )

        cursor = con.cursor()

        sql ="INSERT INTO attraction (name, category, description, address, transport, mrt, latitude, longitude, images) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = dataList
        
        cursor.executemany(sql, val)

        con.commit()
        
    except:
        print("Insertion failed")
    
    finally:
        cursor.close()
        con.close()

insertData()