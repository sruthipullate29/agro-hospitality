import "./Contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>

      <p className="contact-subtitle">
        We'd love to hear from you.
      </p>

      <div className="contact-card">
        <div className="contact-info">
          <p><strong>Email:</strong> info@varunagro.com</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
          <p><strong>Location:</strong> India</p>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea
            rows="5"
            placeholder="Your Message"
          ></textarea>

          <button type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;