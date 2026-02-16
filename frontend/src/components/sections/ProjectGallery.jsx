import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import SectionHeader from '../ui/SectionHeader';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Geomagnetic Storm Forecasting — Surya Foundation Model',
    period: 'Dec 2025 — Present',
    desc: 'Can we predict space weather 72 hours out? I fine-tuned a 366M-param Vision Transformer (pretrained on NASA solar imagery) using LoRA to forecast geomagnetic storm indicators — hitting 96.5% accuracy while cutting training compute by 3.5x.',
    stack: ['Python', 'PyTorch', 'CUDA', 'W&B', 'LoRA'],
    link: 'https://github.com/VineetV2/imf-bz-forecasting-surya',
    stats: [
      { value: '3.39 nT', label: 'RMSE Score' },
      { value: '96.5%', label: 'Excellent/Good' },
      { value: '3.5x', label: 'Efficiency Gain' },
    ],
    featured: true,
    image: 'https://images.unsplash.com/photo-1744448274409-589f1ef17cad?w=800&q=60',
  },
  {
    title: 'Flight Data Analytics at Scale — Hadoop on AWS',
    period: 'Nov — Dec 2025',
    desc: 'What happens when you throw 118.9 million flight records at a 6-node cluster? Built a distributed analytics pipeline on AWS EC2 with Hadoop MapReduce — achieved 100% data-local execution and a 2.73x speedup over baseline.',
    stack: ['Java', 'Hadoop', 'AWS EC2', 'MapReduce'],
    link: 'https://github.com/VineetV2/hadoop-flight-data-analysis',
    stats: [
      { value: '118.9M', label: 'Records' },
      { value: '11.66 GB', label: 'Dataset' },
      { value: '2.73x', label: 'Speedup' },
    ],
    featured: false,
    image: 'https://images.unsplash.com/photo-1644673640991-f3c4a9dafe9a?w=800&q=60',
  },
  {
    title: 'Personal Portfolio — vineetvora.dev',
    period: 'Feb 2026',
    desc: 'Designed and built a distinctive dark-themed portfolio from scratch — featuring canvas particle networks, kinetic typography, magnetic hover effects, and a custom cursor.',
    stack: ['React', 'Tailwind', 'Framer Motion'],
    link: 'https://github.com/VineetV2/portfolio',
    stats: [],
    featured: false,
    image: null,
  },
  {
    title: 'Face-Based Attendance System — YOLO + FaceNet',
    period: '2024',
    desc: 'Replaced manual roll calls with real-time face detection and recognition. YOLO spots faces, FaceNet matches identities, and the system auto-generates attendance sheets — zero human intervention.',
    stack: ['Python', 'OpenCV', 'YOLO', 'FaceNet'],
    link: 'https://github.com/VineetV2/Face-Based-Attendance-Automation',
    stats: [],
    featured: false,
    image: 'https://images.unsplash.com/photo-1594085087803-e65bf4e3f8d6?w=800&q=60',
  },
];

const ProjectCard = ({ project, index, isInView }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      data-testid={`project-card-${index}`}
      className={`project-card glass-card rounded-2xl overflow-hidden block hoverable ${
        project.featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image area */}
      {project.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void-100 via-void-100/60 to-transparent" />
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Period */}
        <span className="font-mono text-xs text-slate-500 tracking-wide block mb-3">
          {project.period}
        </span>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg md:text-xl text-white mb-3 flex items-start gap-2 leading-tight">
          {project.title}
          <ArrowUpRight
            size={18}
            className="shrink-0 mt-1 text-accent opacity-0 -translate-x-2 transition-all duration-300"
            style={{
              opacity: hovered ? 1 : 0,
              transform: hovered ? 'translate(0,0)' : 'translate(-8px, 8px)',
            }}
          />
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed mb-5">
          {project.desc}
        </p>

        {/* Stats */}
        {project.stats.length > 0 && (
          <div className="flex gap-6 mb-5">
            {project.stats.map((s, i) => (
              <div key={i}>
                <span className="block font-heading font-bold text-xl text-accent">{s.value}</span>
                <span className="text-xs font-mono text-slate-500 tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stack */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono text-slate-400 border border-white/[0.08] rounded-full hover:border-accent/30 hover:text-accent transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link */}
        <div className="mt-5 flex items-center gap-2 text-sm font-mono text-slate-500 group-hover:text-accent transition-colors">
          <ExternalLink size={14} />
          <span>View on GitHub</span>
        </div>
      </div>
    </motion.a>
  );
};

const ProjectGallery = () => {
  const [ref, isInView] = useInView({ threshold: 0.05 });

  return (
    <section id="projects" data-testid="projects-section" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader number="02" title="Projects" />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGallery;
