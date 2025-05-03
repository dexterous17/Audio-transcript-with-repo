# Audio Transcript with Recorder

## 📜 Overview

This project is a modern prototype that includes:

- A working **audio recorder** with real-time visualization  
- A **sidebar with searchable cards** and modal popups  
- A **top menu bar** for easy access to sections
- Clean, responsive layout and UI polish

It's designed to serve as a **foundation** for building more complex audio recording and transcript processing applications.

---

## 🎯 Key Features

- 🎙️ **Audio Recording:** Capture voice input through the browser microphone  
- 📈 **Real-Time Visualization:** See live audio waveforms as you speak  
- 🗂️ **Sidebar with Cards:** Add, search, and view cards in the sidebar  
- 🔍 **Sidebar Search:** Instantly filter cards as you type  
- ➕ **Plus Button:** Modern action button for creating new recordings  
- 🗂️ **Card Modal:** Click any card to view its details in a centered modal popup  
- 📑 **Menu Bar:** Basic top navigation layout  
- 💎 **UI Polish:** Consistent padding, spacing, and responsive design  
- ⚡ **Built with:** React.js and Vite

---

## 🆕 2024 Additions & Improvements

- Sidebar cards with title/description, styled and clickable
- Real-time search for sidebar cards
- Modal popup for card details (click any card to open)
- Sidebar plus icon/button with hover/click effects
- Sidebar and main layout fixes (no unwanted scrollbars, fixed width, full height)
- Main content cards (including a welcome/info card and the voice recorder card)
- All UI components refactored for modularity and maintainability
- Improved accessibility (keyboard navigation, ARIA labels)

---

## 🛠️ Tech Stack

- React 19  
- Vite  
- [react-voice-visualizer](https://www.npmjs.com/package/react-voice-visualizer) (for audio visualization)  
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
  /Components     # React components like Sidebar, Header, Recorder, Modal, MainCard
  /Css            # Custom CSS files
  App.jsx         # Main app
  main.jsx        # Entry point
.gitignore
package.json
vite.config.js
README.md
```

---

## 📌 Notes

- The layout and structure are kept minimal to allow maximum flexibility for future development.
- The sidebar and menu are now dynamic and interactive.
- The voice recorder works out of the box but can be extended with transcript functionality later.

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