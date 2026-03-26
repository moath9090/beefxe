import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, User, UserRound, Phone, MapPin, Calendar, ClipboardList, CheckCircle2, MessageCircle } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import emailjs from '@emailjs/browser';
import chatDataRaw from './data/chatData.json';
import { ChatData, Message, Character, OrderFormData, RegistrationFormData } from './types';

const chatData = chatDataRaw as ChatData;

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState<string[]>([]);
  const [showRegBtn, setShowRegBtn] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    "أساس العمل في DXN",
    "ما هو المثلث الذهبي؟",
    "كيف أحصل على المنتجات؟",
    "كيف أسجل عضوية؟",
    "طريقة العمل معكم"
  ]);

  const TOP_TOPICS = [
    "أساس العمل في DXN",
    "ما هو المثلث الذهبي؟",
    "كيف أحصل على المنتجات؟",
    "كيف أسجل عضوية؟",
    "ما هي فوائد الاسبيرولينا؟",
    "طريقة العمل معكم",
    "أسعار المنتجات",
    "فروع العراق"
  ];
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCharacterSelect = (gender: 'male' | 'female') => {
    const char = chatData.characters[gender];
    setSelectedCharacter(char);
    
    const initialMessage: Message = {
      id: Date.now().toString(),
      text: char.greeting,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);

    // Add a second introductory message about DXN philosophy
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        const introMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: "يسعدني أن أعرفك على عالم DXN. نحن نؤمن أن 'الصحة هي الثروة الحقيقية'. أساس عملنا والنجاح معنا يبدأ بـ (الثقة)؛ أي أن تجرب المنتجات بنفسك، تلمس فوائدها الصحية، ثم تنقل هذه التجربة الصادقة للآخرين. هل تود التعرف على منتجاتنا الصحية أولاً أم ترغب في فهم طريقة العمل والربح معنا؟",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, introMsg]);
        setIsTyping(false);
        setQuickReplies(["التعرف على المنتجات", "طريقة العمل والربح", "عن شركة DXN", "فروع العراق"]);
      }, 2000);
    }, 1000);
  };

  const normalizeArabic = (text: string) => {
    return text
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/ئ/g, 'ي')
      .replace(/ؤ/g, 'و')
      .replace(/[\u064B-\u0652]/g, '') // Remove harakat
      .replace(/[^\u0621-\u064A\s]/g, ' ') // Replace non-Arabic characters with space
      .replace(/\s+/g, ' ')
      .trim();
  };

  const getSimilarity = (s1: string, s2: string) => {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    return (longer.length - editDistance(longer, shorter)) / longer.length;
  };

  const editDistance = (s1: string, s2: string) => {
    const costs = [];
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) costs[j] = j;
        else {
          if (j > 0) {
            let newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  };

  const findResponse = (text: string) => {
    const originalLower = text.toLowerCase().trim();
    const normalizedInput = normalizeArabic(originalLower);
    
    // 1. Check for business transition (Direct match on normalized)
    if (chatData.scenarios.business_transition.trigger_keywords.some(k => 
      normalizeArabic(k.toLowerCase()).includes(normalizedInput) || 
      normalizedInput.includes(normalizeArabic(k.toLowerCase()))
    )) {
      return {
        text: chatData.scenarios.business_transition.response,
        products: [],
        showRegistrationButton: true,
        whatsappLink: chatData.scenarios.support_whatsapp_link
      };
    }

    // 2. Knowledge base matching with scoring
    let bestMatch = null;
    let highestScore = 0;

    for (const item of chatData.knowledge_base) {
      let currentItemScore = 0;
      const itemKeywords = item.keywords.map(k => normalizeArabic(k.toLowerCase()));

      for (const keyword of itemKeywords) {
        // Exact normalized phrase match (Highest priority)
        if (normalizedInput === keyword) {
          currentItemScore = Math.max(currentItemScore, 100);
        }
        // Normalized inclusion
        else if (normalizedInput.includes(keyword) || keyword.includes(normalizedInput)) {
          const ratio = Math.min(normalizedInput.length, keyword.length) / Math.max(normalizedInput.length, keyword.length);
          // Higher score for longer keyword matches
          const lengthBonus = Math.min(keyword.length / 10, 1) * 10;
          currentItemScore = Math.max(currentItemScore, 85 * ratio + lengthBonus);
        }
        // Word-by-word fuzzy match
        else {
          const inputWords = normalizedInput.split(/\s+/).filter(w => w.length > 0);
          const keywordWords = keyword.split(/\s+/).filter(w => w.length > 0);
          
          let wordMatchCount = 0;
          for (const iWord of inputWords) {
            if (iWord.length < 3) continue;
            for (const kWord of keywordWords) {
              const sim = getSimilarity(iWord, kWord);
              if (sim > 0.82) { // Slightly lower threshold for fuzzy
                wordMatchCount += sim;
              }
            }
          }
          
          if (wordMatchCount > 0) {
            const fuzzyScore = (wordMatchCount / Math.max(inputWords.length, keywordWords.length)) * 75;
            currentItemScore = Math.max(currentItemScore, fuzzyScore);
          }
        }
      }

      // Boost score if the category name is mentioned
      const normalizedCategory = normalizeArabic(item.category.toLowerCase());
      if (normalizedInput.includes(normalizedCategory)) {
        currentItemScore += 20; // Increased boost
      }

      if (currentItemScore > highestScore) {
        highestScore = currentItemScore;
        bestMatch = item;
      }
    }

    // Threshold for a valid match
    if (bestMatch && highestScore >= 50) { // Increased threshold slightly
      // If it's a very strong match, return directly
      if (highestScore > 85) {
        return {
          text: bestMatch.response,
          products: bestMatch.products,
          showRegistrationButton: bestMatch.show_registration_button || false,
          whatsappLink: bestMatch.whatsapp_group_link || null
        };
      }
      
      // If it's a moderate match, ask if they meant this category
      return {
        text: `هل تقصد ${bestMatch.category}؟ إليك بعض المعلومات: ${bestMatch.response}`,
        products: bestMatch.products,
        showRegistrationButton: bestMatch.show_registration_button || false,
        whatsappLink: bestMatch.whatsapp_group_link || null
      };
    }

    // 3. Default response
    return {
      text: "هل يمكنك شرح المزيد أو تواصل مع الدعم للحصول على إجابة وافية",
      products: [],
      showRegistrationButton: false,
      whatsappLink: chatData.scenarios.support_whatsapp_link
    };
  };

  const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
    e?.preventDefault();
    const textToSend = overrideText || inputText;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overrideText) setInputText('');
    setIsTyping(true);
    setShowRegBtn(false);
    setWhatsappLink(null);

    // Update quick replies based on context
    if (textToSend.includes('سجل') || textToSend.includes('عضوية')) {
      setQuickReplies(["مميزات العضوية", "كيف أطلب المنتجات؟", "أساس العمل في DXN", "طريقة العمل معكم"]);
    } else if (textToSend.includes('منتج') || textToSend.includes('ماهي') || textToSend.includes('فوائد')) {
      setQuickReplies(["أسعار المنتجات", "كيفية الاستخدام", "أساس العمل في DXN", "كيف أحصل على المنتجات؟"]);
    } else if (textToSend.includes('عمل') || textToSend.includes('شغل') || textToSend.includes('ربح')) {
      setQuickReplies(["أساس العمل في DXN", "كيف أسجل عضوية؟", "مميزات العضوية", "الخطة المالية"]);
    }

    // Simulate typing delay
    setTimeout(() => {
      const response = findResponse(textToSend);
      
      // If default response, suggest top topics
      if (response.text.includes("هل يمكنك شرح المزيد")) {
        setQuickReplies(TOP_TOPICS.slice(0, 5));
      } else {
        // If we found a match, suggest related next steps
        if (response.products.length > 0) {
          setQuickReplies(["أساس العمل في DXN", "كيف أطلب المنتجات؟", "أسعار المنتجات", "كيف أسجل عضوية؟"]);
        } else if (response.showRegistrationButton) {
          setQuickReplies(["أساس العمل في DXN", "مميزات العضوية", "طريقة العمل معكم", "كيف أطلب المنتجات؟"]);
        }
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date()
      };
      
      if (response.products.length > 0) {
        setSuggestedProducts(prev => Array.from(new Set([...prev, ...response.products])));
      }

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      if (response.showRegistrationButton) {
        setShowRegBtn(true);
      }
      if (response.whatsappLink) {
        setWhatsappLink(response.whatsappLink);
      }
    }, 1500);
  };

  const handleOrderSubmit = async (formData: OrderFormData) => {
    try {
      // In a real app, you'd use your actual EmailJS service/template IDs
      // For now, we'll simulate the success
      console.log('Sending email via EmailJS...', formData);
      
       emailjs.send(
  'service_x5b588t',
  'template_fp5s8az',
  formData as unknown as Record<string, unknown>,
  'fBtjEMu8f1TbeAsuE'
);
      
      setOrderSubmitted(true);
      setTimeout(() => {
        setShowOrderForm(false);
        setOrderSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending order:', error);
    }
  };

  const handleRegistrationSubmit = async (formData: RegistrationFormData) => {
    try {
      console.log('Sending registration via EmailJS...', formData);
        emailjs.send(
  'service_x5b588t',
  'template_aqxqsvx',
  formData as unknown as Record<string, unknown>,
  'fBtjEMu8f1TbeAsuE'
);
      
      setRegistrationSubmitted(true);
      setTimeout(() => {
        setShowRegistrationForm(false);
        setRegistrationSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Error sending registration:', error);
    }
  };

  if (!selectedCharacter) {
    return (
      <div className="min-h-screen bg-[#F0F2F5] flex flex-col items-center justify-center p-4 font-sans" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">مرحباً بك في DXN</h1>
          <p className="text-gray-600 mb-8 text-lg">اختر الشخصية التي تود التحدث معها لبدء رحلتك الصحية</p>
          
          <div className="grid grid-cols-2 gap-6">
            <button 
              onClick={() => handleCharacterSelect('male')}
              className="flex flex-col items-center p-6 rounded-2xl border-2 border-transparent hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img src={chatData.characters.male.avatar} alt="Male" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-gray-700">{chatData.characters.male.name}</span>
              <span className="text-sm text-gray-500">رائد اعمال</span>
            </button>

            <button 
              onClick={() => handleCharacterSelect('female')}
              className="flex flex-col items-center p-6 rounded-2xl border-2 border-transparent hover:border-pink-500 hover:bg-pink-50 transition-all group"
            >
              <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform overflow-hidden">
                <img src={chatData.characters.female.avatar} alt="Female" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-gray-700">{chatData.characters.female.name}</span>
              <span className="text-sm text-gray-500">رائدة اعمال</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img src={selectedCharacter.avatar} alt={selectedCharacter.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 leading-tight">{selectedCharacter.name}</h2>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-xs text-gray-500">نشط الآن</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedCharacter(null)}
            className="text-sm text-blue-600 font-medium hover:underline"
          >
            تغيير الشخصية
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl mx-auto w-full">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className={cn(
                "flex w-full",
                msg.sender === 'user' ? "justify-start" : "justify-end"
              )}
            >
              <div className={cn(
                "max-w-[85%] px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed shadow-sm",
                msg.sender === 'user' 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "bg-white text-gray-800 rounded-tl-none border border-gray-100"
              )}>
                {msg.text}
                <div className={cn(
                  "text-[10px] mt-1 opacity-70",
                  msg.sender === 'user' ? "text-left" : "text-right"
                )}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-end"
            >
              <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      {/* Action Area */}
      <div className="bg-white border-t border-gray-200 p-4 sticky bottom-0">
        <div className="mb-4 flex flex-wrap gap-2 justify-center">
          {suggestedProducts.length > 0 && (
            <button 
              onClick={() => setShowOrderForm(true)}
              className="bg-green-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-green-700 transition-all flex items-center gap-2"
            >
              <ClipboardList size={20} />
              طلب المنتجات المقترحة
            </button>
          )}
          
          {(showRegBtn || whatsappLink) && (
            <div className="flex flex-wrap gap-2">
              {showRegBtn && (
                <button 
                  onClick={() => setShowRegistrationForm(true)}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                  <UserRound size={20} />
                  فتح حساب عضوية جديد
                </button>
              )}
              {whatsappLink && (
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-green-600 transition-all flex items-center gap-2"
                >
                  <MessageCircle size={20} />
                  جروب دعم واتساب
                </a>
              )}
            </div>
          )}
        </div>
        
        {/* Quick Replies */}
        <div className="max-w-3xl mx-auto mb-4 flex flex-wrap gap-2 justify-center">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(undefined, reply)}
              className="bg-white/80 backdrop-blur-sm border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-50 hover:border-blue-200 transition-all shadow-sm whitespace-nowrap"
            >
              {reply}
            </button>
          ))}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2 max-w-3xl mx-auto">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 bg-gray-100 border-none rounded-full px-5 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm"
          >
            <Send size={20} className="rotate-180" />
          </button>
        </form>
      </div>

      {/* Order Form Modal */}
      <AnimatePresence>
        {showOrderForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="bg-green-600 p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <ClipboardList />
                  نموذج طلب المنتجات
                </h3>
                <button onClick={() => setShowOrderForm(false)} className="text-white/80 hover:text-white text-2xl">×</button>
              </div>
              
              {orderSubmitted ? (
                <div className="p-12 text-center flex flex-col items-center gap-4">
                  <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
                  <h4 className="text-2xl font-bold text-gray-800">تم إرسال طلبك بنجاح!</h4>
                  <p className="text-gray-600">سنتواصل معك قريباً لتأكيد الطلب والتوصيل.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleOrderSubmit({
                      fullName: formData.get('fullName') as string,
                      birthDate: formData.get('birthDate') as string,
                      phone: formData.get('phone') as string,
                      address: formData.get('address') as string,
                      notes: formData.get('notes') as string,
                    });
                  }}
                  className="p-6 space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <User size={16} /> الاسم الكامل
                    </label>
                    <input required name="fullName" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Calendar size={16} /> تاريخ الميلاد
                    </label>
                    <input required name="birthDate" type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none" />
                  
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Phone size={16} /> رقم الهاتف
                    </label>
                    <input required name="phone" type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MapPin size={16} /> العنوان الكامل
                    </label>
                    <input required name="address" type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MessageCircle size={16} /> ملاحظات إضافية
                    </label>
                    <textarea 
                      name="notes" 
                      rows={3}
                      defaultValue={`ملخص المحادثة:\nالمنتجات المقترحة: ${suggestedProducts.join('، ')}\nطريقة الاستخدام: حسب التوجيهات الصحية المذكورة في المحادثة.`}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-green-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:bg-green-700 transition-all mt-4"
                  >
                    تأكيد وإرسال الطلب
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Registration Form Modal */}
      <AnimatePresence>
        {showRegistrationForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <UserRound />
                  نموذج طلب عضوية DXN
                </h3>
                <button onClick={() => setShowRegistrationForm(false)} className="text-white/80 hover:text-white text-2xl">×</button>
              </div>
              
              {registrationSubmitted ? (
                <div className="p-12 text-center flex flex-col items-center gap-4">
                  <CheckCircle2 size={64} className="text-blue-500 animate-bounce" />
                  <h4 className="text-2xl font-bold text-gray-800">تم إرسال بياناتك بنجاح!</h4>
                  <p className="text-gray-600">سنقوم بالتواصل معك لإتمام عملية التسجيل وتزويدك برقم عضويتك.</p>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleRegistrationSubmit({
                      fullName: formData.get('fullName') as string,
                      birthDay: formData.get('birthDay') as string,
                      birthMonth: formData.get('birthMonth') as string,
                      birthYear: formData.get('birthYear') as string,
                      phone: formData.get('phone') as string,
                      address: formData.get('address') as string,
                      notes: formData.get('notes') as string,
                    });
                  }}
                  className="p-6 space-y-4 max-h-[80vh] overflow-y-auto"
                >
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <User size={16} /> الاسم الكامل
                    </label>
                    <input required name="fullName" type="text" placeholder="الاسم كما في الهوية" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Calendar size={16} /> تاريخ الميلاد
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <select required name="birthDay" className="bg-gray-50 border border-gray-200 rounded-xl px-2 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="">اليوم</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                      <select required name="birthMonth" className="bg-gray-50 border border-gray-200 rounded-xl px-2 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="">الشهر</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                      <select required name="birthYear" className="bg-gray-50 border border-gray-200 rounded-xl px-2 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="">السنة</option>
                        {Array.from({ length: 80 }, (_, i) => new Date().getFullYear() - 18 - i).map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <Phone size={16} /> رقم الهاتف (واتساب)
                    </label>
                    <input required name="phone" type="tel" placeholder="مع مفتاح الدولة" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MapPin size={16} /> العنوان الكامل
                    </label>
                    <input required name="address" type="text" placeholder="الدولة، المدينة، الشارع" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                      <MessageCircle size={16} /> ملاحظات
                    </label>
                    <textarea 
                      name="notes" 
                      rows={2}
                      placeholder="أي معلومات إضافية تود ذكرها"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all mt-4"
                  >
                    إرسال طلب التسجيل
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
