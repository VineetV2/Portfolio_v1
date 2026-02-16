import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import SectionHeader from '../ui/SectionHeader';
import { Brain, Database, Code2 } from 'lucide-react';

const categories = [
  {
    title: 'ML / AI',
    icon: Brain,
    color: '#0EF6CC',
    skills: ['PyTorch', 'TensorFlow', 'HuggingFace', 'Scikit-learn', 'OpenCV', 'NumPy', 'Pandas', 'CUDA', 'W&B', 'LoRA'],
  },
  {
    title: 'Data Engineering',
    icon: Database,
    color: '#F59E0B',
    skills: ['Hadoop', 'Spark', 'AWS EC2', 'HDFS', 'YARN', 'MapReduce', 'Docker', 'MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Full Stack',
    icon: Code2,
    color: '#A78BFA',
    skills: ['Python', 'Java', 'Node.js', 'React.js', 'JavaScript (ES6+)', 'SQL', 'Git', 'CI/CD'],
  },
];

const SkillMatrix = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="skills" data-testid="skills-section" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader number="03" title="Core Competencies" />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                data-testid={`skill-category-${i}`}
                className="glass-card rounded-2xl p-8 group hover:border-white/[0.1] transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `${cat.color}10`,
                    boxShadow: `0 0 0px ${cat.color}00`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${cat.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0px ${cat.color}00`;
                  }}
                >
                  <Icon size={22} style={{ color: cat.color }} />
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-white mb-6">{cat.title}</h3>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-pill px-3 py-1.5 text-xs font-mono text-slate-400 border border-white/[0.06] rounded-lg cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillMatrix;
