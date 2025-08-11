import { skillCategories } from '../constants/skills';
import { BiBrain } from 'react-icons/bi';
import { FaTools } from 'react-icons/fa';
import { AiOutlineCode } from 'react-icons/ai';
import SpaceEnvironment from '../components/SpaceEnvironment';

const CategoryIcon = ({ category }) => {
  switch (category) {
    case "Technical Skills":
      return <AiOutlineCode className="w-6 h-6" />;
    case "Soft Skills":
      return <BiBrain className="w-6 h-6" />;
    case "Tools & Platforms":
      return <FaTools className="w-6 h-6" />;
    default:
      return null;
  }
};

const ProgressBar = ({ level, color }) => (
  <div className="h-2 w-full bg-gray-700/50 rounded-full overflow-hidden">
    <div
      className="h-full rounded-full transition-all duration-1000 ease-out"
      style={{ 
        width: `${level}%`,
        backgroundColor: color || '#6366f1',
        boxShadow: `0 0 10px ${color || '#6366f1'}40`
      }}
    />
  </div>
);

const SkillCard = ({ skill, isToolCard = false }) => {
  const Icon = skill.icon;
  
  return (
    <div
      className="bg-[rgb(var(--color-bg-alt))] rounded-xl p-4 border-2 border-indigo-500/20 hover:border-indigo-500/40 transition-all"
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div
            className="p-3 rounded-lg"
            style={{ 
              backgroundColor: `${skill.color}15`,
              color: skill.color 
            }}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
          <p className="text-secondary text-sm mb-3">{skill.description}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-secondary">Proficiency</span>
              <span className="text-indigo-400">{skill.level}%</span>
            </div>
            <ProgressBar level={skill.level} color={skill.color} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SoftSkillCard = ({ skill }) => (
  <div
    className="bg-[rgb(var(--color-bg-alt))] rounded-xl p-4 border-2 border-purple-500/20 hover:border-purple-500/40 transition-all"
  >
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{skill.name}</h3>
        <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400">
          {skill.category}
        </span>
      </div>
      <p className="text-secondary text-sm">{skill.description}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-secondary">Proficiency</span>
          <span className="text-purple-400">{skill.level}%</span>
        </div>
        <ProgressBar level={skill.level} color="#A855F7" />
      </div>
    </div>
  </div>
);

const SkillCategory = ({ category, index }) => (
  <div
    className="mb-16 last:mb-0"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className={`p-3 rounded-lg ${
        index === 0 ? 'bg-indigo-500/10 text-indigo-400' :
        index === 1 ? 'bg-purple-500/10 text-purple-400' :
        'bg-pink-500/10 text-pink-400'
      }`}>
        <CategoryIcon category={category.title} />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{category.title}</h2>
        <p className="text-secondary">{category.subtitle}</p>
      </div>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {category.skills.map((skill, skillIndex) => (
        category.title === "Soft Skills" ? (
          <SoftSkillCard key={skillIndex} skill={skill} />
        ) : (
          <SkillCard key={skillIndex} skill={skill} isToolCard={category.title === "Tools & Platforms"} />
        )
      ))}
    </div>
  </div>
);

const Skills = () => {
  return (
    <div className="relative">
      <SpaceEnvironment />
      <div
        className="min-h-screen py-16 px-4 relative z-10"
      >
        <div
          className="max-w-7xl mx-auto"
        >
        {/* Header */}
        <div
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Skills & Expertise
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            A comprehensive overview of my technical abilities, soft skills, and proficiency with various tools
          </p>
        </div>

        {/* Skill Categories */}
        {skillCategories.map((category, index) => (
          <SkillCategory key={index} category={category} index={index} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
