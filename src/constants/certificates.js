import { FaCertificate, FaAward, FaMedal, FaTrophy } from 'react-icons/fa';

const certificates = [
  {
    id: 1,
    title: "Software Engineering Job Simulation",
    issuer: "Accenture North America",
    platform: "Forage",
    date: "2025",
    type: "Professional Simulation",
    category: "Software Engineering",
    description: "Completed a comprehensive software engineering job simulation, gaining hands-on experience with real-world development practices and methodologies used at Accenture.",
    skills: ["Software Development", "Project Management", "Problem Solving", "Team Collaboration"],
    icon: FaCertificate,
    color: "from-blue-500 to-indigo-600",
    certificateUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/nWHPnWj8YqGJh5kQB/8XSySTLv68WYeFhke_nWHPnWj8YqGJh5kQB_cyYPqQobdzBpcm33A_1753913275236_completion_certificate.pdf",
    credentialId: "nWHPnWj8YqGJh5kQB"
  },
  {
    id: 2,
    title: "Cybersecurity Job Simulation",
    issuer: "Mastercard",
    platform: "Forage",
    date: "2025",
    type: "Professional Simulation",
    category: "Cybersecurity",
    description: "Successfully completed Mastercard's cybersecurity simulation, focusing on threat detection, security analysis, and risk management practices in financial services.",
    skills: ["Cybersecurity", "Threat Analysis", "Risk Management", "Security Protocols"],
    icon: FaAward,
    color: "from-red-500 to-pink-600",
    certificateUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_cyYPqQobdzBpcm33A_1753996998246_completion_certificate.pdf",
    credentialId: "ifobHAoMjQs9s6bKS"
  },
  {
    id: 3,
    title: "Technology Consulting Job Simulation", 
    issuer: "Deloitte Australia",
    platform: "Forage",
    date: "2024",
    type: "Professional Simulation",
    category: "Technology Consulting",
    description: "Participated in Deloitte's technology consulting simulation, working on strategic technology solutions and client-facing consulting scenarios.",
    skills: ["Technology Consulting", "Strategic Planning", "Client Communication", "Business Analysis"],
    icon: FaMedal,
    color: "from-green-500 to-emerald-600",
    certificateUrl: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_cyYPqQobdzBpcm33A_1749648386609_completion_certificate.pdf",
    credentialId: "9PBTqmSxAf6zZTseP"
  },
  {
    id: 4,
    title: "Professional Development Certificate",
    issuer: "NullClass",
    platform: "NullClass",
    date: "2024",
    type: "Professional Development",
    category: "Skill Development",
    description: "Completed comprehensive professional development program focusing on technical skills enhancement and career growth in technology sector.",
    skills: ["Professional Development", "Technical Skills", "Career Growth", "Industry Knowledge"],
    icon: FaTrophy,
    color: "from-purple-500 to-violet-600",
    certificateUrl: "https://www.nullclass.com/certificates/68711a785d98612df0c38280",
    credentialId: "68711a785d98612df0c38280"
  }
];

const certificateCategories = [
  "All",
  "Software Engineering", 
  "Cybersecurity",
  "Technology Consulting",
  "Skill Development"
];

const certificateStats = {
  total: certificates.length,
  byCategory: {
    "Software Engineering": 1,
    "Cybersecurity": 1,
    "Technology Consulting": 1,
    "Skill Development": 1
  },
  byYear: {
    "2024": 2,
    "2025": 2
  }
};

export { certificates, certificateCategories, certificateStats };
