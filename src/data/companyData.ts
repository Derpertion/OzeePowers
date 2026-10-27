import { ContactPerson, CustomerSector, ProcessStage, ProductSolution, TrustedBrand } from '../types';

export const COMPANY_INFO = {
  name: 'OzeePower',
  fullName: 'OzeePower Solar & Energy Solutions',
  tagline: 'Powering a Brighter and Sustainable Future.',
  subTagline:
    'OzeePower is a trusted provider of solar power and energy solutions for residential, commercial, and industrial applications.',
  motto: 'QUALITY PRODUCTS, PROFESSIONAL INSTALLATION, SUSTAINABLE FUTURE.',
  email: 'info@ozeepower.com.ph',
  website: 'www.ozeepower.com.ph',
  address: {
    line1: 'Second Floor, Office #2, GM Commercial Building',
    line2: '464 H. Concepcion, Maharlika Highway',
    landmark: 'Beside Nike Outlet',
    city: 'Cabanatuan City',
    province: 'Nueva Ecija',
    country: 'Philippines',
    mapsUrl: 'https://maps.google.com/?q=Maharlika+Highway+Cabanatuan+City+Nueva+Ecija',
  },
  brochureAssetPath: '/assets/aistudio/Brochure_Details_125752f2.jpg',
  officeHours: 'Monday – Saturday: 8:00 AM – 5:30 PM',
};

export const CONTACT_PERSONS: ContactPerson[] = [
  {
    name: 'Mimi',
    phone: '0949 373 7333',
    telUri: 'tel:09493737333',
    role: 'Technical Sales & Client Relations',
    network: 'Smart / TNT',
  },
  {
    name: 'Ann',
    phone: '0947 445 4448',
    telUri: 'tel:09474454448',
    role: 'Solar Project Coordinator',
    network: 'Smart / TNT',
  },
  {
    name: 'Mon',
    phone: '0956 268 4060',
    telUri: 'tel:09562684060',
    role: 'Electrical Engineering & Site Logistics',
    network: 'Globe / TM',
  },
  {
    name: 'Rowe',
    phone: '0917 879 1061',
    telUri: 'tel:09178791061',
    role: 'Commercial & Industrial Solutions',
    network: 'Globe / TM',
  },
];

export const CORE_PILLARS = [
  {
    title: 'Clean Energy',
    description: 'Harness abundant, zero-emission solar irradiation to power homes and facilities cleanly.',
    highlight: 'Zero Emissions',
  },
  {
    title: 'Reliable Power',
    description: 'Guaranteed uninterrupted power supply during grid outages with automatic failover.',
    highlight: '24/7 Energy Security',
  },
  {
    title: 'Smart Energy Solutions',
    description: 'Intelligent hybrid inverters and LiFePO4 battery management systems with mobile monitoring.',
    highlight: 'Real-Time Insights',
  },
];

