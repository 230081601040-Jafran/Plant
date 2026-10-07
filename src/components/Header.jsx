import React from 'react';
import { Leaf, Sparkles, Key, History, BookOpen, ShieldCheck, Zap } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onOpenApiKeyModal, 
  hasApiKey, 
  historyCount, 
  onOpenHistory 
}) {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* Logo & Brand */}
        <div className="brand-logo" onClick={() => setActiveTab('analyzer')} style={{ cursor: 'pointer' }}>
          <div className="logo-icon-wrapper">
            <Leaf className="logo-icon" />
            <Sparkles className="logo-sparkle" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              FloraVision <span className="brand-badge">AI 2.0</span>
            </div>
            <div className="brand-subtitle">Botanical Vision & Crop Health AI</div>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="nav-menu">
          <button 
            className={`nav-link ${activeTab === 'analyzer' ? 'active' : ''}`}
            onClick={() => setActiveTab('analyzer')}
          >
            <Zap className="nav-icon" />
            AI Scanner
          </button>
          <button 
            className={`nav-link ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            <BookOpen className="nav-icon" />
            Plant Catalog
          </button>
          <button 
            className={`nav-link ${activeTab === 'history' ? 'active' : ''}`}
            onClick={onOpenHistory}
          >
            <History className="nav-icon" />
            My Garden ({historyCount})
          </button>
        </nav>

        {/* Right Controls & API status */}
        <div className="header-actions">
          <button 
            className={`api-status-btn ${hasApiKey ? 'api-connected' : ''}`}
            onClick={onOpenApiKeyModal}
            title={hasApiKey ? 'Gemini 1.5 Vision API active' : 'Click to configure Gemini API Key'}
          >
            <Key className="api-icon" />
            <span>{hasApiKey ? 'Gemini AI Active' : 'Configure API Key'}</span>
            <span className={`status-dot ${hasApiKey ? 'dot-active' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
}
