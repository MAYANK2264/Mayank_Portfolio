import { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { experiences, experienceTypes } from '../constants/experiences';
import SpaceEnvironment from '../components/SpaceEnvironment';

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
      icon={<type.icon className="w-3.5 h-3.5" />}
    >
      <div>
        <h3 className="text-xl font-bold">{experience.title}</h3>
        <p className="text-secondary text-base font-semibold mt-1">
          {experience.company} • {experience.location}
        </p>
        <p className="mt-4 text-secondary text-sm leading-relaxed">
          {experience.description}
        </p>
        
        <ul className="mt-4 list-disc list-inside space-y-2">
          {experience.points.map((point, index) => (
            <li key={index} className="text-sm text-secondary leading-relaxed pl-2">
              {point}
            </li>
          ))}
        </ul>

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
    <div className="relative">
      <SpaceEnvironment />
      <div 
        className="relative z-10 min-h-screen py-16 px-4"
      >
        <div
        >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
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
        </div>
      </div>
    </div>
  );
};

export default Experience; 