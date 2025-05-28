import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaFigma,
  FaAws,
  FaJira,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiRedux,
  SiPostman,
  SiWebpack,
  SiFirebase,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

const skillCategories = [
  {
    title: "Technical Skills",
    subtitle: "Programming languages and frameworks I work with",
    skills: [
      {
        name: "React.js",
        description: "Building modern web applications with React and its ecosystem",
        level: 90,
        color: "#61DAFB",
        icon: FaReact
      },
      {
        name: "JavaScript",
        description: "Modern JavaScript (ES6+) development and best practices",
        level: 85,
        color: "#F7DF1E",
        icon: FaJs
      },
      {
        name: "Node.js",
        description: "Server-side JavaScript and API development",
        level: 80,
        color: "#339933",
        icon: FaNodeJs
      },
      {
        name: "TypeScript",
        description: "Type-safe JavaScript development",
        level: 75,
        color: "#3178C6",
        icon: SiTypescript
      },
      {
        name: "HTML5/CSS3",
        description: "Modern web development and responsive design",
        level: 90,
        color: "#E34F26",
        icon: FaHtml5
      }
    ]
  },
  {
    title: "Soft Skills",
    subtitle: "Personal and professional attributes",
    skills: [
      {
        name: "Problem Solving",
        description: "Analytical thinking and creative solution finding",
        level: 90,
        category: "Critical Thinking"
      },
      {
        name: "Team Leadership",
        description: "Leading and motivating development teams",
        level: 85,
        category: "Leadership"
      },
      {
        name: "Communication",
        description: "Clear and effective technical communication",
        level: 88,
        category: "Interpersonal"
      }
    ]
  },
  {
    title: "Tools & Platforms",
    subtitle: "Development tools and platforms I'm proficient with",
    skills: [
      {
        name: "Git & GitHub",
        description: "Version control and collaborative development",
        level: 90,
        color: "#F05032",
        icon: FaGitAlt
      },
      {
        name: "Docker",
        description: "Containerization and deployment",
        level: 75,
        color: "#2496ED",
        icon: FaDocker
      },
      {
        name: "MongoDB",
        description: "NoSQL database design and management",
        level: 80,
        color: "#47A248",
        icon: SiMongodb
      },
      {
        name: "AWS",
        description: "Cloud infrastructure and services",
        level: 70,
        color: "#FF9900",
        icon: FaAws
      },
      {
        name: "Figma",
        description: "UI/UX design and prototyping",
        level: 85,
        color: "#F24E1E",
        icon: FaFigma
      }
    ]
  }
];

export { skillCategories }; 