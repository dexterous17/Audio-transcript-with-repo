import React from 'react';
import '../Css/Main.css'
import VoiceRecorder from './VoiceRecorder';
import MainCard from './MainCard';

function MyComponent() {
    return (
        <main className="main-content">
            <MainCard title="Welcome Card" desc="This is a card above the voice recorder. You can put any content here, such as instructions, stats, or a welcome message."></MainCard>
            <MainCard>
                <VoiceRecorder />
            </MainCard>
        </main>
    );
}

export default MyComponent;
