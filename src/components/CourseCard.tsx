import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl overflow-hidden transition-all hover:shadow-lg group"
    >
      <div className="relative aspect-video bg-slate-900">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${course.youtubeId}`}
          title={course.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {course.description}
        </p>
      </div>
    </motion.div>
  );
};