export const PRODUCT_SOLUTIONS: ProductSolution[] = [
  {
    id: 'solar-panels',
    title: 'Solar Panels',
    subtitle: 'Supply & Installation',
    category: 'generation',
    badge: 'Tier 1 Solar Panels',
    description:
      'High-efficiency monocrystalline PV modules engineered for maximum tropical sunlight conversion, superior low-light generation, and extreme weather durability.',
    features: [
      'High conversion efficiency up to 22.8%',
      'Half-cell & bifacial technology for optimized shade tolerance',
      'Corrosion-resistant anodized aluminum mounting frames',
      '25 to 30-year linear power performance warranty',
    ],
    specs: [
      { label: 'Cell Type', value: 'Monocrystalline N-Type / P-Type' },
      { label: 'Module Power', value: '450W – 600W+ per panel' },
      { label: 'Efficiency', value: 'Up to 22.8%' },
      { label: 'Wind / Snow Load', value: '2400 Pa / 5400 Pa certified' },
    ],
    recommendedBrands: ['LONGI', 'JA Solar', 'CanadianSolar', 'TrinaSolar'],
    imageAlt: 'Tier 1 high-efficiency solar photovoltaic panels installed on rooftop',
  },
  {
    id: 'inverters',
    title: 'Inverters',
    subtitle: 'Supply, On-Grid / Hybrid Inverters',
    category: 'inverter-storage',
    badge: 'High Conversion Efficiency',
    description:
      'State-of-the-art on-grid and hybrid inverters transforming direct solar energy into pure sine-wave AC power with dual/multi-MPPT tracking and remote cloud monitoring.',
    features: [
      'Pure sine-wave output compliant with Philippine distribution utilities',
      'Integrated Wi-Fi / 4G datalogger for real-time mobile tracking',
      'Dual & triple independent MPPT for multi-pitch roof arrangements',
      'Built-in DC disconnect switches and IP65 weatherproof casing',
    ],
    specs: [
      { label: 'Configurations', value: 'On-Grid, Off-Grid, Hybrid' },
      { label: 'Max Efficiency', value: '98.4%' },
      { label: 'Monitoring', value: 'Cloud App (iOS / Android / Web)' },
      { label: 'Phases', value: 'Single Phase (220V/230V) & 3-Phase (400V)' },
    ],
    recommendedBrands: ['Growatt', 'Deye', 'Schneider Electric'],
    imageAlt: 'Modern wall-mounted solar inverter with LCD display and cloud connectivity',
  },
  {
    id: 'hybrid-systems',
    title: 'Hybrid Solar Systems',
    subtitle: 'Grid-Tie & Battery Backup',
    category: 'inverter-storage',
    badge: 'Uninterrupted Resilience',
    description:
      'The optimal balance of grid-tied savings and off-grid security. Automatically stores excess daytime solar energy in batteries to power evening loads and protect against brownouts.',
    features: [
      'Zero millisecond perceptible transfer during blackout transitions',
      'Customizable priority logic (Solar → Battery → Grid → Generator)',
      'Export control / Net Metering ready for utility buyback',
      'Scalable battery storage capacity as family or business energy demands grow',
    ],
    specs: [
      { label: 'System Sizing', value: '3 kW to 100 kW+' },
      { label: 'Switch Time', value: '< 10 ms (UPS Class)' },
      { label: 'Battery Compatibility', value: '48V Low Voltage & High Voltage' },
      { label: 'Operating Modes', value: 'Self-Consumption, Peak-Shaving, Backup' },
    ],
    recommendedBrands: ['Deye', 'Growatt', 'Pylontech'],
    imageAlt: 'Complete hybrid solar system with inverter, battery pack, and ATS controller',
  },
  {
    id: 'battery-storage',
    title: 'Battery Energy Storage (BESS)',
    subtitle: 'LiFePO4 Lithium Iron Phosphate Storage',
    category: 'inverter-storage',
    badge: 'LiFePO4 Chemistry',
    description:
      'Safe, durable, high-density Lithium Iron Phosphate (LiFePO4) rack-mount and cabinet battery banks with built-in intelligent Battery Management Systems (BMS).',
    features: [
      '6,000+ deep discharge cycles at 80% DoD for 10–15 years service life',
      'Superior thermal stability with zero risk of thermal runaway',
      'Modular plug-and-play expansion from 5.12 kWh up to 100 kWh+',
      'Real-time cell balancing, voltage, and temperature telemetry',
    ],
    specs: [
      { label: 'Chemistry', value: 'Lithium Iron Phosphate (LiFePO4)' },
      { label: 'Nominal Voltage', value: '51.2V / 48V (LV) & High Voltage racks' },
      { label: 'Cycle Life', value: '≥ 6,000 cycles @ 25°C' },
      { label: 'Depth of Discharge', value: 'Up to 90%' },
    ],
    recommendedBrands: ['Pylontech', 'Deye', 'Custom BESS Cabinets'],
    imageAlt: 'Modular LiFePO4 battery rack storage units for residential and commercial backup',
  },
  {
    id: 'ats-switches',
    title: 'Automatic Transfer Switch (ATS)',
    subtitle: 'Seamless Changeover Installation',
    category: 'protection-safety',
    badge: 'Zero-Downtime Transfer',
    description:
      'Heavy-duty ATS installation providing instant, safe switching between utility grid, solar/battery inverter, and backup generator without manual breaker intervention.',
    features: [
      'Automatic failover prevents human error during sudden utility outages',
      'Mechanical and electrical interlocking prevents backfeeding the grid',
      'Manual bypass switch override for maintenance safety',
      'Heavy-duty copper busbars and arc-extinguishing chambers',
    ],
    specs: [
      { label: 'Poles', value: '2-Pole (Single Phase) / 4-Pole (Three Phase)' },
      { label: 'Current Rating', value: '63A, 100A, 125A, 250A up to 630A+' },
      { label: 'Rated Voltage', value: '230V / 400V AC 60Hz' },
      { label: 'Enclosure', value: 'Powder-coated IP55/IP65 steel enclosure' },
    ],
    recommendedBrands: ['Schneider Electric', 'ABB', 'Eaton'],
    imageAlt: 'Automatic Transfer Switch panel with control display and indicator lights',
  },
  {
    id: 'surge-protection',
    title: 'Surge Protection Devices (SPD)',
    subtitle: 'Surge & Lightning Protection',
    category: 'protection-safety',
    badge: 'Appliance & Inverter Shield',
    description:
      'Dedicated Class I and Class II DC and AC surge arrestors designed to clamp high-voltage spikes caused by nearby lightning strikes and utility switching surges.',
    features: [
      'Protects expensive inverters, appliances, electronics, and computers',
      'High-energy metal oxide varistors (MOV) with visual status flag indicators',
      'Plug-in modular cartridge replacement without rewiring base blocks',
      'Compliant with IEC 61643-11 standards and local electrical requirements',
    ],
    specs: [
      { label: 'Protection Class', value: 'Type 1 + Type 2 / Type 2 AC & DC' },
      { label: 'Max Discharge Imax', value: '40kA to 60kA per pole' },
      { label: 'Operating Voltage', value: 'DC 600V/1000V & AC 275V/385V' },
      { label: 'Response Time', value: '< 25 nanoseconds' },
    ],
    recommendedBrands: ['Schneider Electric', 'ABB', 'Siemens'],
    imageAlt: 'Surge protection devices and lightning arrestors mounted on DIN rail',
  },
  {
    id: 'electrical-protection',
    title: 'Electrical Protection & Safety',
    subtitle: 'MCB, MCCB, RCD, Isolators, Contactors',
    category: 'protection-safety',
    badge: 'Code-Compliant Safety',
    description:
      'Comprehensive safety switchgear including DC isolator switches, Miniature Circuit Breakers (MCB), Molded Case Breakers (MCCB), and Residual Current Devices (RCD).',
    features: [
      'Dual-pole DC isolators rated for 1000V DC solar PV string disconnection',
      'RCD earth leakage protection guarding against electric shock and fire hazards',
      'Heavy-duty magnetic contactors and industrial terminal blocks',
      'UV-resistant, flame-retardant polycarbonate and steel combiner enclosures',
    ],
    specs: [
      { label: 'Standards', value: 'Philippine Electrical Code (PEC) & IEC' },
      { label: 'DC Isolators', value: '1000V DC 32A / 63A rotary lockable' },
      { label: 'RCD Sensitivity', value: '30mA human safety trip threshold' },
      { label: 'Enclosure Rating', value: 'IP65 Weatherproof with clear inspection door' },
    ],
    recommendedBrands: ['Schneider Electric', 'ABB', 'Eaton', 'Siemens'],
    imageAlt: 'DIN-rail mounted circuit protection, DC breakers, and contactors in combiner box',
  },
  {
    id: 'cables-conduits',
    title: 'Cables, Conduits & Accessories',
    subtitle: 'High-Quality Infrastructure',
    category: 'accessories',
    badge: 'Tropical Weatherproof',
    description:
      'TÜV-certified cross-linked polyolefin (XLPO) solar cables, weatherproof EMT/RSC metal pipes, UV-resistant PVC conduits, MC4 connectors, and stainless steel hardware.',
    features: [
      'High-grade tin-plated copper solar cable resistant to UV, ozone, and acid rain',
      'Corrosion-free hot-dip galvanized mounting brackets and stainless SUS304 bolts',
      'Proper copper grounding rods and exothermic bonding to prevent static build-up',
      'Neat aesthetic cable routing respecting building architecture',
    ],
    specs: [
      { label: 'Cable Standards', value: 'TÜV EN 50618 (H1Z2Z2-K) 4mm² / 6mm²' },
      { label: 'Temperature Range', value: '-40°C to +120°C max conductor temp' },
      { label: 'Connectors', value: 'IP68 MC4 waterproof connectors' },
      { label: 'Conduit Types', value: 'Intermediate Metal Conduit (IMC) & Rigid PVC' },
    ],
    recommendedBrands: ['Certified Solar Hardware & TÜV-tested cabling'],
    imageAlt: 'Double-insulated solar PV cables, conduits, and MC4 connectors for installations',
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: 1,
    title: 'Concept & Consultation',
    headline: 'Understanding Your Exact Energy Profile',
    description: 'We listen to your needs and recommend the best solar energy solution.',
    deliverables: [
      'Review of recent 12-month electric utility statements',
      'Assessment of peak daytime vs. nighttime energy demand',
      'Initial feasibility analysis and preliminary savings forecast',
    ],
    keyTools: ['Electric bill audit', 'Client consultation questionnaire', 'Preliminary sizing tool'],
    duration: 'Day 1–2',
  },
  {
    step: 2,
    title: 'System Design & Engineering',
    headline: 'Custom Engineering & Precision Modeling',
    description: 'Our engineers design efficient and cost-effective systems using advanced tools.',
    deliverables: [
      'Comprehensive 3D rooftop layout and drone shade analysis',
      'Single-Line Electrical Diagrams (SLD) compliant with PEC',
      'Accurate bill of materials and structural load calculations',
    ],
    keyTools: ['Solar CAD layout', 'Shading analysis simulation', 'Engineering structural verification'],
    duration: 'Day 3–5',
  },
  {
    step: 3,
    title: 'Supply of Quality Equipment',
    headline: 'Direct Procurement of Tier-1 Equipment',
    description: 'We provide quality and trusted brands of solar products and accessories.',
    deliverables: [
      'Procurement of certified Tier-1 panels, inverters, and LiFePO4 batteries',
      'Incoming quality inspection of mounting hardware and switchgear',
      'Safe on-site staging and secure transport to your property',
    ],
    keyTools: ['Tier-1 manufacturer warranty cards', 'Batch inspection reports', 'Quality verification checks'],
    duration: 'Day 5–7',
  },
  {
    step: 4,
    title: 'Professional Installation',
    headline: 'Certified Master Electricians & Skilled Crews',
    description: 'Our skilled and certified team ensures safe, neat, and efficient installation.',
    deliverables: [
      'Watertight roof penetration sealant and structural rail anchoring',
      'Clean cable management through protective conduit raceways',
      'Dedicated combiner box, inverter mounting, and grounding installation',
    ],
    keyTools: ['Certified solar installation gear', 'Torque-calibrated tools', 'Industrial safety harnesses'],
    duration: 'Day 7–12',
  },
  {
    step: 5,
    title: 'Testing & Commissioning',
    headline: 'Rigorous Verification & Safety Verification',
    description: 'We test and commission to optimal performance and safety.',
    deliverables: [
      'Insulation resistance (megger) and open-circuit voltage checks',
      'Inverter parameter configuration and utility synchronization',
      'Full load failover test and anti-islanding trip validation',
    ],
    keyTools: ['Digital solar multimeters', 'Thermal imaging scanner', 'Grid analyzer instruments'],
    duration: 'Day 12–14',
  },
  {
    step: 6,
    title: 'Project Handover & After-Sales Support',
    headline: 'Comprehensive Orientation & Lifetime Care',
    description: 'We provide system orientation, warranty support, and continuous after-sales service.',
    deliverables: [
      'Client mobile app installation for live solar generation tracking',
      'System manual, warranty booklet, and emergency shutdown training',
      'Scheduled post-installation maintenance check and customer support hotline',
    ],
    keyTools: ['Mobile tracking app setup', 'As-built electrical dossier', 'Warranty documentation'],
    duration: 'Handover & Ongoing',
  },
];

