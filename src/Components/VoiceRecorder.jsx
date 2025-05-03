import React, { useEffect, useState } from 'react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
import '../Css/VoiceRecorder.css'

const VoiceRecorder = () => {
  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, error, isRecordingInProgress, isAvailableRecordedAudio, isPausedRecording, startRecording, stopRecording, togglePauseResume, clearCanvas, startAudioPlayback, saveAudioFile } = recorderControls;
  const [savedFileSize, setSavedFileSize] = useState(null);

  useEffect(() => {
    if (recordedBlob) {
      console.log("Recorded audio blob:", recordedBlob);
    }
  }, [recordedBlob]);

  useEffect(() => {
    if (error) {
      console.error("Audio recording error:", error);
    }
  }, [error]);

  const handleSave = () => {
    if (recordedBlob) {
      setSavedFileSize(recordedBlob.size);
      saveAudioFile();
    }
  };

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} bytes`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="voice-recorder-container">
      <VoiceVisualizer 
       controls={recorderControls}
       height={100}
       width="100%"
       speed={3}
       barWidth={3}
       gap={2}
       rounded={3}
       fullscreen={false}
       onlyRecording={false}
       isControlPanelShown={false}
       isDownloadAudioButtonShown={false}
       backgroundColor="transparent"
       mainBarColor="#000000" // black
       secondaryBarColor="#5e5e5e"
       isDefaultUIShown={true}
       defaultAudioWaveIconColor="#FFFFFF"
       defaultMicrophoneIconColor="#FFFFFF"
       animateCurrentPick={true}
       isProgressIndicatorShown={true}
       isProgressIndicatorTimeShown={true}
       isProgressIndicatorOnHoverShown={true}
       isProgressIndicatorTimeOnHoverShown={true} 
      />
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
        {/* Record/Play/Stop/Pause/Save/Clear logic */}
        {!isRecordingInProgress && !isAvailableRecordedAudio && (
          <button onClick={startRecording} style={{ padding: '1rem', borderRadius: '50%', background: '#ff3b3b', border: 'none', color: '#fff', fontSize: '1.5rem', boxShadow: '2px 2px 8px #ccc' }} title="Start Recording">
            <span className="mic-svg-icon" aria-label="mic">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c-1.7 0-3 1.2-3 2.6v6.8c0 1.4 1.3 2.6 3 2.6s3-1.2 3-2.6V4.6C15 3.2 13.7 2 12 2z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1M12 18.4v3.3M8 22h8"/></svg>
            </span>
          </button>
        )}
        {isRecordingInProgress && (
          <>
            <button onClick={togglePauseResume} style={{ padding: '1rem', borderRadius: '50%', background: '#ff3b3b', border: 'none', color: '#fff', fontSize: '1.5rem', boxShadow: '2px 2px 8px #ccc' }} title={isPausedRecording ? "Resume" : "Pause"}>
              {isPausedRecording ? <span role="img" aria-label="resume">▶️</span> : (
                <span className="mic-svg-icon" aria-label="pause">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                </span>
              )}
            </button>
            <button onClick={stopRecording} style={{ padding: '1rem', borderRadius: '50%', background: '#ff3b3b', border: 'none', color: '#fff', fontSize: '1.5rem', boxShadow: '2px 2px 8px #ccc' }} title="Stop Recording">
              <span className="mic-svg-icon" aria-label="stop">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
              </span>
            </button>
            <button onClick={clearCanvas} style={{ padding: '1rem 2rem', borderRadius: '2rem', border: '2px solid #333', background: '#fff', fontSize: '1.2rem' }}>
              Clear
            </button>
          </>
        )}
        {isAvailableRecordedAudio && !isRecordingInProgress && (
          <>
            <button onClick={startAudioPlayback} style={{ padding: '1rem', borderRadius: '50%', background: '#ff3b3b', border: 'none', color: '#fff', fontSize: '1.5rem', boxShadow: '2px 2px 8px #ccc' }} title="Play">
              <span className="mic-svg-icon" aria-label="play">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </span>
            </button>
            <button onClick={clearCanvas} style={{ padding: '1rem 2rem', borderRadius: '2rem', border: '2px solid #333', background: '#fff', fontSize: '1.2rem' }}>
              Clear
            </button>
            <button onClick={handleSave} style={{ padding: '1rem 2rem', borderRadius: '2rem', border: '2px solid #333', background: '#fff', fontSize: '1.2rem' }}>
              Save
            </button>
            {savedFileSize !== null && (
              <span style={{ fontSize: '1.1rem', marginLeft: '1rem' }}>
                File size: {formatFileSize(savedFileSize)}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;

