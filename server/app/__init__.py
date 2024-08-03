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
    CORS(app)

    @app.route('/')
    def index():
        return "Hello, World!"

    @app.route("/get-audio", methods=["GET"])
    def get_audio():
        file = "C:\\Projects\\HackTheSixMusicProject\\server\\app\\say-short.mp3"
        return send_file(file, mimetype='audio/mpeg')

    @app.route('/separate, methods=["POST"]')
    def separate_audio():
        # check for file attribute in request object
        if "file" not in request.files:
            return jsonify({"error": "No file part"}), 400
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400
        if file:
            filepath = os.path.join("uploads", file.filename)
            file.save(filepath)

        mp = MusicProcessor()
        status, result = mp.separate(filepath)

        if not os.path.exists("temp"):
            os.makedirs("temp")
            print("Created temp directory")
        else:
            print("Temp directory already exists")

        for instrument, url in result.items():
            MusicProcessor.download(url, "temp", instrument + ".wav")
            print(f"Downloaded {instrument} to temp directory")

        if os.path.exists("temp"):
            shutil.rmtree("temp")
            print(f"Directory temp and its contents deleted")
        else:
            print(f"Directory temp does not exist")

        # zip_buffer = io.BytesIO()

        # with zipfile.ZipFile(zip_buffer, "w") as zip_file:
        #     for instrument, url in result.items():
        #         response = requests.get(url)
        #         zip_file.writestr(instrument, response.content)

    return app
