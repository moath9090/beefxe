import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Smartphone, 
  MessageCircle, 
  Clock, 
  DollarSign, 
  X,
  Send,
  Award,
  ChevronRight,
  ChevronLeft,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Types ---
interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

// --- Constants ---
const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "ما هو المبدأ الأساسي للنجاح مع DXN؟",
    options: ["البيع المباشر فقط", "استخدام المنتج ثم مشاركة التجربة", "الإعلان الممول فقط", "شراء كميات كبيرة للتخزين"],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "ما هي الخطوة الأولى في خطة العمل؟",
    options: ["بناء فريق", "التعرف على المنتجات وفوائدها", "سحب الأرباح", "السفر مع الشركة"],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "كيف يتم تحقيق دخل مستمر مع DXN؟",
    options: ["عبر العمل الفردي فقط", "عبر تطوير الفريق وزيادة المبيعات", "عبر الحظ فقط", "عبر التسجيل دون عمل"],
    correctAnswer: 1
  }
];

const PRODUCT_BENEFITS = [
  {
    title: "الفطر الريشي (الجانوديرما)",
    description: "يعمل على طرد السموم من الجسم وتعزيز جهاز المناعة بشكل طبيعي.",
    usage: "يُضاف ملعقة صغيرة إلى الماء الدافئ أو القهوة يومياً.",
    experience: "ساعدني في تحسين مستويات الطاقة والنوم العميق."
  },
  {
    title: "اسبيرولينا",
    description: "الغذاء السوبر الغني بالفيتامينات والمعادن والبروتينات النباتية.",
    usage: "تناول 3-5 حبات يومياً قبل الوجبات.",
    experience: "تخلصت من فقر الدم وشعرت بنشاط غير مسبوق."
  },
  {
    title: "عصير المورينزي",
    description: "مفيد جداً للجهاز الهضمي ويساعد في توازن الهرمونات.",
    usage: "ملعقتين كبيرتين في كوب ماء قبل الإفطار.",
    experience: "حسن عملية الهضم لدي بشكل ملحوظ جداً."
  }
];

