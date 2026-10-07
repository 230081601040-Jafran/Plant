import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, HelpCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function PlantDoctorChat({ plantResult }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! I'm FloraAI Assistant. I've reviewed your scan for **${plantResult.plantName}** (${plantResult.healthStatus === 'Healthy' ? 'Healthy Foliage' : plantResult.diseaseName}). Ask me any questions about treatment, watering, pruning, or organic sprays!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'How do I make the organic neem oil spray at home?',
    'Is this disease contagious to my other house plants?',
    'Should I prune all yellowing leaves immediately?',
    'What fertilizer helps recover from this infection?'
  ];

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || isTyping) return;

    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    const apiKey = localStorage.getItem('floravision_gemini_key');

    if (apiKey && apiKey.trim().length > 10) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `
        You are an expert botanical horticulturist and plant pathologist assistant.
        Context: The user scanned a plant identified as "${plantResult.plantName}" (${plantResult.scientificName}), diagnosed with "${plantResult.diseaseName}". Health status is ${plantResult.healthStatus}.
        User Question: "${text}"

        Give a clear, helpful, 2-3 paragraph practical advice answer tailored specifically for this plant species and disease context. Use bullet points where appropriate.
        `;

        const res = await model.generateContent(prompt);
        const replyText = res.response.text();
        setMessages([...newMessages, { sender: 'bot', text: replyText }]);
        setIsTyping(false);
        return;
      } catch (err) {
        console.warn('Gemini chat error, falling back to expert KB:', err);
      }
    }

    // Fallback expert system response generator
    setTimeout(() => {
      const replyText = generateBotAnswer(text, plantResult);
      setMessages([...newMessages, { sender: 'bot', text: replyText }]);
      setIsTyping(false);
    }, 800);
  };

  const generateBotAnswer = (q, plant) => {
    const query = q.toLowerCase();
    const isHealthy = plant.healthStatus === 'Healthy';

    if (query.includes('neem') || query.includes('spray') || query.includes('organic')) {
      return `To prepare an effective organic Neem Oil spray for **${plant.plantName}**:
1. Mix **1 to 2 teaspoons** of cold-pressed pure neem oil with **1 teaspoon of mild liquid dish soap** (acts as an emulsifier).
2. Dilute the mixture into **1 liter of lukewarm water** in a spray bottle.
3. Shake well and thoroughly spray both upper and under sides of leaves early in the morning or late evening to prevent leaf burn from direct sunlight.
4. Repeat every 7 to 10 days until all symptoms clear.`;
    }

    if (query.includes('contagious') || query.includes('spread') || query.includes('other plant')) {
      if (isHealthy) {
        return `Since your **${plant.plantName}** is healthy, it presents no contagious threat to neighboring plants!`;
      }
      return `Yes, **${plant.diseaseName}** has a **${plant.contagiousRisk}** contagious risk. Fungal and bacterial spores travel easily through air drafts, water splashes, or unsterilized pruning shears. 
      
We recommend isolating this plant at least 5 to 6 feet away from other foliage until treatments are complete. Always sanitize your garden tools with rubbing alcohol after trimming!`;
    }

    if (query.includes('prune') || query.includes('cut') || query.includes('trim')) {
      return `When dealing with **${plant.plantName}**:
- Only prune leaves that are more than 50% brown, yellowed, or covered in spores.
- Use sharp, disinfected pruners and make clean cuts at the stem base.
- Do NOT compost infected leaf trimmings; dispose of them in sealed trash bags to avoid spore dispersal.`;
    }

    if (query.includes('fertilizer') || query.includes('feed') || query.includes('recover')) {
      return `During active infection recovery:
- **Avoid high-nitrogen fertilizers**, as rapid soft growth can make the plant more vulnerable to pathogens.
- Apply a weak organic **kelp/seaweed extract** or **balanced 10-10-10 organic liquid fertilizer** once every 3-4 weeks.
- Ensure the soil drains freely before adding nutrients.`;
    }

    return `Great question regarding your **${plant.plantName}**! For optimal care with ${isHealthy ? 'healthy growth' : plant.diseaseName}, ensure it receives **${plant.careGuide.sunlight}** and follow a consistent watering schedule (**${plant.careGuide.water}**). Always monitor leaf undersides weekly for early warning signs!`;
  };

  return (
    <div className="chat-assistant-container">
      <div className="chat-header">
        <Bot className="bot-avatar" />
        <div>
          <h4>FloraAI Botanical Assistant</h4>
          <p>Asking about: <strong>{plantResult.plantName}</strong> ({plantResult.diseaseName})</p>
        </div>
      </div>

      <div className="chat-messages-scroll">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble-row ${msg.sender === 'user' ? 'row-user' : 'row-bot'}`}>
            <div className="avatar-icon">
              {msg.sender === 'user' ? <User /> : <Bot />}
            </div>
            <div className="chat-bubble">
              <div className="bubble-text">{msg.text}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chat-bubble-row row-bot">
            <div className="avatar-icon"><Bot /></div>
            <div className="chat-bubble typing-bubble">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="quick-prompts-wrapper">
        <span className="prompts-label"><Sparkles className="icon-inline" /> Suggested Questions:</span>
        <div className="prompts-scroll">
          {quickPrompts.map((prompt, i) => (
            <button 
              key={i} 
              className="quick-prompt-btn"
              onClick={() => handleSendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <form 
        className="chat-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input 
          type="text" 
          placeholder="Ask anything about your plant, treatments, or care routine..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" className="send-btn" disabled={!input.trim() || isTyping}>
          <Send className="send-icon" />
        </button>
      </form>
    </div>
  );
}
