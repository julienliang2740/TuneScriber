from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import zipfile
import io
import os
import shutil


from .music_processor import MusicProcessor


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

    UPLOAD_FOLDER = './uploads'
    ALLOWED_EXTENSIONS = {'mp3', "wav"}

    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000  # 16MB limit

    def allowed_file(filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    @app.route('/upload', methods=["POST"])
    def upload():

        file = request.files['file']
        print(file)

        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            # Ensure the upload folder exists
            os.makedirs(app.config['UPLOAD_FOLDER'])
            print(f"Created directory {app.config['UPLOAD_FOLDER']}")
        file.save(filepath)
        return jsonify({'message': 'File uploaded successfully'}), 200

        # if file.filename == '':
        #     print("no selected file")
        #     return jsonify({'error': 'No selected file'}), 400

        # if file and allowed_file(file.name):
        #     print("allowed")

        return "kms"

    @app.route('/')
    def index():
        return "Hello, World!"

    @app.route("/get-audio", methods=["GET"])
    def get_audio():
        file = "./say-short.mp3"
        return send_file(file, mimetype='audio/mpeg')

    @app.route('/separate', methods=["POST"])
    def separate_audio():
        if not os.path.exists("./processed"):
            os.makedirs("./processed")
            print("Created processed directory")
        else:
            print("Processed directory already exists")

        file = request.files['file']
        print(file)

        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            # Ensure the upload folder exists
            os.makedirs(app.config['UPLOAD_FOLDER'])
            print(f"Created directory {app.config['UPLOAD_FOLDER']}")
        file.save(filepath)

        mp = MusicProcessor()
        status, result = mp.separate(filepath)

        print(status, "separated")

        for instrument, url in result.items():
            mp.download(url, "./processed", instrument + ".wav")
            print(f"Downloaded {instrument} to processed directory")

        return jsonify(result), 200

        # if os.path.exists("temp"):
        #     shutil.rmtree("temp")
        #     print(f"Directory temp and its contents deleted")
        # else:
        #     print(f"Directory temp does not exist")

        # zip_buffer = io.BytesIO()

        # with zipfile.ZipFile(zip_buffer, "w") as zip_file:
        #     for instrument, url in result.items():
        #         response = requests.get(url)
        #         zip_file.writestr(instrument, response.content)

    return app
