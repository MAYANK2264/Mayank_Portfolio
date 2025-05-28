import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import { experiences, experienceTypes } from '../constants/experiences';

const ExperienceCard = ({ experience }) => {
  const type = experienceTypes[experience.type];
  
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'rgb(var(--color-bg-alt))',
        color: '#fff',
        boxShadow: 'none',
        border: '2px solid rgba(99, 102, 241, 0.2)',
        padding: '2rem',
      }}
      contentArrowStyle={{ borderRight: '7px solid rgba(99, 102, 241, 0.2)' }}
      date={experience.date}
      iconStyle={{ background: type.color }}
      icon={<experience.icon />}
    >
      <div>
        <h3 className="text-xl font-bold">{experience.title}</h3>
        <p className="text-secondary text-base font-semibold">
          {experience.company} • {experience.location}
        </p>
        <p className="mt-4 text-secondary text-sm leading-relaxed">
          {experience.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredExperiences = activeFilter === 'all'
    ? experiences
    : experiences.filter(exp => exp.type === activeFilter);

  return (
    <div className="relative z-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-center mb-4">
            My Journey
          </h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            A timeline of my professional experience, education, and certifications
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${activeFilter === 'all'
                ? 'bg-indigo-500 text-white'
                : 'bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20'
              }`}
          >
            All
          </button>
          {Object.entries(experienceTypes).map(([key, { title }]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${activeFilter === key
                  ? 'bg-indigo-500 text-white'
                  : 'bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20'
                }`}
            >
              {title}
            </button>
          ))}
        </div>

        <VerticalTimeline lineColor="rgba(99, 102, 241, 0.2)">
          {filteredExperiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </motion.div>
    </div>
  );
};

export default Experience; 