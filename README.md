# Prompt Enhancer

Prompt Enhancer is a web application that uses the Gemini API to improve and enhance user-provided prompts or descriptions for AI models.

## Features

- Simple and intuitive user interface
- Real-time prompt enhancement using Gemini API
- Responsive design with Tailwind CSS

## Technologies Used

- Backend: Flask (Python)
- Frontend: HTML, JavaScript, Tailwind CSS
- AI: Google's Gemini API

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/prompt-enhancer.git
   cd prompt-enhancer
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

4. Run the application:
   ```
   python app.py
   ```

5. Open your browser and navigate to `http://localhost:5000`

## Usage

1. Enter your initial prompt or description in the text area.
2. Click the "Enhance Prompt" button.
3. Wait for the enhanced prompt to appear in the result section.

## Deployment

This application is ready to be deployed on Heroku. Make sure to set the `GEMINI_API_KEY` environment variable in your Heroku app settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
