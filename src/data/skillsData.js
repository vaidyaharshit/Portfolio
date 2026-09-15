export const skillsData = {
  tag: '[ FILE_02 ]',
  index: '02 / SKILLS',
  title: 'Technical',
  titleGradient: 'Capabilities',
  subtitle:
    'A curated view of tools and technologies I utilize to bring intelligent solutions to life.',
  categories: [
    {
      title: 'Programming',
      icon: 'code',
      color: 'var(--accent-cyan)',
      direction: 'left',
      stagger: 0,
      skills: [
        { name: 'Java', desc: 'OOP & Data Structures', width: 25 },
        { name: 'C++', desc: 'Problem Solving & Logic', width: 95 },
        { name: 'Python', desc: 'Core AI, Scripts & Analysis', width: 30 },
        { name: 'JavaScript', desc: 'ES6+, DOM & Logic', width: 50 },
      ],
    },
    {
      title: 'Web Development',
      icon: 'monitor',
      color: 'var(--accent-violet)',
      direction: 'right',
      stagger: 1,
      skills: [
        { name: 'HTML5 & CSS3', desc: 'Semantic Markup & Layouts', width: 95 },
        { name: 'JavaScript (Vanilla)', desc: 'Interactive Async Web Apps', width: 75 },
        { name: 'React', desc: 'Mobile-First UI & Adaptability', width: 20 },
        { name: 'Tailwind CSS', desc: 'Utility Styling', width: 42 },
      ],
    },
    {
      title: 'Artificial Intelligence & ML',
      icon: 'brain',
      color: 'var(--accent-blue)',
      direction: 'left',
      stagger: 2,
      skills: [
        { name: 'Machine Learning', desc: 'Supervised & Classification', width: 82 },
        { name: 'Artificial Intelligence', desc: 'Core Concepts & Search Algos', width: 80 },
        { name: 'Data Analysis', desc: 'Data Wrangling & Insights', width: 85 },
        { name: 'Python for AI', desc: 'NumPy, Pandas & AI Libraries', width: 88 },
      ],
    },
    {
      title: 'Developer Tools',
      icon: 'tools',
      color: 'var(--accent-magenta)',
      direction: 'right',
      stagger: 3,
      skills: [
        { name: 'Git & GitHub', desc: 'Version Control & Collaboration', width: 88 },
        { name: 'VS Code', desc: 'Environment & Extension Workflow', width: 96 },
        { name: 'AI Dev Tools', desc: 'Prompt Engineering & AI Workflows', width: 88 },
        { name: 'CLI & Terminal', desc: 'Command-line Scripting', width: 75 },
      ],
    },
  ],
};
