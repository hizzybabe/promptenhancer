from flask import Flask, request, jsonify, send_from_directory
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()  # This line goes near the top of the file

app = Flask(__name__, static_url_path='/static', static_folder='static')

# Configure the Gemini API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/enhance', methods=['POST'])
def enhance_prompt():
    data = request.json
    input_prompt = data.get('prompt')
    ai_type = data.get('aiType', 'chatbot')
    word_count = data.get('wordCount', 100)
    language = data.get('language', 'en')

    if not input_prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        model = genai.GenerativeModel('gemini-pro')
        
        language_instruction = f"Provide the response in {language} language. "
        
        if ai_type == 'image':
            prompt_template = (
                f"{language_instruction}"
                "Enhance and improve the following prompt for AI image generation. "
                "Structure your response using the following format:\n\n"
                "# Main Prompt\n"
                "[Core prompt description]\n\n"
                "## Visual Details\n"
                "- [List key visual elements]\n\n"
                "## Style & Lighting\n"
                "- [List style and lighting specifications]\n\n"
                "## Composition\n"
                "- [List composition elements]\n\n"
                f"Provide a response of approximately {word_count} words for: {input_prompt}"
            )
        else:  # chatbot
            prompt_template = (
                f"{language_instruction}"
                "Enhance and improve the following prompt for a conversational AI chatbot. "
                "Structure your response using the following format:\n\n"
                "# Enhanced Prompt\n"
                "[Main prompt]\n\n"
                "## Context\n"
                "- [Key context points]\n\n"
                "## Specifications\n"
                "- [Important details]\n\n"
                f"Provide a response of approximately {word_count} words for: {input_prompt}"
            )

        response = model.generate_content(prompt_template)
        enhanced_prompt = response.text
        return jsonify({"enhanced_prompt": enhanced_prompt})
    except Exception as e:
        app.logger.error(f"Error in enhance_prompt: {str(e)}")
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)
