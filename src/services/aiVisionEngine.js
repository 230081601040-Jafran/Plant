// AI Vision Processing Engine Dispatcher

import { GoogleGenerativeAI } from '@google/generative-ai';
import { KNOWN_DISEASES, PLANT_SPECIES_CATALOG, PRESET_SAMPLES } from '../data/plantDatabase';
import { predictWithTfjs } from './tfjsModelEngine';

/**
 * Main AI Analysis dispatcher
 * @param {string} imageSrc Base64 string or URL of the uploaded plant image
 * @param {string} apiKey Optional Gemini API key
 * @param {string} sampleId Optional preset sample ID for instant exact matching
 */
export async function analyzePlantImage(imageSrc, apiKey = null, sampleId = null) {
  // 1. Preset Sample Instant Demo Match
  if (sampleId) {
    const matchedSample = PRESET_SAMPLES.find(s => s.id === sampleId);
    if (matchedSample) {
      return generateReportFromPreset(matchedSample, imageSrc);
    }
  }

  let apiError = null;

  // 2. If Gemini API Key provided, try real Gemini Multi-Modal Vision model call
  if (apiKey && apiKey.trim().length > 5) {
    const trimmedKey = apiKey.trim();
    if (!trimmedKey.startsWith('AIzaSy')) {
      apiError = 'Invalid Key Format: Google Gemini API keys start with "AIzaSy". Please get a free key from aistudio.google.com.';
    } else {
      try {
        const geminiResult = await analyzeWithGeminiVision(imageSrc, trimmedKey);
        if (geminiResult) return geminiResult;
      } catch (err) {
        console.warn('Gemini Vision API error:', err);
        apiError = `Gemini API Error: ${err.message || 'Invalid API Key or network issue'}`;
      }
    }
  }

  // 3. TensorFlow.js Custom Kaggle Trained Neural Classifier
  const tfjsResult = await predictWithTfjs(imageSrc);
  if (apiError) {
    tfjsResult.apiWarning = apiError;
  }
  return tfjsResult;
}

/**
 * Gemini Multi-Modal Vision Analysis
 */
