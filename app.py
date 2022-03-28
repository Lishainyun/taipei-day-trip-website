from flask import *
from flask_cors import cross_origin
from flask_bcrypt import Bcrypt
from datetime import timedelta
from model.attraction import AttractionModel
from model.user import UserModel
import os

app=Flask(__name__, static_folder="static", static_url_path="/")
bcrypt = Bcrypt(app)
app.secret_key=os.getenv('SECRET_KEY')
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.config['JSON_SORT_KEYS'] = False
app.permanent_session_lifetime = timedelta(days=1)

#APIs
@app.route("/api/attractions", methods=["GET"])
@cross_origin()
def attractionSearchApi():
	
	page = request.args.get("page")
	keyword = request.args.get("keyword")
	
	if page and (keyword is None):
		p = page
		k = keyword
		result = AttractionModel.searchWithoutKeyword(p, k)
		return result

	elif page and keyword:
		p = page
		k = keyword
		result = AttractionModel.searchWithKeyword(p, k)
		return result

@app.route("/api/attraction/<attractionId>", methods=["GET"])
@cross_origin()
def attractionIdApi(attractionId):

	idsList = AttractionModel.getIdsList()

	if int(attractionId) in idsList:
		result = AttractionModel.inIdsList(attractionId)
		return result
	else:
		result = jsonify({"error":True,"message":"查無此景點"})
		return result, 400

@app.route("/api/user", methods=["GET","POST","PATCH","DELETE"])
@cross_origin()
def userAPIs():

	if request.method == 'POST':
		data = request.json
		pwHash = bcrypt.generate_password_hash(data['signupPassword']).decode('utf-8')
		result = UserModel.signUp(data,pwHash)
		return result
	
	elif request.method == 'PATCH':
		data = request.json
		result = UserModel.logIn(data)
		
		if result is None or bcrypt.check_password_hash(result, data['loginPassword']) == False: 
			return jsonify({"error":True,"message":"登入失敗，帳號或密碼錯誤"}), 400  
		elif bcrypt.check_password_hash(result, data['loginPassword']):
			session['Email'] = data['loginEmail']
			session.permanent = True
			return jsonify({"ok":True}), 200		
		else:
			return jsonify({"error":True,"message":"伺服器內部錯誤"}), 500

	elif request.method == 'GET':
		email = session['Email']
		result = UserModel.getInfo(email)
		return result
	
	else:
		session.clear()
		return jsonify({"ok":True})

@app.errorhandler(500)
def status500(error):
	r = jsonify({"error":True,"message":"伺服器內部錯誤"})
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
