import React from 'react';
import '../Css/Main.css'
import VoiceRecorder from './VoiceRecorder';
import MainCard from './MainCard';

function MyComponent({ selectedCard }) {
    return (
        <main className="main-content">
            <MainCard
                title={selectedCard ? selectedCard.title : "Welcome Card"}
                desc={selectedCard ? selectedCard.description : "This is a card above the voice recorder. You can put any content here, such as instructions, stats, or a welcome message."}
            />
            <MainCard>
                <VoiceRecorder />
            </MainCard>
        </main>
    );
}

export default MyComponent;
