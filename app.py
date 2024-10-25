from flask import Flask, request, jsonify
import google.generativeai as genai
import os

app = Flask(__name__)

# Configure the Gemini API
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/enhance', methods=['POST'])
def enhance_prompt():
    data = request.json
    input_prompt = data.get('prompt')

    if not input_prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        # Use Gemini API to enhance the prompt
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content(f"Enhance and improve the following prompt or description for an AI model: {input_prompt}")
        
        enhanced_prompt = response.text
        return jsonify({"enhanced_prompt": enhanced_prompt})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)