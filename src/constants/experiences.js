import { FaBriefcase, FaGraduationCap, FaCertificate } from 'react-icons/fa';

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "Ecub",
    location: "Remote",
    type: "work",
    icon: FaBriefcase,
    description: "Developed automated testing pipelines and contributed to a mental wellness platform using MERN stack.",
    date: "Jun 2024 - Aug 2024",
    tags: ["Python", "PowerShell", "Jenkins", "React.js", "Node.js", "MongoDB"],
    points: [
      "Developed automated unit testing pipeline using Python & PowerShell; reduced manual QA time by 40%.",
      "Implemented CI/CD workflows via Jenkins; deployed firmware, aggregated XML logs, and created web-based visual dashboards using HTML/CSS.",
      "Collaboratively built XHaustion – a mental wellness productivity platform using MERN stack (React.js, Node.js, Express.js, MongoDB).",
      "Live Demo: https://xh-austion-main-p1s575qst-mayank2264s-projects.vercel.app/",
    ],
  },
  {
    title: "Chief Executive",
    company: "INDOMINUS Sports Club",
    location: "IIIT Surat",
    type: "work",
    icon: FaBriefcase,
    description: "Led a 40+ member sports club, organizing events and managing large-scale tournaments.",
    date: "Aug 2024 - Present",
    tags: ["Leadership", "Event Management", "Budget Planning", "Team Coordination"],
    points: [
      "Managed a 40+ member club, organized 10+ events including esports, sports fests, and orientation drives.",
      "Directed ₹80k+ budget and logistics for the 5-day IIIT Surat Sports Tournament with 400+ participants.",
      "Led delegation of 81 students to Inter-IIIT Gwalior, handling ticketing, food, and accommodation coordination.",
    ],
  },
  {
    title: "B.Tech in Computer Science",
    company: "Indian Institute of Information Technology, Surat",
    location: "Surat, Gujarat",
    type: "education",
    icon: FaGraduationCap,
    description: "Pursuing B.Tech in Computer Science with focus on software development and AI/ML.",
    date: "Dec 2022 - Jun 2026",
    tags: ["Computer Science", "Software Engineering", "AI/ML", "Data Structures"],
    points: [
      "Maintaining a strong academic record with focus on computer science fundamentals",
      "Active participant in coding competitions and hackathons",
      "Core member of the college's technical community",
    ],
  },
  {
    title: "Full Stack Development",
    company: "Udemy",
    location: "Online",
    type: "certification",
    icon: FaCertificate,
    description: "Comprehensive certification in modern full-stack web development.",
    date: "Jan 2024",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "REST APIs"],
    points: [
      "Mastered MERN stack development with practical projects",
      "Implemented authentication, API integration, and database management",
      "Created responsive and accessible web applications",
    ],
  },
];

export { experiences };

export const experienceTypes = {
  work: {
    icon: FaBriefcase,
    color: "#6366f1", // Indigo
    title: "Work Experience"
  },
  education: {
    icon: FaGraduationCap,
    color: "#8b5cf6", // Purple
    title: "Education"
  },
  certification: {
    icon: FaCertificate,
    color: "#d946ef", // Fuchsia
    title: "Certifications"
  }
}; 