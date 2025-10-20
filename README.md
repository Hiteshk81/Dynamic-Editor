# Dynamic UI Editor — React + TailwindCSS

A React-based Dynamic UI Editor that allows users to upload and customize their own UI design (Figma JSON, PNG, SVG, JPEG) in real time.
It provides a clean and intuitive editor interface to modify typography, button styles, layouts, and more — all with instant live preview and export options.

## Features

Design Uploads: Import Figma JSON, PNG, SVG, or JPEG files.

Real-Time Editing: Apply live customization with instant updates.

Configurable UI: Modify typography, colors, shadows, borders, spacing, and layout.

Smart Layout Switching: Toggle between two responsive layouts.

Export Options: Export customized designs as React JSX, HTML/CSS, PNG, SVG, or JSON.

Clean UX: High-contrast, user-friendly editor panel for smooth interaction.

## Project Structure
dynamic-ui-editor/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx
│   │   ├── EditorPage.jsx
│   │   ├── EditorPanel.jsx
│   │   ├── LivePreview.jsx
│   │   ├── UploadHandler.jsx
│   │   ├── LayoutSwitcher.jsx
│   │   └── ExportOptions.jsx
│   ├── store/
│   │   └── useEditorStore.js
│   ├── utils/
│   │   ├── parseFigmaFile.js
│   │   ├── exportUtils.js
│   │   └── imageHandler.js
│   ├── App.jsx
│   └── main.jsx
├── public/
└── package.json

# Component API and Configurable Props
## 1. LandingPage.jsx

Purpose: Allows users to upload design files and navigate to the editor.

Props:

onFileUpload(file): Handles uploaded design files (Figma JSON, PNG, SVG, JPEG).

Behavior:

Validates file type and forwards parsed data to the editor.

Automatically routes to the editor page after successful upload.

## 2. EditorPage.jsx

Purpose: Combines the editor panel (controls) and live preview into one interactive workspace.

Props:

None directly (uses global state via Zustand or Redux Toolkit).

Behavior:

Reads customization state from global store.

Renders the current design and applies all customization changes in real time.

## 3. EditorPanel.jsx

Purpose: Displays all available customization controls.

Props:

Controlled via useEditorStore (global state management).

Options:

Typography: fontFamily, fontWeight, fontSize

Button: borderRadius, shadow, alignment, bgColor, textColor

Images: galleryAlign, spacing, imageRadius

Layout: cardRadius, padding, backgroundColor

Stroke: strokeColor, strokeWeight

Layout Switcher: selectedLayout

Behavior:

Updates the global editor state on every input change.

Provides visual sliders, dropdowns, and color pickers.

## 4. LivePreview.jsx

Purpose: Displays the uploaded design and reflects all customization changes instantly.

Props:

designData: Parsed design structure or uploaded image source.

editorConfig: Current customization settings.

Behavior:

Dynamically updates CSS variables based on editor state.

Handles both image and vector (Figma JSON) rendering.

Ensures responsive scaling and smooth UI transitions.

## 5. ExportOptions.jsx

Purpose: Provides export buttons for saving the customized design.

Props:

onExport(type): Type can be jsx, html, png, svg, or json.

Behavior:

Uses html-to-image for PNG/SVG.

Serializes design + state to JSX/HTML/CSS.

Offers download links for exportable files.

## 6. useEditorStore.js (Global State)

Purpose: Manages all customization states and provides reactive data binding.

State Example:

{
  typography: { fontFamily: 'Inter', fontSize: 16, fontWeight: 500 },
  button: { borderRadius: 8, shadow: 'medium', bgColor: '#007BFF', textColor: '#fff' },
  layout: { padding: 16, backgroundColor: '#f4f4f4' },
  stroke: { color: '#ddd', weight: 1 },
  activeLayout: 'layoutA'
}

# How the Editor Works

#File Upload:

User uploads a design file (JSON/PNG/SVG/JPEG).

The system parses or displays it in the preview section.

## Live Customization:

All customization controls are bound to a global state.

When a user modifies a control, the preview updates immediately using React’s state reactivity.

## Dynamic Styling:

The editor applies real-time updates through CSS variables or inline styles.

Image or layout adjustments are reflected instantly without reloads.

## Export Process:

The user clicks an export option (e.g., JSX, PNG).

The design is converted and downloaded with all applied styles and settings preserved.

Decisions on Additional Customizations and UX Improvements

## High-Contrast Sidebar:
The editor panel uses dark background with light text for maximum readability and accessibility.

## Responsive Layout:
Both the editor and preview automatically adjust for different screen sizes (desktop, tablet, mobile).

## Smooth Animations:
Used Framer Motion for subtle transitions between layout switches and real-time style updates.

## Two-Way Binding:
Customization changes instantly sync between UI controls and the rendered design.

## Extensibility:
The component structure and global store are modular, allowing new customization categories (e.g., animations, gradients, shadows) to be easily added.

## Error Handling:
Validation checks for unsupported file types or corrupted uploads with user-friendly messages.

## Light/Dark Mode:
Optional theme toggle for better user experience during editing sessions.

# Running the Project

## Install dependencies:

npm install


## Run the development server:

npm run dev


## Build for production:

npm run build


## Preview production build:

npm run preview

