import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ScanProgressModal from './components/ScanProgressModal';
import DiagnosisResult from './components/DiagnosisResult';
import PlantCatalog from './components/PlantCatalog';
import ScanHistory from './components/ScanHistory';
import ApiKeyModal from './components/ApiKeyModal';
import { analyzePlantImage } from './services/aiVisionEngine';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer'); // 'analyzer' | 'catalog'
  const [imageSrc, setImageSrc] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [history, setHistory] = useState([]);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Load saved API key & scan history from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem('floravision_gemini_key') || '';
    setApiKey(savedKey);

    const savedHistory = localStorage.getItem('floravision_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse scan history:', e);
      }
    }
  }, []);

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('floravision_gemini_key', key);
  };

  const handleImageSelected = async (selectedImageSrc, sampleId = null) => {
    setImageSrc(selectedImageSrc);
    setIsAnalyzing(true);
    setScanResult(null);

    try {
      // Simulate/Process AI vision analysis
      const result = await analyzePlantImage(selectedImageSrc, apiKey, sampleId);
      
      // Delay slightly for smooth scan animation UX
      setTimeout(() => {
        setScanResult(result);
        setIsAnalyzing(false);
      }, 3000);
    } catch (err) {
      console.error('Analysis error:', err);
      alert('An error occurred during plant image analysis. Please try another image.');
      setIsAnalyzing(false);
    }
  };

  const handleSampleSelected = (sample) => {
    handleImageSelected(sample.imageUrl, sample.id);
  };

  const handleSaveToHistory = (resultToSave) => {
    const exists = history.some(item => item.id === resultToSave.id);
    if (!exists) {
      const updated = [resultToSave, ...history];
      setHistory(updated);
      localStorage.setItem('floravision_history', JSON.stringify(updated));
    }
  };

  const handleDeleteHistoryItem = (id) => {
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem('floravision_history', JSON.stringify(updated));
  };

  const handleClearAllHistory = () => {
    if (window.confirm('Are you sure you want to clear your plant garden scan history?')) {
      setHistory([]);
      localStorage.removeItem('floravision_history');
    }
  };

  const handleViewHistoryItem = (item) => {
    setScanResult(item);
    setImageSrc(item.imageSrc);
    setShowHistoryModal(false);
    setActiveTab('analyzer');
  };

  const handleResetScan = () => {
    setImageSrc(null);
    setScanResult(null);
    setIsAnalyzing(false);
  };

  const isSavedInHistory = scanResult && history.some(h => h.id === scanResult.id);

  return (
    <div className="app-root">
      <Header 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApiKeyModal={() => setShowApiKeyModal(true)}
        hasApiKey={!!apiKey && apiKey.trim().length > 10}
        historyCount={history.length}
        onOpenHistory={() => setShowHistoryModal(true)}
      />

      <main className="main-content">
        {activeTab === 'analyzer' && (
          <>
            {!scanResult && !isAnalyzing && (
              <UploadSection 
                onImageSelected={(img) => handleImageSelected(img, null)}
                onSampleSelected={handleSampleSelected}
                isAnalyzing={isAnalyzing}
              />
            )}

            {isAnalyzing && (
              <ScanProgressModal imageSrc={imageSrc} />
            )}

            {scanResult && !isAnalyzing && (
              <DiagnosisResult 
                result={scanResult}
                onReset={handleResetScan}
                onSaveToHistory={handleSaveToHistory}
                isSaved={isSavedInHistory}
              />
            )}
          </>
        )}

        {activeTab === 'catalog' && (
          <PlantCatalog />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>FloraVision AI • Botanical Disease Identification System © {new Date().getFullYear()}</p>
        <p className="footer-sub">Powered by Gemini 1.5 Multi-Modal Vision AI & FloraVision Neural Spectrum Analyzer</p>
      </footer>

      {/* Modals */}
      {showApiKeyModal && (
        <ApiKeyModal 
          apiKey={apiKey}
          onSaveApiKey={handleSaveApiKey}
          onClose={() => setShowApiKeyModal(false)}
        />
      )}

      {showHistoryModal && (
        <ScanHistory 
          history={history}
          onViewItem={handleViewHistoryItem}
          onDeleteItem={handleDeleteHistoryItem}
          onClearAll={handleClearAllHistory}
          onClose={() => setShowHistoryModal(false)}
        />
      )}
    </div>
  );
}
