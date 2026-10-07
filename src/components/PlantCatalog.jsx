import React, { useState } from 'react';
import { Search, BookOpen, Sun, Droplets, Thermometer, ShieldAlert, Sparkles } from 'lucide-react';
import { PLANT_SPECIES_CATALOG, KNOWN_DISEASES } from '../data/plantDatabase';

export default function PlantCatalog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDiseaseKey, setSelectedDiseaseKey] = useState(null);

  const filteredPlants = PLANT_SPECIES_CATALOG.filter(plant => 
    plant.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plant.family.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="catalog-container">
      <div className="catalog-header-banner">
        <h2><BookOpen className="icon-inline" /> Botanical Species & Pathogen Knowledge Base</h2>
        <p>Explore comprehensive care guides and diagnostic benchmarks for popular crops, house plants, and garden flora.</p>

        <div className="catalog-search-bar">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search plant name (e.g., Tomato, Rose, Monstera, Citrus)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Plant Cards Grid */}
      <div className="catalog-grid">
        {filteredPlants.map(plant => (
          <div key={plant.id} className="catalog-card">
            <div className="card-top">
              <h3>{plant.commonName}</h3>
              <span className="scientific-tag">{plant.scientificName}</span>
            </div>

            <div className="card-meta">
              <span>Family: <strong>{plant.family}</strong></span>
              <span>Origin: <strong>{plant.origin}</strong></span>
            </div>

            <div className="typical-diseases-box">
              <span className="box-label"><ShieldAlert className="icon-inline text-warning" /> Susceptible Diseases:</span>
              <div className="disease-chips">
                {plant.typicalDiseases.map((d, i) => (
                  <span key={i} className="disease-chip">{d}</span>
                ))}
              </div>
            </div>

            <div className="care-specs">
              <div className="spec-item">
                <Sun className="spec-icon text-yellow" />
                <span>{plant.care.sunlight}</span>
              </div>
              <div className="spec-item">
                <Droplets className="spec-icon text-blue" />
                <span>{plant.care.water}</span>
              </div>
              <div className="spec-item">
                <Thermometer className="spec-icon text-red" />
                <span>{plant.care.temp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disease Dictionary Explorer */}
      <div className="disease-dictionary-section">
        <h3 className="section-title"><Sparkles className="icon-inline" /> Quick Pathogen Dictionary</h3>
        <div className="disease-tabs-row">
          {Object.entries(KNOWN_DISEASES).map(([key, disease]) => (
            <button 
              key={key} 
              className={`disease-tab-btn ${selectedDiseaseKey === key ? 'active' : ''}`}
              onClick={() => setSelectedDiseaseKey(selectedDiseaseKey === key ? null : key)}
            >
              {disease.name.split('(')[0]}
            </button>
          ))}
        </div>

        {selectedDiseaseKey && KNOWN_DISEASES[selectedDiseaseKey] && (
          <div className="disease-detail-box">
            <h4>{KNOWN_DISEASES[selectedDiseaseKey].name}</h4>
            <p><strong>Category:</strong> {KNOWN_DISEASES[selectedDiseaseKey].category} | <strong>Contagious Risk:</strong> {KNOWN_DISEASES[selectedDiseaseKey].contagiousRisk}</p>
            <div className="symptoms-list">
              <strong>Symptoms:</strong>
              <ul>
                {KNOWN_DISEASES[selectedDiseaseKey].symptoms.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <p><strong>Causes:</strong> {KNOWN_DISEASES[selectedDiseaseKey].causes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
