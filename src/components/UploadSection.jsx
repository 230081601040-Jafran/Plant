import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, Sparkles, CheckCircle, HelpCircle, ArrowRight, Zap } from 'lucide-react';
import { PRESET_SAMPLES } from '../data/plantDatabase';

export default function UploadSection({ onImageSelected, onSampleSelected, isAnalyzing }) {
  const [isDragging, setIsDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid plant image (PNG, JPG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageSelected(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // WebCam Capture Handlers
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Unable to access camera. Please allow camera permissions or upload an image.');
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const captureCameraPhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      stopCamera();
      onImageSelected(dataUrl);
    }
  };

  return (
    <div className="upload-hero-section">
      {/* Hero Header */}
      <div className="hero-text-center">
        <div className="hero-pill-badge">
          <Sparkles className="pill-icon" /> AI-Powered Botanical Diagnostics
        </div>
        <h1 className="hero-title">
          Identify Any Plant & Detect <span className="gradient-highlight">Diseases Instantly</span>
        </h1>
        <p className="hero-subtitle">
          Upload or snap a photo of any leaf, crop, or flower. FloraVision AI identifies the plant species, diagnoses infections, and generates organic & chemical treatment plans.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="upload-container-grid">
        <div 
          className={`dropzone-card ${isDragging ? 'drag-active' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileInput} 
            accept="image/*" 
            style={{ display: 'none' }}
          />

          <div className="dropzone-content">
            <div className="icon-pulse-wrapper">
              <UploadCloud className="upload-main-icon" />
            </div>

            <h3 className="dropzone-heading">
              Drag & Drop your plant image here
            </h3>
            <p className="dropzone-subtext">
              Supports JPEG, PNG, WEBP up to 25MB
            </p>

            <div className="upload-btn-group" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="btn-primary-glow"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="btn-icon" /> Browse Image
              </button>

              <button 
                type="button" 
                className="btn-secondary-glass"
                onClick={startCamera}
              >
                <Camera className="btn-icon" /> Open Camera
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Modal Overlay */}
      {showCamera && (
        <div className="modal-backdrop">
          <div className="camera-modal">
            <div className="modal-header">
              <h3><Camera className="icon-inline" /> Live Camera Scanner</h3>
              <button className="close-btn" onClick={stopCamera}>&times;</button>
            </div>
            <div className="camera-viewfinder">
              <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
              <div className="viewfinder-grid"></div>
            </div>
            <div className="camera-controls">
              <button className="btn-secondary-glass" onClick={stopCamera}>Cancel</button>
              <button className="btn-primary-glow capture-btn" onClick={captureCameraPhoto}>
                <Zap className="btn-icon" /> Capture & Analyze
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preset Samples Selector */}
      <div className="presets-section">
        <div className="presets-header">
          <h3>
            <Sparkles className="section-icon" /> Or Try With Demo Plant Samples
          </h3>
          <span className="presets-badge">Click any sample to test</span>
        </div>

        <div className="presets-grid">
          {PRESET_SAMPLES.map((sample) => (
            <div 
              key={sample.id} 
              className="sample-card"
              onClick={() => onSampleSelected(sample)}
            >
              <div className="sample-img-wrapper">
                <img src={sample.imageUrl} alt={sample.name} loading="lazy" />
                <span className={`sample-type-tag ${sample.type}`}>
                  {sample.type === 'healthy' ? 'Healthy' : 'Diseased'}
                </span>
              </div>
              <div className="sample-info">
                <h4>{sample.name}</h4>
                <p>{sample.diseaseName}</p>
                <div className="sample-footer">
                  <span className="sample-confidence">{sample.confidence}% accuracy</span>
                  <ArrowRight className="arrow-icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High Accuracy Tips */}
      <div className="accuracy-tips-banner">
        <div className="tip-item">
          <CheckCircle className="tip-icon text-success" />
          <span>Capture close-up of affected leaves in bright natural light</span>
        </div>
        <div className="tip-item">
          <CheckCircle className="tip-icon text-success" />
          <span>Keep plant foliage clear of shadows and blur</span>
        </div>
        <div className="tip-item">
          <CheckCircle className="tip-icon text-success" />
          <span>Show both upper and underside of damaged leaves if possible</span>
        </div>
      </div>
    </div>
  );
}
