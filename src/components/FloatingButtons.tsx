/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Phone, Share2, X, Link, Facebook, Send, Twitter } from 'lucide-react';
import { CONTACT_LINKS } from '../constants';

export default function FloatingButtons() {
  const [showShare, setShowShare] = useState(false);

  const shareOptions = [
    { name: 'واتساب', icon: MessageCircle, color: 'bg-green-600', link: `https://wa.me/?text=${encodeURIComponent(window.location.href)}` },
    { name: 'فيسبوك', icon: Facebook, color: 'bg-blue-700', link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}` },
    { name: 'تيليجرام', icon: Send, color: 'bg-blue-500', link: `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}` },
    { name: 'تويتر', icon: Twitter, color: 'bg-black', link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}` },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('تم نسخ الرابط بنجاح!');
  };

  return (
    <>
      <div className="fixed bottom-8 left-8 z-40 flex flex-col gap-4">
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={CONTACT_LINKS.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="p-4 rounded-full bg-green-600 text-white shadow-lg shadow-green-600/20 flex items-center justify-center"
        >
          <MessageCircle size={28} />
        </motion.a>
        
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href={CONTACT_LINKS.phone}
          className="p-4 rounded-full bg-gold text-black shadow-lg shadow-gold/20 flex items-center justify-center"
        >
          <Phone size={28} />
        </motion.a>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowShare(true)}
          className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg flex items-center justify-center"
        >
          <Share2 size={28} />
        </motion.button>
      </div>

      <AnimatePresence>
        {showShare && (
          <div className="modal-overlay" onClick={() => setShowShare(false)}>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-luxury-black border border-gold/30 rounded-t-3xl md:rounded-3xl max-w-md w-full p-8 absolute bottom-0 md:bottom-auto md:relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold gold-text-gradient">مشاركة الموقع</h3>
                <button onClick={() => setShowShare(false)} className="p-2 text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8">
                {shareOptions.map((option, i) => (
                  <a
                    key={i}
                    href={option.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`p-4 rounded-2xl ${option.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <option.icon size={24} />
                    </div>
                    <span className="text-xs text-gray-400">{option.name}</span>
                  </a>
                ))}
              </div>

              <button
                onClick={copyLink}
                className="w-full py-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 text-white hover:bg-white/10 transition-all"
              >
                <Link size={20} />
                نسخ الرابط
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
