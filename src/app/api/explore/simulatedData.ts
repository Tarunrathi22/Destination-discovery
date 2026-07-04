export interface Attraction {
  name: string;
  description: string;
  culturalSignificance: string;
  type: "Heritage" | "Culinary" | "Craft" | "Living Art";
  coordinates?: { lat: number; lng: number };
}

export interface HiddenGem {
  name: string;
  description: string;
  culturalSignificance: string;
  locationDetails: string;
  respectEtiquette: string;
}

export interface EtiquetteItem {
  rule: string;
  explanation: string;
  category: "Respect" | "Dining" | "Greeting" | "Clothing";
}

export interface Phrase {
  original: string;
  phonetic: string;
  translation: string;
  culturalContext: string;
}

export interface CulturalEvent {
  name: string;
  description: string;
  season: string;
  type: "Festival" | "Workshop" | "Ritual";
}

export interface LocalConnection {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
  experienceType: string;
  price: string;
}

export interface ExploreResponse {
  location: string;
  description: string;
  attractions: Attraction[];
  hiddenGems: HiddenGem[];
  etiquette: EtiquetteItem[];
  phrases: Phrase[];
  events: CulturalEvent[];
  connections: LocalConnection[];
}

export const simulatedDestinations: Record<string, ExploreResponse> = {
  kyoto: {
    location: "Kyoto, Japan",
    description: "The cultural heart of Japan, Kyoto is a city of thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden machiya houses.",
    attractions: [
      {
        name: "Fushimi Inari Taisha",
        description: "An important Shinto shrine in southern Kyoto, famous for its thousands of vermilion torii gates spanning a network of trails behind its main buildings.",
        culturalSignificance: "Dedicated to Inari, the Shinto god of rice and agriculture, representing prosperity and business success.",
        type: "Heritage"
      },
      {
        name: "Gion District Tea Ceremony",
        description: "Kyoto's most famous geisha district, preserved with traditional wooden machiya merchant houses and teahouses.",
        culturalSignificance: "The birthplace of 'Chado' (The Way of Tea), expressing the core principles of harmony, respect, purity, and tranquility (Wa, Kei, Sei, Jaku).",
        type: "Living Art"
      },
      {
        name: "Nishiki Market Culinary Tour",
        description: "A narrow five-block shopping street lined by more than a hundred stalls and shops specializing in food and kitchenware.",
        culturalSignificance: "Known as 'Kyoto's Kitchen', it showcases Kyoto's unique food culture, emphasizing local, seasonal ingredients ('Shun') and heirloom vegetables ('Kyo-yasai').",
        type: "Culinary"
      }
    ],
    hiddenGems: [
      {
        name: "Gio-ji Temple Moss Garden",
        description: "A quiet, secluded nunnery nestled in the Arashiyama hills, renowned for its lush, green moss carpet and towering bamboo grove.",
        culturalSignificance: "Immortalized in the 'Tale of the Heike' as a sanctuary for sorrowful lovers, symbolizing impermanence and nature's quiet healing.",
        locationDetails: "Located in the north of Arashiyama, a 25-minute walk from Saga-Arashiyama Station.",
        respectEtiquette: "Speak in whispers. Do not step off the gravel paths onto the moss, as it takes decades to cultivate."
      },
      {
        name: "Kiyomizu-dera's Tazaemon Kiln",
        description: "Tucked away in the alleys of Higashiyama, a small, multi-generational studio producing traditional Kiyomizu-yaki ceramics.",
        culturalSignificance: "Preserves the 400-year-old style of Kyoto hand-painted pottery, highlighting delicate brushwork and unique glazing techniques.",
        locationDetails: "An unmarked wooden building halfway down the Chawan-zaka (Teapot Lane).",
        respectEtiquette: "Ask permission before taking photos of the artisans working. Appreciate the intentional asymmetry of the pottery."
      }
    ],
    etiquette: [
      {
        rule: "Bow when greeting others",
        explanation: "The depth of the bow indicates the level of respect. For travelers, a polite slight bow of the head is highly appreciated.",
        category: "Greeting"
      },
      {
        rule: "Do not tip at restaurants or in taxis",
        explanation: "Tipping is not part of Japanese culture. Good service is standard, and leaving extra money can cause confusion or polite embarrassment.",
        category: "Respect"
      },
      {
        rule: "Walk on the left side of paths and escalators",
        explanation: "Kyoto is highly structured. Following the flow of pedestrian traffic keeps busy pathways moving smoothly.",
        category: "Respect"
      },
      {
        rule: "Avoid taking photos of Geisha or Maiko without permission",
        explanation: "Geisha are professionals on their way to appointments. Approaching them, chasing them, or pulling their kimonos is strictly prohibited and subject to fines.",
        category: "Respect"
      }
    ],
    phrases: [
      {
        original: "おおきに",
        phonetic: "Ookini",
        translation: "Thank you (Kyoto dialect)",
        culturalContext: "A warm, local version of the standard Japanese 'Arigatou', reflecting Kyoto's merchant history and gentle tone."
      },
      {
        original: "いただきます",
        phonetic: "Itadakimasu",
        translation: "I humbly receive (before eating)",
        culturalContext: "Expresses gratitude to the plants, animals, farmers, and cooks who made the meal possible."
      },
      {
        original: "お邪魔します",
        phonetic: "Ojamashimasu",
        translation: "I am going to disturb you (when entering a home or temple)",
        culturalContext: "A polite way to acknowledge that you are stepping into a private, sacred, or clean space."
      }
    ],
    events: [
      {
        name: "Gion Matsuri",
        description: "One of Japan's most famous festivals, taking place during the entire month of July with massive, ornate wooden floats ('yamaboko') parading through the streets.",
        season: "Summer (July)",
        type: "Festival"
      },
      {
        name: "Rokuro-sha Bamboo Weaving Workshop",
        description: "Hands-on sessions led by master weavers teaching visitors how to craft functional bamboo flower baskets.",
        season: "Year-round (Autumn recommended)",
        type: "Workshop"
      }
    ],
    connections: [
      {
        id: "kyoto-1",
        name: "Kenji Tanaka",
        role: "Master Bamboo Weaver",
        avatar: "🎋",
        bio: "Third-generation bamboo artisan who has spent 35 years refining weaving techniques. He opens his private workshop to share this endangered art.",
        experienceType: "Traditional Basket Weaving Class",
        price: "$65/person"
      },
      {
        id: "kyoto-2",
        name: "Souheki Matsumura",
        role: "Zen Tea Master",
        avatar: "🍵",
        bio: "An active Zen practitioner and tea ceremony master. He focuses on making the ancient tea ritual accessible, meaningful, and peaceful for modern travelers.",
        experienceType: "Intimate Zen Tea Ceremony & Meditation",
        price: "$80/person"
      }
    ]
  },
  oaxaca: {
    location: "Oaxaca, Mexico",
    description: "An exceptional colonial city rich in indigenous cultures, famous for its world-class gastronomy, vibrant textiles, and mezcal production.",
    attractions: [
      {
        name: "Santo Domingo de Guzmán Church",
        description: "A breathtaking Baroque church and former monastery built over 200 years, featuring gold-leaf interiors.",
        culturalSignificance: "A monumental example of the syncretism of Spanish Colonial architecture and indigenous craftsmanship.",
        type: "Heritage"
      },
      {
        name: "Traditional Mezcal Palenque",
        description: "Small family-run farms outside the city using artisanal methods to harvest, roast, and ferment agave hearts.",
        culturalSignificance: "Mezcal is deeply tied to community rituals, weddings, and funerals. It represents the link between the earth and ancestors.",
        type: "Culinary"
      },
      {
        name: "Teotitlán del Valle Textile Cooperatives",
        description: "A Zapotec village where families use foot-pedal looms and natural dyes (like cochineal and wild plants) to create intricate rugs.",
        culturalSignificance: "Preserves ancient geometric Zapotec designs representing mountains, butterflies, and life cycles.",
        type: "Craft"
      }
    ],
    hiddenGems: [
      {
        name: "San Jerónimo Tlacochahuaya Organ Room",
        description: "A modest 16th-century church housing an exquisitely restored, hand-painted pipe organ from the 1700s.",
        culturalSignificance: "The church walls are covered in indigenous stencils and murals depicting Zapotec and Mixtec floral interpretations of Catholic stories.",
        locationDetails: "Located in the Tlacolula valley, a 30-minute drive east of Oaxaca City.",
        respectEtiquette: "Ask the sacristan for permission to climb to the choir loft. Dress modestly; remove hats upon entry."
      },
      {
        name: "Doña Berta's Backyard Comal",
        description: "A small open-air cooking hearth in San Bartolo Coyotepec where Doña Berta prepares traditional Zapotec 'tlayudas'.",
        culturalSignificance: "A living museum of food heritage, utilizing open wood fires and locally-sourced heirloom corn varieties.",
        locationDetails: "Two blocks behind the state museum of black pottery, down an unpaved alley.",
        respectEtiquette: "Wait patiently; she cooks everything from scratch. It is customary to greet her and the family upon entering."
      }
    ],
    etiquette: [
      {
        rule: "Greet shopkeepers with 'Buenas tardes' or 'Buenos días'",
        explanation: "In Oaxaca, politeness is paramount. Always greet people before asking for prices or help.",
        category: "Greeting"
      },
      {
        rule: "Tip 10-15% in sit-down restaurants",
        explanation: "Service workers rely heavily on tips. For street food stalls, tipping is not required but leaving a few coins is a kind gesture.",
        category: "Dining"
      },
      {
        rule: "Ask permission before taking portraits",
        explanation: "Indigenous people, especially elder artisans, value their privacy. Always ask '¿Puedo tomar una foto?' out of respect.",
        category: "Respect"
      }
    ],
    phrases: [
      {
        original: "Diosbadi",
        phonetic: "Dee-ohss-bah-dee",
        translation: "Thank you (Zapotec)",
        culturalContext: "A traditional Zapotec greeting that shows deep respect and local connection, instantly bringing smiles to local vendors."
      },
      {
        original: "Provecho",
        phonetic: "Pro-veh-cho",
        translation: "Enjoy your meal",
        culturalContext: "Said to anyone eating, even strangers you pass in a local market, reinforcing community warmth."
      }
    ],
    events: [
      {
        name: "Guelaguetza Festival",
        description: "A vibrant celebration where delegations from the eight regions of Oaxaca gather to showcase traditional dances, music, and give gifts of regional produce.",
        season: "Summer (July)",
        type: "Festival"
      },
      {
        name: "Mole Cooking Masterclass",
        description: "Hands-on workshop identifying and roasting chilies, grinding spices on a stone metate, and simmering traditional Mole Negro.",
        season: "Year-round",
        type: "Workshop"
      }
    ],
    connections: [
      {
        id: "oaxaca-1",
        name: "Doña Elena Ruiz",
        role: "Master Mole Cook",
        avatar: "🌶️",
        bio: "Inherited a family recipe containing 32 distinct ingredients. She teaches cooking secrets in her outdoor Zapotec kitchen.",
        experienceType: "Traditional Comal Cooking Class",
        price: "$45/person"
      },
      {
        id: "oaxaca-2",
        name: "Mateo Gutiérrez",
        role: "Zapotec Textile Weaver",
        avatar: "🧶",
        bio: "Award-winning weaver specializing in natural dyes. He demonstrates the extraction of red dye from the cochineal bug.",
        experienceType: "Natural Dyeing & Weaving Workshop",
        price: "$55/person"
      }
    ]
  },
  rome: {
    location: "Rome, Italy",
    description: "The Eternal City, where nearly 3,000 years of globally influential art, architecture, and culture are layered on display.",
    attractions: [
      {
        name: "Pantheon",
        description: "A former Roman temple, now a Catholic church, boasting the world's largest unreinforced concrete dome.",
        culturalSignificance: "A masterpiece of Roman engineering and spatial harmony, representing the transition from pagan deities to Christian heritage.",
        type: "Heritage"
      },
      {
        name: "Trastevere Food Exploration",
        description: "A charming, historic working-class neighborhood known for bohemian streets and historic Roman taverns.",
        culturalSignificance: "The heart of Roman culinary tradition: pasta carbonara, cacio e pepe, and artichokes cooked Roman-style.",
        type: "Culinary"
      }
    ],
    hiddenGems: [
      {
        name: "Santa Maria in Cosmedin Crypt",
        description: "A dark, atmospheric early Christian crypt hidden beneath the church floor, built using columns salvaged from ancient pagan temples.",
        culturalSignificance: "A tangible look into the early medieval reuse ('spolia') of ancient Roman ruins for Christian worship.",
        locationDetails: "Located beneath the altar of the church that houses the famous Mouth of Truth (Bocca della Verità).",
        respectEtiquette: "Maintain silence. The crypt is a burial site; do not touch the ancient masonry or columns."
      }
    ],
    etiquette: [
      {
        rule: "Cover shoulders and knees when entering churches",
        explanation: "Churches are active places of worship. Dress codes are strictly enforced at major basilicas like St. Peter's.",
        category: "Clothing"
      },
      {
        rule: "Do not order a cappuccino after 11:00 AM",
        explanation: "Italians believe milk after meals disrupts digestion. Cappuccino is exclusively a breakfast drink; order 'un caffè' (espresso) instead.",
        category: "Dining"
      }
    ],
    phrases: [
      {
        original: "Grazie mille",
        phonetic: "Graht-see-eh meel-leh",
        translation: "Thank you very much",
        culturalContext: "The standard and polite way to express appreciation to servers, hosts, and guides."
      }
    ],
    events: [
      {
        name: "Roman Mosaic Workshop",
        description: "A hands-on session where local mosaic artists teach you how to cut marble tiles ('tesserae') and place them using historic binders.",
        season: "Year-round",
        type: "Workshop"
      }
    ],
    connections: [
      {
        id: "rome-1",
        name: "Alessandro Rossi",
        role: "Artisan Mosaicist",
        avatar: "🏛️",
        bio: "Trained at Rome's historic mosaic school, preserving the meticulous style of Roman decorative pavements.",
        experienceType: "Roman Mosaic Creation Workshop",
        price: "$75/person"
      }
    ]
  },
  cairo: {
    location: "Cairo, Egypt",
    description: "The City of the Thousand Minarets, a sprawling metropolis that preserves thousands of years of Pharaonic, Coptic, and Islamic history.",
    attractions: [
      {
        name: "Al-Muizz li-Din Allah Street",
        description: "One of the oldest streets in Islamic Cairo, containing the greatest concentration of medieval architectural treasures in the Islamic world.",
        culturalSignificance: "The historical spine of Fatimid Cairo, representing the golden age of Islamic science, trade, and learning.",
        type: "Heritage"
      },
      {
        name: "El Fishawy Cafe Heritage Session",
        description: "Cairo's oldest cafe, operating in the Khan el-Khalili bazaar for over 250 years, decorated with large mirrors and vintage copper tables.",
        culturalSignificance: "A legendary cultural hub where Nobel Laureate Naguib Mahfouz and generations of artists wrote their masterpieces.",
        type: "Living Art"
      }
    ],
    hiddenGems: [
      {
        name: "The Gayer-Anderson Museum",
        description: "An architectural marvel consisting of two connected 16th and 17th-century houses filled with an astonishing collection of Islamic furniture and art.",
        culturalSignificance: "One of the best-preserved examples of domestic Islamic residential architecture in Cairo.",
        locationDetails: "Located immediately adjacent to the famous Mosque of Ibn Tulun in Sayyida Zeinab.",
        respectEtiquette: "Take off shoes when stepping on the historic Persian carpets, and look up to admire the wooden mashrabiya screen windows."
      }
    ],
    etiquette: [
      {
        rule: "Use only your right hand for eating and shaking hands",
        explanation: "In Egyptian and Muslim cultures, the left hand is reserved for personal hygiene. Always use the right hand for social gestures and dining.",
        category: "Respect"
      },
      {
        rule: "Dress conservatively in public spaces",
        explanation: "Cairo is a conservative city. Loose clothing covering shoulders and knees is recommended for all travelers to show respect and reduce unwanted attention.",
        category: "Clothing"
      }
    ],
    phrases: [
      {
        original: "Shokran",
        phonetic: "Sho-kran",
        translation: "Thank you",
        culturalContext: "Standard Arabic word for gratitude, spoken with a slight nod of the head."
      },
      {
        original: "Inshallah",
        phonetic: "In-shah-lah",
        translation: "If God wills it",
        culturalContext: "Ubiquitous phrase used when discussing future plans, showing alignment with hope and fate."
      }
    ],
    events: [
      {
        name: "Tanoura Sufi Dance Performance",
        description: "A spiritual and visual performance at Wekalet El Ghouri featuring swirling dervishes in multi-colored skirts accompanied by traditional instruments.",
        season: "Year-round (weekly on Monday/Wednesday/Saturday)",
        type: "Ritual"
      }
    ],
    connections: [
      {
        id: "cairo-1",
        name: "Hassan Al-Sayegh",
        role: "Master Copper Embosser",
        avatar: "🏺",
        bio: "Working in the heart of Islamic Cairo for 40 years, keeping the intricate Islamic geometric copper work alive.",
        experienceType: "Copper Embossing & Calligraphy Lesson",
        price: "$40/person"
      }
    ]
  },
  marrakesh: {
    location: "Marrakesh, Morocco",
    description: "An ancient imperial city defined by labyrinthine souks, bustling squares, ornate palaces, and rich Amazigh (Berber) history.",
    attractions: [
      {
        name: "Jemaa el-Fnaa Oral Storytelling",
        description: "The main square and marketplace of Marrakesh, featuring snake charmers, acrobats, musicians, and traditional storytellers ('halqa').",
        culturalSignificance: "Recognized as a UNESCO Masterpiece of the Oral and Intangible Heritage of Humanity.",
        type: "Living Art"
      },
      {
        name: "Koutoubia Mosque Gardens",
        description: "The gardens surrounding the largest mosque in Marrakesh, featuring a historic 12th-century minaret tower.",
        culturalSignificance: "A masterpiece of Almohad architecture that influenced construction across Andalusia and North Africa.",
        type: "Heritage"
      }
    ],
    hiddenGems: [
      {
        name: "Le Jardin Secret (The Secret Garden)",
        description: "A painstakingly restored palace complex in the Medina, divided into an Islamic garden fed by ancient water systems and an exotic garden.",
        culturalSignificance: "Demonstrates the architectural design of a traditional riad and the mathematical precision of Islamic water engineering ('khattara').",
        locationDetails: "Hidden behind high clay walls in the Mouassine neighborhood of the Medina.",
        respectEtiquette: "Do not touch the delicate terracotta water channels. Speak softly to maintain the oasis atmosphere."
      }
    ],
    etiquette: [
      {
        rule: "Accept mint tea when offered by merchants",
        explanation: "Moroccan mint tea ('Whiskey Berber') is a symbol of hospitality. Declining it can be seen as rejecting the host's welcome.",
        category: "Dining"
      },
      {
        rule: "Negotiate prices respectfully in the Souks",
        explanation: "Bargaining is expected. Approach it as a friendly conversation rather than a confrontation. Start by offering 50% of their initial price.",
        category: "Respect"
      }
    ],
    phrases: [
      {
        original: "Wakxa",
        phonetic: "Wak-xa",
        translation: "Okay / Alright (Darija)",
        culturalContext: "A classic Moroccan Arabic word used in everyday interactions, showing that you understand and agree."
      },
      {
        original: "La shokran",
        phonetic: "Lah sho-kran",
        translation: "No, thank you",
        culturalContext: "A polite but firm way to refuse street vendors or offers that you do not want to pursue."
      }
    ],
    events: [
      {
        name: "Marrakesh Oral Storytelling Workshop",
        description: "A cultural session led by apprentice storytellers teaching visitors the structure, hand gestures, and vocal patterns of traditional Moroccan tales.",
        season: "Autumn / Spring",
        type: "Workshop"
      }
    ],
    connections: [
      {
        id: "marrakesh-1",
        name: "Youssef Ait-Aissa",
        role: "Amazigh Rug Weaver",
        avatar: "🧶",
        bio: "Born in the High Atlas Mountains, Youssef works in a Medina cooperative teaching the meanings of tribal symbols in Berber rugs.",
        experienceType: "Berber Rug Symbolism & Weaving Intro",
        price: "$50/person"
      }
    ]
  },
  rajasthan: {
    location: "Rajasthan, India",
    description: "The Land of Kings, Rajasthan is a desert realm of colossal hill forts, exquisite palaces, vibrant block-print textiles, and living folk music traditions.",
    attractions: [
      {
        name: "Amer Fort & Stepwells",
        description: "A majestic sandstone palace complex featuring the Panna Meena Kund geometric stepwell.",
        culturalSignificance: "Showcases Rajput military architecture combined with complex historic rainwater harvesting systems.",
        type: "Heritage"
      },
      {
        name: "Bagru Indigo Block Printing Guild",
        description: "A traditional printing cooperative outside Jaipur where families stamp hand-carved wooden blocks onto cotton.",
        culturalSignificance: "Preserves the 400-year-old art of natural dabu mud-resist dyeing and block printing.",
        type: "Craft"
      },
      {
        name: "Kathputli Puppet Performance",
        description: "A traditional string puppet play telling legends of local kings and heroes.",
        culturalSignificance: "A historic oral storytelling tradition kept alive by the nomadic Bhat community.",
        type: "Living Art"
      }
    ],
    hiddenGems: [
      {
        name: "The Blue Streets of Brahmpuri",
        description: "A quiet residential quarter at the foot of Mehrangarh Fort where homes are painted in indigo hues.",
        culturalSignificance: "Reflects historic community practices to repel heat and mosquitos, keeping old neighborhood networks active.",
        locationDetails: "Located in Jodhpur, accessible via the narrow winding stairs behind the clock tower.",
        respectEtiquette: "Do not climb residential stairs or photograph families inside their courtyards without asking."
      },
      {
        name: "Abhaneri's Harshat Mata Shrine",
        description: "A ruined 9th-century temple adjacent to the famous Chand Baori stepwell.",
        culturalSignificance: "Features ancient stone reliefs depicting carvings of dance, music, and daily life in early medieval India.",
        locationDetails: "Located in Abhaneri village, a 2-hour drive east of Jaipur.",
        respectEtiquette: "Remove leather items (shoes, belts) before walking onto the temple platform."
      }
    ],
    etiquette: [
      {
        rule: "Remove shoes before entering homes and temples",
        explanation: "It is standard practice to show respect for clean, sacred spaces.",
        category: "Respect"
      },
      {
        rule: "Eat with your right hand only",
        explanation: "The left hand is traditionally associated with personal hygiene.",
        category: "Dining"
      },
      {
        rule: "Dress conservatively",
        explanation: "Keep shoulders, chest, and knees covered when visiting sacred areas.",
        category: "Clothing"
      }
    ],
    phrases: [
      {
        original: "खम्मा घणी",
        phonetic: "Kham-ma Gha-ni",
        translation: "Greetings / Hello (Rajasthani)",
        culturalContext: "A traditional Rajasthani greeting that shows deep respect and local connection."
      },
      {
        original: "धन्यवाद",
        phonetic: "Dhan-ya-vaad",
        translation: "Thank you",
        culturalContext: "Standard Hindi expression of gratitude used for services."
      }
    ],
    events: [
      {
        name: "Pushkar Camel Fair & Folk Festival",
        description: "A massive desert gathering with folk dancers, musicians, and camel traders.",
        season: "Autumn (November)",
        type: "Festival"
      },
      {
        name: "Jaipur Blue Pottery Workshop",
        description: "Learn to glaze clay and quartz pottery with local masters.",
        season: "Year-round",
        type: "Workshop"
      }
    ],
    connections: [
      {
        id: "rajasthan-puppeteer",
        name: "Ram Lal Bhat",
        role: "Master Puppeteer",
        avatar: "🎎",
        bio: "A traditional puppeteer who has performed Rajasthani stories worldwide. He preserves the Bhat community storytelling art.",
        experienceType: "Traditional String Puppetry Workshop",
        price: "$25/person"
      },
      {
        id: "rajasthan-dye",
        name: "Chandu Lal",
        role: "Indigo Dye Artisan",
        avatar: "🎨",
        bio: "An expert in natural indigo and mud-resist block printing, Chandu Lal shares his family workshop in Bagru.",
        experienceType: "Hands-on Dabu Block Printing Session",
        price: "$35/person"
      }
    ]
  }
};

