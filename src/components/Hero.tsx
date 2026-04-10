/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { VIDEOS, CONTACT_LINKS } from '../constants';

export default function Hero() {
  const [showIdentity, setShowIdentity] = useState(false);

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden sparkle-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-sm font-medium mb-6">
            فرصة عمل حر عالمية
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
            هذا العمل مرخص بشكل <br />
            <span className="gold-text-gradient">رسمي وقانوني تماماً</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            انضم إلى عائلة DXN العالمية وابدأ رحلتك نحو الحرية المالية والصحية من منزلك.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden gold-border shadow-2xl shadow-gold/10 mb-16"
        >
          <iframe
            src={VIDEOS.hero}
            title="DXN Work Explanation"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowIdentity(true)}
            className="w-full sm:w-auto px-10 py-5 rounded-2xl gold-gradient text-black font-bold text-lg shadow-lg shadow-gold/20 flex items-center justify-center gap-3"
          >
            <Play size={24} fill="currentColor" />
              احصل على هوية العمل
          </motion.button>
          
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#branches"
            className="w-full sm:w-auto px-10 py-5 rounded-2xl border border-gold/50 text-gold font-bold text-lg hover:bg-gold/5 transition-all flex items-center justify-center gap-3"
          >
            فروع شركة DXN في العراق
          </motion.a>
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gold/5 blur-[120px] rounded-full -z-10"></div>

      {/* Work Identity Modal */}
      <AnimatePresence>
        {showIdentity && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="modal-content"
            >
              <div className="p-6 md:p-10">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold gold-text-gradient">تفاصيل هوية العمل</h2>
                  <button onClick={() => setShowIdentity(false)} className="p-2 text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="aspect-video rounded-2xl overflow-hidden mb-8 gold-border">
                  <iframe
                    src={VIDEOS.workIdentity}
                    title="Work Identity Details"
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gold">لماذا تختار DXN؟</h3>
                    <ul className="space-y-3">
                      {[
                        'مناسب للرجال والنساء من جميع الأعمار',
                        'إمكانية العمل من المنزل بنظام مرن',
                        'دخل متنامي وحوافز عالمية',
                        'منتجات صحية طبيعية مرخصة عالمياً'
                      ].map((text, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-300">
                          <CheckCircle2 size={18} className="text-gold" />
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <p className="text-gray-300 leading-relaxed mb-6">
                      نحن نقدم لك نظاماً متكاملاً للنجاح. لا تحتاج لخبرة سابقة، فنحن نوفر لك التدريب والدعم اللازم لبناء مشروعك الخاص في أكثر من 180 دولة حول العالم.
                    </p>
                    <a
                      href={CONTACT_LINKS.registration}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl gold-gradient text-black font-bold"
                    >
                      التسجيل الآن
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
