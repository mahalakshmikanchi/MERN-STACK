import { useState } from "react";

function Contact() {
  const [messageSent, setMessageSent] = useState(false);

  const handleClick = () => {
    setMessageSent(true);
  };

  return (
    <section id="contact" style={{ padding: "60px", textAlign: "center" }}>
      <h2>Contact Me</h2>
      <p>Email: memes@email.com</p>
      <p>Phone: +1234567890</p>

      <button onClick={handleClick}>Send Message</button>

      {messageSent && <p>Thank you! Your message has been sent.</p>}
    </section>
  );
}

export default Contact;