export function getSimulatedDestination(locationName: string): ExploreResponse {
  const normalized = locationName.toLowerCase().trim();
  
  // Look for exact/partial matches in keys
  for (const key of Object.keys(simulatedDestinations)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return simulatedDestinations[key];
    }
  }

  // Fallback for unrecognized locations: dynamic template based on input
  const titleName = locationName.split(",")[0].trim().replace(/\b\w/g, c => c.toUpperCase());
  const lowerName = titleName.toLowerCase();

  // 1. DYNAMIC MATCH: PARIS
  if (lowerName.includes("paris")) {
    return {
      location: "Paris, France",
      description: "The global center of art, fashion, gastronomy, and architectural heritage, defined by historic quarters along the river Seine.",
      attractions: [
        {
          name: "Sainte-Chapelle Stained Glass",
          description: "A monumental Gothic royal chapel featuring an exceptional collection of 13th-century stained glass windows depicting biblical stories.",
          culturalSignificance: "A masterpiece of Rayonnant Gothic architecture representing medieval craftsmanship and light symbolism.",
          type: "Heritage"
        },
        {
          name: "Marais Artisanal Boulangerie Walk",
          description: "A guided sensory exploration of historic stone-oven bakeries in the Marais district, highlighting natural fermentation.",
          culturalSignificance: "Celebrates the French culinary heritage of bread-making, which is legally protected and recognized by UNESCO.",
          type: "Culinary"
        }
      ],
      hiddenGems: [
        {
          name: "La Petite Ceinture Nature Trail",
          description: "A quiet, green railway line abandoned since 1934, now reclaimed by nature and open for peaceful neighborhood walks.",
          culturalSignificance: "A living reminder of Industrial Revolution infrastructure, preserved by local urban ecological movements.",
          locationDetails: "Access is hidden behind the Villa du Bel Air gate in the 12th arrondissement.",
          respectEtiquette: "Do not leave trash. Respect the native plants and nesting birds by staying on the gravel paths."
        }
      ],
      etiquette: [
        {
          rule: "Greet with 'Bonjour' or 'Bonsoir' upon entry",
          explanation: "It is considered highly impolite to start a transaction or conversation without this initial sign of mutual respect.",
          category: "Greeting"
        },
        {
          rule: "Do not speak loudly on public transit",
          explanation: "Parisians value quiet, peaceful public spaces. Keep telephone calls and group conversations to a low volume.",
          category: "Respect"
        }
      ],
      phrases: [
        {
          original: "Bonjour",
          phonetic: "Bon-zhoor",
          translation: "Hello / Good day",
          culturalContext: "The essential greeting used to start any interaction in France."
        },
        {
          original: "S'il vous plaît",
          phonetic: "Seel voo play",
          translation: "Please",
          culturalContext: "Standard polite phrasing used when requesting items, directions, or ordering."
        }
      ],
      events: [
        {
          name: "Traditional Macaron Masterclass",
          description: "Hands-on baking lesson with a local pastry chef, learning the precise technique of folding meringue and piping ganache.",
          season: "Year-round",
          type: "Workshop"
        }
      ],
      connections: [
        {
          id: "paris-boulanger",
          name: "Jean-Pierre Durand",
          role: "Artisan Baker",
          avatar: "🥖",
          bio: "Baking traditional baguettes since 1988, Jean-Pierre hosts baking sessions in his historic underground bakery vault.",
          experienceType: "Underground Croissant & Baguette Baking",
          price: "$70/person"
        }
      ]
    };
  }

  // 2. DYNAMIC MATCH: BANGKOK
  if (lowerName.includes("bangkok") || lowerName.includes("thailand")) {
    return {
      location: "Bangkok, Thailand",
      description: "A vibrant tropical metropolis blending high-energy urban life with ornate Buddhist temples, canals, and world-renowned street food.",
      attractions: [
        {
          name: "Wat Pho Traditional Massage Roots",
          description: "An ancient temple complex housing the Reclining Buddha, famous as the birthplace of traditional Thai medical arts.",
          culturalSignificance: "The center for preservation of traditional Thai massage, featuring stone carvings illustrating body energy lines.",
          type: "Heritage"
        },
        {
          name: "Khlong Lat Mayom Floating Dining",
          description: "A rustic, less-commercial floating market along agricultural canals, showcasing fresh, canal-side culinary preparation.",
          culturalSignificance: "Preserves the historical water-based community lifestyle ('Venice of the East') and local farming trades.",
          type: "Culinary"
        }
      ],
      hiddenGems: [
        {
          name: "Baandam Traditional Woodcarving Atelier",
          description: "An unmarked open-air workshop where senior carvers preserve the historic Ayutthaya-style teakwood relief carving.",
          culturalSignificance: "Maintains endangered manual woodcarving techniques that are disappearing due to industrial automation.",
          locationDetails: "Located down the tree-lined lane behind the Wat Phraya Suren canal path.",
          respectEtiquette: "Do not touch the half-carved relief work. Speak softly and bow slightly when greeting the elder carvers."
        }
      ],
      etiquette: [
        {
          rule: "Use the 'Wai' gesture to show respect",
          explanation: "Press your palms together in a prayer-like position near your chest with a slight bow when greeting elders or temple guides.",
          category: "Greeting"
        },
        {
          rule: "Dress modestly in all temple grounds",
          explanation: "Cover your shoulders and knees. Remove your shoes before stepping into the central shrine ('Ubosot') rooms.",
          category: "Clothing"
        }
      ],
      phrases: [
        {
          original: "สวัสดีครับ/ค่ะ",
          phonetic: "Sawasdee khrap/ka",
          translation: "Hello",
          culturalContext: "Standard polite greeting. End with 'khrap' if you identify as male, or 'ka' if you identify as female."
        },
        {
          original: "ขอบคุณครับ/ค่ะ",
          phonetic: "Khop khun khrap/ka",
          translation: "Thank you",
          culturalContext: "Polite expression of gratitude used for services, food, or general appreciation."
        }
      ],
      events: [
        {
          name: "Khon Mask Painting Workshop",
          description: "Learn the traditional color rules and hand-paint an authentic plaster mask representing characters from the Ramakien epic.",
          season: "Year-round",
          type: "Workshop"
        }
      ],
      connections: [
        {
          id: "bangkok-painter",
          name: "Somchai Somboon",
          role: "Khon Mask Artisan",
          avatar: "🎭",
          bio: "A master artisan who has painted masks for the royal theater for over 30 years. He teaches local kids and travelers in his home studio.",
          experienceType: "Traditional Thai Mask Painting Class",
          price: "$35/person"
        }
      ]
    };
  }

  // 3. DYNAMIC MATCH: TOKYO
  if (lowerName.includes("tokyo")) {
    return {
      location: "Tokyo, Japan",
      description: "A neon-lit megalopolis that preserves quiet historic pockets, ancient Edo-period shrines, and traditional performing arts.",
      attractions: [
        {
          name: "Senso-ji Buddhist Temple",
          description: "Tokyo's oldest and most significant Buddhist temple, located in the historic Asakusa neighborhood.",
          culturalSignificance: "Dedicated to Kannon, the Bodhisattva of compassion, serving as a spiritual beacon since the 7th century.",
          type: "Heritage"
        },
        {
          name: "Tsukiji Outer Market Culinary Walk",
          description: "A bustling grid of narrow alleyways lined with stalls preparing fresh seafood skewers, tamagoyaki, and traditional kitchen knives.",
          culturalSignificance: "Preserves the historical heart of Tokyo's seafood distribution culture and culinary craftsmanship.",
          type: "Culinary"
        }
      ],
      hiddenGems: [
        {
          name: "Yanaka Ginza Old-Town Lane",
          description: "A quiet retro shopping street that survived the war, preserving the warm community atmosphere of mid-century Tokyo.",
          culturalSignificance: "A rare window into 'Shitamachi' (historic lower-city) merchant life and local wooden residential architecture.",
          locationDetails: "A 5-minute walk from Nippori Station on the Yamanote line.",
          respectEtiquette: "Avoid eating while walking down the street. Sit on the benches provided near the shops to enjoy snacks."
        }
      ],
      etiquette: [
        {
          rule: "Stand on the left side of escalators",
          explanation: "In Tokyo, walk on the right and stand on the left. This allows busy commuters to pass without congestion.",
          category: "Respect"
        },
        {
          rule: "Carry your trash back to your hotel",
          explanation: "Tokyo has almost no public trash bins due to safety protocols. Residents carry garbage home; please do the same.",
          category: "Respect"
        }
      ],
      phrases: [
        {
          original: "ありがとうございます",
          phonetic: "Arigatou gozaimasu",
          translation: "Thank you very much",
          culturalContext: "Standard polite form of gratitude, spoken with a slight bow."
        }
      ],
      events: [
        {
          name: "Kanda Matsuri Festival",
          description: "A massive historical parade featuring portable shrines ('mikoshi') carried through the streets of central Tokyo.",
          season: "Spring (May, odd-numbered years)",
          type: "Festival"
        }
      ],
      connections: [
        {
          id: "tokyo-sushi",
          name: "Chef Hiroshi Sato",
          role: "Edomae Sushi Chef",
          avatar: "🍣",
          bio: "Spent 25 years mastering the balance of vinegared rice and seasonal fish. He hosts small, educational tasting workshops.",
          experienceType: "Edomae Sushi Appreciation & Tasting",
          price: "$95/person"
        }
      ]
    };
  }

  // 4. DYNAMIC MATCH: LONDON
  if (lowerName.includes("london") || lowerName.includes("united kingdom")) {
    return {
      location: "London, United Kingdom",
      description: "A multicultural capital layered with imperial history, royal landmarks, and a diverse contemporary art scene along the River Thames.",
      attractions: [
        {
          name: "Borough Market Gastronomy Walk",
          description: "London's oldest food market, operating for over 1,000 years, offering traditional English cheeses, oysters, and game pies.",
          culturalSignificance: "The historic food exchange center of London, preserving small-scale British and international farming trades.",
          type: "Culinary"
        },
        {
          name: "Globe Theatre Shakespearean Walk",
          description: "A realistic reconstruction of the open-air playhouse designed in 1599 where William Shakespeare's works were performed.",
          culturalSignificance: "Preserves the historical experience of Elizabethan drama, oral storytelling, and architecture.",
          type: "Living Art"
        }
      ],
      hiddenGems: [
        {
          name: "Postman's Park Memorial",
          description: "A quiet, leafy public garden containing a unique Victorian monument dedicated to everyday heroic self-sacrifice.",
          culturalSignificance: "Commemorates ordinary working-class citizens who lost their lives saving others, highlighting community history.",
          locationDetails: "Located just a short walk north of St. Paul's Cathedral.",
          respectEtiquette: "This is a quiet, contemplative memorial park. Do not run, play music, or disturb people reading on the benches."
        }
      ],
      etiquette: [
        {
          rule: "Queue in an orderly single-file line",
          explanation: "In Britain, queuing is a sacred social contract. Cutting lines is considered extremely rude and will provoke quiet disapproval.",
          category: "Respect"
        },
        {
          rule: "Stand on the right side of Tube escalators",
          explanation: "Always stand on the right and walk on the left of escalators on the London Underground network to prevent bottlenecks.",
          category: "Respect"
        }
      ],
      phrases: [
        {
          original: "Cheers",
          phonetic: "Cheerz",
          translation: "Thank you / Goodbye / Toast",
          culturalContext: "Ubiquitous colloquial word used constantly for small expressions of gratitude."
        }
      ],
      events: [
        {
          name: "British Afternoon Tea Etiquette Class",
          description: "Learn the social history and proper service of afternoon tea, including scone splitting, tea brewing, and sandwich etiquette.",
          season: "Year-round",
          type: "Workshop"
        }
      ],
      connections: [
        {
          id: "london-tea",
          name: "Lady Penelope Vance",
          role: "Heritage Tea Sommelier",
          avatar: "☕",
          bio: "An authority on historical British tea rituals who hosts educational tea history workshops in a historic drawing room.",
          experienceType: "Traditional Afternoon Tea Masterclass",
          price: "$50/person"
        }
      ]
    };
  }

  // Smart Generic Fallback
  return {
    location: `${titleName}, Cultural Destination`,
    description: `A unique regional sanctuary rich in heritage, history, and community character. Discover ${titleName}'s local culture and ancestral arts.`,
    attractions: [
      {
        name: `${titleName} Artisan Guilds`,
        description: `Explore the historical quarters where generations of traditional painters, woodworkers, and weavers maintain active home workshops.`,
        culturalSignificance: `Preserves the unique visual patterns, traditional tools, and manual trade skills of the region.`,
        type: "Craft"
      },
      {
        name: `${titleName} Heritage Cooking Walk`,
        description: `A culinary journey through central food stalls, focusing on local agricultural produce, spices, and historic cooking methods.`,
        culturalSignificance: `Offers a look into the region's climate, trading history, and community identity through its native cuisine.`,
        type: "Culinary"
      }
    ],
    hiddenGems: [
      {
        name: `The ${titleName} Community Heritage Archive`,
        description: `A modest, resident-run archive displaying oral histories, handwritten diaries, and vintage neighborhood photographs.`,
        culturalSignificance: `Serves as a grassroots museum safeguarding the personal stories and memories of local elder families.`,
        locationDetails: `Tucked behind the historic central library, down the lane marked by stone pillars.`,
        respectEtiquette: `Maintain quiet. Consider speaking with the volunteers and learning about local family histories.`
      }
    ],
    etiquette: [
      {
        rule: "Greet hosts before asking for service",
        explanation: "Starting an interaction with a polite local greeting shows respect for the resident as a person rather than a provider.",
        category: "Greeting"
      },
      {
        rule: "Support independent local artisans",
        explanation: "Purchase crafts directly from workshops rather than commercial souvenir shops to keep money inside the micro-economy.",
        category: "Respect"
      }
    ],
    phrases: [
      {
        original: "Hello / Good day",
        phonetic: "Local greeting",
        translation: "Hello",
        culturalContext: "The essential icebreaker for polite exchange with shopkeepers, transit operators, or local hosts."
      },
      {
        original: "Thank you",
        phonetic: "Local thanks",
        translation: "Thank you",
        culturalContext: "Used to express gratitude for local hospitality, meals, or guided assistance."
      }
    ],
    events: [
      {
        name: "Heritage Arts & Craft Workshop",
        description: "A seasonal workshop where local elder masters teach traditional hands-on carving, painting, or textile methods.",
        season: "Spring and Autumn",
        type: "Workshop"
      }
    ],
    connections: [
      {
        id: "generic-guide",
        name: "Elena - Community Guide",
        role: "Heritage Storyteller",
        avatar: "👩",
        bio: "A native resident passionate about preservation. She guides small groups through local neighborhoods to highlight historical micro-histories.",
        experienceType: "Neighborhood History & Artisan Walk",
        price: "$30/person"
      }
    ]
  };
}

