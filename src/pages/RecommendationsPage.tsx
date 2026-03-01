import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RecommendationCard } from '../components/RecommendationCard';
import { StrategyType, TIMEFRAMES, ASSETS, REASONS, Recommendation } from '../types';
import { Settings2, RefreshCw, Zap, BarChart3 } from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const [strategy, setStrategy] = useState<StrategyType>('NextCandle');
  const [timeframe, setTimeframe] = useState(TIMEFRAMES[1]); // 5m default
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const generateSignals = useCallback(() => {
    setIsRefreshing(true);
    const newSignals: Recommendation[] = ASSETS.map((asset, index) => ({
      id: `${asset}-${Date.now()}-${index}`,
      asset,
      type: Math.random() > 0.5 ? 'Buy' : 'Sell',
      timeframe: timeframe.label,
      reason: REASONS[Math.floor(Math.random() * REASONS.length)],
      timestamp: Date.now(),
    }));
    
    setTimeout(() => {
      setRecommendations(newSignals);
      setIsRefreshing(false);
    }, 600);
  }, [timeframe]);

  // Initial generation
  useEffect(() => {
    generateSignals();
  }, [strategy, timeframe, generateSignals]);

  // Auto-update based on timeframe
  useEffect(() => {
    const interval = setInterval(() => {
      generateSignals();
    }, timeframe.ms);
    
    return () => clearInterval(interval);
  }, [timeframe, generateSignals]);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">توصيات التداول المباشرة</h1>
        <p className="text-slate-600">إشارات تداول ذكية يتم تحديثها تلقائياً بناءً على الاستراتيجية المختارة.</p>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-3xl p-6 mb-12 flex flex-col lg:flex-row gap-8 items-center justify-between">
        <div className="flex flex-wrap items-center gap-6 w-full lg:w-auto">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Zap size={12} /> نوع الاستراتيجية
            </label>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setStrategy('NextCandle')}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                  strategy === 'NextCandle' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                اتجاه الشمعة القادمة
              </button>
              <button
                onClick={() => setStrategy('GeneralTrend')}
                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
                  strategy === 'GeneralTrend' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                الاتجاه العام
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 size={12} /> الفريم الزمني
            </label>
            <div className="flex flex-wrap gap-2">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf.value}
                  onClick={() => setTimeframe(tf)}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-all border ${
                    timeframe.value === tf.value
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={generateSignals}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
        >
          <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
          تحديث يدوي
        </button>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.id} recommendation={rec} />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-16 p-8 bg-amber-50 rounded-3xl border border-amber-100 text-center">
        <h3 className="text-amber-800 font-bold mb-2">إخلاء مسؤولية</h3>
        <p className="text-amber-700 text-sm leading-relaxed max-w-3xl mx-auto">
          تداول الفوركس ينطوي على مخاطر عالية وقد لا يكون مناسباً لجميع المستثمرين. التوصيات المعروضة هي لأغراض تعليمية وتوضيحية فقط ولا تعتبر نصيحة استثمارية مباشرة. تأكد دائماً من إجراء تحليلك الخاص قبل فتح أي صفقة.
        </p>
      </div>
    </div>
  );
};
