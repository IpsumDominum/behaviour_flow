from flask import Flask, request

app = Flask(__name__)

@app.route('/endpoint', methods=['POST'])
def handle_post_request():
    data = request.get_json()
    # do something with the data
    return 'Received POST request'

if __name__ == '__main__':
    app.run(debug=True)