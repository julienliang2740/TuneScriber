import requests
import os
from dotenv import load_dotenv
from musicai_sdk import MusicAiClient
import time

load_dotenv()

MUSICAI_KEY = os.getenv("MUSICAI_KEY")
STEM_SEPARATION_WORKFLOW_ID = os.getenv("STEM_SEPARATION_WORKFLOW_ID")

STEM_SEPARATION_ENDPOINT = f"https://api.music.ai/api/job"
UPLOAD_URL_ENDPOINT = "https://api.music.ai/api/upload"


class MusicProcessor:
    client = MusicAiClient(api_key=MUSICAI_KEY)

    def __init__(self, api_key, stem_separation_workflow_id):
        self.api_key = api_key
        self.stem_separation_workflow_id = stem_separation_workflow_id

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
        job_status = self.wait_for_job(job_id)
        job_info = self.get_job_info(job_id)

        return job_status, job_info["result"]


mp = MusicProcessor(MUSICAI_KEY, STEM_SEPARATION_WORKFLOW_ID)
result = mp.separate(
    "C:\\Projects\\HackTheSixMusicProject\\server\\app\\say-short.mp3")
print(result)
