import { FaReact, FaNode, FaAws, FaDocker } from 'react-icons/fa';
import { SiMongodb, SiTypescript, SiTailwindcss, SiFirebase } from 'react-icons/si';

export const projects = [
  {
    title: "AI-Powered Task Manager",
    description: "Smart task management application with AI-driven prioritization, real-time collaboration, and automated scheduling features.",
    image: "/projects/task-manager.jpg",
    tags: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Node.js", icon: FaNode, color: "#339933" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" }
    ],
    source_code: "https://github.com/yourusername/ai-task-manager",
    live_demo: "https://ai-task-manager.demo.com",
    highlights: [
      "AI-powered task prioritization",
      "Real-time collaboration features",
      "Automated scheduling system",
      "Interactive dashboard with analytics"
    ]
  },
  {
    title: "E-Commerce Platform",
    description: "Full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.",
    image: "/projects/ecommerce.jpg",
    tags: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Node.js", icon: FaNode, color: "#339933" },
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" }
    ],
    source_code: "https://github.com/yourusername/ecommerce-platform",
    live_demo: "https://ecommerce-platform.demo.com",
    highlights: [
      "Real-time inventory tracking",
      "Secure payment processing",
      "Admin dashboard with analytics",
      "Mobile-responsive design"
    ]
  },
  {
    title: "Cloud File Manager",
    description: "Secure cloud storage solution with file sharing, version control, and real-time collaboration capabilities.",
    image: "/projects/cloud-manager.jpg",
    tags: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Docker", icon: FaDocker, color: "#2496ED" }
    ],
    source_code: "https://github.com/yourusername/cloud-file-manager",
    live_demo: "https://cloud-manager.demo.com",
    highlights: [
      "End-to-end encryption",
      "Real-time collaboration",
      "Version control system",
      "Cross-platform compatibility"
    ]
  },
  {
    title: "Social Media Analytics",
    description: "Advanced analytics platform for social media management with AI-powered insights and automated reporting.",
    image: "/projects/social-analytics.jpg",
    tags: [
      { name: "React", icon: FaReact, color: "#61DAFB" },
      { name: "Node.js", icon: FaNode, color: "#339933" },
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" }
    ],
    source_code: "https://github.com/yourusername/social-analytics",
    live_demo: "https://social-analytics.demo.com",
    highlights: [
      "AI-powered trend analysis",
      "Automated report generation",
      "Real-time data visualization",
      "Multi-platform integration"
    ]
  }
]; 