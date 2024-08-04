import whisper
import json

def get_lyrics(model_size, filename, expected_language):
    model = whisper.load_model(model_size, device="cuda")
    result = model.transcribe(filename)

    lyrics_array = []
    output_filename = filename.split('.')[0] + '_lyrics.json'

    if result['language'] != expected_language: # acronyms such as en, zh, de (english, chinese, german)
        lyrics_array.append("(could not get lyrics)")
    else:
        for line_dict in result['segments']:
            lyrics_array.append(line_dict['text'])
    
    return_dict = {"lyrics_array": lyrics_array}

    with open(output_filename, 'w') as outfile:
            json.dump(return_dict, outfile, indent=4)

if __name__ == '__main__':
    get_lyrics('medium', "taylorswift_youbelongwithme.mp3", 'en')