import { FaReact, FaNode, FaAws, FaDocker } from 'react-icons/fa';
import { SiMongodb, SiTypescript, SiTailwindcss, SiFirebase } from 'react-icons/si';

const projects = [
  {
    name: "SkySync Weather App",
    description: "A real-time weather dashboard with 98% accuracy using OpenWeather API and GeminiAI-based alerts. Features user authentication with Clerk and uses Drizzle ORM + PostgreSQL to store 100+ location queries.",
    tags: [
      {
        name: "next.js",
        color: "blue-text-gradient",
      },
      {
        name: "gemini-ai",
        color: "green-text-gradient",
      },
      {
        name: "postgresql",
        color: "pink-text-gradient",
      },
      {
        name: "tailwind",
        color: "blue-text-gradient",
      },
      {
        name: "clerk",
        color: "green-text-gradient",
      },
    ],
    image: "/projects/skysync.png",
    source_code_link: "https://github.com/MAYANK2264/skysync",
    live_demo_link: "https://skysyncweatherforecasting.netlify.app/",
  },
  {
    name: "YourPlaces",
    description: "A social geo-tagging platform allowing users to share 200+ locations with photos. Features CRUD operations, Firebase file storage, and dynamic location tagging via Ola Maps API.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "firebase",
        color: "pink-text-gradient",
      },
      {
        name: "ola-maps",
        color: "blue-text-gradient",
      },
    ],
    image: "/projects/yourplaces.png",
    source_code_link: "https://github.com/MAYANK2264/yourplaces",
    live_demo_link: "https://yourplaces1733.netlify.app/",
  },
  {
    name: "JARVIS AI Assistant",
    description: "An offline desktop assistant supporting voice commands, file automation, and GPT-style Q&A. Integrated Mistral 7B + GPT4All for LLM tasks with zero API dependence.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "mistral-7b",
        color: "green-text-gradient",
      },
      {
        name: "gpt4all",
        color: "pink-text-gradient",
      },
    ],
    image: "/projects/jarvis.png",
    source_code_link: "https://github.com/MAYANK2264/jarvis-ai-assistant",
    live_demo_link: "https://jarvis-website-deploy-ppf5u741n-mayank2264s-projects.vercel.app",
  },
];

export { projects }; 