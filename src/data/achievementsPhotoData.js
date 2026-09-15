/* ==========================================================================
   ACHIEVEMENTS & CERTIFICATIONS PHOTO ALBUM DATA FILE
   ========================================================================== */

export const achievementCategories = [
  { id: 'all', label: 'ALL' },
  { id: 'certificates', label: 'CERTIFICATES' },
  { id: 'internship', label: 'INTERNSHIP' },
  { id: 'hackathons', label: 'HACKATHONS' },
  { id: 'events', label: 'EVENTS' },
  { id: 'other', label: 'OTHER' },
];

export function normalizePath(url) {
  if (!url) return '/public/achievements/hackathons/online-hackathon.jpeg';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
  if (url.startsWith('/public/')) return url;
  if (url.startsWith('public/')) return '/' + url;
  if (url.startsWith('/')) return url;
  return '/' + url;
}

export const initialPhotos = [
  // INTERNSHIP CATEGORY
  {
    id: 'internship-deloitte',
    title: 'Deloitte Internship Certificate',
    category: 'internship',
    image: '/internship/Delloite.png',
    src: '/internship/Delloite.png',
    organization: 'Deloitte',
    org: 'Deloitte',
    date: '2026',
    desc: 'Deloitte Virtual Internship Experience Certificate',
    tag: '[ INTERN_01 ]'
  },
  {
    id: 'internship-card-01',
    title: 'Certificate of Internship',
    category: 'internship',
    image: '/internship/internship.png',
    src: '/internship/internship.png',
    organization: 'Internship Program',
    org: 'Internship Program',
    date: '2026',
    desc: 'Certificate of Internship',
    tag: '[ INTERN_02 ]'
  },
  {
    id: 'internship-card-02',
    title: 'Certificate of Training',
    category: 'internship',
    image: '/internship/training.png',
    src: '/internship/training.png',
    organization: 'Training Program',
    org: 'Training Program',
    date: '2026',
    desc: 'Certificate of Training',
    tag: '[ INTERN_03 ]'
  },

  // CERTIFICATES CATEGORY
  {
    id: 'cert-campus-crew',
    title: 'Campus Crew Certificate',
    category: 'certificates',
    image: '/certificates/campus crew certificate.jpg',
    src: '/certificates/campus crew certificate.jpg',
    organization: 'Campus Crew',
    org: 'Campus Crew',
    date: '2026',
    desc: 'Campus Crew Leadership & Technical Contribution Certificate',
    tag: '[ CERT_01 ]'
  },
  {
    id: 'cert-canva',
    title: 'Canva Certificate',
    category: 'certificates',
    image: '/certificates/canva certificate.png',
    src: '/certificates/canva certificate.png',
    organization: 'Canva',
    org: 'Canva',
    date: '2026',
    desc: 'Canva Design & Media Certification',
    tag: '[ CERT_02 ]'
  },
  {
    id: 'cert-ihe-series7',
    title: 'IHE Series-7 Certificate',
    category: 'certificates',
    image: '/certificates/IHE series-7 certificate.jpeg',
    src: '/certificates/IHE series-7 certificate.jpeg',
    organization: 'IHE Series',
    org: 'IHE Series',
    date: '2026',
    desc: 'IHE Series-7 Technical Certification',
    tag: '[ CERT_03 ]'
  },

  // HACKATHONS CATEGORY
  {
    id: 'user-hack-01',
    title: 'Online Tech Hackathon',
    category: 'hackathons',
    image: '/public/achievements/hackathons/online-hackathon.jpeg',
    src: '/public/achievements/hackathons/online-hackathon.jpeg',
    organization: 'Hackathon Series',
    org: 'Hackathon Series',
    date: '2026',
    desc: 'Participated in online technical hackathon building intelligent algorithms and web application solutions.',
    tag: '[ HACK_01 ]'
  },
  {
    id: 'user-hack-02',
    title: 'Hackathon 2026 Milestone',
    category: 'hackathons',
    image: '/public/achievements/hackathons/hackathon-2026.jpeg',
    src: '/public/achievements/hackathons/hackathon-2026.jpeg',
    organization: 'National Tech Competition',
    org: 'National Tech Competition',
    date: '2026',
    desc: 'Collaborative hackathon project design, pitch, and technical build.',
    tag: '[ HACK_02 ]'
  },
  {
    id: 'user-hack-03',
    title: 'Gemini AI Developer Certificate',
    category: 'hackathons',
    image: '/public/achievements/hackathons/gemini-certificate.jpeg',
    src: '/public/achievements/hackathons/gemini-certificate.jpeg',
    organization: 'Google AI / Tech Forum',
    org: 'Google AI / Tech Forum',
    date: '2026',
    desc: 'Certification for building and integrating AI models into web applications.',
    tag: '[ HACK_03 ]'
  },
  {
    id: 'user-hack-04',
    title: 'Hackathon Project Certificate',
    category: 'hackathons',
    image: '/public/achievements/hackathons/image.png',
    src: '/public/achievements/hackathons/image.png',
    organization: 'Tech Hackathon Challenge',
    org: 'Tech Hackathon Challenge',
    date: '2026',
    desc: 'Hackathon participation and project milestone certificate.',
    tag: '[ HACK_04 ]'
  },
  {
    id: 'user-hack-05',
    title: 'Hackathon Achievement Award',
    category: 'hackathons',
    image: '/public/achievements/hackathons/image copy.png',
    src: '/public/achievements/hackathons/image copy.png',
    organization: 'Innovation Hackathon',
    org: 'Innovation Hackathon',
    date: '2026',
    desc: 'Special recognition award for innovative hackathon project design.',
    tag: '[ HACK_05 ]'
  }
];

export async function loadAchievementsPhotos() {
  try {
    const response = await fetch('/achievements/manifest.json');
    if (response.ok) {
      const customManifest = await response.json();
      if (Array.isArray(customManifest) && customManifest.length > 0) {
        return customManifest.map(p => ({
          ...p,
          image: normalizePath(p.image || p.src),
          src: normalizePath(p.image || p.src)
        }));
      }
    }
  } catch (err) {
    // Fallback to initialPhotos
  }
  return initialPhotos.map(p => ({
    ...p,
    image: normalizePath(p.image || p.src),
    src: normalizePath(p.image || p.src)
  }));
}
