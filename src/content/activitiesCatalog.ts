export interface Activity {
  id: string;
  name: string;
  description: string;
  duration: number; // in hours
  category: 'wildlife' | 'culture' | 'adventure' | 'relaxation' | 'dining' | 'shopping';
  location: string;
  price: number; // in USD
  difficulty: 'easy' | 'moderate' | 'challenging';
  bestTime: string;
  includes: string[];
  requirements: string[];
}

export const activitiesCatalog: Activity[] = [
  // Wildlife Activities
  {
    id: 'maasai-mara-safari',
    name: 'Maasai Mara Game Drive',
    description: 'Experience the Great Migration and spot the Big Five in one of Africa\'s most famous wildlife reserves.',
    duration: 8,
    category: 'wildlife',
    location: 'Maasai Mara, Kenya',
    price: 450,
    difficulty: 'easy',
    bestTime: 'July - October',
    includes: ['Professional guide', '4x4 vehicle', 'Park fees', 'Lunch'],
    requirements: ['Camera', 'Binoculars', 'Comfortable clothing']
  },
  {
    id: 'etosha-game-drive',
    name: 'Etosha National Park Game Drive',
    description: 'Explore Namibia\'s premier wildlife destination with its unique salt pan and abundant wildlife.',
    duration: 6,
    category: 'wildlife',
    location: 'Etosha National Park, Namibia',
    price: 320,
    difficulty: 'easy',
    bestTime: 'May - October',
    includes: ['Professional guide', '4x4 vehicle', 'Park fees', 'Lunch'],
    requirements: ['Camera', 'Binoculars', 'Comfortable clothing']
  },

  // Cultural Activities
  {
    id: 'maasai-village-visit',
    name: 'Maasai Village Cultural Experience',
    description: 'Immerse yourself in Maasai culture with traditional dances, crafts, and village life.',
    duration: 3,
    category: 'culture',
    location: 'Maasai Mara, Kenya',
    price: 120,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Cultural guide', 'Traditional meal', 'Craft demonstration'],
    requirements: ['Respectful attitude', 'Camera', 'Small gifts for children']
  },
  {
    id: 'marrakech-souk-tour',
    name: 'Marrakech Souk Exploration',
    description: 'Navigate the labyrinthine souks of Marrakech with a local guide, discovering hidden treasures.',
    duration: 4,
    category: 'culture',
    location: 'Marrakech, Morocco',
    price: 80,
    difficulty: 'easy',
    bestTime: 'October - April',
    includes: ['Local guide', 'Tea ceremony', 'Shopping assistance'],
    requirements: ['Comfortable walking shoes', 'Bargaining skills', 'Cash for purchases']
  },
  {
    id: 'robben-island-tour',
    name: 'Robben Island Historical Tour',
    description: 'Visit the former prison where Nelson Mandela was held, led by former political prisoners.',
    duration: 4,
    category: 'culture',
    location: 'Cape Town, South Africa',
    price: 60,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Ferry transport', 'Professional guide', 'Audio tour'],
    requirements: ['Valid ID', 'Comfortable walking shoes', 'Weather-appropriate clothing']
  },
  {
    id: 'zanzibar-spice-tour',
    name: 'Zanzibar Spice Plantation Tour',
    description: 'Discover the aromatic world of Zanzibar\'s spice plantations and learn about their cultivation.',
    duration: 3,
    category: 'culture',
    location: 'Zanzibar, Tanzania',
    price: 45,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Spice farm tour', 'Tasting session', 'Traditional lunch'],
    requirements: ['Comfortable clothing', 'Camera', 'Appetite for new flavors']
  },

  // Adventure Activities
  {
    id: 'kilimanjaro-trek',
    name: 'Mount Kilimanjaro Summit Trek',
    description: 'Conquer Africa\'s highest peak on a multi-day trek through diverse ecosystems.',
    duration: 72,
    category: 'adventure',
    location: 'Mount Kilimanjaro, Tanzania',
    price: 2500,
    difficulty: 'challenging',
    bestTime: 'January - March, June - October',
    includes: ['Professional guides', 'Porters', 'All meals', 'Camping equipment'],
    requirements: ['Excellent fitness', 'Medical clearance', 'Warm clothing', 'Hiking boots']
  },
  {
    id: 'victoria-falls-bungee',
    name: 'Victoria Falls Bungee Jump',
    description: 'Take the ultimate leap of faith over the Zambezi River with Victoria Falls as your backdrop.',
    duration: 2,
    category: 'adventure',
    location: 'Livingstone, Zambia',
    price: 180,
    difficulty: 'challenging',
    bestTime: 'May - December',
    includes: ['Equipment', 'Professional instruction', 'Certificate', 'Video'],
    requirements: ['Weight 40-100kg', 'Good health', 'Courage', 'Valid ID']
  },
  {
    id: 'sahara-camel-trek',
    name: 'Sahara Desert Camel Trek',
    description: 'Journey into the heart of the Sahara Desert on a traditional camel caravan.',
    duration: 12,
    category: 'adventure',
    location: 'Merzouga, Morocco',
    price: 200,
    difficulty: 'moderate',
    bestTime: 'October - April',
    includes: ['Camel and guide', 'Desert camp', 'Traditional meals', 'Berber music'],
    requirements: ['Comfortable clothing', 'Sun protection', 'Water bottle', 'Sense of adventure']
  },
  {
    id: 'cape-town-hiking',
    name: 'Table Mountain Hiking Adventure',
    description: 'Hike to the top of Table Mountain for breathtaking views of Cape Town and the Atlantic.',
    duration: 6,
    category: 'adventure',
    location: 'Cape Town, South Africa',
    price: 90,
    difficulty: 'moderate',
    bestTime: 'Year-round',
    includes: ['Professional guide', 'Safety equipment', 'Snacks', 'Cable car descent'],
    requirements: ['Good fitness level', 'Hiking boots', 'Weather-appropriate clothing', 'Water']
  },

  // Relaxation Activities
  {
    id: 'zanzibar-beach-day',
    name: 'Zanzibar Beach Relaxation',
    description: 'Unwind on pristine white sand beaches with crystal clear waters and tropical vibes.',
    duration: 8,
    category: 'relaxation',
    location: 'Zanzibar, Tanzania',
    price: 150,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Beach access', 'Lounge chairs', 'Lunch', 'Snorkeling equipment'],
    requirements: ['Swimwear', 'Sunscreen', 'Hat', 'Relaxed attitude']
  },
  {
    id: 'lake-malawi-sunset',
    name: 'Lake Malawi Sunset Cruise',
    description: 'Sail into a spectacular African sunset on the crystal clear waters of Lake Malawi.',
    duration: 3,
    category: 'relaxation',
    location: 'Lake Malawi, Malawi',
    price: 75,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Boat cruise', 'Refreshments', 'Professional captain', 'Photography'],
    requirements: ['Camera', 'Light jacket', 'Comfortable shoes']
  },
  {
    id: 'spa-treatment',
    name: 'Luxury Spa Treatment',
    description: 'Indulge in traditional African spa treatments using local ingredients and techniques.',
    duration: 2,
    category: 'relaxation',
    location: 'Various locations',
    price: 120,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Massage', 'Facial', 'Refreshments', 'Relaxation area'],
    requirements: ['Comfortable clothing', 'Open mind', 'Relaxation mindset']
  },

  // Dining Experiences
  {
    id: 'boma-dinner',
    name: 'Traditional Boma Dinner',
    description: 'Experience authentic African cuisine under the stars with traditional entertainment.',
    duration: 3,
    category: 'dining',
    location: 'Various locations',
    price: 85,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Multi-course meal', 'Traditional entertainment', 'Wine pairing', 'Cultural presentation'],
    requirements: ['Appetite', 'Open mind', 'Comfortable clothing']
  },
  {
    id: 'street-food-tour',
    name: 'Local Street Food Adventure',
    description: 'Explore the vibrant street food scene with a local food expert as your guide.',
    duration: 3,
    category: 'dining',
    location: 'Various cities',
    price: 45,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Food samples', 'Local guide', 'Cultural insights', 'Water'],
    requirements: ['Adventurous palate', 'Comfortable walking shoes', 'Camera']
  },
  {
    id: 'wine-tasting',
    name: 'South African Wine Tasting',
    description: 'Discover the world-class wines of South Africa in the beautiful Cape Winelands.',
    duration: 4,
    category: 'dining',
    location: 'Cape Winelands, South Africa',
    price: 65,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Wine tasting', 'Cheese pairing', 'Professional sommelier', 'Vineyard tour'],
    requirements: ['Valid ID', 'Designated driver', 'Appreciation for wine']
  },

  // Shopping Experiences
  {
    id: 'craft-market-tour',
    name: 'Local Craft Market Tour',
    description: 'Discover authentic African crafts and support local artisans in traditional markets.',
    duration: 3,
    category: 'shopping',
    location: 'Various locations',
    price: 35,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Local guide', 'Bargaining tips', 'Cultural insights', 'Shopping assistance'],
    requirements: ['Cash', 'Bargaining skills', 'Space in luggage', 'Respect for artisans']
  },
  {
    id: 'jewelry-workshop',
    name: 'Traditional Jewelry Making Workshop',
    description: 'Learn to create beautiful African jewelry using traditional techniques and materials.',
    duration: 4,
    category: 'shopping',
    location: 'Various locations',
    price: 95,
    difficulty: 'easy',
    bestTime: 'Year-round',
    includes: ['Materials', 'Professional instruction', 'Take-home pieces', 'Cultural context'],
    requirements: ['Patience', 'Creative spirit', 'Steady hands', 'Appreciation for craftsmanship']
  }
];
