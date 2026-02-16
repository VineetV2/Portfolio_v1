import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../../hooks/useAnimations';
import SectionHeader from '../ui/SectionHeader';
import { ExternalLink, Award, Container, Settings, GraduationCap } from 'lucide-react';

const certs = [
  {
    title: 'Enterprise Design Thinking Practitioner',
    issuer: 'IBM',
    link: 'https://www.credly.com/badges/178d0bcd-a564-415e-946b-55ae80919773/linked_in_profile',
    icon: Award,
    color: '#0EF6CC',
  },
  {
    title: 'Learning Docker',
    issuer: 'LinkedIn Learning',
    link: 'https://www.linkedin.com/learning/certificates/be61061acd8839a081f6c70c82ad61d6c1dc2d76b8181911ee5fd287304fff64',
    icon: Container,
    color: '#3B82F6',
  },
  {
    title: 'Practical GitHub Actions',
    issuer: 'LinkedIn Learning',
    link: 'https://www.linkedin.com/learning/certificates/aa7454ec87b189acbff38903a542e301c10d5abfab94d857196df558f53ec309',
    icon: Settings,
    color: '#A78BFA',
  },
  {
    title: 'Full-Stack Developer Program',
    issuer: 'Ethnus · VRPQJ5PC',
    link: 'https://ethnus.com/certverify',
    icon: GraduationCap,
    color: '#F59E0B',
  },
];

const Certifications = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="certifications" data-testid="certifications-section" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader number="07" title="Certifications" />

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certs.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                data-testid={`cert-card-${i}`}
                className="glass-card rounded-xl p-6 group hover:border-white/[0.1] transition-all duration-300 hoverable block"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${cert.color}10` }}
                >
                  <Icon size={18} style={{ color: cert.color }} />
                </div>

                <h4 className="font-heading font-semibold text-sm text-white mb-1 leading-tight">
                  {cert.title}
                </h4>
                <p className="text-xs text-slate-500 font-mono mb-3">{cert.issuer}</p>

                <div className="flex items-center gap-1 text-xs text-slate-500 group-hover:text-accent transition-colors">
                  <ExternalLink size={12} />
                  <span>Verify</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
