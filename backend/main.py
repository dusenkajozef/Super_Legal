from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os

# Load .env for your OpenAI API key
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = Flask(__name__, static_folder="../build", static_url_path="/")

# Add this line (more explicit)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

@app.route('/')
def serve(): return send_from_directory(app.static_folder, 'index.html')

@app.route('/chat', methods=['POST'])
def handle_chat():
    data = request.get_json()
    history = data.get('history', [])
    persona = data.get('persona')

    if not persona:
        return jsonify({'error': 'Missing \"persona\" field'}), 400

    # Define personality prompt
    if persona == 'angel':
        prompt = "You are a wise, peaceful, and uplifting angelic assistant. Be gentle and comforting in tone. Respond in Markdown and keep it under 100 words."
    elif persona == 'devil':
        prompt = "You are a clever, sarcastic, and mischievous devilish assistant. Be morally dubious, selfish, and witty. Respond in Markdown and keep it under 100 words."
    else:
        return jsonify({'error': 'Unknown persona'}), 400

    # Ensure history is a list of messages
    if not isinstance(history, list):
        return jsonify({'error': 'History must be a list of messages'}), 400

    # Construct messages array starting with the persona prompt
    messages = [{"role": "system", "content": prompt}]

    # Add history if it's not empty
    messages.extend(history)

    # If history is empty, return an error (or you could allow sending just the first message separately)
    if len(history) == 0:
        return jsonify({'error': 'Missing initial message in history'}), 400
    
    max_tokens=100 if len(messages) < 3 else 50
    print("max tokens is ---", max_tokens)
    try:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            max_tokens=max_tokens,
            temperature=0.7
        )
        return jsonify({'response': response.choices[0].message.content.strip()})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug=True)