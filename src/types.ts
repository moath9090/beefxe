import React from 'react';

export interface Course {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
}

export interface Recommendation {
  id: string;
  asset: string;
  type: 'Buy' | 'Sell';
  timeframe: string;
  reason: string;
  timestamp: number;
}

export type StrategyType = 'NextCandle' | 'GeneralTrend';

export const TIMEFRAMES = [
  { label: 'دقيقة واحدة', value: '1m', ms: 60000 },
  { label: '5 دقائق', value: '5m', ms: 300000 },
  { label: '15 دقيقة', value: '15m', ms: 900000 },
  { label: '30 دقيقة', value: '30m', ms: 1800000 },
  { label: 'ساعة', value: '1h', ms: 3600000 },
  { label: '4 ساعات', value: '4h', ms: 14400000 },
  { label: 'يومي', value: '1d', ms: 86400000 },
];

export const ASSETS = [
  'EUR/USD', 'GBP/USD', 'USD/JPY', 'XAU/USD (الذهب)', 'WTI (النفط)', 'US30', 'BTC/USD'
];

export const REASONS = [
  'كسر مستوى مقاومة مع زيادة في الزخم',
  'ارتداد من دعم قوي على الفريم المختار',
  'استمرار اتجاه صاعد مدعوم بقمم أعلى',
  'تشكل نموذج انعكاسي إيجابي',
  'تقاطع متوسطات حسابية تدعم الاتجاه',
  'وصول السعر لمنطقة تشبع بيعي',
  'اختبار ناجح لمستوى فيبوناتشي مهم'
];
