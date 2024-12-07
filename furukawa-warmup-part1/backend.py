from __future__ import print_function
import sys
from flask import Flask, jsonify, request
from flask_cors import CORS
import flask_sqlalchemy as sqlalchemy
from sqlalchemy import func

import datetime

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///profDB.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] =  False

db = sqlalchemy.SQLAlchemy(app)


class Professor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # FINISH ME (TASK 2): add all of the columns for the other table attributes


class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    prof_id = db.Column(db.String(255))    
    # FINISH ME (TASK 2): add all of the columns for the other table attributes



base_url = '/api/'

# loads all professors
# route parameters:
#     (optional) count : if count parameter is specified, limits the number of professorrs by count
#     (optional) order_by : if order_by is specified, orders the results by order_by
# Response format is JSON
@app.route(base_url + 'allprofs', methods=['GET'])
def getAllProfs():
    count = request.args.get('count', None)
    order_by = request.args.get('order_by', None)

    query = None # store the results of your query here 
    
    # FINISH ME (Task 3) : set the column which you are ordering on (if order_by parameter provided)
    
    # FINISH ME (Task 3) : limit the number of profesoors based on the count (if count parameter is provided)


    result = []
    for row in query:
        result.append(
            row_to_obj_prof(row)
        )

    return jsonify({"status": 1, "professors": result})

# createProf
# creates a professor 
# The routes response includes  the information of the new professor in the response
# Response format is JSON
# FINISH ME (Task 4) : Create the route for POST newprofessor


# addReview
# creates a review for the professor with the given id
# calculates and updates the new avarage rating for the professor after the new review is posted
# The route response includes both the review info and the updated professor info. 
# Response format is JSON
# FINISH ME (Task 5) : Create the route for POST addreview


# getreviews
# gets all reviews for the given professor
# route parameters:
#     profID :  filters the reviews based on the profID. If profID is not specified, the response will be empty. 
#     (optional) count : if count parameter is specified, limits the number of professorrs by count
#     (optional) order_by : if order_by is specified, orders the results by order_by
# Response format is JSON

# FINISH ME (Task 6) : Create the route for GET getreviews


# delete_professors
# delete given an id
@app.route(base_url + 'remove', methods=['DELETE'])
def delete_professors():
    myid = request.args.get('id', None)
    # FINISH ME (Task 7) : Complete the route for DELETE professor;
    # should first delete the reviews provided for the professor then the professor him/herself

    

def row_to_obj_prof(row):
    myrow = {
            "id": row.id,
            "name": row.name,
            "lastname": row.lastname,
            "affiliate": row.affiliate,
            "school": row.school,
            "overall_rating": row.overall_rating
        }
    return myrow

def row_to_obj_review(row):
    myrow = {
            "id": row.id,
            "prof_id": row.prof_id,
            "review_text": row.review_text,
            "rating": row.rating,
            "created_at": row.created_at
        }
    return myrow

def main():
    db.create_all()  # creates the tables you've provided
    app.run()        # runs the Flask application  

if __name__ == '__main__':
    app.debug = True
    main()
