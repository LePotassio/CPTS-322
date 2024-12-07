from __future__ import print_function
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
import flask_sqlalchemy as sqlalchemy
from sqlalchemy import func

import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///courses.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db = sqlalchemy.SQLAlchemy(app)

class Courses(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(150))
	professor = db.Column(db.String(150))
	major = db.Column(db.String(150))
	course_num = db.Column(db.Float)
	prof_id = db.Column(db.Integer)
	status = db.Column(db.String(150))
	info = db.Column(db.String(250))
	student_name = db.Column(db.String(250));
	student_id = db.Column(db.Integer)
	posted_at = db.Column(db.DateTime,default= datetime.datetime.utcnow)

	def __init__(self,name,professor,major,course_num,prof_id,status,info,student_name,student_id):
		self.name = name
		self.professor = professor
		self.major = major
		self.course_num = course_num
		self.prof_id = prof_id
		self.status = status
		self.info = info
		self.student_name = student_name
		self.student_id = student_id

base_url = '/api/'


def row_to_obj_courses(row):
	myrow = {
			"id": row.id,
			"name":row.name
			"professor":row.professor
			"major":row.major
			"course_num":row.course_num
			"prof_id":row.prof_id
			"status":row.status
			"info":row.status
			"student_name":row.student_name
			"student_id":row.student_id
			"posted_at":row.posted_at
		}
	return myrow


def main():
	db.create_all()
	app.run()

if __name__ == '__main__':
	app.debug = True
	main()
