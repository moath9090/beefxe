/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ZoomIn } from 'lucide-react';
import { CERTIFICATES } from '../constants';

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATES[0] | null>(null);

  return (
    <section id="certificates" className="py-24 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold mb-4 gold-text-gradient"
          >
            الشهادات القانونية والجوائز العالمية
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            تلتزم شركة DXN بأعلى معايير الجودة العالمية، وهي مرخصة من قبل الجهات الصحية والرقابية في أكثر من 180 دولة.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCert(cert)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden gold-border mb-6">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-4 rounded-full bg-gold text-black">
                    <ZoomIn size={32} />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gold mb-2">{cert.title}</h3>
                <p className="text-gray-400 text-sm">{cert.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="modal-overlay" onClick={() => setSelectedCert(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-gold transition-colors"
              >
                <X size={32} />
              </button>
              <div className="bg-luxury-black rounded-3xl overflow-hidden gold-border">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[80vh] object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6 text-center border-t border-gold/20">
                  <h3 className="text-2xl font-bold text-gold mb-2">{selectedCert.title}</h3>
                  <p className="text-gray-300">{selectedCert.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
