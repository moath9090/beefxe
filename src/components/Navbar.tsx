/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MessageCircle, Phone } from 'lucide-react';
import { CONTACT_LINKS } from '../constants';

const navItems = [
  { name: 'الرئيسية', href: '#home' },
  { name: 'تعريف العمل', href: '#work-identity' },
  { name: 'فروع العراق', href: '#branches' },
  { name: 'الوصفات الطبيعية', href: '#recipes' },
  { name: 'الشهادات والجوائز', href: '#certificates' },
  { name: 'من نحن', href: '#about' },
  { name: 'تواصل معنا', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-luxury-black/90 backdrop-blur-md border-b border-gold/20 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <span className="text-2xl font-serif font-bold gold-text-gradient">DXN IRAQ</span>
          </div>
          
          <div className="hidden lg:block">
            <div className="flex items-baseline space-x-8 space-x-reverse">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-gold transition-colors duration-200 text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-green-600/20 text-green-500 hover:bg-green-600/30 transition-all">
              <MessageCircle size={20} />
            </a>
            <a href={CONTACT_LINKS.phone} className="p-2 rounded-full bg-gold/20 text-gold hover:bg-gold/30 transition-all">
              <Phone size={20} />
            </a>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gold p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-luxury-black border-b border-gold/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-gray-300 hover:text-gold hover:bg-gold/5 rounded-lg"
                >
                  {item.name}
                </a>
              ))}
              <div className="flex space-x-4 space-x-reverse pt-4 px-3">
                <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center space-x-2 space-x-reverse bg-green-600 text-white py-3 rounded-xl">
                  <MessageCircle size={20} />
                  <span>واتساب</span>
                </a>
                <a href={CONTACT_LINKS.phone} className="flex-1 flex items-center justify-center space-x-2 space-x-reverse bg-gold text-black py-3 rounded-xl font-bold">
                  <Phone size={20} />
                  <span>اتصال</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
