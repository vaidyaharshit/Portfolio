export const projectsData = {
  tag: '[ FILE_03 ]',
  index: '03 / PROJECTS',
  title: "Things I've",
  titleGradient: 'Built',
  subtitle: "A selection of projects I've designed and developed.",
  filters: [
    { label: 'ALL', value: 'all' },
    { label: 'WEB DEVELOPMENT', value: 'web' },
    { label: 'AI / ML', value: 'aiml' },
    { label: 'HACKATHONS', value: 'hackathons' },
  ],
  projects: [
    {
      id: 'f1-hackathon',
      featured: true,
      title: 'F1 Website Hackathon',
      category: 'hackathons',
      categoryLabel: 'HACKATHONS',
      typeTag: 'Hackathon Project',
      status: 'HACKATHON',
      image: '/projects/f1-hackathon.jpg',
      description:
        'An F1-themed promotional website created specifically for a college hackathon. The website uses an energetic Formula 1-inspired visual style to promote the hackathon and create an engaging experience for participants.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS'],
      github: 'https://github.com/vaidyaharshit/F1-website-hackathon',
      liveDemo: null,
      modal: {
        type: 'Hackathon Project',
        description:
          'An F1-themed promotional website created specifically for a college hackathon. The website uses an energetic Formula 1-inspired visual style to promote the hackathon and create an engaging experience for participants.',
        problem:
          'College hackathons need highly engaging promotional web experiences to attract participants and communicate event logistics dynamically.',
        solution:
          'Built an F1 racing-themed interactive promotional landing platform featuring schedules, telemetry-inspired counters, registration CTA, and rules.',
        features: ['F1 High-Energy Visual Theme', 'Event Schedule & Timelines', 'Interactive Registration CTA', 'Responsive Grid Layout'],
      },
    },
    {
      id: 'qr-code-generator',
      featured: false,
      title: 'QR Code Generator',
      category: 'web',
      categoryLabel: 'WEB DEVELOPMENT',
      typeTag: 'Web Tool',
      status: 'UTILITY',
      image: '/projects/qr-code.jpg',
      description:
        'A simple and practical QR code generation web application.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'QR API'],
      github: 'https://github.com/vaidyaharshit/QR-code-generator',
      liveDemo: null,
      modal: {
        type: 'Web Tool',
        description:
          'A simple and practical QR code generation web application.',
        problem:
          'Users need a quick, no-friction way to convert text, URLs, and data into downloadable QR codes.',
        solution:
          'Developed a lightweight web application that renders custom QR codes dynamically in real time.',
        features: ['Instant QR Code Generation', 'Custom Styling & Colors', 'Download PNG/SVG', 'Clean Responsive UI'],
      },
    },
    {
      id: 'farmer-rental-web',
      featured: false,
      title: 'Farmer Rental Website',
      category: 'web',
      categoryLabel: 'WEB DEVELOPMENT',
      typeTag: 'Web Platform',
      status: 'PRODUCTION',
      image: '/projects/farmer-rental.jpg',
      description:
        'A web platform concept designed to help farmers find and explore rental vehicles and agricultural equipment for farming-related work.',
      tags: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript'],
      github: 'https://github.com/vaidyaharshit/Farmer-rental-web',
      liveDemo: null,
      modal: {
        type: 'Web Platform',
        description:
          'A web platform concept designed to help farmers find and explore rental vehicles and agricultural equipment for farming-related work.',
        problem:
          'Farmers often struggle to access expensive farming equipment. This rental platform connects equipment providers with local farmers.',
        solution:
          'Built a responsive web platform with search, filtering, and booking capabilities tailored for agricultural rentals.',
        features: ['Equipment Search & Filtering', 'Responsive Layout', 'Category Listings', 'Mobile-First Design'],
      },
    },
    {
      id: 'hotel-room-booking',
      featured: false,
      title: 'Hotel Room Booking Interface',
      category: 'web',
      categoryLabel: 'WEB DEVELOPMENT',
      typeTag: 'Web Interface',
      status: 'COMPLETED',
      image: '/projects/hotel.jpg',
      description:
        'A modern hotel room booking interface that allows users to explore rooms, check availability, view pricing and amenities, and interact with the booking experience.',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'UI/UX'],
      github: 'https://github.com/vaidyaharshit/hotel-room-booking-interface',
      liveDemo: null,
      modal: {
        type: 'Web Interface',
        description:
          'A modern hotel room booking interface that allows users to explore rooms, check availability, view pricing and amenities, and interact with the booking experience.',
        problem:
          'Creating an intuitive hotel booking experience that handles room selection while remaining visually appealing and easy to navigate.',
        solution:
          'Designed and built a clean, responsive booking interface with modern UI patterns and smooth interactions.',
        features: ['Room Availability Display', 'Price & Amenity Comparisons', 'Interactive Suite Preview', 'Responsive Layout'],
      },
    },
  ],
  githubCtaTitle: 'Explore My Full Project Archive',
  githubCtaSub: 'See more experiments, builds and open-source work on GitHub.',
  githubCtaUrl: 'https://github.com/vaidyaharshit',
};
