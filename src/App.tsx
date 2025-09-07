import { useState, useEffect } from 'react';
import { ChevronDown, Github, ExternalLink, Mail, User, MessageSquare, Linkedin, Sun, Moon, Menu, X, Download } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showResumeInfo, setShowResumeInfo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPos = window.scrollY + 100;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're near the bottom of the page
      const isNearBottom = scrollPos + windowHeight >= documentHeight - 50;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const isLastSection = i === sections.length - 1;
          
          if (isLastSection && isNearBottom) {
            // If we're near the bottom, always show contact as active
            setActiveSection(section);
            break;
          } else if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            // Normal section detection
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleResumeClick = () => {
    setShowResumeInfo(true);
    setTimeout(() => setShowResumeInfo(false), 3000);
  };

  const projects = [
    
    {
      title: "WoodExpert",
      description: "WoodExpert is a wood design and manufacturing company that creates custom furniture and decorative pieces.",
      tech: ["React", "TypeScript" , "Tailwind CSS"],
      github: "https://github.com/AdamBadkouk/WoodExpert",
      demo: "https://www.woodexpert.online/"
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100'}`}>
      {/* Navbar */}
      <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-md border shadow-lg rounded-md px-3 sm:px-8 py-2 sm:py-3 transition-colors duration-300 ${isDarkMode ? 'bg-slate-800/30 border-purple-500/30' : 'bg-white/20 border-white/30'}`}>
        <div className="flex items-center justify-between">
          {/* Desktop Navigation - Hidden on screens < 355px */}
          <div className="hidden min-[355px]:flex items-center space-x-2 sm:space-x-8">
            <div className="flex space-x-1 sm:space-x-6">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-xs sm:text-sm font-medium transition-all duration-200 px-2 sm:px-3 py-1 rounded-full ${
                    activeSection === id 
                      ? 'text-white bg-[#d0cede] shadow-md rounded-md'
                      : isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className={`w-px h-4 sm:h-6 mx-1 sm:mx-2 ${isDarkMode ? 'bg-purple-400/50' : 'bg-gray-400'}`}></div>
            <button
              onClick={toggleDarkMode}
              className={`p-1 sm:p-2 rounded-md transition-all duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Mobile Navigation - Visible only on screens < 355px */}
          <div className="flex min-[355px]:hidden items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className={`p-1 rounded-md transition-all duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-1 rounded-md transition-all duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Visible only on screens < 355px */}
      {isMobileMenuOpen && (
        <div className="min-[355px]:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className={`fixed top-20 left-1/2 transform -translate-x-1/2 w-48 rounded-lg shadow-xl border transition-all duration-300 ${
              isDarkMode ? 'bg-slate-800/95 border-purple-500/30' : 'bg-white/95 border-white/30'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 space-y-2">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollToSection(id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === id 
                      ? 'text-white bg-[#d0cede]'
                      : isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6">
              <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                Adam Badkouk
              </span>
            </h1>
            <p className={`text-xl sm:text-2xl lg:text-3xl mb-12 font-light ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Full-Stack Developer | MERN Stack, Next.js, Angular & Laravel
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-4xl mx-auto">
              <button
                onClick={() => scrollToSection('projects')}
                className={`group w-full sm:w-52 p-3.5 backdrop-blur-md border font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-purple-800/30 border-purple-500/40 text-purple-100 hover:bg-purple-700/40' 
                    : 'bg-white/20 border-white/30 text-gray-700 hover:bg-white/30'
                }`}
              >
                <span className="flex items-center justify-center">
                  View Projects
                  <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className={`group w-full sm:w-52 p-3.5 backdrop-blur-md border font-semibold rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-purple-800/30 border-purple-500/40 text-purple-100 hover:bg-purple-700/40' 
                    : 'bg-white/20 border-white/30 text-gray-700 hover:bg-white/30'
                }`}
              >
                <span className="flex items-center justify-center">
                  Contact Me
                  <ChevronDown className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
              </button>
              <button
                onClick={handleResumeClick}
                disabled
                className={`group w-full sm:w-52 p-3.5 backdrop-blur-md border font-semibold rounded-md shadow-lg opacity-50 cursor-not-allowed ${
                  isDarkMode 
                    ? 'bg-purple-800/30 border-purple-500/40 text-purple-100' 
                    : 'bg-white/20 border-white/30 text-gray-700'
                }`}
              >
                <span className="flex items-center justify-center">
                  Download Resume
                  <Download className="ml-2 w-5 h-5" />
                </span>
              </button>
            </div>
            {showResumeInfo && (
              <div className={`mt-4 p-3 rounded-md text-center ${
                isDarkMode 
                  ? 'bg-amber-900/30 border border-amber-600/40 text-amber-200' 
                  : 'bg-yellow-100 border border-yellow-300 text-yellow-800'
              }`}>
                Resume download is currently unavailable
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              About Me
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Discover my journey and skills in web development
            </p>
          </div>
          
          <div className={`backdrop-blur-md border rounded-lg p-8 shadow-lg ${
            isDarkMode 
              ? 'bg-slate-800/40 border-purple-500/30' 
              : 'bg-white/20 border-white/30'
          }`}>
            <div className={`prose prose-lg max-w-none ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <blockquote className="border-l-4 border-[#d0cede] pl-6 text-lg leading-relaxed">
              <p className="mb-4">
                I specialize in the <strong>MERN stack (MongoDB, Express.js, React, Node.js)
                </strong> and <strong>Next.js</strong>, enabling me to build dynamic, scalable, and modern web applications.
              </p>
              <p className="mb-4">
                I also have experience with <strong>Angular</strong> for structured frontend development and strong proficiency in <strong>Laravel</strong> for developing robust APIs and backend solutions.
              </p>
              <p className="mb-4">
                Alongside web development, I actively explore <strong>Python</strong> and <strong>C++</strong> through personal projects, allowing me to expand my technical expertise and experiment with new problem-solving approaches.
              </p>
              <p>
                I am well-versed in version control and collaboration tools, including <strong>Git, GitHub, and GitLab</strong>.
              </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Skills & Technologies
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A comprehensive overview of the technologies and tools I work with
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Frontend Development */}
            <div className={`backdrop-blur-md border rounded-lg p-6 shadow-lg h-56 ${
              isDarkMode 
                ? 'bg-slate-800/40 border-purple-500/30' 
                : 'bg-white/20 border-white/30'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Frontend Development</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS' , 'Bootstrap'].map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm bg-[#d0cede]/30 rounded-md border border-white/30 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend Development */}
            <div className={`backdrop-blur-md border rounded-lg p-6 shadow-lg h-56 ${
              isDarkMode 
                ? 'bg-slate-800/40 border-purple-500/30' 
                : 'bg-white/20 border-white/30'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Backend Development</h3>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Express.js', 'Laravel', 'PHP', 'MongoDB', 'MySQL', 'REST APIs'].map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm bg-[#d0cede]/30 rounded-md border border-white/30 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Programming Languages */}
            <div className={`backdrop-blur-md border rounded-lg p-6 shadow-lg h-56 ${
              isDarkMode 
                ? 'bg-slate-800/40 border-purple-500/30' 
                : 'bg-white/20 border-white/30'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'TypeScript', 'Python', 'C++', 'PHP'].map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm bg-[#d0cede]/30 rounded-md border border-white/30 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Technologies */}
            <div className={`backdrop-blur-md border rounded-lg p-6 shadow-lg h-56 ${
              isDarkMode 
                ? 'bg-slate-800/40 border-purple-500/30' 
                : 'bg-white/20 border-white/30'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {['Git', 'GitHub', 'GitLab', 'Docker', 'WSL', 'packet tracer', 'Postman', 'Figma'].map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm bg-[#d0cede]/30 rounded-md border border-white/30 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {skill}
                  </span>
                ))}
                <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
                {['Windows', 'Linux'].map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm bg-[#d0cede]/30 rounded-md border border-white/30 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cybersecurity */}
            <div className={`backdrop-blur-md border rounded-lg p-6 shadow-lg h-56 ${
              isDarkMode 
                ? 'bg-slate-800/40 border-purple-500/30' 
                : 'bg-white/20 border-white/30'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Cybersecurity</h3>
              <div className="flex flex-wrap gap-2">
                {['Security Fundamentals', 'Network Security', 'Vulnerability Assessment', 'Security Best Practices'].map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm bg-[#d0cede]/30 rounded-md border border-white/30 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications & Badges */}
            <div className={`backdrop-blur-md border rounded-lg p-6 shadow-lg h-56 ${
              isDarkMode 
                ? 'bg-slate-800/40 border-purple-500/30' 
                : 'bg-white/20 border-white/30'
            }`}>
              <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>Certifications & Badges</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Professional Certifications', 'Digital Badges', 'Industry Recognition'].map((skill, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 text-sm bg-[#d0cede]/30 rounded-md border border-white/30 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="border-t border-white/20 my-4"></div>
              <a
                href="https://www.credly.com/users/adambadkouk/badges"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-[#d0cede] text-white rounded-md hover:bg-[#c4b8d1] transition-colors duration-200 text-sm font-medium"
              >
                View My Badges
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Featured Projects
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              A collection of my recent work showcasing modern web development technologies and best practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group backdrop-blur-md border rounded-md p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/40 border-purple-500/30' 
                    : 'bg-white/20 border-white/30'
                }`}
              >
                <div className="mb-6">
                  <h3 className={`text-2xl font-bold mb-3 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {project.title}
                  </h3>
                  <p className={`leading-relaxed mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-3 py-1 text-sm bg-[#d0cede]/30 rounded-md border border-white/30 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="relative">
                  <a
                    href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      This repo is currently private
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
                    </div>
                  </div>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-[#d0cede] text-white rounded-md hover:bg-[#c4b8d1] hover:shadow-lg transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Get In Touch
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Ready to work together? I'd love to hear about your project and discuss how we can bring your ideas to life.
            </p>
          </div>
          
          <div className={`backdrop-blur-md border rounded-lg p-8 shadow-lg max-w-md mx-auto ${
            isDarkMode 
              ? 'bg-slate-800/40 border-purple-500/30' 
              : 'bg-white/20 border-white/30'
          }`}>
            <h3 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-black'}`}>Connect With Me</h3>
            <div className="flex flex-col space-y-4 max-w-xs mx-auto">
              <a
                href="mailto:badkoukadam@gmail.com"
                className="flex items-center px-6 py-4 bg-white/30 hover:bg-white/40 border border-white/30 rounded-md transition-all duration-200 group"
              >
                <svg className={`w-6 h-6 mr-4 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Gmail</span>
              </a>
              <a
                href="mailto:AdamBadkouk@outlook.com"
                className="flex items-center px-6 py-4 bg-white/30 hover:bg-white/40 border border-white/30 rounded-md transition-all duration-200 group"
              >
                <svg className={`w-6 h-6 mr-4 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 0h11.377v11.372H0V0zm12.623 0H24v11.372H12.623V0zM0 12.623h11.377V24H0V12.623zm12.623 0H24V24H12.623V12.623z"/>
                </svg>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Outlook</span>
              </a>
              <a
                href="https://www.linkedin.com/in/adambadkouk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-4 bg-white/30 hover:bg-white/40 border border-white/30 rounded-md transition-all duration-200 group"
              >
                <Linkedin className={`w-6 h-6 mr-4 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>LinkedIn</span>
              </a>
              <a
                href="https://github.com/AdamBadkouk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-4 bg-white/30 hover:bg-white/40 border border-white/30 rounded-md transition-all duration-200 group"
              >
                <Github className={`w-6 h-6 mr-4 ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>GitHub</span>
              </a>
          </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;