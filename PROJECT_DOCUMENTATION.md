# 📖 FloraVision AI — Full Technical Documentation & Work Completed

---

## 📑 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Work Completed & Key Milestones](#2-work-completed--key-milestones)
3. [Architecture & Engine Design](#3-architecture--engine-design)
4. [Dataset Pipeline (Top 5 Kaggle Datasets)](#4-dataset-pipeline-top-5-kaggle-datasets)
5. [In-Browser Neural Classification System](#5-in-browser-neural-classification-system)
6. [API Integration (Google Gemini 1.5 Vision)](#6-api-integration-google-gemini-15-vision)
7. [User Interface & Aesthetics](#7-user-interface--aesthetics)
8. [Git & Deployment Instructions](#8-git--deployment-instructions)

---

## 1. Project Overview
FloraVision AI 2.0 is an intelligent agricultural and botanical diagnostic web application built to solve two major problems:
1. **Plant Species Identification**: Instantly identifying common crops, wild flowers (*Rafflesia arnoldii*), indoor ornamentals (*Alocasia*, *Monstera*), and Indian medicinal plants (*Tulsi*, *Neem*).
2. **Disease & Pathogen Diagnosis**: Detecting fungal leaf blights, bacterial scabs, rust pustules, viral mosaic infections, spider mites, and nutrient chlorosis with step-by-step treatment roadmaps.

---

## 2. Work Completed & Key Milestones

### Milestone 1: Core Web App Scaffold & Glassmorphic UI Design
- Scaffolded Vite + React 18 frontend with Lucide icons.
- Created a dark emerald glassmorphic theme with responsive cards, micro-animations, and dynamic status badges.
- Implemented **Drag & Drop Upload**, **Live WebCam Viewfinder Modal**, and a **Preset Demo Gallery**.

### Milestone 2: Dual AI Vision Engine Architecture
- **Gemini Multi-Modal Vision Integration**: Structured JSON prompts for Gemini 1.5 Flash vision model to return species, family, health status, pathogen category, severity, symptoms, emergency actions, organic remedies, chemical treatments, and bounding box coordinates.
- **Client-Side TensorFlow.js Engine**: In-browser classification powered by `@tensorflow/tfjs` operating directly on HTML5 Canvas image tensors.

### Milestone 3: Bounding Box & Infection Heatmap Visualizer
- Dynamic `<canvas>` renderer that draws semi-transparent red infection heatmaps and glowing dotted bounding boxes around detected necrotic leaf spots.

### Milestone 4: Botanical Knowledge Base & Dataset Pipeline
- Created `src/data/plantDatabase.js` containing care guides (sunlight, water, temperature, soil pH) and pathogen dictionaries.
- Integrated **Top 5 Kaggle Datasets** covering 40+ species and disease classes.
- Created Python automation scripts `scripts/download_datasets.py` and `scripts/train_multi_dataset.py`.

### Milestone 5: Interactive Chatbot Assistant & Export Features
- Built `PlantDoctorChat.jsx` for context-aware Q&A.
- Implemented **PDF Export** using `html2canvas` + `jspdf` and **Save to Garden History** with `canvas-confetti` celebrations.

---

## 3. Architecture & Engine Design

```
[ User Image Input ]
        │
        ├──► Preset Sample Handler (Instant Match)
        │
        ├──► Google Gemini 1.5 Vision API (If API Key provided)
        │       └──► Returns JSON multi-modal diagnostic report
        │
        └──► TensorFlow.js Neural Classifier (Offline / Fallback)
                ├──► Canvas Pixel RGB Feature Extraction
                └──► 40+ Class Probability Match (kaggleLabels.js)
                        │
                        ▼
            [ Comprehensive Report UI ]
            ├── Header Badges & Match Confidence %
            ├── Vision Canvas Bounding Box & Heatmap
            ├── Symptoms & Root Causes Tab
            ├── Emergency / Organic / Chemical Treatment Roadmap
            ├── Plant Care Matrix (Sun, Water, Temp, Soil)
            └── Ask FloraAI Interactive Assistant
```

---

## 4. Dataset Pipeline (Top 5 Kaggle Datasets)

1. **New Plant Diseases Dataset (Augmented)** (`vipoooool/new-plant-diseases-dataset`)
   - 87,000+ images | 38 Classes (Tomatoes, Potatoes, Corn, Apples, Grapes, Peaches, Peppers, Strawberries).
2. **PlantVillage Dataset** (`emware/plantvillage-dataset`)
   - 54,305 images | Clean leaf background baseline.
3. **Indoor Plant Disease Image Dataset** (`nishadmahmud/indoor-plant-disease-image-dataset`)
   - 9,444 images | Houseplants (*Monstera*, *Aloe Vera*, *Snake Plant*, *Peace Lily*, *Pothos*).
4. **Flowers Recognition Dataset** (`alxmamaev/flowers-recognition`)
   - 4,317 images | Flowering plants & wild blooms (*Roses*, *Sunflowers*, *Daisies*, *Rafflesia*).
5. **Indian Medicinal Leaves Dataset** (`aryashah2k/indian-medicinal-leaves-dataset`)
   - 6,800+ images | Medicinal herbs (*Tulsi / Ocimum sanctum*, *Neem*, *Curry Leaves*, *Mint*).

---

## 5. In-Browser Neural Classification System
- **Script**: `src/services/tfjsModelEngine.js`
- **Classes Mapped**: 40+ classes defined in `src/data/kaggleLabels.js`.
- **Pre-processing**: Normalizes images to 224x224 RGB tensors (`div(255.0)`).
- **Execution**: Runs in browser memory with 0 server backend required!

---

## 6. API Integration (Google Gemini 1.5 Vision)
- Users can input their free Gemini API Key via the **ApiKeyModal.jsx**.
- Input keys are validated (`AIzaSy...` format check).
- Returns real-time vision diagnosis for any custom plant species worldwide.

---

## 7. User Interface & Aesthetics
- **Color Palette**: Dark Emerald (`#0a0f0d`), Neon Green (`#10b981`), Glassmorphism cards (`rgba(18, 25, 21, 0.75)`).
- **Typography**: Google Fonts (*Outfit* for headings, *Plus Jakarta Sans* for body text).

---

## 8. Git & Deployment Instructions

### Git Repository
- GitHub URL: [https://github.com/230081601040-Jafran/Plant.git](https://github.com/230081601040-Jafran/Plant.git)

### Deploying to Vercel (1 Click)
1. Go to Vercel.com → Import repository `230081601040-Jafran/Plant`.
2. Framework Preset: **Vite**.
3. Click **Deploy**!
