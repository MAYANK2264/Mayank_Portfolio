import { FaBriefcase, FaGraduationCap, FaCertificate } from 'react-icons/fa';

export const experiences = [
  {
    type: 'work',
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    description: "Led development of cloud-based enterprise applications using React, Node.js, and AWS. Improved system performance by 40% through optimization.",
    date: "2021 - Present",
    icon: FaBriefcase,
    tags: ["React", "Node.js", "AWS", "MongoDB"]
  },
  {
    type: 'work',
    title: "Frontend Developer",
    company: "Digital Solutions Ltd.",
    location: "Remote",
    description: "Developed responsive web applications using React and TypeScript. Implemented CI/CD pipelines and reduced deployment time by 60%.",
    date: "2019 - 2021",
    icon: FaBriefcase,
    tags: ["React", "TypeScript", "CI/CD", "Jest"]
  },
  {
    type: 'education',
    title: "Master of Computer Science",
    company: "Stanford University",
    location: "Stanford, CA",
    description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors.",
    date: "2017 - 2019",
    icon: FaGraduationCap,
    tags: ["AI", "ML", "Computer Vision"]
  },
  {
    type: 'education',
    title: "Bachelor of Computer Science",
    company: "MIT",
    location: "Cambridge, MA",
    description: "Major in Computer Science with minor in Mathematics. Dean's List all semesters.",
    date: "2013 - 2017",
    icon: FaGraduationCap,
    tags: ["Computer Science", "Mathematics"]
  },
  {
    type: 'certification',
    title: "AWS Solutions Architect Professional",
    company: "Amazon Web Services",
    location: "Online",
    description: "Advanced certification in AWS architecture and cloud solutions design.",
    date: "2022",
    icon: FaCertificate,
    tags: ["AWS", "Cloud Architecture"]
  },
  {
    type: 'certification',
    title: "Google Cloud Professional Developer",
    company: "Google",
    location: "Online",
    description: "Professional certification in Google Cloud Platform development and architecture.",
    date: "2021",
    icon: FaCertificate,
    tags: ["GCP", "Cloud Development"]
  }
];

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