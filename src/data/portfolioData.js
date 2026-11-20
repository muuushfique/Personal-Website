export const PORTFOLIO_DATA = {
  personal: {
    brand: 'Mushfiqur Rahman',
    shortBrand: 'MUSHFIQUE',
    monogram: 'SMMRN',
    fullName: 'S. M. Mushfiqur Rahman Nayeem',
    role: 'Software Engineer (SWE) · Alpha FMC New York',
    roleShort: 'Software Engineer · Alpha FMC (NY)',
    location: 'New York Hours (ET) · Dhaka, Bangladesh',
    workCity: 'New York',
    homeCity: 'Dhaka',
    workHours: '09:00 – 17:00 ET',
    coords: '40.7128° N, 74.0060° W',
    email: 'muuushfique@gmail.com',
    phone: '+8801799905366',
    phoneDisplay: '+880 1799-905366',
    profileImage: '/images/profile.jpg',
    profileCutout: '/images/profile-cutout.png',
    socials: [
      { label: 'GitHub', short: 'GH', url: 'https://github.com/muuushfique', handle: 'github.com/muuushfique' },
      { label: 'LinkedIn', short: 'IN', url: 'https://linkedin.com/in/muuushfique', handle: 'in/muuushfique' },
      { label: 'Facebook', short: 'FB', url: 'https://www.facebook.com/muuushfique/', handle: 'fb.com/muuushfique' },
      { label: 'Instagram', short: 'IG', url: 'https://www.instagram.com/muuushfique/?hl=en', handle: '@muuushfique' },
    ],
  },

  en: {
    gate: {
      eyebrow: 'MUSHFIQUR RAHMAN NAYEEM · SOFTWARE ENGINEER (SWE)',
      heading: 'How would you like to meet me?',
      modes: [
        {
          index: '01',
          id: 'site',
          title: 'The site',
          subtitle: 'Full editorial portfolio — Alpha FMC enterprise work, personal builds, honors & after-hours.',
          meta: '11 SECTIONS · INTERACTIVE',
        },
        {
          index: '02',
          id: 'story',
          title: 'The story',
          subtitle: 'A 10-chapter 3D particle journey from NHSPC & BRACU to Alpha FMC New York.',
          meta: '10 CHAPTERS · 3D + AMBIENT',
        },
      ],
      soundHint: 'Subtle ambient soundtrack (inspired by Spotify picks)',
    },

    nav: {
      availability: 'Software Engineer @ Alpha FMC (NY)',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Work', href: '#work' },
        { label: 'Contact', href: '#contact' },
      ],
      menuBtn: 'Menu',
      talkCta: "Let's talk",
      nomineeBadge: 'Alpha FMC · SWE',
    },

    hero: {
      headlineLines: ['Software built to', 'run effortlessly.'],
      subcopy:
        'Software Engineer at Alpha FMC (New York) crafting enterprise Unqork & React platforms for Prosperity Life and Farm Family, alongside scalable web and mobile products.',
      primaryCta: "Let's talk",
      secondaryCta: 'See the work',
      tzDiff: 'Alpha FMC · Working US Eastern Hours (09:00–17:00 ET)',
    },

    about: {
      index: '(01)',
      label: 'ABOUT ME',
      aside: 'Alpha FMC · New York Hours (ET)',
      statementLead: 'A Software Engineer with a Computer Science foundation ',
      statementBold: 'building enterprise Unqork & React platforms at Alpha FMC for Prosperity Life and Farm Family ',
      statementTail: 'with obsessive focus on reliability, clean architecture, and human-centered craft.',
      bioFull:
        'Creative and solution-oriented Software Engineer turning complex business workflows into resilient web, enterprise, and mobile software. Proven track record shipping production systems from concept to launch — paired with strong communication honed through client consulting, campus leadership, and live broadcasting.',
      sealText: 'SOFTWARE ENGINEER · ALPHA FMC NY · 4X BRACU SCHOLAR · ',
      stats: [
        { value: '2', unit: 'clients', label: 'US enterprise insurance platforms at Alpha FMC' },
        { value: '3.65', unit: 'CGPA', label: 'BRACU Computer Science · 4x Merit Scholar' },
        { value: '6+', unit: 'builds', label: 'enterprise, web & mobile systems shipped' },
        { value: '4+', unit: 'awards', label: 'national Olympiad & debate honors' },
      ],
    },

    services: {
      index: '(02)',
      label: 'WHAT I DO',
      aside: 'Enterprise & Product Engineering',
      intro: 'Full-lifecycle software engineering across Unqork enterprise workflows, React frontends, APIs, and cross-platform apps.',
      skipLabel: 'Skip to the next section',
      items: [
        {
          id: 'unqork',
          index: '01',
          title: 'Unqork & Enterprise',
          proficiency: '92%',
          shape: 'layers',
          description:
            'Enterprise-grade insurance and financial service workflows engineered on Unqork at Alpha FMC — from complex policy verification flows to dynamic income calculators and PDF generation.',
          proof: 'Delivered production enterprise modules for Prosperity Life and Farm Family (Contact Center Portal).',
          tags: ['Unqork', 'Enterprise Workflows', 'Policy Systems', 'JSON Schemas', 'API Orchestration', 'PDF / Charts'],
        },
        {
          id: 'react',
          index: '02',
          title: 'React & Frontend',
          proficiency: '92%',
          shape: 'browser',
          description:
            'Modern, responsive React interfaces and design systems with crisp state management, interactive data visualization, and fluid GSAP/Canvas motion.',
          proof: 'Powering Alpha FMC React client portals, RannaBhai (90% satisfaction), and 29 Card Game.',
          tags: ['React', 'JavaScript', 'REST APIs', 'GSAP', 'SVG Systems', 'Responsive UI'],
        },
        {
          id: 'fullstack',
          index: '03',
          title: 'Full-Stack & APIs',
          proficiency: '88%',
          shape: 'gears',
          description:
            'Scalable backend services in Node.js, Express, MongoDB, and Python/FastAPI with clean REST contracts and automated CI/CD.',
          proof: 'Cut civic vote processing latency by 20% in JonoShokti and shipped full MERN architectures.',
          tags: ['Node.js', 'Express', 'MongoDB', 'Python', 'FastAPI', 'SQL'],
        },
        {
          id: 'mobile',
          index: '04',
          title: 'Mobile & Flutter',
          proficiency: '85%',
          shape: 'mobile',
          description:
            'High-responsiveness cross-platform Flutter & Dart apps engineered for sub-150ms interactions and offline-first SQLite reliability.',
          proof: 'Built KhaboKi serving 100+ shared-house users while reducing manual tracking errors by 85%.',
          tags: ['Flutter', 'Dart', 'SQLite', 'Provider', 'TableCalendar', 'Cross-Platform'],
        },
        {
          id: 'data',
          index: '05',
          title: 'Data & Algorithms',
          proficiency: '80%',
          shape: 'gauge',
          description:
            'Analytical modeling, algorithmic problem-solving (NHSPC Champion), and Python data workflows across Pandas, NumPy, and Matplotlib.',
          proof: 'Applied to financial annuity calculators, Google Chart dashboards, and ML experiments.',
          tags: ['Algorithms', 'C/C++', 'Pandas', 'NumPy', 'Google Charts', 'Jupyter'],
        },
        {
          id: 'devops',
          index: '06',
          title: 'Delivery & Media',
          proficiency: '86%',
          shape: 'cloud',
          description:
            'GitHub Actions CI/CD, Docker, Firebase, client-facing stakeholder communication, LaTeX technical writing, and visual storytelling.',
          proof: 'Backed by US consulting delivery at Alpha FMC and 130+ live radio broadcasts.',
          tags: ['Git/GitHub', 'GitHub Actions', 'Docker', 'Agile / Jira', 'LaTeX', 'Premiere Pro'],
        },
      ],
    },

    process: {
      heading: 'From first requirement to resilient production',
      skipLabel: 'Skip to the next section',
      steps: [
        { index: '01', title: 'Discover', desc: 'Clarify the business rules, regulatory edge cases, and user pain points before designing.' },
        { index: '02', title: 'Prototype', desc: 'Validate interactive flows and high-clarity UI states early with stakeholders.' },
        { index: '03', title: 'Architect', desc: 'Design modular Unqork schemas, React state boundaries, and clean API contracts.' },
        { index: '04', title: 'Engineer', desc: 'Ship maintainable, tested code obsessed with sub-150ms feel and data accuracy.' },
        { index: '05', title: 'Verify', desc: 'Stress-test authorization paths, policy edge cases, and cross-viewport responsiveness.' },
        { index: '06', title: 'Deliver', desc: 'Deploy cleanly, monitor telemetry, and iterate swiftly across New York & global teams.' },
      ],
    },

    work: {
      index: '(03)',
      label: 'SELECTED WORK',
      aside: 'Alpha FMC Enterprise & Personal Builds',
      eyebrow: "Systems I've engineered",
      alsoLabel: 'Also on GitHub:',
      alsoItems: [
        { name: 'Sparktech', url: 'https://github.com/muuushfique/Sparktech' },
        { name: 'Timetable Creator (PHP)', url: 'https://github.com/muuushfique/timetable_creator' },
        { name: 'BroadcastApp (Flutter)', url: 'https://github.com/muuushfique/broadcastapp' },
        { name: 'Machine Learning Labs', url: 'https://github.com/muuushfique/Machine-Learning' },
        { name: 'BRACU CSE220', url: 'https://github.com/muuushfique/CSE_220-Fall_2023' },
      ],
      skipLabel: 'Skip to the next section',
      cursorLabel: 'Inspect build',
      projects: [
        {
          id: 'prosperity',
          index: '01',
          title: 'Prosperity Life Group',
          meta: 'Enterprise Insurance · Alpha FMC (NY) · Unqork · React · REST APIs',
          summary:
            'Engineered enterprise annuity & policyholder digital workflows at Alpha FMC — including Pathway FIA income calculators, dynamic Google Charts visualizations, API integrations, and automated PDF illustrations.',
          achievements: [
            'Built complex Unqork & React modules handling real-time annuity calculation logic and responsive data charts.',
            'Integrated external REST APIs and automated PDF statement generation for financial advisors and policyholders.',
          ],
          metrics: ['Alpha FMC · NY', 'Unqork + React', 'FIA Calculators & PDF'],
          image: null,
          customVisual: 'enterprise-prosperity',
          url: 'https://linkedin.com/in/muuushfique',
          accent: '#5b5fe0',
        },
        {
          id: 'farmfamily',
          index: '02',
          title: 'Farm Family (CCP)',
          meta: 'Enterprise Contact Center · Alpha FMC (NY) · Unqork · React',
          summary:
            'Delivered core Contact Center Portal (CCP) capabilities for Farm Family Insurance at Alpha FMC — covering PLDC Auto policy verification, authorization capture, policy header meta strips, and linked policies.',
          achievements: [
            'Implemented multi-step PLDC Auto verification and authorization capture flows inside Unqork & React.',
            'Engineered unified policy header action strips and linked-policy displays to accelerate agent call handling.',
          ],
          metrics: ['Alpha FMC · NY', 'PLDC Auto Verification', 'Linked Policies UI'],
          image: null,
          customVisual: 'enterprise-farmfamily',
          url: 'https://linkedin.com/in/muuushfique',
          accent: '#3ddc84',
        },
        {
          id: 'rannabhai',
          index: '03',
          title: 'RannaBhai',
          meta: 'Web App · React · Node.js · MongoDB · GitHub Actions',
          summary:
            'Full-featured cooking web app with recipe discovery, meal planning, auto-generated grocery lists, and an interactive food trivia game.',
          achievements: [
            'Led ideation, UI/UX design, full-stack engineering, and deployment — 90% user satisfaction rating.',
            'Integrated an interactive food trivia game that lifted user engagement and session duration by 25%.',
          ],
          metrics: ['90% Satisfaction', '+25% Engagement', 'CI/CD Automated'],
          image: '/images/project-1.jpg',
          url: 'https://github.com/muuushfique/RannaBhai',
          accent: '#e07a5f',
        },
        {
          id: 'khaboki',
          index: '04',
          title: 'KhaboKi',
          meta: 'Mobile App · Flutter · Dart · SQLite · Provider',
          summary:
            'Multi-household meal and expense management app serving 100+ users in shared accommodations with transparent balance tracking.',
          achievements: [
            'Real-time meal rate calculation and TableCalendar integration cut manual errors by 85% at <150ms responsiveness.',
            'Delivered complete auth, house membership, and reporting flows — 95% peer satisfaction rating.',
          ],
          metrics: ['100+ Active Users', '-85% Manual Errors', '<150ms Latency'],
          image: '/images/project-2.jpg',
          url: 'https://github.com/muuushfique/KhaboKi',
          accent: '#3ddc84',
        },
        {
          id: '29cardgame',
          index: '05',
          title: '29 Card Game (Bengal Dynasty)',
          meta: 'Interactive Game · React · GSAP · Custom Vector SVG',
          summary:
            'South Asian trick-taking card game featuring a 6-theme visual engine (Bengal Dynasty Mughal tables, Bicycle 808, Royal Harlequin), 3D Collection showcase, and Bangla localization.',
          achievements: [
            'Built Match/Call duel bidding, 7th-card trump mechanics, and an interactive Tug-of-War Ledger with GSAP choreography.',
            'Crafted bespoke vector SVG card decks, damask/brocade card sleeves, and smooth 3.5s round pacing.',
          ],
          metrics: ['6 Visual Themes', '3D Deck Showcase', 'EN / বাংলা UI'],
          image: null,
          isCardGame: true,
          url: 'https://github.com/muuushfique',
          accent: '#d4af37',
        },
        {
          id: 'jonoshokti',
          index: '06',
          title: 'JonoShokti',
          meta: 'Civic Platform · Python · FastAPI · GitHub Issues API · MongoDB',
          summary:
            'GitHub-backed community voting system enabling transparent civic decision-making and real-time proposal tracking.',
          achievements: [
            'Built real-time vote syncing and interactive tools that reduced vote processing time by 20%.',
            'Directed end-to-end delivery from UX architecture to testing — 95% user satisfaction score.',
          ],
          metrics: ['-20% Vote Latency', '95% Satisfaction', 'FastAPI + Mongo'],
          image: '/images/project-3.jpg',
          url: 'https://github.com/muuushfique/Jonoshokti',
          accent: '#8689f2',
        },
      ],
    },

    education: {
      index: '(04)',
      label: 'EDUCATIONAL JOURNEY',
      aside: 'Academic foundations & scholarships',
      heading: 'Where the rigor began',
      items: [
        {
          index: '01',
          institution: 'BRAC University',
          shortName: 'BRAC University',
          degree: 'Bachelor of Computer Science',
          period: '2022 — 2025',
          location: 'Dhaka, Bangladesh',
          badge: 'CGPA 3.65 / 4.00 · 4x Merit Scholar',
          pitch:
            'Awarded full merit scholarship for four consecutive semesters while mastering software engineering, Python, React, Flutter, machine learning, and collaborative system design.',
          details: [
            'Awarded full scholarship for four consecutive semesters based on academic excellence and merit.',
            'Mastered software engineering across React, Python, Flutter, algorithms, and Git-based team workflows.',
            'Applied CS theory through production-grade web, mobile, and civic-tech systems.',
          ],
          tags: ['Computer Science', 'React', 'Python', 'Flutter', 'Algorithms', 'Machine Learning'],
        },
        {
          index: '02',
          institution: 'RAJUK Uttara Model College',
          shortName: 'RAJUK Uttara',
          degree: 'Higher Secondary Certificate (Science)',
          period: '2018 — 2020',
          location: 'Dhaka, Bangladesh',
          badge: 'GPA 5.00 / 5.00 · Talent Pool Scholar',
          pitch:
            'Graduated with a perfect 5.00 GPA in Science alongside British Council IELTS Band 7.5 certification and intensive national competition readiness.',
          details: [
            'Achieved a perfect GPA of 5.00 in Science with strong analytical foundations.',
            'Strengthened quantitative rigor in Higher Mathematics, Physics, Chemistry, and Computer Studies.',
            'Certified IELTS Band 7.5 by British Council (2020) for global consulting & technical communication.',
          ],
          tags: ['GPA 5.00/5.00', 'Higher Math', 'Physics', 'Chemistry', 'IELTS 7.5'],
        },
        {
          index: '03',
          institution: 'Scholarshome',
          shortName: 'Scholarshome',
          degree: 'Secondary School Certificate (Science)',
          period: '2016 — 2018',
          location: 'Sylhet / Dhaka',
          badge: 'GPA 5.00 / 5.00 · National Champion',
          pitch:
            'Earned a perfect 5.00 GPA and Talent Pool Scholarship while clinching national champion titles at NHSPC and the Physics Olympiad.',
          details: [
            'Achieved GPA 5.00 in SSC (Science) and earned a Board Talent Pool Scholarship.',
            'Won Champion titles in Physics Olympiad (2018) and National High School Programming Contest (2016).',
            'Earned First Runners-Up in Mathematics Olympiad & Runners-Up in National Debate Federation (2016).',
          ],
          tags: ['Talent Pool', 'NHSPC Champion', 'Physics Olympiad', 'Math Olympiad', 'NDF Debate'],
        },
      ],
    },

    experience: {
      index: '(05)',
      label: 'EXPERIENCE & LEADERSHIP',
      aside: 'Alpha FMC (NY) & Since 2016',
      intro:
        'Engineering enterprise financial & insurance systems with Alpha FMC in New York working hours — built on years of leadership, brand ambassadorship, and live broadcasting.',
      cta: 'Full profile on LinkedIn',
      historyLabel: 'Chronological history',
      toolsLabel: 'Technical stack & platforms',
      roles: [
        {
          period: 'Present',
          isCurrent: true,
          title: 'Software Engineer (SWE)',
          org: 'Alpha FMC',
          meta: 'New York · US Eastern Working Hours (ET)',
          bullets: [
            'Developing enterprise web and insurance solutions using Unqork and React for US financial services clients.',
            'Engineered core workflows, API integrations, interactive charts, and FIA income calculator modules for Prosperity Life.',
            'Delivered Contact Center Portal features for Farm Family — including PLDC Auto verification, authorization capture, policy headers, and linked policies.',
          ],
        },
        {
          period: '2022 — 2025',
          isCurrent: false,
          title: 'General Secretary',
          org: 'BRAC University Monon',
          meta: 'Dhaka · Leadership & Operations',
          bullets: [
            'Led 5+ major music and dance events (Jan 2022 – Jun 2025), raising average event participation by 30%.',
            'Managed a 20+ student team across logistics, promotions, and on-site operations with 100% on-time delivery.',
            'Secured 4 university partner sponsorships (+15% revenue) and mentored 10+ new recruits annually since 2023.',
          ],
        },
        {
          period: '2024 — 2025',
          isCurrent: false,
          title: 'Campus Ambassador',
          org: 'SkyTracker Limited (for Philip Morris International)',
          meta: 'Dhaka · Brand Activation',
          bullets: [
            'Hosted 6 live campus brand engagement events attended by 500+ students between 2024 and 2025.',
            'Increased brand visibility by 15% through tailored on-ground campaigns and student-first outreach.',
            'Partnered with marketing teams to produce event promotions, lifting student participation by 20%.',
          ],
        },
        {
          period: '2024 — 2025',
          isCurrent: false,
          title: 'Campus Ambassador',
          org: 'CareTutors Technologies Ltd.',
          meta: 'Dhaka · Growth & Mentorship',
          bullets: [
            'Connected 300+ students with verified tuition opportunities, increasing student engagement by 30%.',
            'Secured partnerships with 3 local businesses, elevating campus brand visibility by 25%.',
            'Mentored 10 new student ambassadors and expanded the campus network by 40% within one year.',
          ],
        },
        {
          period: '2021',
          isCurrent: false,
          title: 'Radio and Video Jockey',
          org: 'Radio Boom',
          meta: 'Dhaka · Live Broadcast & Audio',
          bullets: [
            'Hosted and produced 50+ live broadcasts engaging an average of 500 listeners per show.',
            'Scripted daily interactive content with programming teams, growing listener engagement by 25%.',
            'Engineered live audio production, lifting broadcast quality and audience retention by 15%.',
          ],
        },
        {
          period: '2020',
          isCurrent: false,
          title: 'Radio and Video Jockey',
          org: 'Radio Carnival',
          meta: 'Dhaka · On-Air & Voice Production',
          bullets: [
            'Delivered 80+ talk and music segments across peak hours, raising overall listener engagement by 20%.',
            'Scripted narratives and performed voice acting for dynamic live radio formats.',
            'Edited and mastered broadcast audio, driving a 15% rise in positive audience feedback.',
          ],
        },
        {
          period: '2016 — 2018',
          isCurrent: false,
          title: 'Child Journalist',
          org: "National Children's Task Force (NCTF)",
          meta: 'Dhaka · Editorial & Reporting',
          bullets: [
            'Published 10+ investigative articles in the NCTF national newspaper spotlighting youth and child rights.',
            'Interviewed 25+ children and community members to document grassroots social challenges.',
            'Collaborated with editorial teams to lift section readership by 30%.',
          ],
        },
      ],
      tools: [
        'Unqork', 'React', 'JavaScript', 'Python', 'Node.js', 'Express', 'MongoDB',
        'Flutter', 'Dart', 'FastAPI', 'REST APIs', 'SQLite', 'C / C++', 'SQL',
        'GitHub Actions', 'Docker', 'Firebase', 'GSAP', 'LaTeX', 'Premiere Pro',
      ],
    },

    motto: {
      eyebrow: 'MY MOTTO',
      topLine: 'Good software',
      accentLine: 'is invisible.',
      hoverHint: 'Hover to read the honest version',
      secretTop: 'Until production breaks.',
      secretAccent: 'Then we ship the fix.',
      breakBtn: 'Break it',
      restoreBtn: 'Restore grid',
      codeBtn: 'Show the code',
    },

    testimonials: {
      index: '(06)',
      label: 'VOICES & NATIONAL HONORS',
      aside: 'Collaborators & achievements',
      items: [
        {
          id: 'ni',
          initials: 'NI',
          name: 'Nuhin Islam',
          role: 'Product & Engineering Collaborator',
          quote:
            'Mushfique bridges technical architecture and calm execution better than almost anyone I have worked with. Whether shipping an enterprise React workflow under deadline or aligning a twenty-person crew, he brings clarity before writing the first line.',
        },
        {
          id: 'na',
          initials: 'NA',
          name: 'Nilima Ashraf',
          role: 'Design & Campus Event Partner',
          quote:
            'Working alongside Mushfique on live productions and digital launches means zero guesswork. He obsesses over the tiny details — typography rhythm, response speed, crowd energy — that separate forgettable software from work people remember.',
        },
        {
          id: 'ti',
          initials: 'TI',
          name: 'Towfiq Islam',
          role: 'Software Systems Peer',
          quote:
            'From solving algorithmic problems at speed to crafting interactive React & Flutter experiences like KhaboKi and 29 Card Game, Mushfique approaches every build with the curiosity of an Olympiad competitor and the discipline of a systems engineer.',
        },
      ],
      awardsHeading: 'National Awards & Certifications',
      awards: [
        { year: '2020', title: 'IELTS Band 7.5', org: 'British Council — Global Communication Proficiency' },
        { year: '2018', title: 'Champion', org: 'Bangladesh Physics Olympiad' },
        { year: '2016', title: 'Champion', org: 'National High School Programming Contest [NHSPC]' },
        { year: '2016', title: 'First Runners Up', org: 'Bangladesh Mathematics Olympiad' },
        { year: '2016', title: 'Runners Up', org: 'National Debate Federation [NDF]' },
      ],
    },

    offClock: {
      index: '(07)',
      label: 'OFF THE CLOCK · MUSIC',
      aside: 'Spotify playlists & late-night rotation',
      heading: 'After hours',
      musicTitle: 'On repeat · Spotify',
      musicSubtitle: 'Pick a playlist or track below to load the live Spotify player or switch the site ambient soundtrack.',
      openSpotify: 'Open in Spotify',
      spotifyItems: [
        {
          id: 'playlist',
          ambientId: 'mayabi',
          kind: 'PLAYLIST',
          title: 'মায়াবী ঘর',
          subtitle: 'Warm Acoustic Guitar Arpeggio · Late-night coding rotation',
          url: 'https://open.spotify.com/playlist/5Xk9mTY2zyylR0VbZgAIEY',
          embedUrl: 'https://open.spotify.com/embed/playlist/5Xk9mTY2zyylR0VbZgAIEY?utm_source=generator&theme=0',
        },
        {
          id: 'track1',
          ambientId: 'carew',
          kind: 'TRACK 01',
          title: 'Half Glass Carew',
          subtitle: 'Midnight Indie Groove · Heavy late-night rotation',
          url: 'https://open.spotify.com/track/44MnDlUL9YOXdBgjwV6M2E?si=1a9fe7a716bb4cdb',
          embedUrl: 'https://open.spotify.com/embed/track/44MnDlUL9YOXdBgjwV6M2E?utm_source=generator&theme=0',
        },
        {
          id: 'track2',
          ambientId: 'pakhi',
          kind: 'TRACK 02',
          title: 'Manush Pakhir Gaan',
          subtitle: 'Folk Flute & Bell Harmonics · Storytelling after midnight',
          url: 'https://open.spotify.com/track/3wUDWYwwx1vAKGCIEcV14C?si=5f73a67be664107',
          embedUrl: 'https://open.spotify.com/embed/track/3wUDWYwwx1vAKGCIEcV14C?utm_source=generator&theme=0',
        },
        {
          id: 'track3',
          ambientId: 'shohor',
          kind: 'TRACK 03',
          title: 'Shohorer Duita Gaan',
          subtitle: 'Dhaka Lo-Fi Synth & Rain · City lights & quiet commutes',
          url: 'https://open.spotify.com/track/78ra1uZD52q7GBwsLVMTpK?si=e36fa5cdc88b4ee1',
          embedUrl: 'https://open.spotify.com/embed/track/78ra1uZD52q7GBwsLVMTpK?utm_source=generator&theme=0',
        },
      ],
    },

    gaming: {
      index: '(08)',
      label: 'GAMING & ARENA',
      aside: 'Valorant Controller Main & EA SPORTS FC 27',
      heading: 'In the shadows & on the pitch',
      valorant: {
        title: 'VALORANT · PC',
        status: 'Controller Main',
        agent: 'Omen',
        role: 'Controller',
        ign: 'Sirius Black #Black',
        note: 'Move across the interactive Omen dot figure to reveal the phantom beneath — one-way smokes, Paranoia timings, and aggressive Shrouded Step mind-games.',
        abilities: [
          { key: 'Q', name: 'Paranoia', icon: '/images/omen-ability-1.png' },
          { key: 'E', name: 'Dark Cover', icon: '/images/omen-ability-2.png' },
          { key: 'C', name: 'Shrouded Step', icon: '/images/omen-ability-3.png' },
          { key: 'X', name: 'From the Shadows', icon: '/images/omen-ability-4.png' },
        ],
      },
      otherGames: [
        {
          title: 'EA SPORTS FC 27',
          badge: 'Now · Pitch',
          platform: 'Tactical Football',
          note: 'High-press possession, quick wing transitions, and late stoppage-time drama.',
        },
        {
          title: '29 Card Game (Bengal Dynasty)',
          badge: 'Built & Live',
          platform: 'Custom Web Table',
          note: 'Playing my own Mughal-themed trick-taking engine when debugging turns into a duel.',
        },
      ],
    },

    chat: {
      heading: 'Ask me anything.',
      description:
        'Curious about my Software Engineering work at Alpha FMC (New York) with Unqork & React for Prosperity Life and Farm Family, my side builds, or my Valorant Omen main? Ask right here.',
      fallbackLabel: 'Or email directly:',
      badge: 'Interactive Portfolio Assistant · Local Knowledge Graph',
      greeting:
        "Hey! I'm Mushfique's portfolio assistant. Ask about my SWE work at Alpha FMC (Unqork & React for Prosperity Life & Farm Family), side projects (RannaBhai, KhaboKi, 29 Card Game), or Valorant Omen main.",
      placeholder: 'Ask about Alpha FMC, Unqork/React, projects, or Omen...',
      chips: [
        'What do you do at Alpha FMC?',
        'Tell me about Prosperity Life & Farm Family',
        'What awards & degrees do you hold?',
        'What is your Valorant main & IGN?',
      ],
    },

    contact: {
      index: '(09)',
      label: 'CONTACT',
      aside: 'Alpha FMC · New York Hours (ET)',
      status: 'Software Engineer @ Alpha FMC (NY) · Open to great conversations',
      heading: "What are we building next?",
      timelineTitle: 'How it starts',
      steps: [
        { num: '01', title: 'Send a note', desc: 'Share the product idea, architecture question, or collaboration you have in mind.' },
        { num: '02', title: 'Quick reply', desc: 'I respond promptly across New York (ET) and Dhaka (GMT+6) hours.' },
        { num: '03', title: 'Build & ship', desc: 'Align on clean engineering, crisp UX, and reliable delivery.' },
      ],
      ctaText: 'Start a conversation',
      footerMeta: {
        versionTitle: 'EDITION',
        versionValue: '2026 © Mushfique',
        timeTitle: 'WORKING HOURS',
        recognitionTitle: 'RECOGNITION',
        recognitionItems: ['Alpha FMC · SWE', 'NHSPC Champion', '4x BRACU Scholar'],
        socialsTitle: 'CONNECT',
      },
    },

    story: {
      skipSite: 'Skip to the site',
      dragHint: 'SCROLL OR USE ARROWS · DRAG CANVAS TO ORBIT',
      chapters: [
        {
          index: '00',
          shape: 'orbit',
          eyebrow: 'DHAKA · 2016',
          title: 'It started with curiosity & a blinking cursor.',
          body: 'Before enterprise platforms, it was competitive math, physics problems, and winning the 2016 National High School Programming Contest.',
        },
        {
          index: '01',
          shape: 'wave',
          eyebrow: '2016 – 2018 · NCTF',
          title: 'Learning to ask sharper questions.',
          body: 'As a Child Journalist with the National Children’s Task Force, I interviewed 25+ community members and published 10+ national articles.',
        },
        {
          index: '02',
          shape: 'wave',
          eyebrow: '2020 – 2021 · ON AIR',
          title: 'Finding rhythm behind live microphones.',
          body: '130+ live broadcasts across Radio Carnival and Radio Boom taught me pacing, audience empathy, and staying composed when everything is live.',
        },
        {
          index: '03',
          shape: 'globe',
          eyebrow: '2022 – 2025 · BRAC UNIVERSITY',
          title: 'Computer Science with four merit scholarships.',
          body: 'Graduated with a 3.65 CGPA while earning four consecutive full merit scholarships and leading BRAC University Monon as General Secretary.',
        },
        {
          index: '04',
          shape: 'code',
          eyebrow: 'INDEPENDENT BUILDS',
          title: 'Shipping RannaBhai, KhaboKi & JonoShokti.',
          body: 'Built fast, human-focused products — from a 100+ user Flutter meal ledger under 150ms to civic voting APIs and a 6-theme 29 Card Game.',
        },
        {
          index: '05',
          shape: 'portrait',
          eyebrow: 'ALPHA FMC · NEW YORK',
          title: 'Software Engineering at enterprise scale.',
          body: 'Now working as a Software Engineer with Alpha FMC on New York hours, building mission-critical Unqork and React applications.',
        },
        {
          index: '06',
          shape: 'code',
          eyebrow: 'PROSPERITY LIFE & FARM FAMILY',
          title: 'Financial workflows, calculators & contact portals.',
          body: 'Delivered FIA income calculators, dynamic charts, and PLDC Auto policy verification experiences for major US insurance clients.',
        },
        {
          index: '07',
          shape: 'shroud',
          eyebrow: 'AFTER HOURS',
          title: 'Bangla indie tracks & Omen smokes.',
          body: 'When the IDE closes, মায়াবী ঘর plays on repeat, FC 27 hits the pitch, and Sirius Black #Black locks Controller on Valorant.',
        },
        {
          index: '08',
          shape: 'globe',
          eyebrow: 'NEW YORK ET · DHAKA GMT+6',
          title: 'Bridging timezones with clean engineering.',
          body: 'Combining Unqork enterprise rigor, React craftsmanship, and full-stack curiosity to ship software that feels effortless.',
        },
        {
          index: '09',
          shape: 'portrait',
          eyebrow: 'NEXT CHAPTER',
          title: "Let's build something unforgettable.",
          body: 'Explore the full site or reach out directly at muuushfique@gmail.com.',
          isFinal: true,
        },
      ],
    },
  },

  bn: {
    gate: {
      eyebrow: 'মুশফিকুর রহমান নাঈম · সফটওয়্যার ইঞ্জিনিয়ার (SWE)',
      heading: 'আপনি কীভাবে আমার কাজ দেখতে চান?',
      modes: [
        {
          index: '01',
          id: 'site',
          title: 'সম্পূর্ণ সাইট',
          subtitle: 'Alpha FMC এন্টারপ্রাইজ কাজ, ব্যক্তিগত প্রজেক্ট, শিক্ষা, সম্মাননা এবং অবসর।',
          meta: '১১টি সেকশন · ইন্টারঅ্যাক্টিভ',
        },
        {
          index: '02',
          id: 'story',
          title: 'গল্পের অধ্যায়',
          subtitle: '১০টি অধ্যায়ে ৩ডি পার্টিকেল যাত্রা — NHSPC থেকে Alpha FMC নিউ ইয়র্ক।',
          meta: '১০টি অধ্যায় · ৩ডি + অডিও',
        },
      ],
      soundHint: 'সফট অ্যাম্বিয়েন্ট সাউন্ডট্র্যাক',
    },

    nav: {
      availability: 'সফটওয়্যার ইঞ্জিনিয়ার @ Alpha FMC (NY)',
      links: [
        { label: 'পরিচিতি', href: '#about' },
        { label: 'কাজ', href: '#work' },
        { label: 'যোগাযোগ', href: '#contact' },
      ],
      menuBtn: 'মেনু',
      talkCta: 'কথা বলুন',
      nomineeBadge: 'Alpha FMC · SWE',
    },

    hero: {
      headlineLines: ['সহজ ও নির্ভরযোগ্য', 'সফটওয়্যার নির্মাণ।'],
      subcopy:
        'Alpha FMC (নিউ ইয়র্ক)-এ সফটওয়্যার ইঞ্জিনিয়ার হিসেবে Unqork ও React দিয়ে Prosperity Life এবং Farm Family-এর এন্টারপ্রাইজ সিস্টেম তৈরি করছি।',
      primaryCta: 'কথা বলুন',
      secondaryCta: 'কাজ দেখুন',
      tzDiff: 'Alpha FMC · নিউ ইয়র্ক অফিস সময় (09:00–17:00 ET)',
    },

    about: {
      index: '(০১)',
      label: 'আমার সম্পর্কে',
      aside: 'Alpha FMC · নিউ ইয়র্ক সময় (ET)',
      statementLead: 'একজন সফটওয়্যার ইঞ্জিনিয়ার — ',
      statementBold: 'যিনি Alpha FMC-তে Unqork ও React দিয়ে Prosperity Life এবং Farm Family-এর এন্টারপ্রাইজ প্ল্যাটফর্ম তৈরি করছেন ',
      statementTail: 'পরিচ্ছন্ন আর্কিটেকচার ও চমৎকার ইউজার অভিজ্ঞতাকে সর্বোচ্চ গুরুত্ব দিয়ে।',
      bioFull:
        'জটিল ব্যবসায়িক ওয়ার্কফ্লোকে নির্ভরযোগ্য ওয়েব, এন্টারপ্রাইজ ও মোবাইল সফটওয়্যারে রূপান্তর করি। আইডিয়া থেকে প্রোডাকশন লঞ্চ পর্যন্ত কাজের অভিজ্ঞতার পাশাপাশি ক্লায়েন্ট কনসাল্টিং ও পাবলিক হোস্টিং যোগাযোগে এনেছে বাড়তি দৃঢ়তা।',
      sealText: 'সফটওয়্যার ইঞ্জিনিয়ার · ALPHA FMC NY · ৪X ব্র্যাকইউ স্কলার · ',
      stats: [
        { value: '2', unit: 'clients', label: 'Alpha FMC-তে ইউএস এন্টারপ্রাইজ প্ল্যাটফর্ম' },
        { value: '3.65', unit: 'CGPA', label: 'ব্র্যাকইউ সিএস · ৪ বার মেরিট স্কলার' },
        { value: '6+', unit: 'builds', label: 'এন্টারপ্রাইজ, ওয়েব ও মোবাইল সিস্টেম' },
        { value: '4+', unit: 'awards', label: 'জাতীয় অলিম্পিয়াড ও বিতর্ক পুরস্কার' },
      ],
    },

    services: {
      index: '(০২)',
      label: 'কাজের ক্ষেত্র',
      aside: 'এন্টারপ্রাইজ ও প্রোডাক্ট ইঞ্জিনিয়ারিং',
      intro: 'Unqork এন্টারপ্রাইজ ওয়ার্কফ্লো, React ফ্রন্টএন্ড, ব্যাকএন্ড এপিআই এবং ক্রস-প্ল্যাটফর্ম অ্যাপ ইঞ্জিনিয়ারিং।',
      skipLabel: 'পরবর্তী সেকশনে যান',
      items: [
        {
          id: 'unqork',
          index: '01',
          title: 'Unqork ও এন্টারপ্রাইজ',
          proficiency: '92%',
          shape: 'layers',
          description:
            'Alpha FMC-তে Unqork ব্যবহার করে পলিসি ভেরিফিকেশন, ফিন্যান্সিয়াল ক্যালকুলেটর এবং পিডিএফ ইলাস্ট্রেশন ওয়ার্কফ্লো নির্মাণ।',
          proof: 'Prosperity Life এবং Farm Family-এর প্রোডাকশন মডিউল ডেলিভারি।',
          tags: ['Unqork', 'Enterprise Workflows', 'Policy Systems', 'JSON Schemas', 'API Orchestration'],
        },
        {
          id: 'react',
          index: '02',
          title: 'React ও ফ্রন্টএন্ড',
          proficiency: '92%',
          shape: 'browser',
          description:
            'আধুনিক React ইন্টারফেস, ডিজাইন সিস্টেম, ইন্টারঅ্যাক্টিভ চার্ট এবং GSAP/Canvas মোশন।',
          proof: 'Alpha FMC ক্লায়েন্ট পোর্টাল, RannaBhai এবং 29 Card Game-এ ব্যবহৃত।',
          tags: ['React', 'JavaScript', 'REST APIs', 'GSAP', 'SVG Systems', 'Responsive UI'],
        },
        {
          id: 'fullstack',
          index: '03',
          title: 'ফুল-স্ট্যাক ও এপিআই',
          proficiency: '88%',
          shape: 'gears',
          description:
            'Node.js, Express, MongoDB এবং Python/FastAPI-তে স্কেলেবল ব্যাকএন্ড সার্ভিস ও CI/CD।',
          proof: 'JonoShokti-তে ভোট প্রসেসিং সময় ২০% কমানো হয়েছে।',
          tags: ['Node.js', 'Express', 'MongoDB', 'Python', 'FastAPI', 'SQL'],
        },
        {
          id: 'mobile',
          index: '04',
          title: 'মোবাইল ও ফ্লাটার',
          proficiency: '85%',
          shape: 'mobile',
          description:
            'ডার্ট ও ফ্লাটার দিয়ে ১৫০ms-এর কম ল্যাটেন্সিতে অফলাইন-সক্ষম ক্রস-প্ল্যাটফর্ম মোবাইল অ্যাপ।',
          proof: 'KhaboKi (১০০+ ইউজার, -৮৫% ভুল)।',
          tags: ['Flutter', 'Dart', 'SQLite', 'Provider', 'TableCalendar'],
        },
        {
          id: 'data',
          index: '05',
          title: 'ডেটা ও অ্যালগরিদম',
          proficiency: '80%',
          shape: 'gauge',
          description:
            'অ্যালগরিদমিক সমস্যা সমাধান (NHSPC চ্যাম্পিয়ন) এবং Pandas, NumPy ও Google Charts অ্যানালিটিক্স।',
          proof: 'ফিন্যান্সিয়াল ক্যালকুলেটর ও এমএল এক্সপেরিমেন্টে প্রয়োগ।',
          tags: ['Algorithms', 'C/C++', 'Pandas', 'NumPy', 'Google Charts', 'Jupyter'],
        },
        {
          id: 'devops',
          index: '06',
          title: 'ডেলিভারি ও মিডিয়া',
          proficiency: '86%',
          shape: 'cloud',
          description:
            'GitHub Actions CI/CD, Docker, Agile ডেলিভারি, LaTeX এবং অডিও-ভিডিও প্রোডাকশন।',
          proof: 'Alpha FMC কনসাল্টিং এবং ১৩০+ লাইভ রেডিও শো-এর অভিজ্ঞতা।',
          tags: ['Git/GitHub', 'GitHub Actions', 'Docker', 'Agile / Jira', 'LaTeX', 'Premiere Pro'],
        },
      ],
    },

    process: {
      heading: 'প্রথম আলোচনা থেকে নির্ভরযোগ্য প্রোডাকশন',
      skipLabel: 'পরবর্তী সেকশনে যান',
      steps: [
        { index: '01', title: 'অনুসন্ধান', desc: 'ব্যবসায়িক নিয়ম, এজ কেস এবং ইউজারের প্রকৃত প্রয়োজন নির্ধারণ।' },
        { index: '02', title: 'প্রোটোটাইপ', desc: 'স্টেকহোল্ডারদের সাথে দ্রুত ইন্টারঅ্যাক্টিভ ফ্লো যাচাই।' },
        { index: '03', title: 'আর্কিটেকচার', desc: 'মডিউলার Unqork স্কিমা, React স্টেট ও এপিআই কন্ট্রাক্ট ডিজাইন।' },
        { index: '04', title: 'ইঞ্জিনিয়ারিং', desc: 'দ্রুতগতির, পরিচ্ছন্ন এবং মেইনটেইনেবল কোড নির্মাণ।' },
        { index: '05', title: 'যাচাই', desc: 'পলিসি ভেরিফিকেশন, অথরাইজেশন ও ক্রস-ডিভাইস টেস্টিং।' },
        { index: '06', title: 'ডেলিভারি', desc: 'নিউ ইয়র্ক ও গ্লোবাল টিমের সাথে নিরবচ্ছিন্ন ডিপ্লয়মেন্ট।' },
      ],
    },

    work: {
      index: '(০৩)',
      label: 'নির্বাচিত কাজ',
      aside: 'Alpha FMC এন্টারপ্রাইজ ও ব্যক্তিগত প্রজেক্ট',
      eyebrow: 'আমার তৈরি উল্লেখযোগ্য সিস্টেম',
      alsoLabel: 'আরও দেখুন GitHub-এ:',
      alsoItems: [
        { name: 'Sparktech', url: 'https://github.com/muuushfique/Sparktech' },
        { name: 'Timetable Creator (PHP)', url: 'https://github.com/muuushfique/timetable_creator' },
        { name: 'BroadcastApp (Flutter)', url: 'https://github.com/muuushfique/broadcastapp' },
        { name: 'Machine Learning Labs', url: 'https://github.com/muuushfique/Machine-Learning' },
        { name: 'BRACU CSE220', url: 'https://github.com/muuushfique/CSE_220-Fall_2023' },
      ],
      skipLabel: 'পরবর্তী সেকশনে যান',
      cursorLabel: 'বিস্তারিত দেখুন',
      projects: null,
    },

    education: {
      index: '(০৪)',
      label: 'শিক্ষাজীবন',
      aside: 'একাডেমিক ভিত্তি ও বৃত্তি',
      heading: 'যেখান থেকে শুরু',
      items: null,
    },

    experience: {
      index: '(০৫)',
      label: 'অভিজ্ঞতা ও নেতৃত্ব',
      aside: 'Alpha FMC (NY) এবং ২০১৬ থেকে',
      intro:
        'Alpha FMC নিউ ইয়র্ক সময়ে এন্টারপ্রাইজ সফটওয়্যার ইঞ্জিনিয়ারিং — সাথে দীর্ঘদিনের ক্লাব নেতৃত্ব, ব্র্যান্ড অ্যাম্বাসেডর ও লাইভ রেডিও অভিজ্ঞতা।',
      cta: 'LinkedIn প্রোফাইল দেখুন',
      historyLabel: 'কর্ম ও নেতৃত্বের ইতিহাস',
      toolsLabel: 'টেকনিক্যাল স্ট্যাক ও প্ল্যাটফর্ম',
      roles: null,
      tools: null,
    },

    motto: {
      eyebrow: 'আমার মূলমন্ত্র',
      topLine: 'ভালো সফটওয়্যার',
      accentLine: 'অদৃশ্য থাকে।',
      hoverHint: 'সত্যিটা পড়তে হোভার করুন',
      secretTop: 'যতক্ষণ না বাগ আসে।',
      secretAccent: 'তখন ফিক্স শিপ করি।',
      breakBtn: 'ভেঙে দেখুন',
      restoreBtn: 'ঠিক করুন',
      codeBtn: 'কোড দেখুন',
    },

    testimonials: {
      index: '(০৬)',
      label: 'মতামত ও জাতীয় সম্মাননা',
      aside: 'সহকর্মী ও অর্জনসমূহ',
      items: null,
      awardsHeading: 'জাতীয় পুরস্কার ও সার্টিফিকেশন',
      awards: null,
    },

    offClock: {
      index: '(০৭)',
      label: 'অবসর সময়ে · গান',
      aside: 'স্পটিফাই প্লেলিস্ট ও গান',
      heading: 'কাজের বাইরে',
      musicTitle: 'স্পটিফাই প্লেলিস্ট ও গান',
      musicSubtitle: 'নিচে প্লেলিস্ট বা ট্র্যাক বাছাই করে লাইভ স্পটিফাই প্লেয়ার অথবা সাইটের অ্যাম্বিয়েন্ট সাউন্ড চালু করুন।',
      openSpotify: 'Spotify-তে খুলুন',
      spotifyItems: null,
    },

    gaming: {
      index: '(০৮)',
      label: 'গেমিং ও অ্যারেনা',
      aside: 'ভ্যালোরেন্ট কন্ট্রোলার মেইন ও FC 27',
      heading: 'ছায়ার ভেতর ও ফুটবল পিচে',
      valorant: null,
      otherGames: null,
    },

    chat: {
      heading: 'যেকোনো প্রশ্ন করুন।',
      description:
        'Alpha FMC (নিউ ইয়র্ক)-এ Unqork ও React-এ Prosperity Life ও Farm Family-এর কাজ, আমার প্রজেক্ট অথবা ভ্যালোরেন্টে Omen মেইন সম্পর্কে জানতে এখানে প্রশ্ন করুন।',
      fallbackLabel: 'সরাসরি ইমেইল:',
      badge: 'ইন্টারঅ্যাক্টিভ পোর্টফোলিও অ্যাসিস্ট্যান্ট',
      greeting:
        'হ্যালো! আমি মুশফিকের পোর্টফোলিও অ্যাসিস্ট্যান্ট। Alpha FMC-তে আমার SWE কাজ, প্রজেক্ট, পুরস্কার অথবা ভ্যালোরেন্টে Omen মেইন সম্পর্কে জিজ্ঞাসা করতে পারেন।',
      placeholder: 'Alpha FMC, Unqork/React, প্রজেক্ট বা Omen সম্পর্কে লিখুন...',
      chips: [
        'Alpha FMC-তে আপনি কী কাজ করেন?',
        'Prosperity Life ও Farm Family সম্পর্কে বলুন',
        'কী কী জাতীয় পুরস্কার পেয়েছেন?',
        'আপনার Valorant মেইন ও IGN কী?',
      ],
    },

    contact: {
      index: '(০৯)',
      label: 'যোগাযোগ',
      aside: 'Alpha FMC · নিউ ইয়র্ক সময় (ET)',
      status: 'সফটওয়্যার ইঞ্জিনিয়ার @ Alpha FMC (NY)',
      heading: 'একসাথে নতুন কী তৈরি করব?',
      timelineTitle: 'শুরুর ধাপ',
      steps: [
        { num: '০১', title: 'বার্তা পাঠান', desc: 'আপনার প্রজেক্ট আইডিয়া, আর্কিটেকচার প্রশ্ন বা কাজের প্রস্তাব জানান।' },
        { num: '০২', title: 'দ্রুত উত্তর', desc: 'নিউ ইয়র্ক (ET) এবং ঢাকা (GMT+6) সময়ে দ্রুত উত্তর দিই।' },
        { num: '০৩', title: 'নির্মাণ ও লঞ্চ', desc: 'সঠিক আর্কিটেকচারে পরিচ্ছন্ন সফটওয়্যার ডেলিভারি।' },
      ],
      ctaText: 'আলোচনা শুরু করুন',
      footerMeta: {
        versionTitle: 'সংস্করণ',
        versionValue: '২০২৬ © মুশফিক',
        timeTitle: 'অফিস সময়',
        recognitionTitle: 'সম্মাননা',
        recognitionItems: ['Alpha FMC · SWE', 'NHSPC চ্যাম্পিয়ন', '৪x ব্র্যাকইউ স্কলার'],
        socialsTitle: 'সংযোগ',
      },
    },

    story: {
      skipSite: 'সাইটে ফিরে যান',
      dragHint: 'স্ক্রল বা অ্যারো ব্যবহার করুন · ৩ডি ক্যানভাস ঘোরান',
      chapters: null,
    },
  },
};

