import requests
import os
from dotenv import load_dotenv
from musicai_sdk import MusicAiClient
import time

from basic_pitch.inference import *
from basic_pitch import ICASSP_2022_MODEL_PATH
from basic_pitch.constants import AUDIO_SAMPLE_RATE, FFT_HOP
from music21 import converter, instrument, note, chord, stream, environment

import mido
import librosa

import pretty_midi
import json
import csv
import numpy as np
from pathlib import Path

load_dotenv()

MUSICAI_KEY = os.getenv("MUSICAI_KEY")
STEM_SEPARATION_WORKFLOW_ID = os.getenv("STEM_SEPARATION_WORKFLOW_ID")

STEM_SEPARATION_ENDPOINT = f"https://api.music.ai/api/job"
UPLOAD_URL_ENDPOINT = "https://api.music.ai/api/upload"


class MusicProcessor:
    def __init__(self, api_key=MUSICAI_KEY, stem_separation_workflow_id=STEM_SEPARATION_WORKFLOW_ID):
        self.api_key = api_key
        self.stem_separation_workflow_id = stem_separation_workflow_id
        self.client = MusicAiClient(api_key=api_key)

    def upload(self, file):
        response = self.client.upload_file(file)
        return response

    def create_job(self, job_name, workflow_id, params):
        job = self.client.create_job(job_name, workflow_id, params)
        return job

    def wait_for_job(self, job_id):
        job = self.client.wait_for_job_completion(job_id)
        return job

    def get_job_info(self, job_id):
        job = self.client.get_job(job_id)
        return job

    def separate(self, file):
        file_url = self.upload(file)
        job = self.create_job(
            "test-job", self.stem_separation_workflow_id, {
                "inputUrl": file_url}
        )
        job_id = job["id"]
        job_info = self.wait_for_job(job_id)

        return job_info["status"], job_info["result"]

    def download(self, url, output_dir, filename):
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            file_path = os.path.join(output_dir, filename)
            with open(file_path, 'wb') as file:
                for chunk in response.iter_content(chunk_size=8192):
                    file.write(chunk)
