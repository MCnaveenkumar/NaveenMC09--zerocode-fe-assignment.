import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { addMessage, setLoading, addToInputHistory } from '../redux/chatSlice';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
// If you see type errors for react-redux, run: npm install @types/react-redux
// If you see type errors for react-markdown, run: npm install @types/react-markdown

const Geminiscreen: React.FC = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const loading = useSelector((state: RootState) => state.chat.loading);
  const inputHistory = useSelector((state: RootState) => state.chat.inputHistory);
  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [promptTemplates, setPromptTemplates] = useState<string[]>(['Hello', 'How are you?', 'Tell me a joke']);

  // Responsive auto-scroll after DOM update
  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  // Handle input history navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      if (inputHistory.length === 0) return;
      setHistoryIndex((prev) => {
        const newIndex = prev === null ? inputHistory.length - 1 : Math.max(0, prev - 1);
        setInput(inputHistory[newIndex]);
        return newIndex;
      });
    } else if (e.key === 'ArrowDown') {
      if (inputHistory.length === 0) return;
      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const newIndex = Math.min(inputHistory.length - 1, prev + 1);
        setInput(inputHistory[newIndex] || '');
        return newIndex === inputHistory.length ? null : newIndex;
      });
    }
  };

  // Voice input using Web Speech API
  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.start();
      setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  };

  // Prompt templates
  const usePromptTemplate = (template: string) => {
    setInput(template);
  };

  // Chat export
  const exportChat = () => {
    const chatText = messages.map(msg => `${msg.sender}: ${msg.content}`).join('\n');
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-export.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Send message using Gemini API
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user' as const,
      content: input,
      timestamp: Date.now(),
    };
    dispatch(addMessage(userMsg));
    dispatch(addToInputHistory(input));
    setInput('');
    setHistoryIndex(null);
    dispatch(setLoading(true));
    setError(null);

    try {
      const apiKey = 'AIzaSyCZTymZOFKg6H6tmlvlMVhmrzaM0rQVPWU'; // Replace with your actual API key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      
      const requestData = {
        contents: [
          {
            parts: [
              {
                text: userMsg.content
              }
            ]
          }
        ]
      };

      const result = await axios.post(apiUrl, requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Extract the response text from the Gemini API response
      const responseText = result.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response text found';
      
      console.log('Gemini API Response:', responseText);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot' as const,
        content: responseText,
        timestamp: Date.now(),
      };
      dispatch(addMessage(botMsg));
    } catch (err) {
      console.error('Error calling Gemini API:', err);
      setError('Failed to get response from Gemini AI');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
        {messages.map((msg: { id: string; sender: 'user' | 'bot'; content: string }) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[90vw] sm:max-w-2xl break-words overflow-wrap break-word shadow whitespace-pre-line
                ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-300 dark:bg-gray-700 dark:text-white'}`}
              style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
            >
              {msg.sender === 'bot' ? (
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="mb-2 flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 animate-pulse text-gray-500 dark:text-gray-300">
              Bot is typing...
            </div>
          </div>
        )}
        {error && (
          <div className="mb-2 flex justify-start">
            <div className="px-4 py-2 rounded-lg bg-red-300 dark:bg-red-700 text-red-800 dark:text-red-200">
              {error}
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={startListening}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            disabled={loading || isListening}
          >
            {isListening ? 'Listening...' : 'Voice Input'}
          </button>
          <button
            onClick={exportChat}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Export Chat
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {promptTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => usePromptTemplate(template)}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {template}
            </button>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 rounded border dark:bg-gray-700 dark:text-white"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading || isListening}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            disabled={loading || isListening}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Geminiscreen;