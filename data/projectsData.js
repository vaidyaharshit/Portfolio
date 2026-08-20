export const projectsData = {
  tag: '[ FILE_03 ]',
  index: '03 / PROJECTS',
  title: "Things I've",
  titleGradient: 'Built',
  subtitle:
    'Featured projects spanning AI models, agricultural web platforms, and futuristic user interfaces.',
  filters: [
    { label: 'All Projects', value: 'all' },
    { label: 'Web Development', value: 'web' },
    { label: 'AI / Machine Learning', value: 'aiml' },
  ],
  projects: [
    {
      id: 'agrient',
      title: 'AgriRent',
      category: 'web',
      typeTag: 'Web Platform',
      emoji: '\u{1F69C}',
      bgClass: 'agrient-bg',
      description:
        'Agricultural Equipment Rental System designed for farmers to search, compare, and reserve heavy farming machinery online easily. Built with responsive layout and modern design.',
      tags: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
      github: 'https://github.com/vaidyaharshit',
      liveDemo: null,
      modal: {
        type: 'Web Platform',
        description:
          'Agricultural Equipment Rental System designed for farmers to search, compare, and reserve heavy farming machinery online easily. Built with responsive layout and modern design principles.',
        problem:
          'Farmers often struggle to access expensive farming equipment. AgriRent provides a digital marketplace connecting equipment owners with farmers who need temporary access.',
        solution:
          'Built a responsive web platform with search, filtering, and booking capabilities using modern HTML, CSS, and JavaScript.',
        features: ['Responsive Design', 'Equipment Search & Filter', 'Modern UI/UX', 'Mobile-First Approach'],
      },
    },
    {
      id: 'hotel',
      title: 'Hotel Room Booking Interface',
      category: 'web',
      typeTag: 'Web Interface',
      emoji: '\u{1F3E8}',
      bgClass: 'aiml-bg',
      description:
        'A modern hotel booking website interface that allows users to easily explore hotels, check room availability, view prices and amenities, and make bookings through a clean, responsive design.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/vaidyaharshit/hotel-room-booking-interface-.git',
      liveDemo: null,
      modal: {
        type: 'Web Interface',
        description:
          'A modern hotel booking website interface that allows users to easily explore hotels, check room availability, view prices and amenities, and make bookings through a clean, responsive, and user-friendly design.',
        problem:
          'Creating an intuitive hotel booking experience that handles complex room data while remaining visually appealing and easy to navigate.',
        solution:
          'Designed and built a clean, responsive booking interface with modern UI patterns and smooth interactions.',
        features: ['Room Availability Display', 'Price Comparison', 'Amenity Listings', 'Responsive Layout'],
      },
    },
    {
      id: 'portfolio',
      title: 'HV CyberPortfolio',
      category: 'web',
      typeTag: 'Portfolio',
      emoji: '\u2728',
      bgClass: 'portfolio-bg',
      description:
        'A high-end, futuristic developer portfolio website built with pure vanilla tech, glassmorphism, responsive grid layouts, custom cursor glow, and scroll animation mechanics.',
      tags: ['HTML5', 'CSS3', 'Vanilla JS', 'Glassmorphism'],
      github: 'https://github.com/vaidyaharshit',
      liveDemo: null,
      modal: {
        type: 'Developer Portfolio',
        description:
          'A high-end, futuristic developer portfolio website built with pure vanilla tech, glassmorphism, responsive grid layouts, custom cursor glow, and scroll animation mechanics.',
        problem:
          'Need a premium, interactive portfolio that showcases technical skills while maintaining performance and accessibility.',
        solution:
          'Built a fully animated, theme-switchable portfolio using only vanilla HTML, CSS, and JavaScript with no framework dependencies.',
        features: ['Dark/Light Theme', 'Custom Cursor', 'Scroll Animations', 'Particle Effects', 'Cinematic Intro', 'Responsive Design'],
      },
    },
  ],
  githubCtaText: 'View All Projects on GitHub',
  githubCtaUrl: 'https://github.com/vaidyaharshit',
};
