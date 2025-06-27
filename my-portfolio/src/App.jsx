import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import './styles.css';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <main className={`main ${darkMode ? "dark" : ""}`} style={{ overflowX: 'hidden', overflowY: 'auto' }}>
      <div className="cartoon-character"></div>
      <Navbar toggleDark={() => setDarkMode(!darkMode)} isDark={darkMode} />
      <Hero />
      <ThreeScene />
      <SectionWrapper><About /></SectionWrapper>
      <SectionWrapper><Education /></SectionWrapper>
      <SectionWrapper><Projects /></SectionWrapper>
      <SectionWrapper><MeSection /></SectionWrapper>
      <SectionWrapper><Contact /></SectionWrapper>
    </main>
  );
}

const SectionWrapper = ({ children }) => (
  <section className="section-wrapper scrollable-section"> <motion.div variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} style={{ pointerEvents: 'auto' }}>
      {children}
    </motion.div>
  </section>
);

function Navbar({ toggleDark, isDark }) {
  return (
    <motion.header className="navbar" initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
      <div className="logo">Utkarsh Pandey</div>
      <nav className="nav-links">
        <a href="#about">About</a>
        <a href="#education">Education</a>
        <a href="#projects">Projects</a>
        <a href="#me">Me</a>
        <a href="#contact">Contact</a>
        <button onClick={toggleDark} className="theme-toggle">
          {isDark ? "☀️" : "🌙"}
        </button>
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="hero-title"
      >
        Hi, I'm Utkarsh Pandey
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="hero-subtitle"
      >
        Full Stack Developer • Machine Learning Enthusiast
      </motion.p>
      <img
        src={`${import.meta.env.BASE_URL}myphoto.png`} alt="Utkarsh Pandey" className="hero-image"
      />
    </section>
  );
}

function ThreeScene() {
  return (
    <section className="three-scene-placeholder">
      <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>Welcome to My Portfolio</h2>
    </section>
  );
}

function About() {
  return (
    <motion.div id="$1" variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }} style={{ pointerEvents: 'auto' }}>
      <h2 className="section-title">About</h2>
      <p className="section-text">
        I’m a final year Computer Science Engineering student with a passion for full-stack development and machine learning. I love solving real-world problems and building scalable applications using modern web technologies.
      </p>
    </motion.div>
  );
}

function Education() {
  return (
    <motion.div id="education" variants={fadeInUp}>
      <h2 className="section-title">Education</h2>
      <ul className="section-list">
        <li>
          <strong>Pranveer Singh Institute of Technology, Kanpur</strong><br/>
          B.Tech in Computer Science Engineering (2021–2025)<br />
          Avg SGPA: 6.5<br />
        </li>
        <li>
          <strong>Soni Pariya Public School, Kannauj</strong><br/>
          Intermediate (2019–2020)<br />
          Percentage: 80%<br />
        </li>
        <li>
          <strong>Soni Pariya Public School, Kannauj</strong><br/>
          High School (2018–2019)<br />
          Percentage: 87%<br />
        </li>

      </ul>
    </motion.div>
  );
}


function Projects() {
  return (
    <motion.div id="projects" variants={fadeInUp}>
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        <motion.div className="project-card" whileHover={{ scale: 1.05 }}>
          <h3>Driver Distraction Detection</h3>
          <p>
            Real-time safety system using YOLO and facial landmark analysis to reduce road accidents.
          </p>
        </motion.div>
        <motion.div className="project-card" whileHover={{ scale: 1.05 }}>
          <h3>Real-Time Chat Website</h3>
          <p>
            Live chat app with WebSocket, user auth, and persistent chat history.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

function MeSection() {
  return (
    <motion.div id="me" variants={fadeInUp}>
      <h2 className="section-title">Me</h2>
      <p className="section-text italic">
        This section is under construction. I’ll soon share more about my hobbies, business ideas, and non-tech passions.
      </p>
    </motion.div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send("service_66pdxbl", "template_yyeqr9g", form, "hzq3XcVH4G3FtIDKg")
      .then(() => {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <motion.div id="contact" variants={fadeInUp}>
      <h2 className="section-title">Contact</h2>

      <motion.div className="info-box" whileHover={{ scale: 1.02 }}>
        <h3>Say Hello 👋</h3>
        <p>
          I'm always open to discussing new opportunities, side projects, or just chatting about tech.
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="contact-form">
        <motion.input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required whileFocus={{ scale: 1.01 }} />
        <motion.input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required whileFocus={{ scale: 1.01 }} />
        <motion.textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required whileFocus={{ scale: 1.01 }} />
        <motion.button type="submit" whileHover={{ scale: 1.05 }} disabled={loading}>
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="spinner"></span> Sending...
            </span>
          ) : (
            "Send Message"
          )}
        </motion.button>
        {sent && <p className="success">Message sent successfully!</p>}
      </form>
      <div className="contact-links">
        <p>Email: utkarshpandey0889@gmail.com</p>
        <p>GitHub: <a href="https://github.com/utkarsh081">MyGitHub</a></p>
        <p>Leetcode: <a href="https://leetcode.com/u/utkarsh081/">MyLeetcode</a></p>
        <p>LinkedIn: <a href="https://linkedin.com/in/utkarsh-pandey-b37057227">MyLinkedIN</a></p>
        <p>CV: <a href={`${process.env.PUBLIC_URL}/MyCV.pdf`} download>MyResume</a></p>
      </div>
    </motion.div>
  );
}
