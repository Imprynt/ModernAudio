/**
 * Modern Audio Company Private Limited - Central Site Configuration
 * Single source of truth for branding, verified details, contact points,
 * venue solutions taxonomy, equipment catalog, and legal information.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SpaceCategory {
  id: string;
  slug: string; // SEO-optimized URL slug for dedicated venue pages
  label: string;
  tagline: string;
  headline: string;
  description: string;
  image: string;
  imageAlt?: string;
  href: string;
  configurations: string[];
  confirmedSetups: string[]; // Backward-compatible alias for configurations
  statsLabel?: string;
  statsValue?: string;
  systemScope: string;
  // Related venue slugs for deep cross-linking
  relatedSlugs: string[];
  // Venue-specific meta descriptions & titles
  metaTitle: string;
  metaDescription: string;
  // Specific FAQs relevant to this space
  faqs: { q: string; a: string }[];
}

export interface EquipmentCategory {
  id: string;
  name: string;
  scope: string;
  characteristics: string[];
  description: string;
  typicalSetups: string[];
  image: string;
  imageAlt?: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  tagline: string;
  summary: string;
  details: string[];
  image: string;
  imageAlt?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export const SITE_CONFIG = {
  // Legal & Corporate Identity
  name: "Modern Audio Company Private Limited",
  legalName: "Modern Audio Company Private Limited",
  shortName: "Modern Audio Co.",
  acronym: "MACPL",
  locationBadge: "Chandni Chowk, Delhi · Serving Delhi, NCR & Pan India",
  primaryMarkets: ["Delhi", "NCR", "Pan India"],

  // Base URL resolution
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://modernaudioco.in",

  // Brand Messaging
  tagline: "Complete Audio Solutions. Designed Around Your Space.",
  promise: "You Bring The Requirement. We Handle The Audio.",
  description:
    "Born in Chandni Chowk, Delhi, Modern Audio Company Private Limited provides complete commercial, institutional, and hospitality audio systems across Delhi, NCR & Pan India.",

  // Physical & Registered Address
  address: {
    street: "1481, Dewan Hall Road, Adjacent to Moti Cinema",
    area: "Chandni Chowk",
    city: "Delhi",
    postalCode: "110006",
    state: "Delhi",
    country: "India",
    countryCode: "IN",
    full: "1481, Dewan Hall Road, Adjacent to Moti Cinema, Chandni Chowk, Delhi 110006, India",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=1481+Dewan+Hall+Road+Adjacent+to+Moti+Cinema+Chandni+Chowk+Delhi+110006",
    geo: {
      latitude: 28.6562,
      longitude: 77.2315,
    },
    // Optional custom Google Maps embed URL
    // TODO: paste the src from Google Maps -> search the business -> Share -> Embed a map
    mapEmbedUrl: "",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=1481%2C%20Dewan%20Hall%20Road%2C%20Adjacent%20to%20Moti%20Cinema%2C%20Chandni%20Chowk%2C%20Delhi%20110006%2C%20India",
  },

  // Contact Channels
  contact: {
    // Primary phone: +919811675192
    phone: "+919811675192",
    phoneDisplay: "+91 98116 75192",
    phoneRaw: "9811675192",

    // Secondary phone: +919899154003
    secondaryPhone: "+919899154003",
    secondaryPhoneDisplay: "+91 98991 54003",
    secondaryPhoneRaw: "9899154003",

    // All phone numbers list
    phones: ["+919811675192", "+919899154003"],

    // WhatsApp: Client confirmed "919811675192"
    whatsappNumber: "919811675192",
    whatsapp: "919811675192",
    whatsappDisplay: "+91 98116 75192",
    whatsappRaw: "919811675192",

    // Official email. TODO: Client to confirm primary enquiry inbox.
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "enquiry@modernaudioco.in",
  },

  // Missing Inputs / Unsupplied Information Placeholders
  // RULE: Any UI depending on an empty value must NOT render at all.
  unconfirmed: {
    // TODO: Client to provide verified corporate year of establishment
    yearEstablished: "",
    // TODO: Client to provide GST registration number
    gstNumber: "",
    // TODO: Client to provide Corporate Identification Number (CIN)
    cin: "",
    // TODO: Client to provide official showroom / facility opening hours (e.g., "Mon-Sat: 10:30 AM - 7:30 PM")
    openingHours: "",
    // TODO: Client to provide confirmed team response time in hours (e.g., "2" or "24")
    responseTimeHours: "",
    // TODO: Client to provide verified social media profile URLs
    socials: {
      linkedin: "",
      instagram: "",
      facebook: "",
      youtube: "",
      twitter: "",
    } as Record<string, string>,
    // TODO: Client to provide verified dealer/distributor certificates and authorized brand partner logos
    dealerLogos: [] as { name: string; logoUrl: string }[],
    // TODO: Client to provide client testimonials with verifiable attribution
    testimonials: [] as { clientName: string; venue: string; quote: string; year: string }[],
    // TODO: Client to provide real project photography of completed installations
    projectGallery: [] as { title: string; venueType: string; imageUrl: string; location: string }[],
    // TODO: Confirm official brand nomenclature for Pioneer Pitch Controls setups with client
    pioneerPitchControlsNote:
      "TODO: Source specifies 'Pioneer Pitch Controls setups'. Confirm exact model lines and official nomenclature with client.",
  },

  // Qualified brand network statement
  brandNetworkStatement:
    "Native of Chandni Chowk, serving commercial venues, institutional campuses, and hospitality spaces across Delhi, NCR & Pan India with direct access to leading professional audio manufacturers and commercial audio distributors.",

  // Primary Call-To-Action Labels (Standardized to two primary types across site)
  cta: {
    label: "Discuss Your Requirement", // Backward-compatible alias
    primary: "Discuss Your Requirement",
    secondaryPhone: "Call Us",
    secondarySolutions: "View Solutions",
    href: "/contact",
  },

  // Global Navigation
  nav: [
    { label: "Solutions & Venues", href: "/solutions" },
    { label: "Equipment Portfolio", href: "/#equipment" },
    { label: "The Approach", href: "/#approach" },
    { label: "Process", href: "/#how-it-works" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],

  // Confirmed Equipment Taxonomy
  equipmentTaxonomy: [
    {
      id: "amplifiers",
      name: "Amplifiers",
      scope: "Digital & Analog",
      image: "/images/equipment-amplifiers.jpg",
      imageAlt: "Multi-channel commercial power amplifiers and digital distribution equipment",
      characteristics: ["Single-channel through multiple-channel inputs and outputs", "Commercial installation grade"],
      description:
        "Powerful amplifiers with digital and analog systems, ranging from single-channel units to multi-channel distribution amplifiers for commercial and institutional sound systems.",
      typicalSetups: ["Single-channel amplification", "Multi-channel distribution", "Active/Passive speaker matching"],
    },
    {
      id: "speakers",
      name: "Speakers",
      scope: "Active & Passive · Outdoor & Indoor",
      image: "/images/equipment-speakers.jpg",
      imageAlt: "Wall-mounted and flush ceiling architectural speakers for institutional sound",
      characteristics: [
        "Wall-mounted speaker setups",
        "Ceiling-mounted speaker setups",
        "Floor-mounted speaker setups",
        "All-weather speakers",
        "Waterproof speakers",
        "Garden speakers",
      ],
      description:
        "Complete indoor and outdoor speaker systems across active (powered) and passive setups, for wall mounting, ceiling placement, and floor installations.",
      typicalSetups: ["Wall-mount speaker arrays", "Ceiling speaker networks", "Floor-standing systems"],
    },
    {
      id: "microphones",
      name: "Microphones",
      scope: "Wired & Wireless",
      image: "/images/equipment-microphones.jpg",
      imageAlt: "Commercial podium microphones, lapel packs, and wireless stage vocal mics",
      characteristics: [
        "Handheld microphones",
        "Lapel / collar microphones",
        "Headsets",
        "Tabletop & conference systems",
        "Stage microphones",
      ],
      description:
        "Wired and wireless microphone solutions required for podium speech, stage performances, academic presentation, and conference room discussions.",
      typicalSetups: ["Wireless podium mics", "Lapel and headset packs", "Tabletop conference units", "Stage vocal microphones"],
    },
    {
      id: "sound-mixers",
      name: "Sound Mixers",
      scope: "Digital & Analog",
      image: "/images/equipment-sound-mixers.jpg",
      imageAlt: "Digital and analog mixing consoles with multi-channel routing and digital echo processing",
      characteristics: [
        "Single-channel to multiple-channel inputs & outputs",
        "Digital Echo, Delay & Reverb processing",
      ],
      description:
        "Digital and analog mixing consoles supporting multiple input/output channels with built-in digital echo, delay, and reverb options for clear and balanced sound.",
      typicalSetups: ["Auditorium mixing consoles", "Live-stage performance mixers", "Multi-input routing setups"],
    },
    {
      id: "sound-processors",
      name: "Sound Processors",
      scope: "Digital & Analog",
      image: "/images/equipment-sound-processors.jpg",
      imageAlt: "Digital audio signal processors with integrated automated feedback destroyers",
      characteristics: ["Integrated feedback destroyers", "Signal stability management"],
      description:
        "Digital and analog signal processors equipped with feedback destroyers to eliminate howling, protect loudspeakers, and maintain clean system stability for maintaining 'सुर and ताल' of every sound setup.",
      typicalSetups: ["Feedback elimination", "Signal balancing", "System protection routing"],
    },
    {
      id: "portable-systems",
      name: "Portable Systems",
      scope: "Active & Passive",
      image: "/images/equipment-portable-systems.jpg",
      imageAlt: "High-output battery-powered portable PA systems with wireless microphone support",
      characteristics: ["Wide-area coverage", "Massive people reach", "Large battery life"],
      description:
        "High-output active and passive portable sound systems designed for broad area coverage, outdoor gatherings, and mobile requirements with extended battery backup.",
      typicalSetups: ["Outdoor gathering sound", "Mobile public address", "Battery-operated portable systems"],
    },
    {
      id: "line-array-live",
      name: "Line Array & Live Audio",
      scope: "Active & Passive",
      image: "/images/equipment-line-array.jpg",
      imageAlt: "Curved stage line array speaker arrays and live DJ performance sound systems",
      characteristics: ["Line array setups", "Pioneer Pitch Controls setups", "Live-stage DJ setups", "Snake cable multicore"],
      description:
        "Full-format live performance and venue sound systems including curved line arrays, stage monitoring, DJ consoles with pitch controls, and multi-channel snake cabling.",
      typicalSetups: ["Auditorium line arrays", "Discotheque live sound", "DJ booth audio systems"],
    },
    {
      id: "kitchen-talkback",
      name: "Talkback Systems",
      scope: "Dedicated Commercial Voice Setup",
      image: "/images/equipment-kitchen-talkback.jpg",
      imageAlt: "Two-way commercial kitchen talkback intercom station for restaurants and hotels",
      characteristics: ["Two-way service talkback", "High-noise station clarity", "Durable interface stations"],
      description:
        "Dedicated commercial talkback sound systems designed for shopping malls, restaurants, dining facilities, schools, colleges, hospitality, kitchens, etc to ensure instant communication between the representative and the client.",
      typicalSetups: ["Kitchen pass talkback", "Service-to-prep communication", "Hospitality intercom routing"],
    },
    {
      id: "cabling-connections",
      name: "Wiring & Audio Cabling",
      scope: "Digital & Analog",
      image: "/images/equipment-cabling.jpg",
      imageAlt: "Balanced microphone cabling, high-gauge speaker lines, and stage multicore snake cables",
      characteristics: [
        "Speaker wire setups",
        "Microphone cable setups",
        "Snake cable multicore setups",
        "HD connection setups",
      ],
      description:
        "Commercial-grade audio cabling infrastructure including balanced microphone lines, high-gauge speaker wiring, multi-channel stage snakes, and HD connection links.",
      typicalSetups: ["Auditorium stage snake wiring", "Ceiling-run speaker cabling", "Microphone patch interconnections"],
    },
  ] as EquipmentCategory[],

  // Institutional & Commercial Applications
  spaces: [
    {
      id: "auditoriums",
      slug: "auditorium-sound-system-delhi",
      label: "Auditoriums & Halls",
      tagline: "High-capacity venues requiring structured sound and stage management",
      headline: "Complete audio systems tailored for large auditoriums, cultural theatres, and multi-purpose halls.",
      description:
        "Auditorium setups require perfect sound delivery from stage to the last row. Modern Audio coordinates line array setups, wall and ceiling speakers, stage monitoring, mixing consoles, podium setups, wireless and stage microphones, snake cables, and HD connections for high-capacity live performance.",
      image: "/images/event-public-space.jpg",
      imageAlt: "Grand tiered performance auditorium with suspended line array sound system clusters and stage acoustics",
      href: "/solutions/auditorium-sound-system-delhi",
      systemScope: "Digital & Analog · Active & Passive",
      configurations: [
        "Line array setups",
        "Wall-mount & ceiling-mount speakers",
        "Stage monitor setups",
        "Mixing console setups",
        "Podium system setups",
        "Wireless & wired microphone setups",
        "Stage microphone setups",
        "Snake cable setups",
        "HD connections setups",
      ],
      relatedSlugs: ["school-college-audio-systems", "hotel-banquet-audio-systems", "shopping-mall-public-address-system"],
      metaTitle: "Auditorium Sound System in Delhi, NCR & Pan India | Modern Audio Co.",
      metaDescription:
        "Line arrays, stage monitoring, mixing consoles and podium microphones engineered for high-capacity auditoriums and performance halls in Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "What audio equipment is essential for a large auditorium?",
          a: "Large auditoriums typically require curved line arrays or balanced wall/ceiling speakers, dedicated stage monitors, multi-channel digital mixing consoles, wireless and wired stage microphones, podium audio, and multi-channel snake cabling.",
        },
        {
          q: "How do you prevent echo and feedback in large halls?",
          a: "We deploy sound processors equipped with feedback destroyers, calibrate directional speaker dispersion to minimize bounce off hard rear walls, and balance amplifier gains across discrete listening zones.",
        },
      ],
    },
    {
      id: "schools-colleges",
      slug: "school-college-audio-systems",
      label: "Schools & Colleges",
      tagline: "Campus broadcasting, classroom talkback, and multi-zone distribution",
      headline: "Reliable educational sound systems for classrooms, academic halls, and campus administration.",
      description:
        "Educational environments need clear speech delivery and fast communication. Serving K-12 institutions, private academies, and university campuses, Modern Audio setup classroom audio, centralized campus broadcasting systems, independent zonal controls, and two-way talkback systems.",
      image: "/images/space-education.jpg",
      imageAlt: "Educational lecture hall and campus facility equipped with zoned public address and talkback systems",
      href: "/solutions/school-college-audio-systems",
      systemScope: "Digital & Analog",
      configurations: [
        "Classroom audio setups",
        "Broadcasting systems",
        "Zonal distribution systems",
        "Talkback systems",
        "Assembly hall sound",
      ],
      relatedSlugs: ["auditorium-sound-system-delhi", "hospital-public-address-system", "temple-mosque-gurdwara-sound-system"],
      metaTitle: "School & College Audio Systems Delhi, NCR & Pan India | Modern Audio Co.",
      metaDescription:
        "Campus-wide PA broadcasting, independent classroom speaker zoning, and assembly hall audio systems for educational institutions in Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "Can campus broadcasting be segmented by wing or grade?",
          a: "Yes. Our multi-zone distribution setups allow administrators to broadcast announcements campus-wide or route audio strictly to individual wings, floors, or outdoor assembly grounds.",
        },
      ],
    },
    {
      id: "hotels",
      slug: "hotel-banquet-audio-systems",
      label: "Hotels & Hospitality",
      tagline: "Meeting halls, banquets, and distributed ceiling speaker systems",
      headline: "Refined sound systems for conference rooms, banquet halls, and hotel reception areas, garden areas, pool area, outdoor party areas.",
      description:
        "Hospitality venues balance speech clarity for corporate meetings with ambient distribution for social gatherings. Modern Audio coordinates flush ceiling speakers, wall-mount enclosures, conference tabletop microphones, lapel packs, and zonal volume controls for hotels across Delhi, NCR & Pan India.",
      image: "/images/hotel-conference.jpg",
      imageAlt: "Hotel conference and banquet hall in Delhi, NCR & Pan India featuring flush-mounted ceiling speakers and presentation audio",
      href: "/solutions/hotel-banquet-audio-systems",
      systemScope: "Active & Passive · Digital & Analog",
      configurations: [
        "Meeting hall sound systems",
        "Banquet audio distribution",
        "Tabletop conference systems",
        "Lapel & collar microphone setups",
        "Ceiling speaker networks",
        "Outdoor areas (garden & pool areas)",
      ],
      relatedSlugs: ["restaurant-cafe-kitchen-talkback-system", "auditorium-sound-system-delhi", "shopping-mall-public-address-system"],
      metaTitle: "Hotel & Banquet Audio Systems Delhi, NCR & Pan India | Modern Audio Co.",
      metaDescription:
        "Meeting hall acoustics, banquet sound systems, conference microphone setups, and ceiling speaker distribution for hotels in Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "Can hotel banquet audio be partitioned when dividing halls?",
          a: "Yes. Multi-zone processors allow divisible banquet halls to operate as independent audio zones with local microphone inputs or join as a unified system when partitions open.",
        },
      ],
    },
    {
      id: "shopping-malls",
      slug: "shopping-mall-public-address-system",
      label: "Shopping Malls",
      tagline: "High-volume public address, multi-floor routing, and background music",
      headline: "Multi-zone public address systems engineered for multi-level retail complexes.",
      description:
        "Commercial shopping malls require consistent, fatigue-free background music alongside intelligible voice paging across entire mall area. We setup high-channel distribution amplifiers, ceiling and pendant speakers, emergency microphone stations, and floor-by-floor zoning.",
      image: "/images/shopping-mall-atrium.jpg",
      imageAlt: "Multi-level commercial shopping mall atrium with zoned background music distribution and emergency paging horns",
      href: "/solutions/shopping-mall-public-address-system",
      systemScope: "Multi-Zone Digital Distribution",
      configurations: [
        "Public address announcement setups",
        "Multi-floor background music routing",
        "Atrium high-ceiling speaker arrays",
        "Central control desk routing",
        "Emergency voice override integration",
      ],
      relatedSlugs: ["metro-station-announcement-system", "hospital-public-address-system", "hotel-banquet-audio-systems"],
      metaTitle: "Shopping Mall Public Address Systems Delhi | Modern Audio Co.",
      metaDescription:
        "Multi-floor public address paging, atrium acoustic coverage, and zoned background music systems for shopping malls across Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "How is speech intelligibility maintained in cavernous mall atriums?",
          a: "We specify distributed low-profile speaker clusters and calibrated delay lines rather than blasting from single central points, preventing echo reflection off glass and marble surfaces.",
        },
      ],
    },
    {
      id: "hospitals",
      slug: "hospital-public-address-system",
      label: "Hospitals & Healthcare",
      tagline: "Clear paging, emergency announcements, and nurse station talkback",
      headline: "Mission-critical paging and announcement systems for healthcare campuses.",
      description:
        "Healthcare facilities rely on round-the-clock voice clarity without startling patients. Modern Audio setup zoned public address systems for patient wards, outpatient concourses, ICUs, doctor consultation suites, and two-way nurse station talkback.",
      image: "/images/hospital-healthcare.jpg",
      imageAlt: "Modern healthcare facility patient reception concourse with speech-optimized public address paging network",
      href: "/solutions/hospital-public-address-system",
      systemScope: "Continuous Duty Public Address & Zonal Paging",
      configurations: [
        "Zoned hospital PA paging",
        "OPD waiting hall speech distribution",
        "Nurse station two-way talkback",
        "Doctor consultation call systems",
        "Emergency priority voice override",
      ],
      relatedSlugs: ["metro-station-announcement-system", "shopping-mall-public-address-system", "school-college-audio-systems"],
      metaTitle: "Hospital Public Address & Paging Systems Delhi | Modern Audio Co.",
      metaDescription:
        "Zoned healthcare paging, outpatient speech distribution, and nurse station talkback systems for hospitals in Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "Can hospital emergency codes override background paging automatically?",
          a: "Yes. Priority override routing ensures that emergency code calls immediately silence general background audio and broadcast with maximum priority.",
        },
      ],
    },
    {
      id: "metro-stations",
      slug: "metro-station-announcement-system",
      label: "Metro Stations & Transit",
      tagline: "High-noise intelligibility, platform paging, and centralized routing",
      headline: "Industrial-grade passenger announcement systems for transport terminals and concourses.",
      description:
        "Transit facilities present difficult sound conditions with rushing train noise, echoes, and continuous passenger flow. Modern Audio setup speech-optimized horn arrays, platform column speakers, ticket concourse paging, and centralized control desks.",
      image: "/images/metro-station-concourse.jpg",
      imageAlt: "Transit metro station passenger platform and ticket concourse with noise-compensating public announcement horns",
      href: "/solutions/metro-station-announcement-system",
      systemScope: "Industrial High-Intelligibility Public Address",
      configurations: [
        "Platform passenger announcement systems",
        "Concourse & ticket counter paging",
        "Speech-optimized high-output column speakers",
        "Centralized station control desk routing",
        "Noise-compensating microphone stations",
      ],
      relatedSlugs: ["shopping-mall-public-address-system", "hospital-public-address-system", "temple-mosque-gurdwara-sound-system"],
      metaTitle: "Metro & Transit Station PA Systems Delhi | Modern Audio Co.",
      metaDescription:
        "Speech-optimized passenger announcement systems, platform column speakers, and high-noise paging systems for transit facilities in Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "How do you achieve speech clarity over train and commuter noise?",
          a: "We specify column speakers with narrow vertical dispersion to avoid tile and rail reflections, tuned specifically to human vocal frequencies for maximum intelligibility.",
        },
      ],
    },
    {
      id: "religious-community",
      slug: "temple-mosque-gurdwara-sound-system",
      label: "Temples, Mosques, Gurdwaras & Churches",
      tagline: "Prayer recitation clarity, reverberant hall speech, and outdoor minaret horns",
      headline: "Acoustically balanced sound systems for places of worship and spiritual community halls.",
      description:
        "Spiritual sanctuaries often feature high domed ceilings, marble surfaces, and long reverberation times. Modern Audio coordinates vocal-optimized column arrays, prayer hall microphones, outdoor weather-resistant speakers, langar hall sound, and feedback elimination for temples, mosques, gurdwaras, churches, and satsang bhawans.",
      image: "/images/sacred-community-hall.jpg",
      imageAlt: "Sacred prayer sanctuary and community hall with anti-reverberation column speakers and feedback suppression",
      href: "/solutions/temple-mosque-gurdwara-sound-system",
      systemScope: "Digital & Analog · Active & Passive",
      configurations: [
        "Temple prayer hall sound",
        "Mosque speech distribution & minaret horn setups",
        "Gurdwara & Langar hall audio",
        "Church sanctuary sound",
        "Satsang Bhawan gathering audio",
      ],
      relatedSlugs: ["school-college-audio-systems", "auditorium-sound-system-delhi", "hotel-banquet-audio-systems"],
      metaTitle: "Temple, Mosque & Gurdwara Sound Systems Delhi | Modern Audio Co.",
      metaDescription:
        "Prayer recitation clarity, reverberant hall acoustic balancing, and feedback-free speech systems for temples, mosques, and gurdwaras in Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "How do you prevent echo and feedback in marble-lined prayer halls?",
          a: "We utilize multi-driver column speakers that confine sound to ear-level, avoiding high domed ceilings, alongside digital processors with automated feedback destroyers.",
        },
      ],
    },
    {
      id: "restaurants-cafes",
      slug: "restaurant-cafe-kitchen-talkback-system",
      label: "Restaurants, Cafés & Lounges",
      tagline: "Dining ambiance, live DJ setups, and dedicated kitchen talkback",
      headline: "Commercial sound tailored for hospitality dining, lounge entertainment, and service operations.",
      description:
        "Hospitality venues combine front-of-house atmosphere with back-of-house coordination. For upscale dining restaurants, restro-bars, and lounges across Delhi, NCR & Pan India, Modern Audio coordinates ambient dining sound, live stage DJ setups, Pioneer Pitch Controls, snake cabling, and dedicated kitchen talkback systems.",
      image: "/images/restaurant-hospitality.jpg",
      imageAlt: "Bustling restaurant dining hall with zoned ambient acoustic speakers and commercial kitchen talkback intercom",
      href: "/solutions/restaurant-cafe-kitchen-talkback-system",
      systemScope: "Digital & Analog · Active & Passive",
      configurations: [
        "Kitchen talkback sound system setups",
        "Dining ambient speaker zoning",
        "Live-stage DJ setups",
        "Pioneer Pitch Controls setups",
        "Snake cable setups",
      ],
      relatedSlugs: ["hotel-banquet-audio-systems", "nightclub-dj-line-array-systems", "shopping-mall-public-address-system"],
      metaTitle: "Restaurant, Café & Kitchen Talkback Audio Delhi | Modern Audio Co.",
      metaDescription:
        "Ambient dining speaker zoning, live DJ audio setups, and dedicated two-way commercial kitchen talkback intercoms for restaurants across Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "What is a commercial kitchen talkback system and why is it necessary?",
          a: "A commercial kitchen talkback system provides hands-free or push-to-talk two-way audio between the front service pass counter and noisy kitchen cooklines, preventing delayed orders and shouting.",
        },
      ],
    },
    {
      id: "discotheques-nightlife",
      slug: "nightclub-dj-line-array-systems",
      label: "Discotheques & Live Venues",
      tagline: "High-energy line arrays, DJ consoles, and performance sound",
      headline: "Dynamic live audio systems for nightclubs, performance lounges, and live-stage venues.",
      description:
        "High-energy live venues require powerful, disciplined sound. For nightclubs, discotheques, and performance lounges across Delhi, NCR & Pan India, Modern Audio coordinates curved line array clusters, live-stage DJ consoles, Pioneer Pitch Controls, multicore snake cabling, and multi-channel power amplification.",
      image: "/images/lounge-discotheque.jpg",
      imageAlt: "High-energy nightclub dance floor with curved performance line arrays and DJ mixing consoles",
      href: "/solutions/nightclub-dj-line-array-systems",
      systemScope: "Digital & Analog · Active & Passive",
      configurations: [
        "Line array setups",
        "Live-stage DJ setups",
        "Pioneer Pitch Controls setups",
        "Snake cable setups",
        "High-output active/passive speaker setups",
      ],
      relatedSlugs: ["restaurant-cafe-kitchen-talkback-system", "auditorium-sound-system-delhi", "hotel-banquet-audio-systems"],
      metaTitle: "Nightclub & DJ Line Array Sound Systems Delhi | Modern Audio Co.",
      metaDescription:
        "High-impact curved line arrays, stage monitoring, DJ consoles with pitch controls, and multi-channel power amplification for clubs across Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "Can you provide line arrays suitable for indoor clubs with low ceilings?",
          a: "Yes. Compact curved line array clusters and high-output point-source cabinets deliver high SPL and punchy bass without requiring the rigging height of outdoor festival stages.",
        },
      ],
    },
    {
      id: "residential-societies",
      slug: "residential-societies",
      label: "Residential Societies",
      tagline: "Clear, considerate sound for apartment societies, clubhouses and community spaces.",
      headline: "Clear, considerate sound for apartment societies, clubhouses and community spaces.",
      description:
        "Residential communities need sound that serves everyone without disturbing neighbours. Modern Audio customises audio for clubhouses, community halls and common areas, including speech systems for society meetings and events, background music zones and announcement setups, planned around the layout and noise sensitivity of each society.",
      image: "/images/space-community.jpg",
      imageAlt: "Residential society clubhouse and community hall with zoned sound system",
      href: "/solutions/residential-societies",
      systemScope: "Digital & Analog · Active & Passive",
      configurations: [
        "Clubhouse & community hall sound",
        "Zonal background music",
        "Announcement & public address",
        "Wireless microphone setups",
        "Outdoor speaker setups",
      ],
      relatedSlugs: ["social-clubs", "schools-colleges", "hotels"],
      metaTitle: "Residential Society Sound Systems | Modern Audio Co.",
      metaDescription:
        "Custom audio systems for apartment societies, clubhouses and community spaces across Delhi, NCR & Pan India. Clear, considerate sound for meetings and events.",
      faqs: [
        {
          q: "How do you manage sound levels so society events do not disturb residents?",
          a: "We plan multi-zone volume controls and directional speaker placement so sound remains clear inside the clubhouse or hall without excessive spill into residential towers.",
        },
      ],
    },
    {
      id: "social-clubs",
      slug: "social-clubs",
      label: "Social Clubs",
      tagline: "Versatile sound for social clubs, event halls and member functions.",
      headline: "Versatile sound for social clubs, event halls and member functions.",
      description:
        "Social clubs host everything from quiet dining to live music, speeches and celebrations. Modern Audio customises sound for club halls, bars, lounges and event spaces, combining ambient zones, wireless microphones, mixing and DJ or live-stage setups where needed.",
      image: "/images/hotel-conference.jpg",
      imageAlt: "Social club banquet hall and lounge with versatile sound setup",
      href: "/solutions/social-clubs",
      systemScope: "Digital & Analog · Active & Passive",
      configurations: [
        "Ambient & zonal speaker setups",
        "Wireless & wired microphone setups",
        "Mixing console setups",
        "Live-stage DJ setups",
        "Stage monitor setups",
      ],
      relatedSlugs: ["residential-societies", "restaurants-cafes", "discotheques-nightlife"],
      metaTitle: "Social Club & Event Hall Audio Systems | Modern Audio Co.",
      metaDescription:
        "Custom sound systems for social clubs, event halls and member functions across Delhi, NCR & Pan India. Ambient dining to live DJ and stage setups.",
      faqs: [
        {
          q: "Can a single club sound system handle both background music and live events?",
          a: "Yes. We coordinate multi-zone routing and versatile mixer setups that allow quiet ambient background music during daytime dining and higher output for evening events or live music.",
        },
      ],
    },
    {
      id: "theme-parks",
      slug: "theme-parks",
      label: "Theme Parks",
      tagline: "Wide-area audio for parks and public attractions.",
      headline: "Wide-area audio for parks and public attractions.",
      description:
        "Theme parks need sound that carries across large, open and busy spaces while staying clear. Modern Audio customises wide-area speaker distribution, zoned announcement and background music, and show audio for entertainment areas, planned around the park's layout and coverage needs.",
      image: "/images/shopping-mall-atrium.jpg",
      imageAlt: "Open-air theme park and public attraction with wide-area audio distribution",
      href: "/solutions/theme-parks",
      systemScope: "Digital & Analog · Active & Passive",
      configurations: [
        "Wide-area public address",
        "Outdoor speaker setups",
        "Zonal audio distribution",
        "Stage & show audio setups",
        "Portable sound systems",
      ],
      relatedSlugs: ["outdoor-stadiums", "shopping-malls", "metro-stations"],
      metaTitle: "Theme Park & Attraction Audio Systems | Modern Audio Co.",
      metaDescription:
        "Wide-area public address, zoned announcements and show audio for theme parks and public attractions across Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "How do you ensure park announcements remain intelligible over outdoor noise?",
          a: "We utilize distributed weather-resistant speaker arrays with time-aligned zoning and voice-optimized EQ to deliver clear announcements across expansive grounds.",
        },
      ],
    },
    {
      id: "outdoor-stadiums",
      slug: "outdoor-stadiums",
      label: "Outdoor Stadiums",
      tagline: "High-output, wide-coverage sound for open-air stadiums and grounds.",
      headline: "High-output, wide-coverage sound for open-air stadiums and grounds.",
      description:
        "Open-air stadiums need powerful, evenly distributed sound for announcements, commentary and live events across large seating and playing areas. Modern Audio customises outdoor speaker coverage, high-output amplification, line array setups and microphone and mixer systems around the layout of the ground.",
      image: "/images/event-public-space.jpg",
      imageAlt: "Open-air outdoor stadium with high-output sound system and line arrays",
      href: "/solutions/outdoor-stadiums",
      systemScope: "Digital & Analog · Active & Passive",
      configurations: [
        "Line array setups",
        "High-output active/passive speaker setups",
        "Multi-channel power amplification",
        "Commentary & announcement microphones",
        "Mixing console setups",
      ],
      relatedSlugs: ["theme-parks", "auditoriums", "discotheques-nightlife"],
      metaTitle: "Outdoor Stadium Sound Systems | Modern Audio Co.",
      metaDescription:
        "High-output line arrays, commentary microphones and wide-coverage amplification for outdoor stadiums and grounds across Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "How do you manage acoustic reflections and delays in large stadiums?",
          a: "We plan targeted line array throw angles and time-aligned delay distribution zones to minimize slapback echo off distant bleachers and ensure even coverage.",
        },
      ],
    },
    {
      id: "gyms-fitness",
      slug: "gyms-fitness",
      label: "Gyms & Fitness",
      tagline: "High-energy sound distribution and clear instructor audio for fitness spaces.",
      headline: "High-energy, multi-zone sound systems for workout floors, spin studios, and fitness centers.",
      description:
        "Gyms and fitness studios require punchy, motivating audio with balanced multi-zone coverage—from high-energy workout floors and spin studios to ambient reception areas and locker rooms. Modern Audio customises wireless instructor headsets, high-SPL full-range speakers, subwoofers, and simple multi-zone volume controls designed for continuous commercial daily operation.",
      image: "/images/gym-fitness.jpg",
      imageAlt: "Modern commercial gym and fitness center equipped with zoned audio speakers",
      href: "/solutions/gyms-fitness",
      systemScope: "Digital & Analog · Active & Passive",
      configurations: [
        "High-energy workout floor sound",
        "Multi-zone volume & source control",
        "Wireless instructor microphone headsets",
        "Ceiling & surface-mount speakers",
        "Dedicated subwoofer reinforcement",
      ],
      relatedSlugs: ["discotheques-nightlife", "restaurants-cafes", "social-clubs"],
      metaTitle: "Gym & Fitness Center Sound Systems | Modern Audio Co.",
      metaDescription:
        "High-energy, multi-zone commercial audio setups, wireless instructor headsets, and ceiling speakers for gyms and fitness centers across Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "Can workout areas and reception play different music at different volumes?",
          a: "Yes. Our multi-zone distribution systems allow independent volume and playlist control across cardio floors, studio rooms, reception desks, and locker areas from a single central console or wall controller.",
        },
        {
          q: "Do you supply sweat-resistant wireless microphones for fitness instructors?",
          a: "Yes. We configure sweat-resistant UHF wireless headworn microphone packs engineered specifically for high-movement group fitness and spin classes.",
        },
      ],
    },
    {
      id: "salons-spas",
      slug: "salons-spas",
      label: "Salons & Spas",
      tagline: "Calm, discreet ambient sound for luxury salons, grooming studios, and spas.",
      headline: "Immersive, soothing ambient audio systems designed for premium salons and wellness spas.",
      description:
        "Salons and spas require warm, even, and discreet background sound that fosters relaxation without noticeable speaker clutter or harsh high frequencies. Modern Audio designs flush-mounted ceiling speaker networks, compact aesthetic wall units, and whisper-quiet multi-zone controls that deliver continuous calm acoustics across styling bays, shampoo stations, treatment rooms, and waiting lounges.",
      image: "/images/salon-spa.jpg",
      imageAlt: "Luxury salon and spa interior with discreet architectural flush ceiling speakers",
      href: "/solutions/salons-spas",
      systemScope: "Digital & Analog · 70V/100V Commercial",
      configurations: [
        "Discreet flush-mount ceiling speakers",
        "Zonal ambient background music",
        "Whisper-quiet low-distortion amplification",
        "Multi-zone independent volume controls",
        "Bluetooth & streaming source integration",
      ],
      relatedSlugs: ["restaurants-cafes", "hotels", "shopping-malls"],
      metaTitle: "Salon & Spa Background Audio Systems | Modern Audio Co.",
      metaDescription:
        "Discreet ceiling speakers, ambient multi-zone audio systems, and soothing sound distribution for salons, wellness spas, and grooming lounges across Delhi, NCR & Pan India.",
      faqs: [
        {
          q: "Can different treatment rooms have individual volume controls?",
          a: "Yes. We install localized rotary wall attenuators or digital zone controllers so therapists can adjust volume or mute sound independently in each private treatment room.",
        },
        {
          q: "Are the speakers visible or intrusive to modern salon aesthetics?",
          a: "No. We deploy micro-bezel or bezel-free flush ceiling architectural speakers and compact surface enclosures that blend seamlessly into modern designer ceilings and walls.",
        },
      ],
    },
  ].map((s) => ({
    ...s,
    confirmedSetups: s.configurations,
    statsLabel: "What we configure",
    statsValue: s.configurations.slice(0, 3).join(" · "),
  })) as SpaceCategory[],

  // 5-Stage Customer Journey
  processStages: [
    {
      step: "01",
      title: "Requirement Check",
      tagline: "We understand your space, your audience and your needs.",
      summary:
        "Before proposing equipment, we check your room size, venue acoustics, layout plan, your prupose(speech, background music, live performance, or two-way talkback) and your audience plan.",
      details: [
        "Venue type & room size review",
        "Main purpose (speech, broadcast, live performance, talkback)",
        "Input source and microphone requirements check",
      ],
      image: "/images/venue-acoustic-planning.jpg",
    },
    {
      step: "02",
      title: "System Set-up",
      tagline: "We choose the right balanced sound system setup for you.",
      summary:
        "We plan speaker placement (wall, ceiling, or floor), amplifier channel counts, active vs passive options, microphone setups, and cabling requirements suited to your layout.",
      details: [
        "Loudspeaker type & placement plan",
        "Digital vs analog 'mixer & processor' matching",
        "Cabling, zonal works & talkback connector setups",
      ],
      image: "/images/audio-console-detail.jpg",
    },
    {
      step: "03",
      title: "Quotation & Sourcing",
      tagline: "Prepare transparent quotations and arrange verified equipment.",
      summary:
        "Drawing upon established relationships across leading commercial audio manufacturers and verified distributors, we recommend equipment that fits your performance demands and budget with clear pricing and specifications.",
      details: [
        "Product list with model numbers and best pricing",
        "Compatibility verification for all the equipments",
        "Equipment sourcing through verified commercial channels",
      ],
      image: "/images/event-public-space.jpg",
    },
    {
      step: "04",
      title: "Delivery & Setup",
      tagline: "Coordinate delivery and system setup as applicable.",
      summary:
        "We coordinate equipment logistics and on-site setup as appropriate to the project requirement, ensuring correct cable routing, secure speaker mounting, and proper signal connections.",
      details: [
        "Scheduled delivery coordination",
        "Physical speaker mounting & placement",
        "Cable termination & system interconnections",
      ],
      image: "/images/hero-auditorium.jpg",
    },
    {
      step: "05",
      title: "Handover & Support",
      tagline: "Conduct testing, operational walkthrough, and after-sales support.",
      summary:
        "Following setup, we conduct functional listening and level checks across all zones, and provide clear orientation so your team feels comfortable operating the system.",
      details: [
        "Channel gain & level check",
        "Operator walkthrough & operational guidance",
        "Post-setup coordination and after-sales support",
      ],
      image: "/images/hd-audio-equipment.jpg",
    },
  ] as ProcessStage[],

  // Grounded FAQ Entries
  faqs: [
    {
      q: "What types of audio products does Modern Audio deal in?",
      a: "Under our professional audio portfolio, we supply both digital and analog equipment including power amplifiers (single to multiple channels), speakers (indoor and outdoor, active and passive, wall, ceiling, and floor-mounted), wired and wireless microphones, sound mixers with echo/delay/reverb, sound processors with feedback destroyers, portable sound systems with long battery life, line array setups, DJ equipment with pitch controls, kitchen talkback sound systems, and professional speaker and snake cables.",
    },
    {
      q: "Can Modern Audio handle complete system setups for different institutions?",
      a: "Yes. We configure specialized setups for schools, colleges, auditoriums, hotels, shopping malls, hospitals, metro stations, religious places (temples, mosques, gurdwaras, churches, satsang bhawans), restaurants, cafés, discotheques, residential societies, social clubs, theme parks and outdoor stadiums. Every configuration is planned around the venue's specific layout and functional needs.",
    },
    {
      q: "Do you customise sound for other kinds of venues?",
      a: "Yes. Besides the venues listed on this site, we customise sound for residential societies, social clubs, cafés, restaurants, discotheques, theme parks, outdoor stadiums and other spaces. Tell us about your space and we will work out the right setup.",
    },
    {
      q: "What is the difference between active and passive speaker systems?",
      a: "Active speakers have built-in power amplification within the enclosure, making them streamlined and self-powered. Passive speakers require external power amplifiers connected via dedicated speaker wiring. We supply and configure both types depending on your venue size, installation constraints, and control preferences.",
    },
    {
      q: "What is a kitchen talkback system and why is it needed?",
      a: "In commercial restaurants and hospitality venues, the kitchen talkback system is a dedicated communication setup linking culinary stations and the front-of-house service counter. It ensures loud, clear, instant communication despite ambient kitchen noise, speeding up order coordination without shouting.",
    },
    {
      q: "Does Modern Audio handle delivery and installation?",
      a: "Delivery, installation, and physical setup are coordinated as applicable to your project requirement. Depending on the venue location and scope, we can coordinate logistics, mounting, and system setup, or supply pre-configured equipment packages for your designated engineering team.",
    },
    {
      q: "Does Modern Audio provide architectural soundproofing or acoustic consultancy?",
      a: "Modern Audio specializes in commercial audio equipment, sound system setups, and signal distribution. While our system planning considers room size and speaker placement to minimize feedback and echo through appropriate equipment (such as feedback destroyers and zoned distribution), architectural soundproofing, physical acoustic treatment, and formal acoustic engineering consultancy require separate confirmation and specialist contractors.",
    },
    {
      q: "What information should I share when requesting an initial quotation?",
      a: "It is most helpful to share: the type of venue (e.g., auditorium, school, temple, restaurant), approximate room dimensions, intended use (lectures, prayer recitations, background music, live performance), whether you need microphones, talkback, or live DJ gear, and whether active or passive systems are preferred.",
    },
    {
      q: "Which areas does Modern Audio serve, and do you cover projects outside Delhi?",
      a: "Modern Audio Company Private Limited is born in Chandni Chowk, Delhi, and serves commercial, institutional, and hospitality clients across Delhi, NCR & Pan India. Outstation and institutional projects across India are accommodated with dedicated logistics and equipment planning based on project scope.",
    },
  ] as FAQItem[],
};
