import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Sun,
  Moon,
  Facebook,
  Linkedin,
  Instagram,
  Github,
} from "lucide-react";

const theme = {
  light: {
    primary: "bg-white",
    secondary: "bg-gray-50",
    navbar: "bg-white/80",
    card: "bg-white",
    text: {
      primary: "text-gray-900",
      secondary: "text-gray-600",
      accent: "text-blue-600",
    },
    border: "border-gray-200",
    hover: "hover:bg-gray-100",
  },
  dark: {
    primary: "bg-gray-900",
    secondary: "bg-gray-800",
    navbar: "bg-gray-900/80",
    card: "bg-gray-800",
    text: {
      primary: "text-white",
      secondary: "text-gray-300",
      accent: "text-blue-400",
    },
    border: "border-gray-700",
    hover: "hover:bg-gray-700",
  },
};

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setIsOpen(!isOpen);
  const currentTheme = darkMode ? theme.dark : theme.light;

  // const navItems = ['Home', 'About', 'Services', 'Portfolio', 'Contact'];
  const navItems = ["Home", "About", "Services"];

  const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? `${currentTheme.navbar} shadow-lg backdrop-blur-lg`
            : "bg-transparent"
        }`}
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-shrink-0"
            >
              <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Portfolio
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="items-center hidden space-x-8 md:flex">
              {navItems.map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium ${currentTheme.text.secondary} hover:${currentTheme.text.accent} 
                          transition-colors duration-300`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  darkMode
                    ? "bg-gray-800 text-yellow-500"
                    : "bg-gray-100 text-gray-900"
                } transition-colors duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={darkMode ? "dark" : "light"}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-4 md:hidden">
              <motion.button
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${
                  darkMode
                    ? "bg-gray-800 text-yellow-500"
                    : "bg-gray-100 text-gray-900"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
              <motion.button
                onClick={toggleMenu}
                className={`p-2 rounded-lg ${currentTheme.hover}`}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden ${currentTheme.primary} border-t ${currentTheme.border}`}
            >
              <div className="px-4 py-2 space-y-1">
                {navItems.map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`block px-3 py-2 rounded-lg text-base font-medium ${currentTheme.text.secondary} 
                            ${currentTheme.hover} transition-colors duration-200`}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    );
  };

  const Hero = () => (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen flex items-center pt-20 ${currentTheme.primary}`}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          <motion.div
            className="space-y-8 md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30"
              >
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Welcome to my portfolio
                </span>
              </motion.div>
              <motion.h1
                className={`text-5xl md:text-6xl font-bold ${currentTheme.text.primary} leading-tight`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Hello, I&apos;m{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Rio Febri
                </span>
              </motion.h1>
              <motion.p
                className={`text-lg ${currentTheme.text.secondary} max-w-2xl`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                A passionate full-stack developer focused on creating intuitive
                and engaging digital experiences.
              </motion.p>
            </div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="https://wa.me/6289693967005"
                className="px-6 py-3 text-white transition-colors duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="https://rii92-portofolio.web.app/"
                className={`px-6 py-3 rounded-lg border ${currentTheme.border} ${currentTheme.text.primary}
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Work
              </motion.a>
            </motion.div>

            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                {
                  Icon: Facebook,
                  href: "https://web.facebook.com/riofebri.prasetia.3/?_rdc=1&_rdr",
                },
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/in/riofebri-prasetia-8280821b1/",
                },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/riofebrip/",
                },
                { Icon: Github, href: "https://github.com/rii92" },
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                           ${
                             darkMode
                               ? "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
                               : "bg-gray-100 text-gray-600 hover:text-blue-600 hover:bg-gray-200"
                           } transition-colors duration-300`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96">
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 dark:opacity-30 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <div className="relative w-full h-full overflow-hidden rounded-full ring-4 ring-blue-100 dark:ring-blue-900/30">
                <img
                  src="images/foto.png"
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );

  const About = () => {
    const stats = [
      { label: "Years Experience", value: "3+" },
      { label: "Projects Completed", value: "50+" },
      { label: "Satisfied Clients", value: "30+" },
      { label: "Technologies", value: "15+" },
    ];

    return (
      <section id="about" className={`py-20 ${currentTheme.secondary}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid items-center gap-12 md:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 dark:opacity-30 blur-2xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                <img
                  src="images/foto-2.png"
                  alt="About Me"
                  className="relative shadow-2xl rounded-2xl"
                />
              </div>
            </motion.div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h2
                  className={`text-3xl md:text-4xl font-bold ${currentTheme.text.primary}`}
                >
                  Professional{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    Web Developer
                  </span>
                  <br />& Designer
                </h2>
                <p className={`${currentTheme.text.secondary} leading-relaxed`}>
                  With over 5 years of experience in web development and design,
                  I specialize in creating beautiful, functional, and
                  user-centered digital experiences. My approach combines
                  creativity with technical expertise to build innovative
                  solutions.
                </p>
              </motion.div>

              {/* <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="grid grid-cols-2 gap-4 md:grid-cols-4"
              >
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${currentTheme.card}`}
                  >
                    <div className={`text-2xl font-bold ${currentTheme.text.accent}`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm ${currentTheme.text.secondary}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>*/}
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  const Services = () => {
    const services = [
      {
        icon: "💻",
        title: "Web Development",
        description:
          "Creating responsive and dynamic websites using modern frameworks and technologies.",
        tools: ["React", "Next.js", "Node.js", "Laravel", "Flutter"],
      },
      {
        icon: "📱",
        title: "Mobile Development",
        description:
          "Building native and cross-platform mobile applications for iOS and Android.",
        tools: ["Flutter"],
      },
      {
        icon: "🎨",
        title: "UI/UX Design",
        description:
          "Designing intuitive and engaging user interfaces with great user experience.",
        tools: ["Figma", "Canva"],
      },
      {
        icon: "⚡",
        title: "Backend Development",
        description:
          "Developing robust and scalable backend solutions and APIs.",
        tools: ["Node.js", "Python", "PHP", "MySQL", "MongoDB", "DynamoDB"],
      },
    ];

    return (
      <section id="services" className={`py-20 ${currentTheme.primary}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 space-y-4 text-center"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold ${currentTheme.text.primary}`}
            >
              My{" "}
              <span className="text-blue-600 dark:text-blue-400">Services</span>
            </h2>
            <p className={`max-w-2xl mx-auto ${currentTheme.text.secondary}`}>
              Providing comprehensive solutions for your digital needs with
              expertise in multiple domains.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${currentTheme.card} hover:shadow-xl transition-all duration-300`}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3
                  className={`text-xl font-bold mb-3 ${currentTheme.text.primary}`}
                >
                  {service.title}
                </h3>
                <p className={`mb-4 ${currentTheme.text.secondary}`}>
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const ProjectSection = () => {
    const projects = [
      {
        title: "Employee Attendance Visualization",
        description:
          "An interactive web-based application for visualizing employee attendance data. This tool allows filtering by employee, year, and attendance type, providing insights into attendance patterns for better management.",
        image: "/images/portfolio-1.png",
        category: "Data Visualization",
        tech: ["HTML", "CSS", "JavaScript", "Chart.js", "React.js"],
        link: "https://rii92.github.io/bps-sanggau-kehadiran/",
      },
    ];

    return (
      <section id="portfolio" className={`py-20 ${currentTheme.secondary}`}>
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 space-y-4 text-center"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold ${currentTheme.text.primary}`}
            >
              Featured{" "}
              <span className="text-blue-600 dark:text-blue-400">Projects</span>
            </h2>
            <p className={`max-w-2xl mx-auto ${currentTheme.text.secondary}`}>
              Showcasing some of my best work and the technologies used to build
              them.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group rounded-xl overflow-hidden ${currentTheme.card}`}
                whileHover={{ y: -5 }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:opacity-100">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="mb-2 text-xl font-bold text-white">
                        {project.title}
                      </h3>
                      <p className="mb-4 text-sm text-gray-300">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs text-white rounded-full bg-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${currentTheme.text.secondary}`}>
                      {project.category}
                    </span>
                    <motion.a
                      href={project.link}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                      whileHover={{ x: 5 }}
                    >
                      View Project →
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className={`min-h-screen ${currentTheme.primary} transition-colors duration-300`}
      >
        <Navbar />
        <Hero />
        <About />
        <Services />
        <ProjectSection />
      </div>
    </div>
  );
};

export default Portfolio;
