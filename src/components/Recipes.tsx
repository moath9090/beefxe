/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Info, ShoppingCart } from 'lucide-react';
import { RECIPES } from '../constants';

export default function Recipes() {
  const [selectedRecipe, setSelectedRecipe] = useState<typeof RECIPES[0] | null>(null);

  return (
    <section id="recipes" className="py-24 bg-luxury-black/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold mb-4 gold-text-gradient"
          >
            الوصفات الطبيعية
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            اكتشف قوة الطبيعة مع منتجات DXN العضوية وحلولها الصحية المتكاملة.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RECIPES.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent"></div>
              </div>

              <div className="p-8 relative">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gold">{recipe.title}</h3>
                  <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold border border-gold/20">
                    {recipe.price}
                  </span>
                </div>
                
                <p className="text-gray-300 mb-6 line-clamp-2">{recipe.description}</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Info size={16} className="text-gold" />
                    <span>المنتجات: {recipe.products}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedRecipe(recipe)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl gold-gradient text-black font-bold transition-all"
                  >
                    <Play size={18} fill="currentColor" />
                    عرض تجربة الأشخاص
                  </button>
                  <button className="p-4 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-all">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="modal-content"
            >
              <div className="p-6 md:p-10">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-serif font-bold gold-text-gradient">تجربة المستخدمين</h2>
                    <p className="text-gray-400 text-sm">{selectedRecipe.title}</p>
                  </div>
                  <button onClick={() => setSelectedRecipe(null)} className="p-2 text-gray-400 hover:text-white transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="aspect-video rounded-2xl overflow-hidden mb-8 gold-border">
                  <iframe
                    src={selectedRecipe.video}
                    title="User Experience Video"
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h4 className="text-gold font-bold mb-3">طريقة الاستخدام:</h4>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedRecipe.usage}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
