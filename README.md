# Audio Transcript with Recorder

## 📜 Overview

This project is a full-stack audio recording and playback app with:

- A working **audio recorder** with real-time waveform visualization
- **Sidebar with searchable cards** (title & description only)
- **Audio files stored and streamed from a Node.js/Express backend**
- **Custom playback controls** (Play/Pause, Clear, Edit, Delete) styled for a modern UI
- **REST API** for CRUD operations and audio streaming
- **Dynamic main content** that updates based on sidebar card selection

It's a foundation for building more complex audio and transcript applications.

---

## 🎯 Key Features

- 🎙️ **Audio Recording:** Capture voice input through the browser microphone  
- 📈 **Real-Time Visualization:** See live audio waveforms as you speak  
- 🗂️ **Sidebar with Cards:** Add, search, and view cards in the sidebar  
- 🔍 **Sidebar Search:** Instantly filter cards as you type  
- ➕ **Plus Button:** Modern action button for creating new recordings  
- 📑 **Menu Bar:** Basic top navigation layout  
- 💎 **UI Polish:** Consistent padding, spacing, and responsive design  
- ⚡ **Built with:** React.js and Vite
- 🧩 **Dynamic Main Content:** Main area updates to show card details when a sidebar card is clicked, and resets to default when 'Create New Recording' is clicked

---

## 🆕 2025 Additions & Improvements

- Sidebar cards show only title/description (no audio path)
- Audio is fetched from `/audios/:id/audio` only when a card is clicked
- Custom controller row for playback: Play/Pause, Clear, Edit, Delete (pill-shaped buttons)
- Backend API for audio streaming, upload, update, and delete
- Modular, maintainable React components
- Improved error/loading states for audio fetch and playback

---

## 🛠️ Tech Stack

- React 19 (frontend)
- Vite (frontend tooling)
- Node.js/Express (backend)
- SQLite (database)
- Multer (file uploads)
- Winston (logging)
- [react-voice-visualizer](https://www.npmjs.com/package/react-voice-visualizer) (audio waveform)
- HTML/CSS (custom styling)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher recommended  
- npm or yarn installed

### Installation

Clone the repository:

```bash
git clone https://github.com/dexterous17/Audio-transcript-with-repo.git
cd Audio-transcript-with-repo
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## 📂 Project Structure

```bash
/public           # Static files
/src
  /Components     # React components (Sidebar, AudioPlayer, VoiceRecorder, Modal, MainCard, etc.)
  /Css            # Custom CSS files
  App.jsx         # Main app
  main.jsx        # Entry point
/server           # Backend (Express, SQLite, uploads, logs)
  index.js        # Main server file
  audio.db        # SQLite database
  uploads/        # Uploaded audio files
  logs/           # Server logs
.gitignore
package.json
vite.config.js
README.md
```

---

## 📌 Notes

- The sidebar and menu are dynamic and interactive.
- The main content area updates based on sidebar card selection or resets to default.
- Audio is only fetched and loaded when a card is clicked.
- The voice recorder and player use custom pill-shaped controls for a modern look.
- The backend is robust, with error handling and logging.

---

## 🧠 Future Improvements

- Add transcript generation after recording  
- Save and download audio clips  
- Polish sidebar/menu to be dynamic and collapsible  
- Add card creation and editing via the plus button/modal

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Acknowledgements

- [react-voice-visualizer](https://github.com/YZarytskyi/react-voice-visualizer) by Yurii Zarytskyi  
- Inspiration from various open-source audio recording projects

---

## ✨ Final Line

> *"This is just the beginning of a powerful, dynamic audio application. Stay tuned!"*

## 🖥️ Backend API Endpoints

- `GET /audios` — List all cards (id, title, description)
- `POST /audios` — Upload a new audio file (multipart/form-data)
- `PUT /audios/:id` — Update card info (title, description, and/or audio)
- `DELETE /audios/:id` — Delete a card and its audio file
- `GET /audios/:id/audio` — Stream the audio file for a card

Audio files are stored in `server/uploads/` and streamed on demand.

**Note:** The frontend only fetches audio when a card is clicked, for efficiency.