/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MapPin, Clock, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { BRANCHES } from '../constants';

export default function Branches() {
  return (
    <section id="branches" className="py-24 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold mb-4 gold-text-gradient"
          >
            فروع شركة DXN في العراق
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            تنتشر فروعنا في أغلب محافظات العراق لخدمتكم وتوفير المنتجات والتدريب اللازم.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRANCHES.map((branch, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-gold/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-gold text-sm font-bold mb-1 block">{branch.name}</span>
                  <h3 className="text-2xl font-bold">{branch.province}</h3>
                </div>
                <div className="p-3 rounded-2xl bg-gold/10 text-gold">
                  <MapPin size={24} />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Clock size={18} className="text-gold flex-shrink-0" />
                  <span>{branch.hours}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-sm">
                  <Phone size={18} className="text-gold flex-shrink-0" />
                  <span>{branch.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${branch.phone.replace('+', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600/10 text-green-500 hover:bg-green-600 hover:text-white transition-all text-sm font-bold"
                >
                  <MessageCircle size={16} />
                  واتساب
                </a>
                <a
                  href={`tel:${branch.phone}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gold/10 text-gold hover:bg-gold hover:text-black transition-all text-sm font-bold"
                >
                  <Phone size={16} />
                  اتصال
                </a>
                <a
                  href={branch.map}
                  target="_blank"
                  rel="noreferrer"
                  className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all text-sm font-bold"
                >
                  <ExternalLink size={16} />
                  عرض على الخريطة
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
