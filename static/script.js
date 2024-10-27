async function enhancePrompt() {
    const inputPrompt = document.getElementById('inputPrompt').value;
    const aiType = document.getElementById('aiType').value;
    const wordCount = document.getElementById('wordCount').value;
    const enhancedPromptElement = document.getElementById('enhancedPrompt');

    enhancedPromptElement.innerHTML = '<em>Enhancing prompt...</em>';

    try {
        const response = await fetch('/enhance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                prompt: inputPrompt,
                aiType: aiType,
                wordCount: parseInt(wordCount)
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to enhance prompt');
        }

        const data = await response.json();
        // Convert markdown to HTML (you'll need to add marked.js library)
        enhancedPromptElement.innerHTML = marked.parse(data.enhanced_prompt);
    } catch (error) {
        console.error('Error:', error);
        enhancedPromptElement.innerHTML = '<span class="text-red-500">Error enhancing prompt</span>';
    }
}
