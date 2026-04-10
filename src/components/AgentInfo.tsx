/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Phone, MessageCircle, Send, Facebook, ShieldCheck } from 'lucide-react';
import { AGENT_INFO, CONTACT_LINKS } from '../constants';

export default function AgentInfo() {
  return (
    <section id="contact" className="py-24 bg-white/5 border-y border-gold/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden gold-border aspect-square max-w-md mx-auto lg:mx-0">
              <img
                src={AGENT_INFO.image}
                alt={AGENT_INFO.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold/20 blur-3xl rounded-full -z-0"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold/20 blur-3xl rounded-full -z-0"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="text-gold" size={28} />
              <span className="text-gold font-bold tracking-widest uppercase text-sm">الوكيل الحصري في العراق</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 gold-text-gradient">
              {AGENT_INFO.name}
            </h2>
            
            <div className="inline-block px-4 py-2 rounded-xl bg-gold/10 border border-gold/30 text-gold text-sm font-bold mb-8">
              رقم الترخيص: {AGENT_INFO.license}
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-10">
              {AGENT_INFO.bio}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: MessageCircle, color: 'bg-green-600', link: CONTACT_LINKS.whatsapp, name: 'واتساب' },
                { icon: Phone, color: 'bg-gold', link: CONTACT_LINKS.phone, name: 'اتصال' },
                { icon: Send, color: 'bg-blue-500', link: CONTACT_LINKS.telegram, name: 'تيليجرام' },
                { icon: Facebook, color: 'bg-blue-700', link: CONTACT_LINKS.facebook, name: 'فيسبوك' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5 }}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all group"
                >
                  <div className={`p-3 rounded-xl ${item.color} ${item.color === 'bg-gold' ? 'text-black' : 'text-white'} shadow-lg group-hover:scale-110 transition-transform`}>
                    <item.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-gray-400 group-hover:text-gold transition-colors">{item.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
