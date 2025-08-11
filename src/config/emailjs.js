// EmailJS Configuration
// Replace these with your actual EmailJS credentials
export const emailjsConfig = {
  serviceId: 'service_your_service_id', // Replace with your Service ID
  templateId: 'template_your_template_id', // Replace with your Template ID  
  publicKey: 'your_public_key_here', // Replace with your Public Key
};

// For development, we try to use environment variables first
// For production (GitHub Pages), we use the hardcoded values above
export const getEmailjsConfig = () => {
  // Check if we have environment variables (development)
  if (import.meta.env.VITE_EMAILJS_SERVICE_ID && 
      import.meta.env.VITE_EMAILJS_SERVICE_ID !== 'service_your_service_id') {
    return {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    };
  }
  
  // Use hardcoded config for production
  return emailjsConfig;
};
