from flask import Flask, request

app = Flask(__name__)

@app.route('/api/create_project', methods=['POST'])
def handle_user_data():
    data = request.json
    title = data['title']
    descrption = data['edescription']
    catagories = data['catagories']
    
    # Do something with the user's data (e.g., store it in a database)
    return {'status': 'success'}