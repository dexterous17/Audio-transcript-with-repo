import React, { useEffect } from 'react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
import '../Css/VoiceRecorder.css'

const VoiceRecorder = () => {
  const recorderControls = useVoiceVisualizer();
  const { recordedBlob, error } = recorderControls;

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
       isControlPanelShown={true}
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
    </div>
  );
};

export default VoiceRecorder;
