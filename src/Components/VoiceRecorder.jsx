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
            <span role="img" aria-label="mic">🎤</span>
          </button>
        )}
        {isRecordingInProgress && (
          <>
            <button onClick={togglePauseResume} style={{ padding: '1rem', borderRadius: '50%', background: '#ff3b3b', border: 'none', color: '#fff', fontSize: '1.5rem', boxShadow: '2px 2px 8px #ccc' }} title={isPausedRecording ? "Resume" : "Pause"}>
              {isPausedRecording ? <span role="img" aria-label="resume">▶️</span> : <span role="img" aria-label="pause">⏸️</span>}
            </button>
            <button onClick={stopRecording} style={{ padding: '1rem', borderRadius: '50%', background: '#ff3b3b', border: 'none', color: '#fff', fontSize: '1.5rem', boxShadow: '2px 2px 8px #ccc' }} title="Stop Recording">
              <span role="img" aria-label="stop">⏹️</span>
            </button>
            <button onClick={clearCanvas} style={{ padding: '1rem 2rem', borderRadius: '2rem', border: '2px solid #333', background: '#fff', fontSize: '1.2rem' }}>
              Clear
            </button>
          </>
        )}
        {isAvailableRecordedAudio && !isRecordingInProgress && (
          <>
            <button onClick={startAudioPlayback} style={{ padding: '1rem', borderRadius: '50%', background: '#ff3b3b', border: 'none', color: '#fff', fontSize: '1.5rem', boxShadow: '2px 2px 8px #ccc' }} title="Play">
              <span role="img" aria-label="play">▶️</span>
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
