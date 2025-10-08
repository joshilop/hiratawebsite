import React from 'react'
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const Contact = () => {
    const [result, setResult] = React.useState("");
    const [messageLength, setMessageLength] = React.useState(0);
    const [lastSubmit, setLastSubmit] = React.useState(0);
    const { executeRecaptcha } = useGoogleReCaptcha();

    const onSubmit = async (event) => {
      event.preventDefault();
      
      // Check if reCAPTCHA is available
      if (!executeRecaptcha) {
        toast.error("reCAPTCHA not available. Please refresh the page.");
        return;
      }
      
      // Anti-spam: Rate limiting (30 seconds between submissions)
      const now = Date.now();
      if (now - lastSubmit < 30000) {
        toast.error("Please wait 30 seconds between submissions");
        return;
      }
      
      // Basic validation
      const formData = new FormData(event.target);
      const name = formData.get('Name')?.toString().trim();
      const email = formData.get('Email')?.toString().trim();
      const message = formData.get('Message')?.toString().trim();
      const honeypot = formData.get('website')?.toString(); // Honeypot field
      
      // Anti-spam: Honeypot check
      if (honeypot) {
        console.log("Spam detected - honeypot filled");
        toast.error("Submission failed. Please try again.");
        return;
      }

      // Validate required fields
      if (!name || name.length < 2) {
        toast.error("Please enter a valid name (minimum 2 characters)");
        return;
      }
      if (!email || !email.includes('@')) {
        toast.error("Please enter a valid email address");
        return;
      }
      if (!message || message.length < 10) {
        toast.error("Please enter a message (minimum 10 characters)");
        return;
      }
      if (message.length > 1000) {
        toast.error("Message is too long (maximum 1000 characters)");
        return;
      }

      // Anti-spam: Basic content filtering
      const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'claim now', 'click here', 'free money'];
      const hasSpam = spamKeywords.some(keyword => 
        message.toLowerCase().includes(keyword) || 
        name.toLowerCase().includes(keyword)
      );
      
      if (hasSpam) {
        toast.error("Message contains prohibited content");
        return;
      }

      setResult("Sending....");
      
      try {
        // Execute reCAPTCHA v3
        const recaptchaToken = await executeRecaptcha('contact_form');
        
        if (!recaptchaToken) {
          toast.error("reCAPTCHA verification failed. Please try again.");
          setResult("");
          return;
        }

        setLastSubmit(now);
        
        // Use environment variable for security
        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
        
        // Add reCAPTCHA token for server verification
        formData.append("g-recaptcha-response", recaptchaToken);
  
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
    
        if (data.success) {
          setResult("");
          toast.success("Form Submitted Successfully - Protected by reCAPTCHA");
          event.target.reset();
          setMessageLength(0);
        } else {
          console.log("Error", data);
          toast.error(data.message || "Submission failed. Please try again.");
          setResult("");
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Network error. Please check your connection and try again.");
        setResult("");
      }
    };

  return (
    <motion.div
      initial={{opacity: 0, x:-200}}
      transition={{duration: 1}}
      whileInView={{opacity: 1, x:0}}
      viewport={{once: true}}
    className='text-center p-6 py-20 lg:px-32 w-full overflow-hidden scroll-mt-20' id='Contact'>
      <h2 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Contact <span className='underline underline-offset-4 decoration-1 under font-light'>With Us</span></h2>
      <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>Contact us to discuss your project needs or request a personalized quote. We’re here to help!</p>

<form onSubmit={onSubmit} className='max-w-2xl mx-auto text-gray-600 pt-8'>
    <div className='flex flex-wrap'>
        <div className='w-full md:w-1/2 text-left'>
            Your Name
            <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="text" name='Name' placeholder='Your Name' required/>
        </div>
        <div className='w-full md:w-1/2 text-left md:pl-4'>
            Your Email
            <input className='w-full border border-gray-300 rounded py-3 px-4 mt-2' type="email" name='Email' placeholder='Your Email' required/>
        </div>
    </div>
    
    {/* Honeypot field - invisible to humans, but bots will fill it */}
    <input 
        type="text" 
        name="website" 
        style={{position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none'}}
        tabIndex="-1"
        autoComplete="off"
    />
    <div className='my-6 text-left'>
        Message
        <textarea 
            className='w-full border border-gray-300 rounded py-3 px-4 mt-2 h-48 resize-none'
            name="Message" 
            placeholder='Message (minimum 10 characters)' 
            maxLength="1000"
            onChange={(e) => setMessageLength(e.target.value.length)}
            required>
        </textarea>
        <div className='text-sm text-gray-500 mt-1'>
            {messageLength}/1000 characters
        </div>
    </div>
    <button className='bg-yellow-600 text-white py-2 px-12 mb-4 rounded hover:bg-yellow-700 transition'>
        {result ? result : "Send Message"}
    </button>
    
    <div className="text-xs text-gray-500 mb-10 max-w-md mx-auto">
        🛡️ This form is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">
            Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">
            Terms of Service
        </a>{' '}
        apply.
    </div>
</form>


    </motion.div>
  )
}

export default Contact
