# WriteSpace

WriteSpace is a modern, minimal writing platform built with React 18, Vite, and Tailwind CSS. It provides a distraction-free environment for writers, bloggers, and note-takers to create, edit, and manage their content efficiently.

## Features

- 📝 Clean, distraction-free writing interface
- 💾 Fast, client-side performance with Vite
- 🎨 Responsive and customizable UI with Tailwind CSS
- 🌙 Dark mode support
- ⚡ Instant preview and autosave
- 📁 Organized folder structure for easy navigation

## Tech Stack

- **React 18**
- **Vite**
- **Tailwind CSS**
- **JavaScript (ES6+)**

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/your-username/writespace.git
   cd writespace
   ```

2. **Install dependencies:**

   ```
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**

   Visit [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```
npm run build
# or
yarn build
```

The production-ready files will be in the `dist` folder.

## Folder Structure

```
writespace/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components (routes)
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Entry point
│   └── index.css       # Tailwind CSS imports
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.js      # Vite configuration
├── package.json
└── README.md
```

## Usage

- Start writing by creating a new document.
- Your work is autosaved locally.
- Switch between light and dark mode for your preferred writing environment.
- Organize your notes and documents using folders.

## Contributing

Contributions are welcome! Please open issues and pull requests for new features, bug fixes, or improvements.

## License

This project is licensed under the [MIT License](LICENSE).

---

Made with ❤️ using React, Vite, and Tailwind CSS.