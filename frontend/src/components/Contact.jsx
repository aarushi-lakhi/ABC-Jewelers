import React from 'react';

const Contact = () => {
  return (
    <main className="container">
      <h1>Contact Us</h1>
      <form>
        <input type="text" id="name" name="name" placeholder="Your Name" required />
        <input type="email" id="email" name="email" placeholder="Your Email" required />
        <textarea id="message" name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </main>
  );
};

export default Contact;
