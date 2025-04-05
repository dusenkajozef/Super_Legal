import React, { useState } from 'react';

export default function ChatWithGPT() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse('');
    setLoading(true);

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer sk-UAh12MgOz-yUpDNfef71LsX_H3nrk80s1y-DvEDx97T3BlbkFJcdGR42qtpXxZhTMWnYtTF2debH5FUw25wpUUKfN9cA`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        stream: true,
      }),
    });

    if (!res.body) {
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);

      // Filter out irrelevant event messages
      const lines = chunk
        .split('\n')
        .filter(line => line.trim().startsWith('data:'))
        .map(line => line.replace('data: ', ''))
        .filter(line => line !== '[DONE]');

      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) setResponse(prev => prev + content);
        } catch (err) {
          console.error('Failed to parse line', line);
        }
      }
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block text-lg font-bold mb-2">Enter your prompt:</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-2"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Generating...' : 'Submit'}
        </button>
      </form>

      {response && (
        <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}
