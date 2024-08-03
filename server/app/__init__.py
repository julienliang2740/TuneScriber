from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os


from .music_processor import MusicProcessor


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/')
    def index():
        return "Hello, World!"

    # @app.route('/get-urls', methods=["GET"])
    # def get_upload_url():
    #     response = MusicProcessor.get_upload_url()
    #     return response.json()

    @app.route('/upload', methods=["GET"])
    def upload():
        upload_url, download_url = MusicProcessor.get_urls().values()

        response = MusicProcessor.upload(
            "C:\\Projects\\HackTheSixMusicProject\\server\\app\\say.mp3", upload_url)
        return response

        if "file" not in request.files:
            return jsonify({"error": "No file part"}), 400
        file = request.files["file"]
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400
        if file:
            response = MusicProcessor.upload(file, upload_url)
            return response.json()

    @app.route('/separate-audio, methods=["POST"]')
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

    return app
