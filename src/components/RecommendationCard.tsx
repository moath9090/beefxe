import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Clock, Info } from 'lucide-react';
import { Recommendation } from '../types';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const isBuy = recommendation.type === 'Buy';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-2 h-full ${isBuy ? 'bg-emerald-500' : 'bg-rose-500'}`} />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-800">{recommendation.asset}</h3>
          <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
            <Clock size={14} />
            <span>{recommendation.timeframe}</span>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 ${
          isBuy ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>
          {isBuy ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          <span>{isBuy ? 'شراء (Buy)' : 'بيع (Sell)'}</span>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <div className="flex items-center gap-2 text-slate-700 font-semibold mb-2">
          <Info size={16} className="text-blue-500" />
          <span>الملخص الفني:</span>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          {recommendation.reason}
        </p>
      </div>

      <div className="mt-4 text-[10px] text-slate-400 text-left">
        آخر تحديث: {new Date(recommendation.timestamp).toLocaleTimeString('ar-EG')}
      </div>
    </motion.div>
  );
};
