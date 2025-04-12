import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBotPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Kuriftu Hotel assistant. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatMessageContent = (content: string) => {
    // Replace asterisks with styled spans for emphasis
    let formattedContent = content
      .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-purple-800">$1</span>')
      .replace(/\*(.*?)\*/g, '<span class="font-semibold text-purple-700">$1</span>');

    // Convert newlines to line breaks
    formattedContent = formattedContent.replace(/\n/g, '<br />');

    // Format lists and numbered points
    if (formattedContent.includes('1.') || formattedContent.includes('•')) {
      const lines = formattedContent.split('<br />');
      const formattedLines = lines.map(line => {
        // Handle numbered lists
        if (/^\d+\./.test(line.trim())) {
          return `<div class="pl-4 my-1">${line}</div>`;
        }
        // Handle bullet points
        else if (line.trim().startsWith('•')) {
          return `<div class="pl-4 my-1">${line}</div>`;
        }
        return line;
      });
      formattedContent = formattedLines.join('<br />');
    }

    // Format Kuriftu locations with emphasis
    formattedContent = formattedContent.replace(
      /(Kuriftu (Resort|Hotel|Diplomat|location) [^,\.]*)/g, 
      '<span class="font-semibold text-purple-700">$1</span>'
    );

    // Format section headers that often appear in the booking instructions
    formattedContent = formattedContent.replace(
      /(\*\*[\w\s]+:\*\*)/g,
      '<span class="font-bold text-purple-800 block mt-2">$1</span>'
    );

    return formattedContent;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAJAzd9YJ3wi4lEXNMeY3AjRqGLLnqKUDM',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a helpful assistant for Kuriftu Hotel. A guest has asked: "${userMessage}". 
                Please provide a helpful response focusing on hotel services, bookings, amenities, and local attractions.
                
                IMPORTANT: Keep your response concise and limit it to about 100 words maximum. Focus on the most essential information.
                
                Use ** for important headers or categories, and * for emphasized text. Use bullet points or numbers for lists.
                For example, sections like **Accommodations:** or **Spa Treatments:** should be clearly marked.
                
                If the guest is asking a complex question that would normally require a longer answer, provide a brief overview
                and offer to provide more specific details if they ask follow-up questions.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      const botResponse = data.candidates[0].content.parts[0].text;
      
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again later or contact our support team.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.role === 'assistant' ? (
                  <Bot className="w-5 h-5 mt-1 text-purple-600 flex-shrink-0" />
                ) : (
                  <User className="w-5 h-5 mt-1 text-white flex-shrink-0" />
                )}
                <div 
                  className={`text-sm leading-relaxed ${message.role === 'user' ? '' : 'font-normal'}`}
                  dangerouslySetInnerHTML={
                    message.role === 'assistant' 
                      ? { __html: formatMessageContent(message.content) } 
                      : { __html: message.content }
                  }
                ></div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-purple-600" />
                <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBotPage; 