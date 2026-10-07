import React, { useState } from 'react';
import { History, Search, Trash2, ExternalLink, Calendar, ShieldCheck, AlertTriangle, X } from 'lucide-react';

export default function ScanHistory({ history, onViewItem, onDeleteItem, onClearAll, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(item => 
    item.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modal-backdrop">
      <div className="history-modal-card">
        <div className="modal-header">
          <div className="header-title">
            <History className="icon-inline" /> My Plant Garden & Scan History ({history.length})
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="history-toolbar">
          <div className="history-search">
            <Search className="search-icon" />
            <input 
              type="text" 
              placeholder="Search saved scans..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {history.length > 0 && (
            <button className="clear-btn" onClick={onClearAll}>
              <Trash2 className="icon-inline" /> Clear History
            </button>
          )}
        </div>

        <div className="history-scroll-grid">
          {filteredHistory.length === 0 ? (
            <div className="empty-history-state">
              <History className="empty-icon" />
              <h4>No saved scans yet</h4>
              <p>Scan a plant leaf and click "Save to My Garden" to store your diagnosis here!</p>
            </div>
          ) : (
            filteredHistory.map((item) => {
              const isHealthy = item.healthStatus === 'Healthy';

              return (
                <div key={item.id} className="history-item-card" onClick={() => onViewItem(item)}>
                  <div className="history-img-wrapper">
                    <img src={item.imageSrc} alt={item.plantName} />
                    <span className={`status-pill-sm ${isHealthy ? 'pill-healthy' : 'pill-infected'}`}>
                      {isHealthy ? 'Healthy' : 'Infected'}
                    </span>
                  </div>

                  <div className="history-info">
                    <h4>{item.plantName}</h4>
                    <p className="disease-sub">{item.diseaseName}</p>
                    <div className="date-row">
                      <Calendar className="date-icon" />
                      <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                      <span className="confidence-chip">{item.confidence}% Match</span>
                    </div>
                  </div>

                  <div className="item-actions" onClick={(e) => e.stopPropagation()}>
                    <button 
                      className="delete-item-btn"
                      onClick={() => onDeleteItem(item.id)}
                      title="Delete from garden"
                    >
                      <Trash2 />
                    </button>
                    <button 
                      className="view-item-btn"
                      onClick={() => onViewItem(item)}
                      title="View Full Diagnosis"
                    >
                      <ExternalLink />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
