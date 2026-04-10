/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Facebook, Twitter, Instagram, Youtube, Send, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT_LINKS } from '../constants';

export default function Footer() {
  return (
    <footer className="bg-luxury-black pt-20 pb-10 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold gold-text-gradient">DXN IRAQ</h3>
            <p className="text-gray-400 leading-relaxed">
              نحن هنا لنقدم لك فرصة حقيقية لتغيير حياتك نحو الأفضل من خلال نظام DXN العالمي للمنتجات الصحية والعمل الحر.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube, Send].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-gold hover:bg-gold/10 transition-all">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">روابط سريعة</h4>
            <ul className="space-y-4">
              {['الرئيسية', 'تعريف العمل', 'فروع العراق', 'الوصفات الطبيعية', 'الشهادات والجوائز'].map((item, i) => (
                <li key={i}>
                  <a href={`#${item}`} className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">قانوني</h4>
            <ul className="space-y-4">
              {['من نحن', 'شروط الاستخدام', 'سياسة الخصوصية'].map((item, i) => (
                <li key={i}>
                  <a href={`#${item}`} className="text-gray-400 hover:text-gold transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/40"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6">اتصل بنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin size={20} className="text-gold flex-shrink-0" />
                <span>بغداد، العراق - المكتب الرئيسي</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone size={20} className="text-gold flex-shrink-0" />
                <span>{CONTACT_LINKS.phone.replace('tel:', '')}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail size={20} className="text-gold flex-shrink-0" />
                <span>info@dxniraq.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            جميع الحقوق محفوظة © {new Date().getFullYear()} DXN IRAQ - رائد الخير
          </p>
        </div>
      </div>
    </footer>
  );
}
