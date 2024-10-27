async function enhancePrompt() {
    const inputPrompt = document.getElementById('inputPrompt').value;
    const aiType = document.getElementById('aiType').value;
    const enhancedPromptElement = document.getElementById('enhancedPrompt');

    enhancedPromptElement.textContent = 'Enhancing prompt...';

    try {
        const response = await fetch('/enhance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                prompt: inputPrompt,
                aiType: aiType 
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to enhance prompt');
        }

        const data = await response.json();
        enhancedPromptElement.textContent = data.enhanced_prompt;
    } catch (error) {
        console.error('Error:', error);
        enhancedPromptElement.textContent = 'An error occurred while enhancing the prompt.';
    }
}