export const CUSTOMER_SECTORS: CustomerSector[] = [
  {
    id: 'residential',
    title: 'Residential Homes',
    tagline: 'Take control of your household utility bills and enjoy peaceful backup power.',
    description:
      'Tailored rooftop solar installations designed for Filipino families seeking financial freedom from rising electric rates and immunity against local brownouts.',
    bullets: [
      'Lower electricity bills by up to 70% – 90%',
      'Reliable backup power during grid blackouts and storms',
      'Increase property valuation and home market appeal',
    ],
    typicalCapacity: '3 kWp to 12 kWp',
    idealFor: 'Single detached homes, townhouses, and suburban residences',
  },
  {
    id: 'commercial',
    title: 'Commercial Businesses',
    tagline: 'Slash operating expenses during daylight peak business hours.',
    description:
      'Engineered solar solutions for commercial establishments that consume significant air-conditioning and refrigeration power during the day.',
    bullets: [
      'Significantly reduce monthly operational overhead and operating costs',
      'Improve energy reliability and avoid lost sales during power interruptions',
      'Demonstrate tangible sustainability leadership to customers and clients',
    ],
    typicalCapacity: '15 kWp to 100 kWp',
    idealFor: 'Offices, retail establishments, clinics, cold storages, private schools, supermarkets',
  },
  {
    id: 'industrial',
    title: 'Industrial Facilities',
    tagline: 'Heavy-duty multi-megawatt-hour energy independence for manufacturing.',
    description:
      'High-capacity solar arrays with tailored power factor control, transformer integration, and peak demand shaving for energy-intensive industrial enterprises.',
    bullets: [
      'High energy savings generating millions in bottom-line cost reduction',
      'Stable, high-quality power safeguarding continuous production lines',
      'Long-term capital investment with strong ROI and fast payback periods',
    ],
    typicalCapacity: '100 kWp to 1 MWp+',
    idealFor: 'Warehouses, factories, rice mills, feed mills, food processing plants',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Reliable & Trusted Brands',
    description: 'We use proven, high-quality products from top tier global manufacturers.',
    detail: 'No grey-market or unverified clones. We only install Tier-1 PV modules and certified inverters with official warranties.',
  },
  {
    title: 'Safety & Quality First',
    description: 'We follow strict safety standards and quality installation practices.',
    detail: 'Strict compliance with the Philippine Electrical Code (PEC), proper grounding, lightning surge arrestors, and leak-proof roofing penetrations.',
  },
  {
    title: 'Professional & Experienced Team',
    description: 'Skilled engineers and installers with proven expertise.',
    detail: 'Our licensed electrical engineers and seasoned solar technicians bring years of hands-on installation craft in Central Luzon and nationwide.',
  },
  {
    title: 'After-Sales Support',
    description: 'We are with you even after project completion.',
    detail: 'Prompt local service in Cabanatuan City and nearby provinces, rapid response times, and lifetime technical guidance.',
  },
  {
    title: 'Customized Solutions',
    description: 'Tailored system design to meet your specific needs.',
    detail: 'Every rooftop and power consumption habit is unique; we custom engineer string layouts to optimize ROI and roof aesthetics.',
  },
  {
    title: 'Sustainable Future',
    description: 'We help you transition to clean, renewable and sustainable energy.',
    detail: 'Empowering communities to reduce their carbon footprint while securing durable energy independence for decades.',
  },
];

