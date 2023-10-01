const axios = require('axios');

const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

async function testApi() {
    try {
        const response = await axios.post(apiUrl, {
            prompt: 'This is a test request.',
            max_tokens: 5,
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('API Response:', response.data.choices[0].text);
    } catch (error) {
        console.error('API Error:', error);
    }
}

// Call the testApi function to verify API access
testApi();
