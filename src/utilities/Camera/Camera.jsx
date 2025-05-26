// src/utilities/Camera/Camera.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Camera.css';

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [photoCount, setPhotoCount] = useState(0);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const streamRef = useRef(null);

  // Get available camera devices
  const getDevices = useCallback(async () => {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = deviceList.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      if (videoDevices.length > 0 && !selectedDevice) {
        setSelectedDevice(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error('Error getting devices:', err);
    }
  }, [selectedDevice]);

  // Start camera stream
  const startCamera = useCallback(async () => {
    try {
      setError(null);
      
      const constraints = {
        video: {
          deviceId: selectedDevice ? { exact: selectedDevice } : undefined,
          width: { ideal: 320 },
          height: { ideal: 240 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
      setIsStreaming(false);
    }
  }, [selectedDevice]);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  }, []);

  // Take photo
  const takePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth || 320;
    canvas.height = video.videoHeight || 240;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to data URL
    const photoDataUrl = canvas.toDataURL('image/png');
    setCapturedPhoto(photoDataUrl);
    setPhotoCount(prev => prev + 1);
  }, []);

  // Download photo
  const downloadPhoto = useCallback(() => {
    if (!capturedPhoto) return;

    const link = document.createElement('a');
    link.download = `photo_${photoCount}.png`;
    link.href = capturedPhoto;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [capturedPhoto, photoCount]);

  // Handle device change
  const handleDeviceChange = (e) => {
    setSelectedDevice(e.target.value);
  };

  // Initialize devices on mount
  useEffect(() => {
    getDevices();
  }, [getDevices]);

  // Restart camera when device changes
  useEffect(() => {
    if (isStreaming && selectedDevice) {
      stopCamera();
      setTimeout(() => startCamera(), 100);
    }
  }, [selectedDevice, startCamera, stopCamera, isStreaming]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <div className="camera-container">
      <div className="camera-controls">
        {devices.length > 1 && (
          <div className="camera-device-selector">
            <label htmlFor="camera-select">Camera:</label>
            <select 
              id="camera-select"
              value={selectedDevice} 
              onChange={handleDeviceChange}
              className="retro-select"
            >
              {devices.map((device, index) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${index + 1}`}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="camera-buttons">
          {!isStreaming ? (
            <button onClick={startCamera} className="window-button">
              Open
            </button>
          ) : (
            <button onClick={stopCamera} className="window-button">
              Close
            </button>
          )}
          
          <button 
            onClick={takePhoto} 
            disabled={!isStreaming}
            className="window-button"
          >
            Snap
          </button>
        </div>
      </div>

      <div className="camera-viewport">
        {error && (
          <div className="camera-error">
            <p>❌ {error}</p>
          </div>
        )}

        <div className="camera-video-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="camera-video"
            style={{ display: isStreaming ? 'block' : 'none' }}
          />
          
          {!isStreaming && !error && (
            <div className="camera-placeholder">
              <p>📷</p>
              <p>Click "Start Camera" to begin</p>
            </div>
          )}
        </div>

        {capturedPhoto && (
          <div className="camera-preview">
            <h4>Last Photo:</h4>
            <img 
              src={capturedPhoto} 
              alt="Captured" 
              className="camera-captured-image"
            />
            <button 
              onClick={downloadPhoto} 
              className="retro-button camera-btn"
            >
              💾 Save Photo
            </button>
          </div>
        )}
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default Camera;