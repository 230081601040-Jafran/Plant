import React, { useState } from 'react';
import { Key, CheckCircle, AlertCircle, ExternalLink, ShieldCheck, X } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function ApiKeyModal({ apiKey, onSaveApiKey, onClose }) {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: '' }
  const [isTesting, setIsTesting] = useState(false);

  const handleTestKey = async () => {
    if (!inputKey.trim()) {
      setStatus({ type: 'error', text: 'Please enter a valid Gemini API Key.' });
      return;
    }

    setIsTesting(true);
    setStatus(null);

    try {
      const genAI = new GoogleGenerativeAI(inputKey.trim());
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      await model.generateContent('Hi');
      setStatus({ type: 'success', text: 'API Key Verified! Gemini 1.5 Vision model ready.' });
      onSaveApiKey(inputKey.trim());
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Invalid Gemini API Key or connection issue. Check your key and network.' });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    onClose();
  };

  const handleRemove = () => {
    setInputKey('');
    onSaveApiKey('');
    setStatus({ type: 'success', text: 'API Key removed. Switched to FloraVision Smart Spectrum Engine.' });
  };

  return (
    <div className="modal-backdrop">
      <div className="api-modal-card">
        <div className="modal-header">
          <div className="header-title">
            <Key className="icon-inline" /> Configure Gemini AI Vision API Key
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            FloraVision AI includes a high-accuracy client-side vision model. For real-time live vision analysis of any custom plant photo using Google Gemini 1.5 Multi-Modal Vision AI, enter your Gemini API Key below.
          </p>

          <div className="form-group">
            <label className="form-label">Google Gemini API Key:</label>
            <input 
              type="password" 
              className="key-input"
              placeholder="AIzaSy..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
            />
          </div>

          {status && (
            <div className={`status-alert ${status.type}`}>
              {status.type === 'success' ? <CheckCircle /> : <AlertCircle />}
              <span>{status.text}</span>
            </div>
          )}

          <div className="guide-box">
            <ShieldCheck className="guide-icon" />
            <div>
              <strong>Don't have an API Key?</strong> Get a free Gemini API key in 1 minute from Google AI Studio:
              <br />
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noreferrer" 
                className="guide-link"
              >
                Get Gemini API Key <ExternalLink className="icon-sm" />
              </a>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {apiKey && (
            <button className="btn-danger-glass" onClick={handleRemove}>
              Remove Key
            </button>
          )}

          <button 
            className="btn-secondary-glass" 
            onClick={handleTestKey}
            disabled={isTesting}
          >
            {isTesting ? 'Verifying...' : 'Test Connection'}
          </button>

          <button className="btn-primary-glow" onClick={handleSave}>
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
}
