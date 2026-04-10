/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

export default function LegalPages() {
  return (
    <div className="bg-luxury-black">
      {/* About Us */}
      <section id="about" className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold gold-text-gradient text-center">من نحن</h2>
            <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 space-y-6 text-gray-300 leading-relaxed">
              <p>
                نحن فريق متخصص في تمكين الأفراد من خلال فرصة عمل DXN العالمية. نؤمن بأن الصحة والحرية المالية هما حق للجميع، ونسعى لتوفير الأدوات والتدريب اللازم لكل طموح وطموحة في العراق.
              </p>
              <div className="grid md:grid-cols-2 gap-8 pt-6">
                <div className="space-y-3">
                  <h4 className="text-gold font-bold">رؤيتنا</h4>
                  <p className="text-sm">أن نكون المنصة الأولى في العراق لتمكين الشباب والنساء من خلال العمل الحر والمنتجات الصحية الطبيعية.</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-gold font-bold">رسالتنا</h4>
                  <p className="text-sm">نشر ثقافة الصحة والوعي المالي وتوفير فرصة عمل قانونية ومرخصة تناسب الجميع.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terms of Use */}
      <section id="شروط الاستخدام" className="py-24 border-t border-white/5 bg-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold gold-text-gradient text-center">شروط الاستخدام</h2>
            <div className="bg-luxury-black p-8 md:p-12 rounded-3xl border border-white/10 space-y-6 text-gray-300 leading-relaxed text-sm">
              <ul className="list-disc list-inside space-y-4">
                <li>هذا الموقع مخصص لأغراض تعريفية وتدريبية حول فرصة عمل DXN.</li>
                <li>النتائج المالية والصحية تختلف من شخص لآخر بناءً على الجهد والالتزام.</li>
                <li>الموقع غير مسؤول عن أي سوء استخدام للمعلومات أو المنتجات خارج الإرشادات الرسمية.</li>
                <li>جميع المحتويات محمية بحقوق النشر الخاصة بفريق رائد الخير.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="سياسة الخصوصية" className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold gold-text-gradient text-center">سياسة الخصوصية</h2>
            <div className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 space-y-6 text-gray-300 leading-relaxed text-sm">
              <p>نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية:</p>
              <ul className="list-disc list-inside space-y-4">
                <li>لا نقوم بمشاركة بياناتك مع أي جهات خارجية.</li>
                <li>يتم استخدام البيانات المقدمة فقط للتواصل معك بخصوص فرصة العمل.</li>
                <li>نستخدم ملفات تعريف الارتباط (Cookies) لتحسين تجربة المستخدم على الموقع.</li>
                <li>بياناتك مشفرة ومحمية بأعلى معايير الأمان.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