export function generateSimulatedStory(location: string, narrator: string, attractionName: string): string {
  const loc = location.split(",")[0].trim().toLowerCase();
  
  if (loc.includes("kyoto")) {
    if (narrator.includes("Cook") || narrator.includes("culinary")) {
      return `Welcome, traveler. Step under the wooden eves of my family's stall here at Nishiki Market. Take a deep breath—what you smell is the rich, toasted aroma of 'Kyo-bancha' tea and the sweet, savory simmer of our soy-glazed dashi tamago. \n\nFor four generations, my family has stood on this very stone floor. Nishiki is not just a market; it is the lungs of Kyoto. Every morning, before the sun crests the Higashiyama mountains, the temple bells ring, and we lay out our heirloom vegetables—the long, slender Kyo-kabu radishes and the sweet Kamo-nasu eggplants. \n\nIn Kyoto, we eat according to 'Shun'—the exact moment a plant reaches its peak flavor. When you eat our food, you are tasting this exact day, this exact season. You are eating the rain that fell in the northern valleys three months ago. Take this bowl, eat it slowly, and remember: in this fast-moving world, some things are still cooked with the slow patience of a thousand years.`;
    }
    if (narrator.includes("Weaver") || narrator.includes("artisan") || narrator.includes("craft")) {
      return `Listen closely. Do you hear the dry, rhythmic whispering of the bamboo leaves? In our workshop, we do not view bamboo as wood—we view it as a hollow reed that captures the wind. \n\nI am weaving a flower basket using 'Madake' bamboo. This reed was harvested in the hills of Saga-Arashiyama, dried under the winter sun for two years, and split into ribbons no thicker than a single hair. \n\nBamboo weaving is a conversation between my hands and the tension of the fibers. If I push too hard, it snaps; if I am too timid, the basket loses its form. It is the Zen path of the middle way. Each knot I tie is a prayer for stability. When you hold a traditional Kyoto basket, you are holding the strength of a plant that bends under the heaviest winter snows but never breaks. This is our spirit—flexible, resilient, and empty inside to make room for beauty.`;
    }
    return `Welcome to the quiet pathways of Kyoto. As you stand before the vermilion torii gates of Fushimi Inari, you are stepping onto a path walked by pilgrims for over twelve centuries. \n\nI am a guardian of these temple logs. Look closely at the vermilion paint on these towering gates. This color is not just decoration; it is made from cinnabar, which protects the wood from decay, but spiritually, it represents the vital warmth of the sun and the warding off of evil forces. \n\nAs you ascend the mountain path, you will hear the wind rustle through the cedar trees. Each gate was donated by a local merchant, a mother, or an artisan, as a physical thank-you for prosperity. You are walking through a forest of gratitude. Walk slowly, feel the damp moss on the stone lanterns, and know that every step you take aligns your feet with the millions who have sought hope on this mountain since the Nara period.`;
  }

  if (loc.includes("oaxaca")) {
    if (narrator.includes("Cook") || narrator.includes("culinary")) {
      return `Hola, amigo! Come sit near the warmth of the comal. Listen to the soft, rhythmic pat-pat-pat of my hands shaping the corn masa. The smell filling the air is the soul of Oaxaca—toasted chilhuacle chilies, roasted cacao, and fresh hierba santa leaves.\n\nI am preparing Mole Negro. Some call it a sauce, but to us, it is an alchemy. It has thirty-two ingredients: almonds, raisins, plantains, cloves, chocolate, and four types of dried chilies. Each must be toasted, ground, and simmered with absolute care. If you burn a single chili seed, the entire mole turns bitter.\n\nThis recipe was passed to me by my grandmother, who learned it from hers. In Oaxaca, we do not write recipes down; we taste them. We say a good mole tastes like the earth, the sun, and the sweat of the cook. When you eat this mole, you are not just tasting food—you are tasting our history, our Zapotec ancestors, and the celebration of life itself. ¡Buen provecho!`;
    }
    if (narrator.includes("Weaver") || narrator.includes("artisan") || narrator.includes("craft")) {
      return `Welcome to Teotitlán. Step into my workshop and feel the raw wool between your fingers. Do you see this bright, brilliant red color on my loom? It does not come from a factory. It comes from the cochineal, a tiny insect that lives on the prickly pear cactus.\n\nWe harvest them, dry them under the hot Oaxacan sun, and grind them on a stone metate. If we add lime juice, the powder turns bright orange. If we add wood ash, it turns a deep, royal purple. It is the magic of our Zapotec mountains.\n\nThe design I am weaving represents the 'Ojo de Dios' (Eye of God)—a pattern worn by our ancestors to protect travelers on long journeys. Every thread is pulled by hand, packed tight with a wooden comb. A single rug takes three months of constant work. We weave our stories, our cosmology, and the colors of our sunrise into these threads. When you walk on this rug, you walk on Zapotec ground.`;
    }
    return `Stand quiet for a moment in the shadow of the Santo Domingo church. Feel the warm stone walls, glowing golden under the afternoon sun. \n\nI am a local historian, and I want you to look at the details in the plasterwork above the altar. Do you see the faces carved into the leaves? Those are not European angels. Look at the high cheekbones, the shape of the eyes—those were carved by Zapotec and Mixtec artisans who were forced to build this church but carved their own bloodline into the very walls of the conqueror.\n\nSanto Domingo is a monument of survival. It has survived earthquakes, revolutions, and conversion into military barracks. Today, it stands as the heart of Oaxaca, where the copper bells still ring out to call the town for festivals. Listen to them, look at the gold leaf reflecting the candle flames, and feel the indomitable spirit of a people who carved their eternity in stone.`;
  }

  if (loc.includes("rajasthan") || loc.includes("jaipur") || loc.includes("jodhpur")) {
    if (narrator.includes("Cook") || narrator.includes("culinary")) {
      return `Welcome, my friend. Sit down near the earthen stove, the 'chulha'. The smoke rising carries the scent of roasted cumin, clarified butter, and wood smoke. I am preparing traditional 'Dal Baati Churma'. \n\nFor generations, our desert ancestors cooked these hard wheat balls ('baati') by burying them in hot ash. It is the food of survival, designed to stay fresh in the harsh Thar desert. \n\nTaste this churma—it is hand-crushed wheat cooked with jaggery and pure ghee. In Rajasthan, food is not just sustenance; it is hospitality. We have a saying: 'Atithi Devo Bhava'—the guest is God. When you eat from this clay plate, you taste the resilience of the desert and the warmth of our welcome. Enjoy the meal!`;
    }
    if (narrator.includes("Weaver") || narrator.includes("artisan") || narrator.includes("craft")) {
      return `Listen to the steady, rhythmic thud-thud-thud of my wooden stamp. I am pressing a hand-carved teak block dipped in fermented mud paste onto this hand-woven cotton fabric. This is 'Dabu' printing, our zero-waste resistance dyeing method. \n\nOur family in Bagru has done this for four centuries. The water we use to wash the indigo dye comes from deep desert wells, and the sun that dries our fabric is the same sun that bakes our soil. \n\nEvery pattern on this cloth has a meaning. The waves represent river paths, and the small dots represent mustard seeds. When you wrap this indigo scarf around your shoulders, you are wearing the craftsmanship of hands that have carved wood and printed soil under the open desert sky.`;
    }
    return `Welcome to Amer. Stand here on this stone terrace, looking down at the geometric water steps of the ancient stepwell below. \n\nI am a local heritage guardian, and I want you to feel these sandstone walls. They have stood for five hundred years, reflecting the golden rays of the desert sun. Look at the mirrors embedded in the stucco ceiling of the Sheesh Mahal—they are placed so that a single candle can illuminate the entire hall like a galaxy of stars. \n\nThis fortress is a testament to Rajput ingenuity, designed to harvest every drop of monsoon rain while defending our people. As you walk through these stone gates, you are stepping through centuries of battles, festivals, and folk music. Let the wind carry the faint sound of the sarangi, and feel the living history of Rajasthan.`;
  }

  // Generic fallback storytelling
  return `Greetings, traveler. I am a local storyteller here in ${location.split(",")[0]}. As you look at the historic facade of ${attractionName}, let me share a story that you will not find in any standard guide book.\n\nThis place was built not just with stone and mortar, but with the collective spirit of our community. For centuries, our people gathered here to trade, celebrate, and preserve our way of life. The very patterns carved into the wood and stone represent the stories of our ancestors—their struggles, their connection to the land, and their hopes for the future.\n\nWhen you walk through these archways, you are not a mere observer. You are part of the living lineage of this space. Listen to the ambient sounds, notice the textures of the walls, and carry this story with you as you journey forward. The spirit of our culture welcomes you.`;
}
