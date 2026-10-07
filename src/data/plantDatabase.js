// Plant & Disease Knowledge Base

export const PRESET_SAMPLES = [
  {
    id: 'sample-tomato-blight',
    name: 'Tomato (Late Blight)',
    scientificName: 'Solanum lycopersicum',
    category: 'Vegetables',
    imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=1000&q=80',
    type: 'diseased',
    diseaseName: 'Late Blight (Phytophthora infestans)',
    severity: 'Severe',
    confidence: 97.4,
  },
  {
    id: 'sample-rose-powdery-mildew',
    name: 'Rose Bush (Powdery Mildew)',
    scientificName: 'Rosa rubiginosa',
    category: 'Ornamental Flowers',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
    type: 'diseased',
    diseaseName: 'Powdery Mildew (Podosphaera pannosa)',
    severity: 'Moderate',
    confidence: 96.1,
  },
  {
    id: 'sample-healthy-monstera',
    name: 'Monstera Deliciosa (Healthy)',
    scientificName: 'Monstera deliciosa',
    category: 'Indoor Plants',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80',
    type: 'healthy',
    diseaseName: 'None - Vibrant & Healthy Foliage',
    severity: 'None',
    confidence: 99.1,
  },
  {
    id: 'sample-corn-rust',
    name: 'Maize / Corn (Common Rust)',
    scientificName: 'Zea mays',
    category: 'Crops & Grains',
    imageUrl: 'https://images.unsplash.com/photo-1535242208474-9a28972a8d40?auto=format&fit=crop&w=1000&q=80',
    type: 'diseased',
    diseaseName: 'Common Rust (Puccinia sorghi)',
    severity: 'Moderate',
    confidence: 95.8,
  },
  {
    id: 'sample-citrus-canker',
    name: 'Citrus / Lemon Tree (Citrus Canker)',
    scientificName: 'Citrus limon',
    category: 'Fruit Trees',
    imageUrl: 'https://images.unsplash.com/photo-1534531141161-e41d1341d1de?auto=format&fit=crop&w=1000&q=80',
    type: 'diseased',
    diseaseName: 'Citrus Canker (Xanthomonas citri)',
    severity: 'Severe',
    confidence: 98.2,
  },
  {
    id: 'sample-healthy-succulent',
    name: 'Echeveria Succulent (Healthy)',
    scientificName: 'Echeveria elegans',
    category: 'Succulents',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    type: 'healthy',
    diseaseName: 'None - Optimal Hydration & Coloration',
    severity: 'None',
    confidence: 98.7,
  }
];

