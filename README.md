# TuneScriber

TuneScriber is a web application that transforms music files into separate tracks and sheet music scores based on instrumentation. This powerful tool allows users to listen and analyze individual tracks, understand complex arrangements, and lower the barrier of entry for musical education and creation.

## Approach
The audio file is isolated into its individual components using Music.ai, separating the audio file into distinct vocal, bass, string, and other .wav files.
The .wav files are then fed into Basic Pitch to convert into MIDI files, allowing for easy editing and integration with other music production software.
The sheet music for the individual tracks are created using Mido, providing musicians with a visual representation of the music with traditional notation.
Whisper.ai is then used to generate lyrics using the isolated vocal audio file. Precise and reliable lyric transcriptions make editing and improving music much faster.

## Setup and usage
Cloning the repo and installing requirements
```
git clone https://github.com/julienliang2740/TuneScriber.git
cd TuneScriber
```
Set up back end
```
cd server
pip install -r requirements.txt
```
Run local host
```
cd ../client
npm install
npm start
```

Check out our devpost:
https://devpost.com/software/melodymapper
