import React, { useState, useRef, useEffect, useCallback } from "react";
import "./MediaPlayer.css";

const MediaPlayer = () => {
  const [mediaSrc, setMediaSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const mediaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Format time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Set up media event listeners
  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const updateTime = () => setCurrentTime(media.currentTime);
    const setMediaDuration = () => setDuration(media.duration);

    media.addEventListener("timeupdate", updateTime);
    media.addEventListener("loadedmetadata", setMediaDuration);

    return () => {
      media.removeEventListener("timeupdate", updateTime);
      media.removeEventListener("loadedmetadata", setMediaDuration);
    };
  }, [mediaSrc]);

  // Autoplay media after upload
  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !mediaSrc) return;

    const playMedia = async () => {
      try {
        media.load();
        await media.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Autoplay failed:", error);
        setIsPlaying(false);
      }
    };

    playMedia();
  }, [mediaSrc]);

  // Handle file upload
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) {
      console.warn("No file selected for upload.");
      return;
    }

    try {
      const fileURL = URL.createObjectURL(file);
      setMediaSrc(fileURL);
      setMediaType(file.type.startsWith("video") ? "video" : "audio");
      setCurrentTime(0);
      setDuration(0);
    } catch (error) {
      console.error("Error processing file upload:", error);
    }
  }, []);

  // Trigger file input on double-click
  const handleDoubleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => {
    const media = mediaRef.current;
    if (!media) return;

    try {
      if (isPlaying) {
        media.pause();
      } else {
        media.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error toggling play/pause:", error);
    }
  }, [isPlaying]);

  // Stop playback
  const stopPlayback = useCallback(() => {
    const media = mediaRef.current;
    if (!media) return;

    try {
      media.pause();
      media.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    } catch (error) {
      console.error("Error stopping playback:", error);
    }
  }, []);

  // Handle time change via slider
  const handleTimeChange = useCallback((event) => {
    const newTime = parseFloat(event.target.value);
    const media = mediaRef.current;
    if (!media) return;

    try {
      setCurrentTime(newTime);
      media.currentTime = newTime;
    } catch (error) {
      console.error("Error updating time:", error);
    }
  }, []);

  return (
    <div className="media-player">
      <div 
        className="media-player-media" 
        onDoubleClick={handleDoubleClick} 
        role="button" 
        tabIndex={0} 
        onKeyPress={(e) => e.key === "Enter" && handleDoubleClick()}
        aria-label="Double-click to upload media"
      >
        {mediaSrc ? (
          mediaType === "video" ? (
            <video
              ref={mediaRef}
              src={mediaSrc}
              className="media-player-video"
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <audio
              ref={mediaRef}
              src={mediaSrc}
              onEnded={() => setIsPlaying(false)}
            />
          )
        ) : (
          <div className="media-player-placeholder">
            <p>Double-click to upload an audio or video file.</p>
          </div>
        )}
      </div>
      <div className="media-player-controls">
        <input
          type="file"
          accept="audio/*,video/*"
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
          id="media-upload"
          aria-label="Upload media file"
        />
        <div className="media-player-controls-container">
          <button
            className="window-button program-button"
            onClick={togglePlayPause}
            disabled={!mediaSrc}
            aria-label={isPlaying ? "Pause media" : "Play media"}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            className="window-button program-button"
            onClick={stopPlayback}
            disabled={!mediaSrc}
            aria-label="Stop media"
          >
            Stop
          </button>
          <div className="media-player-time-container">
            <span className="media-player-time" aria-label="Current time">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 1}
              step="0.1"
              value={currentTime}
              onChange={handleTimeChange}
              className="retro-slider"
              disabled={!mediaSrc}
              aria-label="Seek media timeline"
              aria-valuenow={currentTime}
              aria-valuemin="0"
              aria-valuemax={duration || 1}
            />
            <span className="media-player-time" aria-label="Total duration">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;