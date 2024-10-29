async function enhancePrompt() {
    const inputPrompt = document.getElementById('inputPrompt').value;
    const aiType = document.getElementById('aiType').value;
    const wordCount = document.getElementById('wordCount').value;
    const language = document.getElementById('language').value;
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
                wordCount: parseInt(wordCount),
                language: language
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to enhance prompt');
        }

        const data = await response.json();
        enhancedPromptElement.innerHTML = marked.parse(data.enhanced_prompt);
    } catch (error) {
        console.error('Error:', error);
        enhancedPromptElement.innerHTML = '<span class="text-red-500">Error enhancing prompt</span>';
    }
}

// Dark mode handling
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    // Check for saved theme preference or use system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        }
    });
}

// Initialize dark mode when the page loads
document.addEventListener('DOMContentLoaded', initDarkMode);