export const CODE_SNIPPETS = {
  hero: {
    file: 'InteractiveDotFigure.jsx',
    lines: `// High-density interactive luminance dot portrait (Hero & Omen)
const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
p.vx += (tx - p.x) * 0.085 - p.vx * 0.2;
p.vy += (ty - p.y) * 0.085 - p.vy * 0.2;`,
  },
  about: {
    file: 'AlphaFMCContext.js',
    lines: `// Software Engineer @ Alpha FMC (New York · US Eastern Hours)
const profile = {
  role: 'Software Engineer (SWE)',
  company: 'Alpha FMC (New York)',
  coreStack: ['Unqork', 'React', 'REST APIs', 'Node.js', 'Python'],
  clients: ['Prosperity Life', 'Farm Family'],
};`,
  },
  services: {
    file: 'ServicesStage.jsx',
    lines: `// Enterprise Unqork + React capabilities paired with 3D DotStage
<div className="ws-stage">
  <CapabilityCopy active={items[activeTab]} />
  <DotStage shape={items[activeTab].shape} />
</div>`,
  },
  work: {
    file: 'SelectedWork.jsx',
    lines: `// Enterprise (Prosperity Life, Farm Family) + Personal Builds
const featured = ['Prosperity Life', 'Farm Family', 'RannaBhai', 'KhaboKi', '29 Card Game', 'JonoShokti'];`,
  },
  education: {
    file: 'EducationAccordion.jsx',
    lines: `// Horizontal Indigo Accordion — BRACU / RAJUK / Scholarshome
<div className="acc-container">
  {degrees.map((d, idx) => <AccordionPanel expanded={active === idx} />)}
</div>`,
  },
  experience: {
    file: 'ExperienceLedger.jsx',
    lines: `// Alpha FMC (NY) -> BRACU Monon -> SkyTracker -> CareTutors -> Radio Boom
roles.map((role) => <RoleRow key={role.org} current={role.isCurrent} />);`,
  },
  offClock: {
    file: 'OmenDotStage.jsx',
    lines: `// Interactive Omen Dot Figure + IGN Sirius Black #Black
<InteractiveDotFigure src="/images/omen-portrait.png" variant="omen" burstSignal={abilityPulse} />
const spotifyPlaylist = 'https://open.spotify.com/playlist/5Xk9mTY2zyylR0VbZgAIEY';`,
  },
  contact: {
    file: 'DualTimezoneClock.js',
    lines: `// Live New York (ET) working hours + Dhaka (GMT+6) sync
new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' });`,
  },
};

