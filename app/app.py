from flask import Flask, request
import mysql.connector
app = Flask(__name__)


db = mysql.connector.connect(
    host="local_host",
    user="root",
    password="your_password",
    database="projects"
)

@app.route('/api/create_project', methods=['POST'])
def handle_user_data():
    data = request.json
    title = data['title']
    description = data['description']
    catagories = data['catagories']
    tech_stack = data['tech_stack']

    #check if all fields are filled out
    if not title or not description or not catagories or not tech_stack:
        return {'status': 'error', 'message': 'Please fill out all fields'}
    insert_query = "INSERT INTO projects (title, description, catagories, tech_stack, state) VALUES (%s, %s, %s, %s , 'open')"
    cursor = db.cursor()

    cursor.execute(insert_query, (title, description, catagories, tech_stack))
    db.commit()
    cursor.close()
    return {'status': 'success'}

@app.route('/api/create_user', methods=['POST'])
def handle_user_data():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']
    insert_query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
    cursor = db.cursor()
    cursor.execute(insert_query, (username, email, password))
    db.commit()
    cursor.close()
    return {'status': 'success'}

@app.route('/api/get_projects', methods=['GET'])
def get_projects():
    cursor = db.cursor()
    cursor.execute("SELECT * FROM projects")
    projects = cursor.fetchall()
    cursor.close()
    return {'status': 'success', 'projects': projects}

@app.route('/api/update-profile', methods=['POST'])
def update_profile():
    data = request.json
    username = data['username']
    skills = data['skills']
    bio = data['bio']
    if not username or not skills or not bio:
        return {'status': 'error', 'message': 'Please fill out all fields'}
    update_query = "UPDATE users SET username = %s, skills = %s, bio = %s WHERE username = %s"
    cursor = db.cursor()
    cursor.execute(update_query, (username, skills, bio, username))
    db.commit()
    cursor.close()
    return {'status': 'success'}

@app.route('/api/update-project', methods=['POST'])
def update_project():
    data = request.json
    projectName = data['projectName']
    projectDescription = data['projectDescription']
    projectType = data['projectType']
    #tech_stack = data['tech_stack']
    state = data['state']
    if not projectName or not projectDescription or not projectType or not state:
        return {'status': 'error', 'message': 'Please fill out all fields'}
    update_query = "UPDATE projects SET title = %s, description = %s, catagories = %s, tech_stack = %s, state = %s WHERE title = %s"
    cursor = db.cursor()
    cursor.execute(update_query, (projectName, projectDescription, projectType, tech_stack, state, projectName))
    db.commit()
    cursor.close()
    return {'status': 'success'}




    # Do something with the user's data (e.g., store it in a database)
