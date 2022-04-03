import os, mysql.connector
from dotenv import load_dotenv

load_dotenv("env.env")
dbUsername = os.getenv('MYSQL_USERNAME')
dbPassword = os.getenv('MYSQL_PASSWORD')

ImagesList = []

def imagesProcess():

    conn = mysql.connector.connect(
            
        host="localhost",
        user=dbUsername,
        password=dbPassword,
        database="taipei_day_trip_website"

    )

    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(name) FROM attraction")
    rowNums = cursor.fetchall()[0][0]
    cursor.close()

    cursor = conn.cursor()
    cursor.execute("SELECT images FROM attraction")
    oddImagesList = cursor.fetchall()
    cursor.close()

    for i in range(rowNums):
        r = oddImagesList[i][0].lower().split('jpg')
        rFiltered = list(filter(lambda x: x != "", r))
        addJPG = [x + 'jpg' for x in rFiltered if "mp3" not in x]
        revFLV = [x for x in addJPG if "flv" not in x]
        ImagesList.append(revFLV)

imagesProcess()