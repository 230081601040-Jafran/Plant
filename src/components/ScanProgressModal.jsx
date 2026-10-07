import React, { useEffect, useState } from 'react';
import { Cpu, Eye, Leaf, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ScanProgressModal({ imageSrc }) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { title: 'Segmenting Botanical Foliage', desc: 'Isolating plant structure from background artifacts...' },
    { title: 'Analyzing Chlorophyll & Spectral Color', desc: 'Evaluating necrosis, chlorosis, and pigment variance...' },
    { title: 'Detecting Fungal & Lesion Clusters', desc: 'Scanning for fungal mycelium, spots, and pest damage...' },
    { title: 'Matching Pathogen Taxonomy DB', desc: 'Cross-referencing against 50,000+ plant disease signatures...' },
    { title: 'Synthesizing Diagnostic & Care Report', desc: 'Building step-by-step treatment and preventive roadmap...' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="modal-backdrop">
      <div className="scan-modal-card">
        <div className="scan-image-frame">
          {imageSrc && <img src={imageSrc} alt="Scanning target" className="scan-target-img" />}
          <div className="scanner-laser-line"></div>
          <div className="scanner-grid-overlay"></div>

          <div className="scan-hud-badge">
            <Cpu className="hud-icon spinning" /> AI Neural Vision Scanning
          </div>
        </div>

        <div className="scan-details-panel">
          <h3 className="scan-status-title">
            Analyzing Botanical Image...
          </h3>

          <div className="steps-progress-list">
            {steps.map((step, idx) => {
              const isDone = idx < stepIndex;
              const isCurrent = idx === stepIndex;

              return (
                <div key={idx} className={`step-item ${isDone ? 'done' : isCurrent ? 'current' : ''}`}>
                  <div className="step-indicator">
                    {isDone ? (
                      <CheckCircle2 className="step-icon done-icon" />
                    ) : isCurrent ? (
                      <div className="spinner-ring"></div>
                    ) : (
                      <span className="step-number">{idx + 1}</span>
                    )}
                  </div>
                  <div className="step-text">
                    <div className="step-title">{step.title}</div>
                    <div className="step-desc">{step.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="scan-progress-bar-container">
            <div 
              className="scan-progress-bar-fill" 
              style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