export const TRUSTED_BRANDS: TrustedBrand[] = [
  { name: 'LONGI', category: 'Panels', origin: 'Global Leader', tagline: 'Tier 1 Hi-MO Monocrystalline Modules' },
  { name: 'JA SOLAR', category: 'Panels', origin: 'Tier 1 Global', tagline: 'High-Efficiency Deep Blue PV Technology' },
  { name: 'CanadianSolar', category: 'Panels', origin: 'Tier 1 Global', tagline: 'Bifacial & High-Yield Solar Modules' },
  { name: 'TrinaSolar', category: 'Panels', origin: 'Tier 1 Global', tagline: 'Vertex High-Power Generation Panels' },
  { name: 'Growatt', category: 'Inverters', origin: 'Smart Energy', tagline: 'On-Grid, Hybrid & Commercial Inverters' },
  { name: 'Deye', category: 'Inverters', origin: 'Hybrid Tech', tagline: 'Low & High Voltage Hybrid Inverters' },
  { name: 'Pylontech', category: 'Batteries', origin: 'Energy Storage', tagline: 'LiFePO4 Modular Rack Batteries' },
  { name: 'Schneider Electric', category: 'Protection & Switchgear', origin: 'Global Standard', tagline: 'Premium Breakers, ATS & Protection' },
  { name: 'ABB', category: 'Protection & Switchgear', origin: 'Electrification', tagline: 'Industrial Switchgear & Safety Devices' },
  { name: 'EATON', category: 'Protection & Switchgear', origin: 'Power Management', tagline: 'Heavy-Duty Circuit Protection' },
  { name: 'Siemens', category: 'Protection & Switchgear', origin: 'German Engineering', tagline: 'Precision Electrical Protection & Relays' },
];