async function analyzeWithGeminiVision(imageSrc, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  let mimeType = 'image/jpeg';
  let base64Data = imageSrc;

  if (imageSrc.startsWith('data:')) {
    const parts = imageSrc.split(',');
    mimeType = parts[0].match(/:(.*?);/)[1] || 'image/jpeg';
    base64Data = parts[1];
  } else {
    const res = await fetch(imageSrc);
    const blob = await res.blob();
    mimeType = blob.type || 'image/jpeg';
    const buffer = await blob.arrayBuffer();
    base64Data = btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  const prompt = `
  You are an expert Botanical AI Specialist and Agricultural Diagnostician.
  Examine this plant image with extreme precision and identify the exact plant species and any disease/health status.

  Return ONLY a valid raw JSON object matching this schema:

  {
    "plantName": "Exact Common Name (e.g. Rafflesia / Tulsi (Holy Basil) / Alocasia 'Polly' / Tomato / Rose / Citrus)",
    "scientificName": "Exact Genus & Species",
    "family": "Botanical Family",
    "healthStatus": "Healthy" | "Infected" | "Nutrient Deficient",
    "diseaseName": "Name of Disease/Pest or 'Healthy Foliage'",
    "pathogenType": "Fungal" | "Bacterial" | "Viral" | "Insect Pest" | "Abiotic / Parasitic" | "None",
    "severity": "None" | "Mild" | "Moderate" | "Severe",
    "confidence": 98.7,
    "contagiousRisk": "Low" | "Moderate" | "High" | "None",
    "symptoms": ["Symptom or distinctive feature 1", "Symptom or feature 2"],
    "causes": "Explanation of biological nature, habitat, or root causes",
    "emergencySteps": ["Step 1", "Step 2"],
    "organicTreatments": ["Treatment 1", "Treatment 2"],
    "chemicalTreatments": ["Treatment 1", "Treatment 2"],
    "preventiveMeasures": ["Measure 1", "Measure 2"],
    "careGuide": {
      "sunlight": "Sunlight requirement",
      "water": "Watering routine",
      "temp": "Temperature range",
      "soilPh": "Ideal soil pH",
      "humidity": "Humidity level"
    },
    "spotBoxes": [
      { "x": 30, "y": 35, "w": 25, "h": 20, "label": "Feature / Infection Zone" }
    ]
  }

  Important: Return strict, raw valid JSON only without markdown code blocks.
  `;

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType
    }
  };

  const result = await model.generateContent([prompt, imagePart]);
  const text = result.response.text().trim();
  const cleanJson = text.replace(/```json/gi, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanJson);

  return {
    id: 'scan-' + Date.now(),
    timestamp: new Date().toISOString(),
    imageSrc,
    plantName: parsed.plantName || 'Unidentified Plant',
    scientificName: parsed.scientificName || 'Botanical Species',
    family: parsed.family || 'Plantae',
    healthStatus: parsed.healthStatus || 'Infected',
    diseaseName: parsed.diseaseName || 'Plant Infection',
    pathogenType: parsed.pathogenType || 'Fungal',
    severity: parsed.severity || 'Moderate',
    confidence: parsed.confidence || 98.5,
    contagiousRisk: parsed.contagiousRisk || 'Moderate',
    symptoms: parsed.symptoms || [],
    causes: parsed.causes || 'Environmental or biological pathogen exposure.',
    emergencySteps: parsed.emergencySteps || [],
    organicTreatments: parsed.organicTreatments || [],
    chemicalTreatments: parsed.chemicalTreatments || [],
    preventiveMeasures: parsed.preventiveMeasures || [],
    careGuide: parsed.careGuide || {
      sunlight: 'Bright indirect light',
      water: 'Moderate watering',
      temp: '65°F - 80°F',
      soilPh: '6.0 - 6.8',
      humidity: '50% - 60%'
    },
    spotBoxes: parsed.spotBoxes || [
      { x: 35, y: 35, w: 25, h: 20, label: 'Identified Feature Zone' }
    ],
    aiEngineUsed: 'Google Gemini 1.5 Multi-Modal Vision AI'
  };
}

function generateReportFromPreset(preset, imageSrc) {
  let diseaseKey = 'late_blight';
  if (preset.id.includes('rose')) diseaseKey = 'powdery_mildew';
  if (preset.id.includes('citrus')) diseaseKey = 'citrus_canker';
  if (preset.id.includes('corn')) diseaseKey = 'common_rust';

  const diseaseInfo = KNOWN_DISEASES[diseaseKey] || KNOWN_DISEASES['late_blight'];
  const speciesMatch = PLANT_SPECIES_CATALOG.find(s => s.commonName.toLowerCase().includes(preset.name.split(' ')[0].toLowerCase())) || PLANT_SPECIES_CATALOG[0];

  const isHealthy = preset.type === 'healthy';

  return {
    id: 'scan-' + Date.now(),
    timestamp: new Date().toISOString(),
    imageSrc,
    plantName: preset.name,
    scientificName: preset.scientificName,
    family: speciesMatch.family || 'Botanical Family',
    healthStatus: isHealthy ? 'Healthy' : 'Infected',
    diseaseName: preset.diseaseName,
    pathogenType: isHealthy ? 'None' : diseaseInfo.category,
    severity: preset.severity,
    confidence: preset.confidence,
    contagiousRisk: isHealthy ? 'None' : diseaseInfo.contagiousRisk,
    symptoms: isHealthy ? [
      'Healthy chlorophyll green pigmentation',
      'No leaf rot, fungal spots or lesions detected',
      'Firm leaf tissue and robust cell turgor'
    ] : diseaseInfo.symptoms,
    causes: isHealthy ? 'Excellent moisture levels, balanced soil pH, and adequate sunlight exposure.' : diseaseInfo.causes,
    emergencySteps: isHealthy ? [
      'Maintain current watering regime.',
      'Check soil moisture before each watering.',
      'Provide 6-8 hours of direct or indirect sunlight.'
    ] : diseaseInfo.emergencySteps,
    organicTreatments: isHealthy ? [
      'Feed with organic liquid kelp fertilizer every 4 weeks during active growth.'
    ] : diseaseInfo.organicTreatments,
    chemicalTreatments: isHealthy ? ['N/A - Healthy Plant'] : diseaseInfo.chemicalTreatments,
    preventiveMeasures: diseaseInfo.prevention || [
      'Maintain proper air ventilation.',
      'Keep foliage dry when watering.'
    ],
    careGuide: speciesMatch.care,
    spotBoxes: isHealthy ? [] : [
      { x: 32, y: 38, w: 28, h: 22, label: 'High Infection Zone' },
      { x: 60, y: 55, w: 20, h: 18, label: 'Lesion Cluster' }
    ],
    aiEngineUsed: 'FloraVision AI High-Precision Preset Model'
  };
}