export const PLANT_SPECIES_CATALOG = [
  {
    id: 'tomato',
    commonName: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    family: 'Solanaceae',
    origin: 'South America',
    typicalDiseases: ['Late Blight', 'Early Blight', 'Leaf Mold', 'Yellow Leaf Curl Virus', 'Spider Mites'],
    care: {
      sunlight: 'Full Sun (6-8 hours direct sunlight daily)',
      water: '1-2 inches per week. Deep watering at soil base',
      temp: '65°F - 85°F (18°C - 29°C)',
      soilPh: '6.0 - 6.8 (Slightly acidic)',
      humidity: '40% - 70%'
    }
  },
  {
    id: 'rose',
    commonName: 'Rose',
    scientificName: 'Rosa rubiginosa',
    family: 'Rosaceae',
    origin: 'Northern Hemisphere',
    typicalDiseases: ['Powdery Mildew', 'Black Spot', 'Rose Rust', 'Downy Mildew', 'Aphid Infestation'],
    care: {
      sunlight: 'At least 6 hours of full sunlight',
      water: 'Deeply once or twice a week depending on temperature',
      temp: '60°F - 75°F (15°C - 24°C)',
      soilPh: '6.0 - 6.5',
      humidity: '50% - 60%'
    }
  },
  {
    id: 'monstera',
    commonName: 'Swiss Cheese Plant / Monstera',
    scientificName: 'Monstera deliciosa',
    family: 'Araceae',
    origin: 'Central America',
    typicalDiseases: ['Root Rot', 'Chlorosis (Nitrogen Deficiency)', 'Thrips Damage', 'Scale Insects'],
    care: {
      sunlight: 'Bright, indirect sunlight',
      water: 'Water when top 2-3 inches of soil feel dry',
      temp: '68°F - 86°F (20°C - 30°C)',
      soilPh: '5.5 - 7.0',
      humidity: '60% - 80%'
    }
  },
  {
    id: 'citrus',
    commonName: 'Lemon / Citrus Tree',
    scientificName: 'Citrus limon',
    family: 'Rutaceae',
    origin: 'South Asia',
    typicalDiseases: ['Citrus Canker', 'Greening Disease (Huanglongbing)', 'Sooty Mold', 'Iron Deficiency'],
    care: {
      sunlight: 'Full Sun (8+ hours daily)',
      water: 'Keep consistently moist, avoid waterlogging',
      temp: '70°F - 90°F (21°C - 32°C)',
      soilPh: '5.5 - 6.5',
      humidity: '50% - 70%'
    }
  },
  {
    id: 'corn',
    commonName: 'Maize / Corn',
    scientificName: 'Zea mays',
    family: 'Poaceae',
    origin: 'Mesoamerica',
    typicalDiseases: ['Common Rust', 'Northern Corn Leaf Blight', 'Gray Leaf Spot', 'Smut'],
    care: {
      sunlight: 'Full direct sunlight',
      water: '1.5 inches per week, crucial during pollination',
      temp: '60°F - 95°F (15°C - 35°C)',
      soilPh: '5.8 - 7.0',
      humidity: '50% - 75%'
    }
  }
];

