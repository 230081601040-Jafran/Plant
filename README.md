# 🌿 FloraVision AI 2.0 — AI-Powered Botanical & Plant Disease Diagnostic Engine

[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.0-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E7CC3?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

**FloraVision AI 2.0** is a state-of-the-art Web & AI application designed to identify **plant species** (including wild flora like *Rafflesia arnoldii*, medicinal herbs like *Tulsi / Ocimum sanctum*, houseplants like *Alocasia 'Polly'*, and agricultural crops) while diagnosing **leaf diseases, pests, and nutrient deficiencies**.

---

## 📸 Key Features & Capabilities

### 1. 🔍 Dual AI Vision Engine
- **In-Browser TensorFlow.js Engine (`src/services/tfjsModelEngine.js`)**: Runs neural classification 100% offline in client memory using model weights trained on Kaggle datasets.
- **Google Gemini 1.5 Multi-Modal Vision API (`src/services/aiVisionEngine.js`)**: Real-time visual analysis capable of identifying over 300,000+ plant species worldwide with detailed diagnostic reports.

### 2. 🎯 Vision Bounding Box & Infection Heatmap Visualizer
- Overlays color-coded bounding boxes and infection density heatmaps directly over uploaded photos using an offscreen HTML5 `<canvas>`.
- Displays exact lesion focus zones (e.g. *Necrotic Spot Cluster*, *Fungal Spore Spread*).

### 3. 📋 Comprehensive Diagnostic Dashboard
- **Plant Identification**: Common name, scientific classification, botanical family, match confidence score.
- **Pathogen Taxonomy**: Fungal, Bacterial, Viral, Insect Pest, Abiotic/Nutrient, or Healthy status.
- **Interactive Treatment Roadmap**: Step-by-step emergency isolation, organic remedies (neem oil recipes), and chemical fungicides with task tracking checkboxes.
- **Plant Care Guide**: Sunlight, watering frequency, temperature, soil pH, and humidity specifications.
- **PDF Export & Garden History**: Download reports as PDF files or save to browser LocalStorage.

### 4. 💬 Interactive "Ask FloraAI" Chatbot Assistant
- Context-aware botanical Q&A assistant to answer custom questions about plant recovery, pruning, and organic sprays.

---

## 📦 Top 5 Kaggle Datasets Integrated

Our project integrates a dataset pipeline combining **5 premier plant & disease image datasets**:

| # | Dataset Name | Images | Target Plant / Disease Coverage |
|---|---|---|---|
| 1 | **New Plant Diseases Dataset (Augmented)** | 87,000+ | Tomato, Potato, Corn, Apple, Grape, Peach, Pepper, Strawberry, Soybean, Squash, Blueberry, Raspberry, Cherry (38 classes). |
| 2 | **PlantVillage Dataset** | 54,305 | Clean leaf baseline images for high accuracy feature extraction. |
| 3 | **Indoor Plant Disease Dataset** | 9,444 | Houseplants (*Monstera*, *Aloe Vera*, *Snake Plant*, *Peace Lily*, *Pothos*, *Jade*) with root rot & leaf spots. |
| 4 | **Flowers Recognition Dataset** | 4,317 | Wild flowers & flowering blooms (*Roses*, *Tulips*, *Sunflowers*, *Daisies*, *Orchids*, *Rafflesia*). |
| 5 | **Indian Medicinal Leaves Dataset** | 6,800+ | Medicinal herbs (*Tulsi / Ocimum sanctum*, *Neem*, *Curry Leaves*, *Mint*, *Betel Leaf*). |

---

## 📁 Repository Directory Structure

```
LLM/
├── public/
│   └── model/                  # Converted TensorFlow.js model weights (model.json)
├── dataset/                     # Top 5 Kaggle Dataset Folders
│   ├── 1_new_plant_diseases/
│   ├── 2_plantvillage/
│   ├── 3_indoor_plants/
│   ├── 4_flowers_recognition/
│   └── 5_medicinal_leaves/
├── scripts/
│   ├── download_datasets.py    # Automated Kaggle 5-dataset downloader
│   └── train_multi_dataset.py  # MobileNetV3 Transfer Learning trainer & TF.js converter
├── src/
│   ├── assets/                 # Icons & background graphics
│   ├── components/
│   │   ├── ApiKeyModal.jsx     # Google Gemini API Key configuration modal
│   │   ├── DiagnosisResult.jsx # Main diagnostic dashboard & heatmap canvas
│   │   ├── Header.jsx          # Top navigation bar & API status badge
│   │   ├── PlantCatalog.jsx    # Botanical species & disease lookup library
│   │   ├── PlantDoctorChat.jsx # Interactive AI chatbot assistant
│   │   ├── ScanHistory.jsx     # Saved garden scan history drawer
│   │   ├── ScanProgressModal.jsx # Animated laser scanner overlay
│   │   └── UploadSection.jsx   # Drag & drop uploader, webcam modal, sample gallery
│   ├── data/
│   │   ├── kaggleLabels.js     # 40+ Kaggle plant & disease class mappings
│   │   └── plantDatabase.js    # Botanical species catalog & pathogen dictionary
│   ├── services/
│   │   ├── aiVisionEngine.js   # Main AI analysis dispatcher & Gemini API caller
│   │   └── tfjsModelEngine.js  # In-browser TensorFlow.js neural classifier
│   ├── App.jsx                 # Main React Application Container
│   ├── App.css                 # Custom Dark Emerald Glassmorphic Styling
│   └── main.jsx                # React Entry Point
├── package.json
└── README.md
```

---

## 🛠️ How to Run Locally

### 1. Prerequisites
- **Node.js**: v18.0 or higher
- **Python**: 3.9+ (for custom model training)

### 2. Install & Start Development Server
```bash
# Clone the repository
git clone https://github.com/230081601040-Jafran/Plant.git
cd Plant

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Open **`http://localhost:5173/`** in your browser!

### 3. Build for Production
```bash
npm run build
```

---

## 🐍 Training Your Own Custom Model on Kaggle Datasets

### Step 1: Download all 5 Datasets
```bash
python scripts/download_datasets.py
```

### Step 2: Train MobileNetV3 & Export to TensorFlow.js
```bash
python scripts/train_multi_dataset.py
```
This script trains a combined MobileNetV3 neural network and saves the converted web model into `public/model/model.json`!

---

## 🌐 GitHub Repository
- **URL**: [https://github.com/230081601040-Jafran/Plant.git](https://github.com/230081601040-Jafran/Plant.git)
