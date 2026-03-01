import React from 'react';
import { motion } from 'motion/react';
import { CourseCard } from '../components/CourseCard';
import { ExternalLink, GraduationCap, ShieldCheck, Award } from 'lucide-react';

const COURSES = [
  {
    id: '1',
    title: 'أساسيات سوق الفوركس للمبتدئين',
    description: 'تعرف على ماهية سوق العملات وكيفية البدء في التداول من الصفر بطريقة احترافية ومنظمة.',
    youtubeId: 'e6WsXsJjnYI', // Placeholder
  },
  {
    id: '2',
    title: 'إدارة المخاطر وعلم النفس في التداول',
    description: 'أهم درس في مسيرتك: كيف تحافظ على رأس مالك وتتحكم في مشاعرك أثناء فتح الصفقات.',
    youtubeId: 'meI0-KO0m40',
  },
  {
    id: '3',
    title: 'استراتيجية العرض والطلب الاحترافية',
    description: 'شرح مفصل لكيفية تحديد مناطق الدخول القوية بناءً على تدفق السيولة في السوق.',
    youtubeId: 'V8WPQSq6KSk',
  }
];

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-emerald-700 uppercase bg-emerald-100 rounded-full">
               وكالة الأستاذ العربي المعتمدة
            </span>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-emerald-700   bg-emerald-100 rounded-full">
             رمز الشريك
             [ al3ia1rryn ]
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              احترف تداول <span className="gradient-text">الفوركس</span> <br />
              بأسلوب علمي وعملي
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed">
              نقدم لك تعليماً احترافياً وتدريباً عملياً للنجاح في الأسواق المالية. 
              افتح حسابك الآن تحت وكالتنا في شركة <span className="font-bold text-slate-900">Exness</span> العالمية وتمتع بمزايا حصرية.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://one.exnessonelink.com/a/al3ia1rryn" // Example link
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 transition-all flex items-center justify-center gap-3 group"
              >
                إنشاء حساب تداول حقيقي مجاناً
                <ExternalLink size={20} className="group-hover:translate-x-[-4px] transition-transform" />
              </a>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-2xl font-bold text-lg transition-all">
                تصفح الكورس التعليمي
              </button>
            </div>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                <GraduationCap size={24} aria-label="أيقونة التعليم" />
              </div>
              <h3 className="font-bold mb-1">تعليم احترافي</h3>
              <p className="text-sm text-slate-500">من الصفر حتى الاحتراف</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <ShieldCheck size={24} aria-label="أيقونة الموثوقية" />
              </div>
              <h3 className="font-bold mb-1">وسيط موثوق</h3>
              <p className="text-sm text-slate-500">شراكة رسمية مع Exness</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                <Award size={24} aria-label="أيقونة التوصيات" />
              </div>
              <h3 className="font-bold mb-1">توصيات يومية</h3>
              <p className="text-sm text-slate-500">تحليل فني دقيق ومستمر</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Section */}
      <section id="course" className="py-24 bg-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">الكورس التعليمي المجاني</h2>
            <p className="text-slate-600">دروس منظمة تشرح لك أسرار التداول في سوق الفوركس</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
