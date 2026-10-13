import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Trash2, User, Clock, ArrowRight, CornerDownLeft, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ChatMessageItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  recommendations?: { name: string; link?: string; desc: string }[];
}

export const AIAssistantPage: React.FC = () => {
  const { showToast } = useApp();

  const suggestedPrompts = [
    'Plan a one-day trip to Madurai',
    'Find hidden places near Coimbatore',
    'Suggest a family trip within ₹5000',
    'Find famous food in Chennai',
    'Plan a three-day trip to Ooty',
    'Find sacred temples in Thanjavur',
  ];

  const initialMessages: ChatMessageItem[] = [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: 'Vanakkam! I am your TN Stories Travel Assistant. I can help you craft day itineraries, uncover secluded hill sanctuaries, locate traditional banana leaf mess joints, and recommend temple festivals across Tamil Nadu.',
      timestamp: 'Just now',
      suggestedFollowUps: [
        'Plan a one-day trip to Madurai',
        'Find famous food in Chennai',
        'Find hidden places near Coimbatore',
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMessageItem[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Simulated Knowledge Base Responses
  const getDemoReply = (query: string): { text: string; followUps: string[]; recs?: { name: string; desc: string }[] } => {
    const q = query.toLowerCase();

    if (q.includes('madurai') || q.includes('one-day') || q.includes('one day')) {
      return {
        text: `Here is a curated 1-Day Heritage Itinerary for Madurai:\n\n• 06:00 AM: Morning darshan at the magnificent Meenakshi Amman Temple while crowds are light. Visit the Hall of 1,000 Pillars.\n• 08:30 AM: Breakfast at Murugan Idli Shop (try soft Mallipoo idlis with 4 chutneys).\n• 10:30 AM: Explore Thirumalai Nayakkar Mahal with its massive stucco arches.\n• 01:30 PM: Traditional lunch at Amma Mess or Sri Sangeetha.\n• 04:30 PM: Visit Gandhi Memorial Museum & Teppakulam.\n• 07:30 PM: Sip authentic Famous Jigarthanda on East Marret Street followed by spicy Bun Parotta.`,
        followUps: ['Find hotels near Meenakshi Temple', 'What is the history of Jigarthanda?', 'Where to buy Sungudi sarees?'],
        recs: [
          { name: 'Meenakshi Temple', desc: 'Ancient Pandyan architectural marvel' },
          { name: 'Famous Jigarthanda', desc: 'Madurai’s iconic cooling royal dessert' },
        ],
      };
    }

    if (q.includes('coimbatore') || q.includes('hidden') || q.includes('valparai')) {
      return {
        text: `Hidden gems surrounding Coimbatore:\n\n1. Valparai & Anamalai: 40 scenic hairpin bends, tranquil tea plantations, and endangered Lion-tailed macaques.\n2. Siruvani Waterfalls & Dam: Home to the second tastiest natural mineral drinking water in the world.\n3. Topslip & Parambikulam: Elephant camps and guided deep jungle safaris.\n4. Kovaiputhoor Windmill Valley: Picturesque evening sunsets amidst Western Ghat winds.`,
        followUps: ['How to reach Valparai by bus?', 'Best season for Siruvani waterfalls', 'Where to stay in Pollachi?'],
        recs: [
          { name: 'Valparai Tea Valleys', desc: 'Lush mountain ghats without heavy crowds' },
        ],
      };
    }

    if (q.includes('5000') || q.includes('budget') || q.includes('family')) {
      return {
        text: `Recommended 2-Day Family Trip within ₹5,000:\n\n• Destination: Thanjavur & Kumbakonam Delta Circuit\n• Transit: Superfast Express Train from Chennai or Madurai (~₹350 per head).\n• Stay: Tamil Nadu Tourism (TTDC Hotel Tamil Nadu) or budget heritage lodge (~₹1,500/night).\n• Day 1: Brihadeeswarar Temple (Free entry), Thanjavur Maratha Palace Museum (₹50), traditional banana leaf lunch (₹150).\n• Day 2: Airavatesvara Temple in Darasuram and bronze artisan village in Swamimalai.\n• Total estimate for 2 adults: Approx ₹4,200 including local auto travel!`,
        followUps: ['Check trains to Thanjavur', 'List budget hotels in Kumbakonam', 'Famous dishes in Kaveri delta'],
      };
    }

    if (q.includes('food') || q.includes('chennai') || q.includes('eat')) {
      return {
        text: `Iconic Culinary Trail of Chennai:\n\n• Breakfast: Ghee Roast & Medu Vada with hot chicory filter coffee at Rayar’s Mess or Murugan Idli Shop, Mylapore.\n• Lunch: Seeraga Samba Biryani at Buhari (birthplace of Chicken 65) or Chettinad Meals at Anjappar.\n• Evening: Piping hot Sundal, spicy fish fry, and murukku sandwich at Marina Beach.\n• Night: Crispy podi dosa with shallot sambar at Ratna Cafe Triplicane.`,
        followUps: ['Best street food at Marina Beach', 'Top filter coffee spots in Chennai', 'Where to find authentic Pongal?'],
        recs: [
          { name: 'Rayar’s Mess', desc: 'Century-old Mylapore tiffin establishment' },
          { name: 'Marina Beach Food Stalls', desc: 'Evening seaside sundal and snacks' },
        ],
      };
    }

    if (q.includes('ooty') || q.includes('three-day') || q.includes('hills')) {
      return {
        text: `3-Day Classic Ooty & Nilgiris Escapade:\n\n• Day 1: Nilgiri Mountain Toy Train from Mettupalayam. Check in, evening stroll around Ooty Lake and Nahar Sidewalk cafe.\n• Day 2: Doddabetta Peak sunrise (2,637m), Highfield Tea Factory visit, and afternoon Botanical Garden tour.\n• Day 3: Excursion to Coonoor - Sims Park, Lambs Rock, and tea tasting at artisan plantations before descending.`,
        followUps: ['How to book Toy Train tickets?', 'Best homestays in Coonoor', 'What to pack for Ooty in winter?'],
      };
    }

    return {
      text: `Tamil Nadu has so much to discover! For ${query}, I recommend checking our verified destination database featuring the Great Living Chola Temples, misty Nilgiri tea estates, coastal Kanyakumari, and authentic Chettinad heritage mansions. Try asking about specific districts or travel budgets!`,
      followUps: [
        'Plan a one-day trip to Madurai',
        'Find hidden places near Coimbatore',
        'Suggest a family trip within ₹5000',
      ],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMessage: ChatMessageItem = {
      id: 'msg-user-' + Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const response = getDemoReply(query);
      const assistantMessage: ChatMessageItem = {
        id: 'msg-assistant-' + Date.now(),
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        suggestedFollowUps: response.followUps,
        recommendations: response.recs,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, assistantMessage]);
    }, 900);
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
    showToast('Conversation reset', 'info');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-5rem)] flex flex-col">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-800 text-amber-300 flex items-center justify-center font-bold shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 font-display">
              Your Personal Travel Assistant
            </h1>
            <p className="text-xs text-slate-500">
              Simulated demonstration assistant · Grounded in Tamil Nadu tourism data
            </p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Demonstration Disclosure Pill */}
      <div className="mt-3 p-2 px-3 bg-teal-50 border border-teal-200/80 rounded-xl text-[11px] text-teal-900 flex items-center gap-2 shrink-0">
        <ShieldCheck className="w-3.5 h-3.5 text-teal-700 shrink-0" />
        <span>Demonstration Mode: Instant curated responses for common itineraries. Ready for server-side Gemini integration.</span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-teal-800 text-amber-300'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-teal-800 text-white rounded-tr-xs'
                  : 'bg-white border border-slate-200/90 text-slate-800 rounded-tl-xs shadow-2xs'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Recommendations Card inside message */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-2">
                  <p className="text-[11px] font-bold text-teal-900 uppercase tracking-wider">Suggested Places</p>
                  {msg.recommendations.map((rec, i) => (
                    <div key={i} className="p-2 bg-slate-50 rounded-lg border border-slate-200/60">
                      <p className="font-bold text-slate-900 text-xs">{rec.name}</p>
                      <p className="text-[11px] text-slate-500">{rec.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Follow-up Prompts */}
              {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Suggested Next Queries:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.suggestedFollowUps.map((fu, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(fu)}
                        className="text-[11px] font-medium text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 px-2.5 py-1 rounded-lg transition-colors text-left"
                      >
                        {fu} →
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div
                className={`text-[10px] mt-2 text-right ${
                  msg.sender === 'user' ? 'text-teal-200' : 'text-slate-400'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-800 text-amber-300 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-500 shadow-2xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-700 animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-700 animate-pulse delay-150" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-700 animate-pulse delay-300" />
              <span className="ml-2 font-medium text-slate-600">Assistant is assembling recommendations...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Carousel */}
      <div className="py-2 overflow-x-auto scrollbar-none flex items-center gap-2 shrink-0">
        <span className="text-[11px] text-slate-400 font-semibold whitespace-nowrap">Try asking:</span>
        {suggestedPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(p)}
            className="text-xs text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded-lg whitespace-nowrap transition-colors"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="mt-2 relative flex items-center shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask anything about Tamil Nadu tourism, routes, food or itineraries..."
          className="w-full pl-4 pr-12 py-3 text-xs sm:text-sm bg-white rounded-2xl border border-slate-300 focus:outline-none focus:border-teal-700 shadow-sm"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="absolute right-2 p-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white disabled:opacity-40 transition-colors shadow-xs"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
