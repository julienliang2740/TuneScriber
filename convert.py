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
import os
from pathlib import Path


def change_instrument_mido(midi_file_path, new_instrument, output_file_path):
    mid = mido.MidiFile(midi_file_path)

    for track in mid.tracks:
        for i, msg in enumerate(track):
            if msg.type == 'program_change':
                track[i] = mido.Message('program_change', program=new_instrument)

    mid.save(output_file_path)

def wav_to_midi(input_name, input_dir, output_dir, new_instrument, is_drum=False):
    output_name_model = input_name.replace(".wav", ".npz")
    output_name_midi = input_name.replace(".wav", ".mid")
    output_name_csv = input_name.replace(".wav", ".csv")

    input_path = os.path.join(input_dir, input_name)
    os.makedirs(output_dir, exist_ok=True)

    if not is_drum:
        model_output, midi_data, note_events = predict(input_path)

        temp_midi_path = os.path.join(output_dir, 'temp_' + output_name_midi)
        with open(temp_midi_path, 'wb') as f:
            midi_data.write(f)

        output_path = os.path.join(output_dir, output_name_midi)
        change_instrument_mido(temp_midi_path, new_instrument, output_path)

        # REMOVE TEMP FILE
        # os.remove(temp_midi_path)
    elif is_drum:
        pass

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
    if not os.path.exists(midi_path):
        raise FileNotFoundError(f"The file {midi_path} does not exist.")

    midi_data = converter.parse(midi_path)
    parts = instrument.partitionByInstrument(midi_data)
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

def single_wav_conversion(input_name_no_filetype, wav_dir, midi_dir, pdf_dir, new_instrument, is_drum=False):
    input_name_wav = input_name_no_filetype + '.wav'
    input_name_midi = input_name_no_filetype + '.mid'
    wav_to_midi(input_name_wav, wav_dir, midi_dir, new_instrument, is_drum)
    midi_to_pdf(input_name_midi, midi_dir, pdf_dir, '/usr/bin/mscore3')

def batch_wav_conversion(wav_dir, midi_dir, pdf_dir):
    for file in os.listdir(wav_dir):
        input_name_wav = file
        input_name_midi = file.replace('.wav', '.mid')

        instrument_number = -1
        is_drum = False
        if file == 'bass':
            instrument_number = 32
        elif file == 'drums':
            instrument_number = 0  # Program change number is not used for drums, so it's set to 0
            is_drum = True
        elif file == 'guitar':
            instrument_number = 24
        elif file == 'keys':
            instrument_number = 0
        elif file == 'piano':
            instrument_number = 0
        elif file == 'strings':
            instrument_number = 48
        elif file == 'vocals':
            instrument_number = 52
        elif file == 'wind':
            instrument_number = 73
        else: # the 'other' file
            instrument_number = 0

        wav_to_midi(input_name_wav, wav_dir, midi_dir, instrument_number)
        midi_to_pdf(input_name_midi, midi_dir, pdf_dir, '/usr/bin/mscore3')

if __name__ == "__main__":
    print("Testing module for conversion of individual .wav files")

    # wav_to_midi('xinzhengcheng_trumpet.wav', 'wav_files', 'midi_files')
    # midi_to_pdf('xinzhengcheng_trumpet.mid', 'midi_files', 'pdf_files', '/usr/bin/mscore3')
    
    # single_wav_conversion('erika_trumpet', 'wav_files', 'midi_files', 'pdf_files', 57) # number corresponds to instrument in midi conversion system
    # batch_wav_conversion('redsun_wav', 'redsun_midi', 'redsun_pdf')
    single_wav_conversion('erika_trumpet', 'wav_files', 'midi_files', 'pdf_files', 57, False)