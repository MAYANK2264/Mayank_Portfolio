import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "JavaScript Mastery",
          from_email: form.email,
          to_email: "kmmayank08@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-primary">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Contact Me
        </h2>
        
        <div className="bg-tertiary rounded-2xl p-8 shadow-card">
          <div className="text-white">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-lg text-gray-300">
                I'm currently looking for new opportunities and would love to hear from you.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-medium mb-4">Contact Information</h4>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <span className="text-teal-400">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    <span>Surat, Gujarat</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-teal-400">
                      <i className="fas fa-phone"></i>
                    </span>
                    <span>+91 8657176023</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-teal-400">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <a href="mailto:kmmayank08@gmail.com" className="hover:text-teal-400">
                      kmmayank08@gmail.com
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-medium mb-4">Social Links</h4>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="https://linkedin.com/in/mayank-chouhan-a92466251"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 hover:text-teal-400"
                    >
                      <span className="text-teal-400">
                        <i className="fab fa-linkedin"></i>
                      </span>
                      <span>LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/MAYANK2264"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 hover:text-teal-400"
                    >
                      <span className="text-teal-400">
                        <i className="fab fa-github"></i>
                      </span>
                      <span>GitHub</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
