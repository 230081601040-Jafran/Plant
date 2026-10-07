import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, AlertTriangle, Activity, Eye, FileText, Download, BookmarkPlus, 
  RefreshCw, CheckCircle, Droplets, Sun, Thermometer, Wind, Zap, Layers, MessageSquare, AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PlantDoctorChat from './PlantDoctorChat';

export default function DiagnosisResult({ result, onReset, onSaveToHistory, isSaved }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [completedTasks, setCompletedTasks] = useState({});
  const [isExporting, setIsExporting] = useState(false);

  const reportRef = useRef(null);
  const canvasOverlayRef = useRef(null);

  const isHealthy = result.healthStatus === 'Healthy';

  // Draw Bounding Boxes on Canvas Overlay
  useEffect(() => {
    if (!canvasOverlayRef.current || !result.imageSrc) return;

    const canvas = canvasOverlayRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = result.imageSrc;

    img.onload = () => {
      canvas.width = img.naturalWidth || 600;
      canvas.height = img.naturalHeight || 600;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (showBoundingBoxes && result.spotBoxes && result.spotBoxes.length > 0) {
        result.spotBoxes.forEach((box, i) => {
          const bx = (box.x / 100) * canvas.width;
          const by = (box.y / 100) * canvas.height;
          const bw = (box.w / 100) * canvas.width;
          const bh = (box.h / 100) * canvas.height;

          // Heatmap semi-transparent fill
          ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
          ctx.fillRect(bx, by, bw, bh);

          // Animated/Glowing Border
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = Math.max(3, canvas.width / 150);
          ctx.setLineDash([8, 4]);
          ctx.strokeRect(bx, by, bw, bh);

          // Tag Label
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(bx, by - 24, Math.max(120, bw), 24);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 13px sans-serif';
          ctx.fillText(`Area #${i + 1}: ${box.label || 'Infection Zone'}`, bx + 6, by - 8);
        });
      }
    };
  }, [result, showBoundingBoxes]);

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleSaveGarden = () => {
    onSaveToHistory(result);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleExportPdf = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    try {
      const element = reportRef.current;
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`FloraVision_${result.plantName.replace(/\s+/g, '_')}_Diagnosis.pdf`);
    } catch (err) {
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="diagnosis-container" ref={reportRef}>
      {result.apiWarning && (
        <div className="api-warning-banner">
          <AlertCircle className="icon-inline" />
          <span>{result.apiWarning}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="diagnosis-header-card">
        <div className="header-status-badge">
          <div className={`status-pill ${isHealthy ? 'pill-healthy' : 'pill-infected'}`}>
            {isHealthy ? (
              <><ShieldCheck className="pill-icon" /> HEALTHY FOLIAGE</>
            ) : (
              <><AlertTriangle className="pill-icon" /> INFECTED - {result.severity.toUpperCase()} SEVERITY</>
            )}
          </div>
          <span className="ai-engine-tag">{result.aiEngineUsed}</span>
        </div>

        <div className="plant-title-row">
          <div>
            <h1 className="result-plant-name">{result.plantName}</h1>
            <p className="result-scientific-name">
              <i>{result.scientificName}</i> • Family: <span>{result.family}</span>
            </p>
          </div>

          <div className="confidence-badge-box">
            <div className="confidence-number">{result.confidence}%</div>
            <div className="confidence-label">AI Match Confidence</div>
          </div>
        </div>

        {!isHealthy && (
          <div className="disease-summary-box">
            <div className="disease-label">Diagnosed Pathogen / Disease:</div>
            <div className="disease-value">{result.diseaseName}</div>
            <div className="disease-meta-tags">
              <span className="meta-tag">Category: {result.pathogenType}</span>
              <span className="meta-tag">Contagious Risk: {result.contagiousRisk}</span>
              <span className="meta-tag">Severity: {result.severity}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Image Visualizer & Overlay Controls */}
      <div className="visualizer-card">
        <div className="visualizer-header">
          <h3><Eye className="icon-inline" /> Vision Bounding Box & Infection Map</h3>
          {result.spotBoxes && result.spotBoxes.length > 0 && (
            <button 
              className={`toggle-box-btn ${showBoundingBoxes ? 'active' : ''}`}
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
            >
              <Layers className="icon-inline" />
              {showBoundingBoxes ? 'Hide AI Bounding Boxes' : 'Show AI Bounding Boxes'}
            </button>
          )}
        </div>

        <div className="canvas-wrapper">
          <canvas ref={canvasOverlayRef} className="heatmap-canvas" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="diagnosis-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FileText className="tab-icon" /> Symptoms & Diagnosis
        </button>
        <button 
          className={`tab-btn ${activeTab === 'treatment' ? 'active' : ''}`}
          onClick={() => setActiveTab('treatment')}
        >
          <Zap className="tab-icon" /> Treatment Roadmap
        </button>
        <button 
          className={`tab-btn ${activeTab === 'care' ? 'active' : ''}`}
          onClick={() => setActiveTab('care')}
        >
          <Droplets className="tab-icon" /> Plant Care Guide
        </button>
        <button 
          className={`tab-btn ${activeTab === 'assistant' ? 'active' : ''}`}
          onClick={() => setActiveTab('assistant')}
        >
          <MessageSquare className="tab-icon" /> Ask FloraAI Assistant
        </button>
      </div>

      {/* Tab 1: Overview & Symptoms */}
      {activeTab === 'overview' && (
        <div className="tab-content-panel">
          <div className="grid-2-col">
            <div className="info-card">
              <h3><AlertTriangle className="card-icon text-warning" /> Visual Symptoms Identified</h3>
              <ul className="custom-check-list">
                {result.symptoms.map((sym, idx) => (
                  <li key={idx}>
                    <span className="list-dot"></span> {sym}
                  </li>
                ))}
              </ul>
            </div>

            <div className="info-card">
              <h3><Activity className="card-icon text-accent" /> Root Causes & Environmental Factors</h3>
              <p className="card-prose">{result.causes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Treatment & Remediation */}
      {activeTab === 'treatment' && (
        <div className="tab-content-panel">
          <div className="treatment-sections-grid">
            {/* Emergency Action */}
            <div className="treatment-card emergency-card">
              <h3>⚡ Immediate Emergency Action</h3>
              <div className="checklist-group">
                {result.emergencySteps.map((step, idx) => (
                  <label key={idx} className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={!!completedTasks[`emerg-${idx}`]} 
                      onChange={() => toggleTask(`emerg-${idx}`)}
                    />
                    <span className="checkbox-text">{step}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Organic Remedies */}
            <div className="treatment-card organic-card">
              <h3>🌿 Organic & Natural Solutions</h3>
              <div className="checklist-group">
                {result.organicTreatments.map((step, idx) => (
                  <label key={idx} className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={!!completedTasks[`org-${idx}`]} 
                      onChange={() => toggleTask(`org-${idx}`)}
                    />
                    <span className="checkbox-text">{step}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Chemical Solutions */}
            <div className="treatment-card chemical-card">
              <h3>🧪 Chemical / Fungicidal Interventions</h3>
              <div className="checklist-group">
                {result.chemicalTreatments.map((step, idx) => (
                  <label key={idx} className="checkbox-item">
                    <input 
                      type="checkbox" 
                      checked={!!completedTasks[`chem-${idx}`]} 
                      onChange={() => toggleTask(`chem-${idx}`)}
                    />
                    <span className="checkbox-text">{step}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Care Guide */}
      {activeTab === 'care' && (
        <div className="tab-content-panel">
          <div className="care-matrix-grid">
            <div className="care-card">
              <Sun className="care-icon text-yellow" />
              <h4>Sunlight Requirement</h4>
              <p>{result.careGuide.sunlight}</p>
            </div>

            <div className="care-card">
              <Droplets className="care-icon text-blue" />
              <h4>Watering Frequency</h4>
              <p>{result.careGuide.water}</p>
            </div>

            <div className="care-card">
              <Thermometer className="care-icon text-red" />
              <h4>Temperature Range</h4>
              <p>{result.careGuide.temp}</p>
            </div>

            <div className="care-card">
              <Wind className="care-icon text-purple" />
              <h4>Humidity & Soil pH</h4>
              <p>Soil pH: <strong>{result.careGuide.soilPh}</strong> | Humidity: <strong>{result.careGuide.humidity}</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: AI Chatbot Assistant */}
      {activeTab === 'assistant' && (
        <div className="tab-content-panel">
          <PlantDoctorChat plantResult={result} />
        </div>
      )}

      {/* Action Buttons Bar */}
      <div className="result-actions-bar">
        <button className="btn-secondary-glass" onClick={onReset}>
          <RefreshCw className="btn-icon" /> Scan Another Plant
        </button>

        <button 
          className={`btn-secondary-glass ${isSaved ? 'btn-saved' : ''}`}
          onClick={handleSaveGarden}
          disabled={isSaved}
        >
          <BookmarkPlus className="btn-icon" /> {isSaved ? 'Saved to Garden ✓' : 'Save to My Garden'}
        </button>

        <button className="btn-primary-glow" onClick={handleExportPdf} disabled={isExporting}>
          <Download className="btn-icon" /> {isExporting ? 'Generating PDF...' : 'Export PDF Report'}
        </button>
      </div>
    </div>
  );
}