export function getChatResponse(query) {
  const q = query.toLowerCase();
  if (q.includes('alpha') || q.includes('work') || q.includes('prosperity') || q.includes('farm') || q.includes('unqork') || q.includes('কাজ')) {
    return "I'm a Software Engineer (SWE) at Alpha FMC working on New York (US Eastern) hours. I build enterprise insurance & financial platforms using Unqork and React — including Pathway FIA income calculators, charts, and PDF workflows for Prosperity Life, and Contact Center Portal features (PLDC Auto verification, authorization capture, and linked policies) for Farm Family.";
  }
  if (q.includes('stack') || q.includes('tech') || q.includes('skill') || q.includes('react')) {
    return "My primary stack as a Software Engineer is Unqork & React for enterprise applications, complemented by Node.js/Express/MongoDB, Python/FastAPI, Flutter/Dart, REST APIs, SQL, GitHub Actions CI/CD, and GSAP/Canvas interactive interfaces.";
  }
  if (q.includes('29') || q.includes('card') || q.includes('khaboki') || q.includes('project') || q.includes('rannabhai') || q.includes('jonoshokti')) {
    return "Alongside my enterprise builds for Prosperity Life and Farm Family at Alpha FMC, my featured projects include RannaBhai (MERN cooking platform, 90% satisfaction), KhaboKi (Flutter multi-household ledger for 100+ users at <150ms), 29 Card Game (Bengal Dynasty — React + GSAP with 6 themes), and JonoShokti (FastAPI civic voting).";
  }
  if (q.includes('award') || q.includes('olympiad') || q.includes('ielts') || q.includes('education') || q.includes('brac') || q.includes('পুরস্কার')) {
    return "I hold a B.Sc. in Computer Science from BRAC University (CGPA 3.65/4.00, 4 consecutive full merit scholarships) after GPA 5.00 Talent Pool honors at RAJUK Uttara Model College & Scholarshome. Awards include Champion in NHSPC (2016) & Physics Olympiad (2018), First Runners-Up in Math Olympiad (2016), Runners-Up in NDF Debate (2016), and IELTS Band 7.5.";
  }
  if (q.includes('valorant') || q.includes('omen') || q.includes('game') || q.includes('spotify') || q.includes('fc') || q.includes('ign')) {
    return "Off the clock, I main Controller (Omen) in Valorant on PC — my IGN is 'Sirius Black #Black' (check out the interactive Omen dot figure in section 07!). I also play EA SPORTS FC 27 and listen to my Spotify playlist 'মায়াবী ঘর', plus Half Glass Carew, Manush Pakhir Gaan, and Shohorer Duita Gaan.";
  }
  if (q.includes('contact') || q.includes('email') || q.includes('hours') || q.includes('time') || q.includes('যোগাযোগ')) {
    return "I work US Eastern hours (09:00–17:00 ET) with Alpha FMC in New York. Reach me at muuushfique@gmail.com, +880 1799-905366, LinkedIn (/in/muuushfique), GitHub (@muuushfique), Facebook, or Instagram!";
  }
  return "I'm S. M. Mushfiqur Rahman Nayeem (Mushfique) — a Software Engineer (SWE) at Alpha FMC (New York) building Unqork & React platforms for Prosperity Life and Farm Family, plus web & interactive products. Ask about my Alpha FMC work, projects, education, or Valorant Omen main!";
}
