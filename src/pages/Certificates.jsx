import { useState } from 'react';
import { FaExternalLinkAlt, FaDownload, FaCalendarAlt, FaUser, FaTags, FaCertificate } from 'react-icons/fa';
import SpaceEnvironment from '../components/SpaceEnvironment';
import { certificates, certificateCategories, certificateStats } from '../constants/certificates';

const CertificateCard = ({ certificate, index }) => {
  const IconComponent = certificate.icon;
  
  return (
    <div
      className="bg-[rgb(var(--color-bg-alt))] rounded-2xl overflow-hidden border-2 border-gray-500/20 hover:border-gray-400/40 transition-all transform hover:-translate-y-2 group"
    >
      {/* Header with gradient and icon */}
      <div className={`bg-gradient-to-r ${certificate.color} p-6 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <IconComponent className="w-full h-full" />
        </div>
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <span className="text-white/80 text-sm font-medium bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              {certificate.type}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
            {certificate.title}
          </h3>
          <div className="flex items-center text-white/90 text-sm">
            <FaUser className="w-4 h-4 mr-2" />
            <span className="font-medium">{certificate.issuer}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-secondary mb-4 leading-relaxed">
          {certificate.description}
        </p>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex items-center mb-3">
            <FaTags className="w-4 h-4 text-indigo-400 mr-2" />
            <span className="text-sm font-semibold text-indigo-400">Skills Gained</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {certificate.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Footer with date and actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-500/20">
          <div className="flex items-center text-secondary text-sm">
            <FaCalendarAlt className="w-4 h-4 mr-2" />
            <span>{certificate.date}</span>
            <span className="mx-2">•</span>
            <span className="text-indigo-400">{certificate.platform}</span>
          </div>
          
          <div className="flex gap-2">
            <a
              href={certificate.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-lg transition-colors"
            >
              <FaExternalLinkAlt className="w-3 h-3" />
              View Certificate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, description, icon: IconComponent, color }) => (
  <div
    className="bg-[rgb(var(--color-bg-alt))] p-6 rounded-xl border-2 border-gray-500/20 hover:border-gray-400/40 transition-colors"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 bg-gradient-to-r ${color} rounded-lg`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white">{value}</h3>
        <p className="text-lg font-semibold text-gray-300">{title}</p>
        <p className="text-sm text-secondary">{description}</p>
      </div>
    </div>
  </div>
);

const Certificates = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCertificates = certificates.filter(cert => 
    activeCategory === "All" ? true : cert.category === activeCategory
  );

  return (
    <div className="relative">
      <SpaceEnvironment />
      <div
        className="min-h-screen py-16 px-4 relative z-10"
      >
        <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Professional Certificates
          </h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            A showcase of my professional development journey through industry-recognized certifications 
            and hands-on learning experiences with top-tier companies.
          </p>
        </div>

        {/* Stats Section */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <StatsCard
            title="Total Certificates"
            value={certificateStats.total}
            description="Professional certifications earned"
            icon={FaCertificate}
            color="from-blue-500 to-indigo-600"
          />
          <StatsCard
            title="Latest Achievement"
            value="2025"
            description="Most recent certification year"
            icon={FaCalendarAlt}
            color="from-green-500 to-emerald-600"
          />
          <StatsCard
            title="Categories"
            value={Object.keys(certificateStats.byCategory).length}
            description="Different skill areas covered"
            icon={FaTags}
            color="from-purple-500 to-violet-600"
          />
        </div>

        {/* Category Filter */}
        <div
          className="flex justify-center gap-4 mb-12 flex-wrap"
        >
          {certificateCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20"
              }`}
            >
              {category}
              {category !== "All" && (
                <span className="ml-2 text-xs opacity-75">
                  ({certificateStats.byCategory[category] || 0})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredCertificates.map((certificate, index) => (
            <CertificateCard 
              key={certificate.id} 
              certificate={certificate} 
              index={index}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div
          className="text-center mt-16 p-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">
            Continuous Learning Journey
          </h3>
          <p className="text-secondary mb-6 max-w-2xl mx-auto">
            I'm committed to staying current with industry trends and continuously expanding my skill set. 
            These certifications represent my dedication to professional growth and excellence.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all hover:scale-105"
          >
            Let's Connect
            <FaExternalLinkAlt className="w-4 h-4" />
          </a>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
