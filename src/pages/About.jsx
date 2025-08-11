import { FaCode, FaLightbulb, FaRocket, FaUserGraduate } from 'react-icons/fa';

const AboutCard = ({ icon: Icon, title, description, delay }) => (
  <div
    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
        <Icon className="w-6 h-6 text-purple-600 dark:text-purple-300" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

const About = () => {
  return (
    <div 
      className="min-h-screen py-16 px-4"
    >
      <div
        className="max-w-6xl mx-auto"
      >
        {/* Hero Section with Brand Statement */}
        <div
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Transforming Ideas into Reality
          </h1>
          <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Software engineer with a passion for building scalable applications and solving complex problems.
            Specializing in full-stack development and cloud architecture.
          </p>
        </div>

        {/* Key Achievements */}
        <div 
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <div className="bg-[rgb(var(--color-bg-alt))] p-8 rounded-2xl border-2 border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">Professional Impact</h2>
            <ul className="space-y-4 text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 text-xl">•</span>
                <span>Led development of enterprise applications, improving system performance by 40%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 text-xl">•</span>
                <span>Implemented CI/CD pipelines reducing deployment time by 60%</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-400 text-xl">•</span>
                <span>Mentored junior developers and led technical training sessions</span>
              </li>
            </ul>
          </div>
          <div className="bg-[rgb(var(--color-bg-alt))] p-8 rounded-2xl border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Technical Expertise</h2>
            <ul className="space-y-4 text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">•</span>
                <span>Full-stack development with React, Node.js, and modern frameworks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">•</span>
                <span>Cloud architecture and deployment using AWS and Docker</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">•</span>
                <span>Database design and optimization (SQL and NoSQL)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Education & Certifications */}
        <div
          className="mb-16"
        >
          <div className="bg-[rgb(var(--color-bg-alt))] p-8 rounded-2xl border-2 border-pink-500/20 hover:border-pink-500/40 transition-colors">
            <h2 className="text-2xl font-bold mb-6 text-pink-400">Education & Certifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Academic Background</h3>
                <ul className="space-y-4 text-secondary">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 text-xl">•</span>
                    <div>
                      <p className="font-medium">Bachelor of Computer Science</p>
                      <p className="text-sm">Top University, 2018-2022</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 text-xl">•</span>
                    <div>
                      <p className="font-medium">Data Structures & Algorithms</p>
                      <p className="text-sm">Advanced Coursework</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Professional Certifications</h3>
                <ul className="space-y-4 text-secondary">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 text-xl">•</span>
                    <div>
                      <p className="font-medium">AWS Solutions Architect</p>
                      <p className="text-sm">Amazon Web Services, 2023</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-400 text-xl">•</span>
                    <div>
                      <p className="font-medium">Professional Scrum Master</p>
                      <p className="text-sm">Scrum.org, 2023</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Career Goals */}
        <div
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="bg-[rgb(var(--color-bg-alt))] p-6 rounded-2xl border-2 border-indigo-500/20 hover:border-indigo-500/40 transition-colors">
            <h3 className="text-xl font-bold mb-3 text-indigo-400">Innovation Focus</h3>
            <p className="text-secondary">
              Passionate about emerging technologies and their potential to transform industries. Always exploring new ways to solve complex problems.
            </p>
          </div>
          <div className="bg-[rgb(var(--color-bg-alt))] p-6 rounded-2xl border-2 border-purple-500/20 hover:border-purple-500/40 transition-colors">
            <h3 className="text-xl font-bold mb-3 text-purple-400">Team Leadership</h3>
            <p className="text-secondary">
              Experienced in leading development teams and mentoring junior developers. Strong focus on collaboration and knowledge sharing.
            </p>
          </div>
          <div className="bg-[rgb(var(--color-bg-alt))] p-6 rounded-2xl border-2 border-pink-500/20 hover:border-pink-500/40 transition-colors">
            <h3 className="text-xl font-bold mb-3 text-pink-400">Continuous Growth</h3>
            <p className="text-secondary">
              Committed to continuous learning and staying updated with industry best practices and emerging technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 