from flask import *
from sqlalchemy import *
from dotenv import *
from sqlalchemy import *
from process_images import ImagesList
import sqlalchemy.pool as pool
import os, json, mysql.connector

app=Flask(__name__, static_folder="static", static_url_path="/")
app.secret_key=os.getenv('SECRET_KEY')
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.config['JSON_SORT_KEYS'] = False

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


#apis
@app.route("/api/attractions", methods=["GET"])
def attractionSearchApi():
	
	page = request.args.get("page")
	keyword = request.args.get("keyword")
	finalData = []

	conn = mypool.connect()
	cursor = conn.cursor()

	if page and (keyword is None):
		offset = int(page) * 12
		nextPage = int(page) + 1

		cursor.execute(
			"""
			SELECT id, name, category, description, address, transport, mrt, latitude, longitude, images 
			FROM attraction 
			LIMIT 12 OFFSET %s
			""", (offset,)
		)		
		result = cursor.fetchall()
		resultLength = len(result)

		for i in range(resultLength):
			rowHeaders = [x[0] for x in cursor.description]
			rowData = [x for x in list(result[i])]
			data = dict(zip(rowHeaders,rowData))
			finalData.append(data)

		for i in range(resultLength):
			finalData[i]['images'] = ImagesList[i+finalData[0]['id']-1]

		if result == []:
			r = jsonify({"error":True,"message":"無此頁面"})
			return r, 500
		elif resultLength < 12:
			cursor.close()
			conn.close()
			r = jsonify({"nextPage":None, "data":finalData})
			return r, 200
		else:
			cursor.close()
			conn.close()
			r = jsonify({"nextPage":nextPage, "data":finalData})
			return r, 200

	elif page and keyword:
		offset = int(page) * 12
		nextPage = int(page) + 1

		cursor.execute(
			"""
			SELECT id, name, category, description, address, transport, mrt, latitude, longitude, images 
			FROM attraction 
			WHERE name LIKE %s
			LIMIT 12 OFFSET %s
			""", ("%"+keyword+"%", offset,)
		)
		result = cursor.fetchall()
		resultLength = len(result)

		for i in range(resultLength):
			rowHeaders = [x[0] for x in cursor.description]
			rowData = [x for x in list(result[i])]
			data = dict(zip(rowHeaders,rowData))
			finalData.append(data)

		for i in range(resultLength):
			finalData[i]['images'] = ImagesList[finalData[i]['id']-1]

		if result == []:
			r = jsonify({"error":True,"message":"無此頁面"})
			return r, 500
		elif resultLength < 12:
			cursor.close()
			conn.close()
			r = jsonify({"nextPage":None, "data":finalData})
			return r, 200
		else:
			cursor.close()
			conn.close()
			r = jsonify({"nextPage":nextPage, "data":finalData})
			return r, 200
	# else:
	# 	r = jsonify({"error":True,"message":"請輸入page參數"})
	# 	return r, 500

@app.route("/api/attraction/<attractionId>", methods=["GET"])
def attractionIdApi(attractionId):

	conn = mypool.connect()
	cursor = conn.cursor()

	cursor.execute("SELECT id FROM attraction")
	result = cursor.fetchall()
	idsList = []
	for i in range(len(result)):
		idsList.append(result[i][0])

	# finalData = []
	
	if int(attractionId) in idsList:
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
		# finalData.append(data)

		data['images'] = ImagesList[data['id']-1]

		conn = mypool.connect()
		cursor = conn.cursor()
		r = jsonify({"data":data})
		return r, 200

	else:
		conn = mypool.connect()
		cursor = conn.cursor()
		r = jsonify({"error":True,"message":"查無此景點"})
		return r, 400

@app.errorhandler(500)
def status500(error):
	r = jsonify({"error":True,"message":"伺服器內部錯誤，請依照規格書指示"})
	return r, 500

# Pages
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/attraction/<id>")
def attraction(id):
	return render_template("attraction.html")
@app.route("/booking")
def booking():
	return render_template("booking.html")
@app.route("/thankyou")
def thankyou():
	return render_template("thankyou.html")

app.run(host='0.0.0.0', port=3000)
