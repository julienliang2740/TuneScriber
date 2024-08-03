from basic_pitch.inference import *
from basic_pitch import ICASSP_2022_MODEL_PATH
from basic_pitch.constants import AUDIO_SAMPLE_RATE, FFT_HOP
from music21 import converter, instrument, note, chord, stream, environment

import librosa

import pretty_midi
import json
import csv
import numpy as np
import os
from pathlib import Path

def wav_to_midi(input_name, input_dir, output_dir):
    output_name_model = input_name.replace(".wav", ".npz")
    output_name_midi = input_name.replace(".wav", ".mid")
    output_name_csv = input_name.replace(".wav", ".csv")

    input_path = os.path.join(input_dir, input_name)
    os.makedirs(output_dir, exist_ok=True)

    model_output, midi_data, note_events = predict(input_path)

    output_path = os.path.join(output_dir, output_name_midi)
    with open(output_path, 'wb') as f:
        midi_data.write(f)

    # # Verify lengths
    # original_length = librosa.get_duration(filename=input_path)
    # model_output_length = model_output['note'].shape[0] / (AUDIO_SAMPLE_RATE / FFT_HOP)

    # print(f"Original audio length (in seconds): {original_length}")
    # print(f"Model output length (in seconds): {model_output_length}")

def midi_to_pdf(input_name, input_dir, output_dir, musescore_path):
    output_name_pdf = input_name.replace(".midi", ".pdf").replace(".mid", ".pdf")
    output_name_musicxml = input_name.replace(".midi", ".musicxml").replace(".mid", ".musicxml")

    midi_path = os.path.join(input_dir, input_name)
    output_path_musicxml = os.path.join(output_dir, output_name_musicxml)
    output_path_pdf = os.path.join(output_dir, output_name_pdf)

    os.makedirs(output_dir, exist_ok=True)

    # Set path to MuseScore
    us = environment.UserSettings()
    us['musicxmlPath'] = musescore_path

    # Debu print
    print(f"Checking for midi file at: {midi_path}")

    # Check if file exists
    if not os.path.exists(midi_path):
        raise FileNotFoundError(f"The file {midi_path} does not exist.")

    # Load midi file
    midi_data = converter.parse(midi_path)

    # Analyze midi file and get parts
    parts = instrument.partitionByInstrument(midi_data)

    # Create stream to hold parts
    score = stream.Score()

    # If multiple parts => add each part to  score
    if parts:  # if parts is not None
        for part in parts.parts:
            score.append(part)
    else:  # if no parts, just add the midi_data itself
        score.append(midi_data)


    score.write('musicxml', fp=output_path_musicxml)

    os.system(f"mscore3 {output_path_musicxml} -o {output_path_pdf}")

    print(f"MusicXML file saved to: {output_path_musicxml}")
    print(f"PDF file saved to: {output_path_pdf}")

def single_wav_conversion(input_name_no_filetype):
    input_name_wav = input_name_no_filetype + '.wav'
    input_name_midi = input_name_no_filetype + '.mid'
    wav_to_midi(input_name_wav, 'wav_files', 'midi_files')
    midi_to_pdf(input_name_midi, 'midi_files', 'pdf_files', '/usr/bin/mscore3')

if __name__ == "__main__":
    print("Testing module for conversion of individual .wav files")

    # wav_to_midi('xinzhengcheng_trumpet.wav', 'wav_files', 'midi_files')
    # midi_to_pdf('xinzhengcheng_trumpet.mid', 'midi_files', 'pdf_files', '/usr/bin/mscore3')
    
    single_wav_conversion('xinzhengcheng_trumpet')