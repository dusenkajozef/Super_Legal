from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load .env for your OpenAI API key
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__)
CORS(app)  # 🔥 This enables CORS for all routes and origins, yep

def get_response(persona_prompt, user_message):
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                { "role": "system", "content": persona_prompt },
                { "role": "user", "content": user_message + "\n\nRespond in **Markdown** format and keep it under 100 words." }
            ],
            max_tokens=300,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"Error: {str(e)}"

@app.route('/angel', methods=['POST'])
def handle_angel():
    data = request.get_json()
    message = data.get('message')

    if not message:
        return jsonify({'error': 'Missing \"message\" field'}), 400

    angel_prompt = "You are a wise, peaceful, and uplifting angelic assistant. Be gentle and comforting in tone."
    reply = get_response(angel_prompt, message)
    return jsonify({'response': reply})

@app.route('/devil', methods=['POST'])
def handle_devil():
    data = request.get_json()
    message = data.get('message')

    if not message:
        return jsonify({'error': 'Missing \"message\" field'}), 400

    devil_prompt = "You are a clever, sarcastic, and mischievous devilish assistant. Be evil and recommend things that are obviously not legal, selfish, and morally dubious."
    reply = get_response(devil_prompt, message)
    return jsonify({'response': reply})

if __name__ == '__main__':
    app.run(debug=True)