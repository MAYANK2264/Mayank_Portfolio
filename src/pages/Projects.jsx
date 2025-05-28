import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard.",
    image: "/projects/ecommerce.png",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Full Stack",
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://demo-ecommerce.com",
    highlights: [
      "Implemented real-time inventory tracking",
      "Integrated Stripe payment gateway",
      "Built responsive admin dashboard",
      "Achieved 98% performance score"
    ]
  },
  {
    title: "AI Task Manager",
    description: "Smart task management application using AI to prioritize and categorize tasks automatically.",
    image: "/projects/taskmanager.png",
    tags: ["Python", "TensorFlow", "FastAPI", "React"],
    category: "Machine Learning",
    github: "https://github.com/yourusername/ai-task-manager",
    demo: "https://ai-taskmanager.com",
    highlights: [
      "Developed custom ML model for task categorization",
      "Implemented real-time task prioritization",
      "Built intuitive UI/UX design",
      "Reduced task organization time by 60%"
    ]
  },
  {
    title: "Cloud Cost Optimizer",
    description: "AWS cost optimization tool that analyzes resource usage and provides cost-saving recommendations.",
    image: "/projects/cloudoptimizer.png",
    tags: ["AWS", "Python", "React", "Docker"],
    category: "Cloud",
    github: "https://github.com/yourusername/cloud-optimizer",
    demo: "https://cloud-optimizer.com",
    highlights: [
      "Reduced cloud costs by 40%",
      "Real-time resource monitoring",
      "Automated cost optimization",
      "Custom reporting dashboard"
    ]
  }
];

const categories = ["All", "Full Stack", "Machine Learning", "Cloud"];

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[rgb(var(--color-bg-alt))] rounded-2xl overflow-hidden border-2 border-indigo-500/20 hover:border-indigo-500/40 transition-all transform hover:-translate-y-2"
    >
      <div className="relative overflow-hidden group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-indigo-500 rounded-full text-white hover:bg-indigo-600 transition-colors"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-purple-500 rounded-full text-white hover:bg-purple-600 transition-colors"
          >
            <FaExternalLinkAlt className="w-6 h-6" />
          </a>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {project.title}
        </h3>
        <p className="text-secondary mb-4">
          {project.description}
        </p>
        <div className="mb-4">
          <h4 className="font-semibold mb-2 text-indigo-400">Key Highlights:</h4>
          <ul className="list-disc list-inside space-y-1 text-secondary">
            {project.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter(project => 
    activeCategory === "All" ? true : project.category === activeCategory
  );

  return (
    <div className="min-h-screen py-16 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Featured Projects
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto">
            Explore my latest projects showcasing full-stack development, cloud architecture, and innovative solutions.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? "bg-indigo-500 text-white"
                  : "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects; 