export default function App() {
  // --- State ---
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  
  // Quiz State
  const [quizStep, setQuizStep] = useState<'video' | 'questions' | 'form' | 'result'>('video');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizError, setQuizError] = useState<string | null>(null);

  // --- Timer Logic ---
  useEffect(() => {
    const savedSeconds = localStorage.getItem('dxn_seconds');
    if (savedSeconds) setSecondsElapsed(parseInt(savedSeconds));

    const interval = setInterval(() => {
      setSecondsElapsed(prev => {
        const next = prev + 1;
        localStorage.setItem('dxn_seconds', next.toString());
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setEarnings(Math.floor(secondsElapsed / 3600));
  }, [secondsElapsed]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // --- Handlers ---
  const handleRegistrationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // EmailJS Integration Placeholder
    // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', data, 'YOUR_PUBLIC_KEY')
    console.log('Registration Data:', data);
    alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
    setIsRegModalOpen(false);
  };

  const handleQuizAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers, optionIndex];
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Check results
      const allCorrect = newAnswers.every((ans, idx) => ans === QUIZ_QUESTIONS[idx].correctAnswer);
      if (allCorrect) {
        setQuizStep('form');
      } else {
        setQuizStep('result');
        setQuizError('للأسف، لم تجب على جميع الأسئلة بشكل صحيح. يمكنك المحاولة مرة أخرى بعد 24 ساعة.');
        localStorage.setItem('dxn_quiz_fail_time', Date.now().toString());
      }
    }
  };

  const handleQuizFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phone = formData.get('phone');

    // EmailJS Integration Placeholder
    console.log('Quiz Winner Phone:', phone);
    alert('تم إرسال رقمك بنجاح! سيتم التواصل معك في حال فوزك بالقرعة.');
    setIsQuizModalOpen(false);
    resetQuiz();
  };

  const resetQuiz = () => {
    setQuizStep('video');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizError(null);
  };

  const handleWithdraw = () => {
    alert('تم إرسال طلب سحب الأرباح بنجاح! سيتم معالجة طلبك قريباً.');
    setSecondsElapsed(0);
    localStorage.setItem('dxn_seconds', '0');
    setIsRewardModalOpen(false);
  };

  const checkQuizEligibility = () => {
    const lastFail = localStorage.getItem('dxn_quiz_fail_time');
    if (lastFail) {
      const diff = Date.now() - parseInt(lastFail);
      if (diff < 24 * 60 * 60 * 1000) {
        const remainingHours = Math.ceil((24 * 60 * 60 * 1000 - diff) / (1000 * 60 * 60));
        alert(`يمكنك إعادة المحاولة بعد ${remainingHours} ساعة.`);
        return false;
      }
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900" dir="rtl">
      
      {/* --- Sticky Header / Stats --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">
              <Clock className="w-4 h-4" />
              <span>{formatTime(secondsElapsed)}</span>
            </div>
            <button 
              onClick={() => setIsRewardModalOpen(true)}
              className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm font-bold hover:bg-amber-100 transition-colors"
            >
              <DollarSign className="w-4 h-4" />
              <span>{earnings} دولار</span>
            </button>
          </div>
          <h1 className="text-xl font-black text-emerald-800 hidden sm:block">فريق المجتهدين</h1>
        </div>
      </header>

      <main className="pt-24 pb-20 px-4">
        
        {/* --- Section 1: Hero & Video --- */}
        <section className="max-w-5xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl overflow-hidden shadow-2xl shadow-emerald-200/50 mb-10 aspect-video bg-black relative group"
          >
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/UnKW1ZsfHk8" // Placeholder Video
              title="DXN Opportunity"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight"
          >
            مشروعك الذكي مع <span className="text-emerald-600">DXN</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            النجاح يبدأ بخطوة بسيطة: استخدم المنتجات الصحية، استمتع بفوائدها، ثم شارك تجربتك الحقيقية مع العالم لبناء فريق عمل ناجح ودخل مستمر.
          </motion.p>
        </section>

        {/* --- Section 2: Action Plan --- */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">خطة العمل للنجاح</h3>
            <div className="h-1.5 w-20 bg-emerald-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: "الأولى", title: "التعرف", desc: "التعرف على منتجات DXN وفوائدها الصحية والطبيعية.", icon: Info },
              { step: "الثانية", title: "الاستخدام", desc: "استخدام المنتجات شخصياً وتوثيق تجربة الاستخدام الحقيقية.", icon: Smartphone },
              { step: "الثالثة", title: "المشاركة", desc: "مشاركة فوائد المنتجات وتجربة الاستخدام مع الآخرين.", icon: MessageCircle },
              { step: "الرابعة", title: "التعليم", desc: "تعليم الأشخاص الجدد نفس الطريقة لبناء فريق متعاون.", icon: Users },
              { step: "الخامسة", title: "التطوير", desc: "الاستمرار في تطوير الفريق وزيادة المبيعات لتحقيق دخل مستمر.", icon: TrendingUp },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-2 text-xs font-bold text-emerald-100 group-hover:text-emerald-500 transition-colors">
                  الخطوة {item.step}
                </div>
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Section 3: Product Benefits --- */}
        <section className="max-w-6xl mx-auto mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">فوائد المنتجات وتجاربنا</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PRODUCT_BENEFITS.map((product, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl flex flex-col"
              >
                <div className="h-48 bg-emerald-600 flex items-center justify-center text-white">
                  <Award className="w-16 h-16 opacity-20" />
                </div>
                <div className="p-8 flex-1">
                  <h4 className="text-xl font-bold mb-4 text-emerald-800">{product.title}</h4>
                  <p className="text-gray-600 mb-6">{product.description}</p>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <span className="text-xs font-bold text-emerald-600 block mb-1 uppercase tracking-wider">طريقة الاستخدام</span>
                      <p className="text-sm text-gray-700">{product.usage}</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl border-r-4 border-emerald-500">
                      <span className="text-xs font-bold text-emerald-600 block mb-1 uppercase tracking-wider">تجربة واقعية</span>
                      <p className="text-sm text-gray-700 italic">"{product.experience}"</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Section 4: Call to Action --- */}
        <section className="max-w-4xl mx-auto text-center mb-24">
          <div className="bg-emerald-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -mr-32 -mt-32 opacity-50"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">هل أنت مستعد لتغيير حياتك؟</h3>
              <p className="text-emerald-100 mb-10 text-lg">انضم إلى فريق المجتهدين اليوم وابدأ رحلتك نحو الحرية الصحية والمالية.</p>
              <button 
                onClick={() => setIsRegModalOpen(true)}
                className="bg-white text-emerald-900 px-10 py-4 rounded-full font-black text-xl hover:scale-105 transition-transform shadow-lg"
              >
                ابدأ العمل معنا
              </button>
            </div>
          </div>
        </section>

        {/* --- Section 5: Contact --- */}
        <section className="max-w-4xl mx-auto mb-24 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a 
            href="https://chat.whatsapp.com/HACHPkUNWxPK926WsX1MVP?mode=gi_t" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#25D366] text-white p-6 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-6 h-6" />
            انضم لجروب الواتساب
          </a>
          <a 
            href="https://wa.me/+9647706146529" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-gray-900 text-white p-6 rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity"
          >
            <Users className="w-6 h-6" />
            تواصل مع الإدارة
          </a>
        </section>

        {/* --- Section 6: Incentive Draw --- */}
        <section className="max-w-2xl mx-auto text-center">
          <button 
            onClick={() => {
              if (checkQuizEligibility()) setIsQuizModalOpen(true);
            }}
            className="group flex items-center gap-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-5 rounded-2xl font-black text-xl hover:shadow-2xl hover:shadow-orange-200 transition-all mx-auto"
          >
            <Award className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            دخول قرعة الحافز الشهري
          </button>
          <p className="mt-4 text-gray-400 text-sm">فرصة ذهبية للفوز بحوافز نقدية كل شهر</p>
        </section>

      </main>

      {/* --- Modals --- */}
      
      {/* Registration Modal */}
      <AnimatePresence>
        {isRegModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRegModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">نموذج الانضمام</h3>
                  <button onClick={() => setIsRegModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
                </div>
                <form onSubmit={handleRegistrationSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل الصحيح</label>
                    <input required name="name" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">تاريخ التولد (كتابة)</label>
                    <input required name="birthdate" type="text" placeholder="مثال: 15 مايو 1990" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">العنوان الكامل</label>
                    <input required name="address" type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف</label>
                    <input required name="phone" type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">ملاحظات إضافية</label>
                    <textarea name="notes" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    إرسال البيانات
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {isQuizModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsQuizModalOpen(false); resetQuiz(); }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">قرعة الحافز الشهري</h3>
                  <button onClick={() => { setIsQuizModalOpen(false); resetQuiz(); }} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
                </div>

                {quizStep === 'video' && (
                  <div className="space-y-6">
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden">
                      <iframe 
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/Snq1C8EHPYo"
                        title="DXN Explanation"
                      ></iframe>
                    </div>
                    <p className="text-gray-600 text-center">شاهد الفيديو بتركيز لتتمكن من الإجابة على الأسئلة بنجاح.</p>
                    <button 
                      onClick={() => setQuizStep('questions')}
                      className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors"
                    >
                      ابدأ الاختبار
                    </button>
                  </div>
                )}

                {quizStep === 'questions' && (
                  <div className="space-y-8">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-emerald-600">السؤال {currentQuestionIndex + 1} من {QUIZ_QUESTIONS.length}</span>
                      <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-300" 
                          style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <h4 className="text-xl font-bold text-center py-4">{QUIZ_QUESTIONS[currentQuestionIndex].text}</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                        <button 
                          key={idx}
                          onClick={() => handleQuizAnswer(idx)}
                          className="p-4 text-right rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-medium"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 'form' && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-2">أحسنت! إجابات صحيحة 100%</h4>
                      <p className="text-gray-600">أدخل رقم هاتفك الآن للدخول في القرعة الشهرية.</p>
                    </div>
                    <form onSubmit={handleQuizFormSubmit} className="space-y-4">
                      <input required name="phone" type="tel" placeholder="رقم الهاتف" className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none text-center text-xl" />
                      <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors">
                        تأكيد الدخول في القرعة
                      </button>
                    </form>
                  </div>
                )}

                {quizStep === 'result' && (
                  <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                      <X className="w-10 h-10" />
                    </div>
                    <p className="text-lg font-bold text-gray-800">{quizError}</p>
                    <button 
                      onClick={() => { setIsQuizModalOpen(false); resetQuiz(); }}
                      className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold text-lg"
                    >
                      إغلاق
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reward Withdrawal Modal */}
      <AnimatePresence>
        {isRewardModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRewardModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-2">سحب حوافز البقاء</h3>
                <p className="text-gray-600 mb-8">رصيدك الحالي هو <span className="font-bold text-amber-600">{earnings} دولار</span>. هل ترغب في طلب سحب الأرباح الآن؟</p>
                
                <div className="space-y-3">
                  <button 
                    onClick={handleWithdraw}
                    disabled={earnings === 0}
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    طلب سحب الأرباح
                  </button>
                  <button 
                    onClick={() => setIsRewardModalOpen(false)}
                    className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
                <p className="mt-4 text-xs text-gray-400">سيتم تصفير العداد عند طلب السحب.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
