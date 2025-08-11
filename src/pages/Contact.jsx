import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import SpaceEnvironment from '../components/SpaceEnvironment';
import { getEmailjsConfig } from '../config/emailjs';

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Initialize EmailJS
  useEffect(() => {
    const config = getEmailjsConfig();
    if (config.publicKey && config.publicKey !== 'your_public_key_here') {
      emailjs.init(config.publicKey);
      console.log('EmailJS initialized successfully');
    } else {
      console.warn('EmailJS not configured. Please update your credentials in src/config/emailjs.js');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (status) setStatus(''); // Clear status when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    // Get EmailJS configuration
    const config = getEmailjsConfig();
    const { serviceId, templateId, publicKey } = config;

    if (!serviceId || !templateId || !publicKey || 
        serviceId === 'service_your_service_id' || 
        templateId === 'template_your_template_id' ||
        publicKey === 'your_public_key_here') {
      setStatus('error');
      alert('EmailJS is not properly configured. Please update your credentials in src/config/emailjs.js');
      setLoading(false);
      return;
    }

    try {
      const templateParams = {
        from_name: form.name,
        to_name: 'Mayank Chouhan',
        from_email: form.email,
        to_email: 'kmmayank08@gmail.com',
        message: form.message,
        reply_to: form.email,
      };

      console.log('Sending email with params:', templateParams);
      
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log('Email sent successfully:', response);

      setForm({
        name: '',
        email: '',
        message: '',
      });

      setStatus('success');
      alert('Thank you for your message! I will get back to you soon.');
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
      
      let errorMessage = 'Something went wrong. Please try again.';
      if (error.text) {
        errorMessage += ` Error: ${error.text}`;
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <SpaceEnvironment />
      <section
        className="min-h-screen py-20 relative z-10"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
              Get in Touch
            </h2>
            <p className="text-gray-300 text-center mb-12 text-lg">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 bg-black/20 backdrop-blur-sm border border-white/10 p-8 rounded-xl shadow-lg"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Let me know how I can help you"
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-300 backdrop-blur-sm resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            <div className="mt-12 text-center">
              <h3 className="text-xl font-semibold mb-4 text-white">Other Ways to Connect</h3>
              <div className="flex justify-center space-x-8">
                <a
                  href="https://github.com/MAYANK2264"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors text-lg"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/mayank-chouhan-a92466251"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-purple-400 transition-colors text-lg"
                >
                  LinkedIn
                </a>
                <a
                  href="mailto:kmmayank08@gmail.com"
                  className="text-gray-300 hover:text-purple-400 transition-colors text-lg"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 