export const KNOWN_DISEASES = {
  'late_blight': {
    name: 'Late Blight (Phytophthora infestans)',
    category: 'Fungal / Water Mold',
    contagiousRisk: 'High',
    symptoms: [
      'Large, irregular dark brown/black water-soaked spots on foliage',
      'White cottony fungal growth on leaf undersides during humid conditions',
      'Rapid leaf browning, wilting, and stem collapse',
      'Foul odor from decaying leaf tissue'
    ],
    causes: 'Cool, humid weather combined with rain or heavy overhead watering allowing oomycete spores to multiply.',
    emergencySteps: [
      'Isolate affected plant immediately from healthy crops.',
      'Prune and destroy severely infected branches (do NOT compost infected leaves).',
      'Avoid overhead leaf irrigation; switch to drip watering at the soil base.'
    ],
    organicTreatments: [
      'Copper Hydroxide or Copper Octanoate spray every 7-10 days.',
      'Organic Bacillus subtilis bio-fungicide application.',
      'Baking soda & horticultural oil solution (1 tbsp baking soda + 1 tsp liquid soap in 1 gal water).'
    ],
    chemicalTreatments: [
      'Mancozeb or Chlorothalonil systemic fungicide.',
      'Metalaxyl or Ridomil Gold for high-value agricultural crops.'
    ],
    prevention: [
      'Ensure wide plant spacing for maximal air circulation.',
      'Use certified disease-resistant crop varieties.',
      'Rotate solanaceous crops every 3-4 seasons.'
    ]
  },
  'powdery_mildew': {
    name: 'Powdery Mildew (Podosphaera / Erysiphe)',
    category: 'Fungal',
    contagiousRisk: 'Moderate',
    symptoms: [
      'White to dusty gray talcum-like powder patches on leaf surfaces and stems',
      'Leaves curling upward, yellowing, and drying out prematurely',
      'Stunted new stem growth and drop of unopened flower buds'
    ],
    causes: 'High relative humidity at night combined with dry sunny daytime conditions and poor air flow around dense leaves.',
    emergencySteps: [
      'Move indoor plants to bright, well-ventilated areas.',
      'Wipe affected leaves gently with diluted potassium bicarbonate solution.',
      'Trim dense inner branches to open up the canopy for air circulation.'
    ],
    organicTreatments: [
      'Pure Cold-Pressed Neem Oil spray (2 tsp neem oil + 1 tsp dish soap per liter of warm water).',
      'Milk spray dilution (40% milk / 60% water) sprayed under direct sunlight.',
      'Potassium Bicarbonate spray.'
    ],
    chemicalTreatments: [
      'Myclobutanil or Sulfur-based fungicide spray.',
      'Propiconazole systemic treatment for severe ornamental infections.'
    ],
    prevention: [
      'Avoid night-time watering of leaves.',
      'Apply neem oil as a preventive measure every 14 days during warm spring weather.'
    ]
  },
  'citrus_canker': {
    name: 'Citrus Canker (Xanthomonas citri)',
    category: 'Bacterial Infection',
    contagiousRisk: 'High',
    symptoms: [
      'Raised, corky scab-like brown lesions with yellow chlorotic halos on leaves',
      'Sunken lesions on twigs and fruit peel leading to premature fruit drop',
      'Defoliation and twig dieback on infected citrus branches'
    ],
    causes: 'Bacterial infection spread through wind-driven rain, lawn mowers, or contaminated pruning tools.',
    emergencySteps: [
      'Disinfect all gardening pruners with 70% isopropyl alcohol between every cut.',
      'Prune infected twigs 4-6 inches below visible lesion margins.'
    ],
    organicTreatments: [
      'Copper sulphate combined with hydrated lime (Bordeaux Mixture).',
      'Liquid Copper Fungicide applied at first leaf flush.'
    ],
    chemicalTreatments: [
      'Copper Hydroxide + Streptomycin agricultural sprays (where permitted).'
    ],
    prevention: [
      'Plant windbreaks around citrus orchards to stop rain-driven bacterial movement.',
      'Apply preventive copper sprays early in the growing season.'
    ]
  },
  'common_rust': {
    name: 'Common Rust (Puccinia sorghi)',
    category: 'Fungal Pathogen',
    contagiousRisk: 'High',
    symptoms: [
      'Small, brownish-red airborne pustules on both upper and lower leaf surfaces',
      'Pustules rupture releasing powdery rust-colored spores',
      'Premature leaf senescence and reduced photosynthetic yield'
    ],
    causes: 'Airborne rust fungal spores carried by wind currents during moist weather conditions.',
    emergencySteps: [
      'Remove early infected bottom leaves.',
      'Maintain adequate nitrogen fertilization to encourage plant resilience.'
    ],
    organicTreatments: [
      'Sulfur dusting powder or liquid sulfur spray.',
      'Copper Octanoate organic fungicide.'
    ],
    chemicalTreatments: [
      'Azoxystrobin or Pyraclostrobin strobilurin fungicides.'
    ],
    prevention: [
      'Plant rust-resistant seed hybrids.',
      'Destroy crop residue after harvest.'
    ]
  },
  'chlorosis_deficiency': {
    name: 'Iron / Nitrogen Chlorosis (Nutrient Deficiency)',
    category: 'Abiotic / Physiological Disorder',
    contagiousRisk: 'None',
    symptoms: [
      'Yellowing of leaves while leaf veins remain sharp dark green (Interveinal Chlorosis)',
      'Pale yellow overall leaves starting from older bottom foliage',
      'Stunted leaf development and slow growth rate'
    ],
    causes: 'Soil pH imbalance (>7.0 locked iron availability) or insufficient soil nitrogen/iron nutrients.',
    emergencySteps: [
      'Test soil pH with a digital pH meter or soil kit.',
      'Check if roots are waterlogged or pot is rootbound.'
    ],
    organicTreatments: [
      'Foliar spray with Chelated Iron (Fe-EDTA or Fe-DTPA).',
      'Apply organic compost tea or blood meal for nitrogen boost.',
      'Add elemental sulfur or peat moss to lower soil pH.'
    ],
    chemicalTreatments: [
      'Balanced NPK 20-20-20 liquid fertilizer with trace micronutrients.'
    ],
    prevention: [
      'Maintain optimal soil pH (6.0 - 6.8).',
      'Use well-draining soil mixes rich in organic matter.'
    ]
  }
};
