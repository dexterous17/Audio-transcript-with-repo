import React, { useEffect, useState } from 'react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
import Modal from './Modal';

function AudioPlayer({ cardId, onClearSelection, onCardUpload, title, description }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [updating, setUpdating] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize the visualizer in playback mode
  const playbackControls = useVoiceVisualizer();
  const { setPreloadedAudioBlob, isPlaying, startAudioPlayback, pauseAudioPlayback, clearCanvas } = playbackControls;

  // Load the audio file as a blob and set it for visualization
  useEffect(() => {
    if (!cardId) return;
    setLoading(true);
    setAudioError(false);
    fetch(`/audios/${cardId}/audio`)
      .then(res => {
        if (!res.ok) throw new Error('Audio not found');
        if (!res.headers.get('content-type')?.includes('audio')) throw new Error('Not an audio file');
        return res.blob();
      })
      .then(blob => {
        // Force the blob to have the correct MIME type
        const typedBlob = new Blob([blob], { type: 'audio/webm' });
        setPreloadedAudioBlob(typedBlob);
        setLoading(false);
      })
      .catch((err) => {
        setAudioError(true);
        setLoading(false);
        console.error('Error processing the audio blob:', err);
      });
    // eslint-disable-next-line
  }, [cardId]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this recording?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/audios/${cardId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      if (onClearSelection) onClearSelection();
      if (onCardUpload) onCardUpload();
    } catch {
      alert('Failed to delete audio.');
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    setEditTitle(title || '');
    setEditDescription(description || '');
    setEditing(true);
  };

  const handleEditModalClose = () => {
    setEditing(false);
    setEditTitle('');
    setEditDescription('');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await fetch(`/audios/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, description: editDescription })
      });
      if (!res.ok) throw new Error('Failed to update');
      if (onCardUpload) onCardUpload();
      handleEditModalClose();
    } catch {
      alert('Failed to update audio info.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 12 }}>
      {audioError ? (
        <div style={{ color: 'red' }}>Audio file could not be loaded. Please check the upload and backend.</div>
      ) : loading ? (
        <div style={{ color: '#333' }}>Loading...</div>
      ) : (
        <>
          <VoiceVisualizer
            controls={playbackControls}
            height={80}
            width="100%"
            barWidth={3}
            gap={2}
            rounded={3}
            mainBarColor="#000000"
            secondaryBarColor="#5e5e5e"
            backgroundColor="transparent"
            isDefaultUIShown={false}
          />
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
            <button
              onClick={isPlaying ? pauseAudioPlayback : startAudioPlayback}
              style={{ padding: '1rem', borderRadius: '50%', background: '#ff3b3b', border: 'none', color: '#fff', fontSize: '1.5rem', boxShadow: '2px 2px 8px #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              )}
            </button>
            <button
              onClick={clearCanvas}
              style={{ padding: '1rem 2rem', borderRadius: '2rem', border: '2px solid #333', background: '#fff', color: '#333', fontSize: '1.2rem', marginLeft: 0 }}
            >
              Clear
            </button>
            <button onClick={handleEdit} disabled={editing || deleting} style={{ background: '#007bff', color: 'white', border: '2px solid #007bff', borderRadius: '2rem', padding: '1rem 2rem', fontSize: '1.2rem', marginLeft: 0, cursor: 'pointer' }}>Edit</button>
            <button onClick={handleDelete} disabled={deleting || editing} style={{ background: '#ff3b3b', color: 'white', border: '2px solid #ff3b3b', borderRadius: '2rem', padding: '1rem 2rem', fontSize: '1.2rem', marginLeft: 0, cursor: 'pointer' }}>
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </>
      )}
      <Modal open={editing} onClose={handleEditModalClose}>
        <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 300 }}>
          <h3>Edit Recording Info</h3>
          <input type="text" placeholder="Title" value={editTitle} onChange={e => setEditTitle(e.target.value)} required />
          <textarea placeholder="Description" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
          <button type="submit" disabled={updating || !editTitle}>{updating ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>
    </div>
  );
}

export default AudioPlayer; 