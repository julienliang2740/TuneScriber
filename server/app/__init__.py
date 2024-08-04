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

        processed_files = {}

        for instrument, url in result.items():
            mp.download(url, "./processed", instrument + ".wav")
            processed_files[instrument] = instrument + ".wav"
            print(f"Downloaded {instrument} to processed directory")

        # processed_files = {
        #     "bass": "bass.wav",
        #     "drums": "drums.wav",
        #     "guitar": "guitar.wav",
        #     "keys": "keys.wav",
        #     "other": "other.wav",
        #     "piano": "piano.wav",
        #     "strings": "strings.wav",
        #     "vocals": "vocals.wav",
        #     "wind": "wind.wav"
        # }

        # zip
        memory_file = io.BytesIO()
        with zipfile.ZipFile(memory_file, 'w') as zf:
            for instrument, file in processed_files.items():
                zf.write(os.path.join("./processed", file), file)

        memory_file.seek(0)

        return send_file(path_or_file=memory_file, download_name='processed.zip', as_attachment=True)

    return app
