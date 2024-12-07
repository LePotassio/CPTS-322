from __future__ import print_function
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
import flask_sqlalchemy as sqlalchemy
from sqlalchemy import func

import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db = sqlalchemy.SQLAlchemy(app)

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(150))
	password = db.Column(db.String(150))
	name = db.Column(db.String(150))
	lastname = db.Column(db.String(150))
	title = db.Column(db.String(150))
	wsuid = db.Column(db.String(150))
	phone = db.Column(db.String(150))
	major = db.Column(db.String(150),default="Computer Science")
	gpa = db.Column(db.Float,default=4.0)
	month = db.Column(db.Integer,default=5)
	year = db.Column(db.Integer,default=2020)
	served = db.Column(db.String(120),default="Yes")

	def __init__(self,username,password,name,lastname,title,wsuid,phone):
		self.username = username
		self.password = password
		self.name = name
		self.lastname = lastname
		self.title = title
		self.wsuid = wsuid
		self.phone = phone

base_url = '/api/'


@app.route(base_url + 'login', methods=['GET'])
def login():
	
	query = User.query.all()

	result = []
	for row in query:
		result.append(
			row_to_obj_users(row)
		)
	return jsonify({"status" : 1, "users": result}),200


@app.route(base_url + 'newuser',methods=['POST'])
def createAccount():

	data = request.get_json(force=True)
	newuser = User(data["username"],data["password"],data["name"],data["lastname"],data["title"],data["wsuid"],data["phone"])
	db.session.add(newuser)
	db.session.commit()
	db.session.refresh(newuser)

	return jsonify({"status":1,"user" : row_to_obj_users(newuser)}),200



def row_to_obj_users(row):
	myrow = {
			"id": row.id,
			"username": row.username,
			"password": row.password,
			"title": row.title,
			"name":row.name,
			"lastname":row.lastname,
			"wsuid":row.wsuid,
			"phone":row.phone,
			"major":row.major,
			"gpa":row.gpa,
			"month":row.month,
			"year":row.year,
			"served":row.served

		}
	return myrow


def main():
	db.create_all()
	app.run()

if __name__ == '__main__':
	app.debug = True
	main()







