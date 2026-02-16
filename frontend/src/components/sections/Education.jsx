import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import SectionHeader from '../ui/SectionHeader';
import { GraduationCap, MapPin } from 'lucide-react';

const schools = [
  {
    name: 'New Jersey Institute of Technology',
    degree: 'Master of Science in Artificial Intelligence',
    gpa: 'GPA 3.83',
    date: 'Expected Jun 2027',
    location: 'Newark, NJ',
    courses: 'Advanced NLP, Computer Vision, Information Retrieval, ML for Data Science, Big Data',
    color: '#0EF6CC',
  },
  {
    name: 'VIT — AP University',
    degree: 'Bachelor of Technology in Computer Science',
    gpa: '',
    date: 'Jun 2025',
    location: 'India',
    courses: '',
    color: '#F59E0B',
  },
];

const Education = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="education" data-testid="education-section" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader number="06" title="Education" />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schools.map((school, i) => (
            <motion.div
              key={school.name}
              data-testid={`education-card-${i}`}
              className="glass-card rounded-2xl p-8 group hover:border-white/[0.1] transition-all duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: `${school.color}10` }}
                >
                  <GraduationCap size={18} style={{ color: school.color }} />
                </div>
                <span className="font-mono text-xs text-slate-500 tracking-wide">{school.date}</span>
              </div>

              <h3 className="font-heading font-bold text-lg text-white mb-2">{school.name}</h3>
              <p className="text-sm text-slate-400 mb-1">{school.degree}</p>
              {school.gpa && (
                <p className="font-mono text-sm font-semibold mb-4" style={{ color: school.color }}>
                  {school.gpa}
                </p>
              )}

              {school.courses && (
                <p className="text-xs text-slate-500 leading-relaxed mt-3">
                  {school.courses}
                </p>
              )}

              <div className="flex items-center gap-1 mt-4 text-xs text-slate-500">
                <MapPin size={12} />
                {school.location}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
