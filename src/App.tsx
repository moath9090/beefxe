import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HomePage } from './pages/HomePage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { LayoutDashboard, GraduationCap, TrendingUp, Menu, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'recommendations'>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentPage('home')}
          >
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
              <TrendingUp size={24} aria-hidden="true" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              وكالة الأستاذ العربي
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="القائمة الرئيسية">
            <button
              onClick={() => setCurrentPage('home')}
              className={`font-bold transition-colors ${
                currentPage === 'home' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              الرئيسية
            </button>
            <button
              onClick={() => setCurrentPage('recommendations')}
              className={`font-bold transition-colors ${
                currentPage === 'recommendations' ? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              التوصيات المباشرة
            </button>
            <a
              href="#course"
              onClick={(e) => {
                if (currentPage !== 'home') {
                  setCurrentPage('home');
                  setTimeout(() => {
                    document.getElementById('course')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-slate-500 hover:text-slate-900 font-bold transition-colors"
            >
              الكورس التعليمي
            </a>
            <a
              href="https://one.exnessonelink.com/a/al3ia1rryn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
            >
              فتح حساب حقيقي
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                <button
                  onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                  className="text-right font-bold text-lg py-2"
                >
                  الرئيسية
                </button>
                <button
                  onClick={() => { setCurrentPage('recommendations'); setIsMenuOpen(false); }}
                  className="text-right font-bold text-lg py-2"
                >
                  التوصيات المباشرة
                </button>
                <button
                  onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                  className="text-right font-bold text-lg py-2"
                >
                  الكورس التعليمي
                </button>
                <a
                  href="https://one.exnessonelink.com/a/al3ia1rryn"
                  className="bg-emerald-600 text-white text-center py-4 rounded-2xl font-bold text-lg mt-4"
                >
                  فتح حساب حقيقي
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' ? <HomePage /> : <RecommendationsPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-slate-800 pb-12 mb-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                <TrendingUp size={20} />
              </div>
              <span className="text-xl font-black text-white">وكالة الأستاذ العربي</span>
            </div>
            <div className="flex gap-8">
              <a href="https://t.me/beefxe" className="hover:text-white transition-colors">تليجرام</a>
              <a href="#" className="hover:text-white transition-colors">يوتيوب</a>
              <a href="#" className="hover:text-white transition-colors">تيك توك</a>
            </div>
          </div>
          <div className="text-center text-sm">
            <p>© {new Date().getFullYear()} وكالة الأستاذ العربي. جميع الحقوق محفوظة.</p>
            <p className="mt-2 opacity-50">شريك رسمي معتمد لشركة Exness العالمية.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
