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

export const skillCategories = [
  {
    title: "Technical Skills",
    subtitle: "Programming Languages & Frameworks",
    skills: [
      {
        name: "HTML5/CSS3",
        icon: FaHtml5,
        level: 95,
        color: "#E34F26",
        description: "Semantic HTML, CSS3, Responsive Design"
      },
      {
        name: "JavaScript",
        icon: FaJs,
        level: 90,
        color: "#F7DF1E",
        description: "ES6+, DOM Manipulation, Async Programming"
      },
      {
        name: "React",
        icon: FaReact,
        level: 92,
        color: "#61DAFB",
        description: "Hooks, Context, Custom Hooks"
      },
      {
        name: "TypeScript",
        icon: SiTypescript,
        level: 85,
        color: "#3178C6",
        description: "Type Safety, Interfaces, Generics"
      },
      {
        name: "Node.js",
        icon: FaNodeJs,
        level: 88,
        color: "#339933",
        description: "Express, REST APIs, Authentication"
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        level: 90,
        color: "#06B6D4",
        description: "Responsive Design, Custom Themes"
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        level: 85,
        color: "#47A248",
        description: "Schema Design, Aggregation, Indexing"
      },
      {
        name: "Redux",
        icon: SiRedux,
        level: 88,
        color: "#764ABC",
        description: "State Management, Redux Toolkit"
      }
    ]
  },
  {
    title: "Soft Skills",
    subtitle: "Professional & Interpersonal Abilities",
    skills: [
      {
        name: "Problem Solving",
        level: 95,
        description: "Analytical thinking, Creative solutions",
        category: "Critical Thinking"
      },
      {
        name: "Team Leadership",
        level: 90,
        description: "Project coordination, Team mentoring",
        category: "Leadership"
      },
      {
        name: "Communication",
        level: 92,
        description: "Technical writing, Presentation skills",
        category: "Communication"
      },
      {
        name: "Collaboration",
        level: 95,
        description: "Cross-functional teamwork, Pair programming",
        category: "Teamwork"
      },
      {
        name: "Adaptability",
        level: 88,
        description: "Quick learning, Flexibility",
        category: "Growth"
      },
      {
        name: "Time Management",
        level: 90,
        description: "Project planning, Task prioritization",
        category: "Organization"
      }
    ]
  },
  {
    title: "Tools & Platforms",
    subtitle: "Development & Collaboration Tools",
    skills: [
      {
        name: "VS Code",
        icon: VscCode,
        level: 95,
        color: "#007ACC",
        description: "Extensions, Debugging, Custom Settings"
      },
      {
        name: "Git",
        icon: FaGitAlt,
        level: 92,
        color: "#F05032",
        description: "Version Control, Branching Strategies"
      },
      {
        name: "Docker",
        icon: FaDocker,
        level: 85,
        color: "#2496ED",
        description: "Containerization, Docker Compose"
      },
      {
        name: "AWS",
        icon: FaAws,
        level: 82,
        color: "#FF9900",
        description: "EC2, S3, Lambda, CloudFront"
      },
      {
        name: "Figma",
        icon: FaFigma,
        level: 88,
        color: "#F24E1E",
        description: "UI Design, Prototyping, Components"
      },
      {
        name: "Postman",
        icon: SiPostman,
        level: 90,
        color: "#FF6C37",
        description: "API Testing, Collections, Environments"
      },
      {
        name: "Webpack",
        icon: SiWebpack,
        level: 85,
        color: "#8DD6F9",
        description: "Module Bundling, Optimization"
      },
      {
        name: "Firebase",
        icon: SiFirebase,
        level: 88,
        color: "#FFCA28",
        description: "Authentication, Hosting, Real-time DB"
      }
    ]
  }
]; 