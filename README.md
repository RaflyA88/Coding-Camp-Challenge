# To-Do List Life Dashboard

A simple and elegant dashboard that helps users organize their day with time tracking, task management, focus timer, and quick links - all stored locally in the browser.

## Features

### ✅ Required Features (MVP)
- **Greeting Section**
  - Real-time clock showing current time
  - Dynamic date display
  - Personalized greeting based on time of day
  - Customizable user name

- **Focus Timer**
  - 25-minute Pomodoro timer (configurable)
  - Start, pause, and reset controls
  - Visual countdown display
  - Completion notification

- **To-Do List**
  - Add, edit, and delete tasks
  - Mark tasks as completed
  - Filter tasks (All/Pending/Completed)
  - Prevent duplicate tasks
  - Task statistics counter
  - Clear completed tasks option

- **Quick Links**
  - Add frequently visited websites
  - Links open in new tabs
  - Delete individual links
  - Persistent storage using Local Storage

### 🎯 Additional Challenges Implemented
1. **Light/Dark Mode Toggle**
   - Smooth theme switching
   - Persistent theme preference
   - Modern, clean design for both themes

2. **Custom Name in Greeting**
   - Personalized welcome message
   - Name saved automatically
   - Updates greeting in real-time

3. **Prevent Duplicate Tasks**
   - Case-insensitive duplicate detection
   - User-friendly notifications
   - Applies to both adding and editing tasks

## Technical Specifications

### Technology Stack
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with CSS variables
- **Vanilla JavaScript** - No frameworks or libraries
- **Local Storage API** - Client-side data persistence
- **Font Awesome** - Icon library
- **Google Fonts** - Typography

### Browser Compatibility
- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

### Data Storage
All data is stored locally in the browser using Local Storage:
- Tasks and completion status
- Quick links
- User preferences (name, theme, timer duration)
- No server or database required

## Project Structure

```
.
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All stylesheets
├── js/
│   └── script.js      # All JavaScript logic
├── README.md          # This file
└── .gitignore         # Git ignore file
```

## How to Use

### Local Development
1. Clone or download the repository
2. Open `index.html` in any modern web browser
3. No build process or dependencies required

### Using the Dashboard

1. **Set Your Name**
   - Enter your name in the greeting section
   - Click "Save Name" or press Enter

2. **Manage Tasks**
   - Type a task and click "Add" or press Enter
   - Click the checkbox to mark as complete
   - Click the edit icon to modify tasks
   - Use filter buttons to view All/Pending/Completed tasks

3. **Use the Focus Timer**
   - Set desired duration (1-60 minutes)
   - Click "Start" to begin countdown
   - Use "Pause" and "Reset" as needed
   - Timer notifies upon completion

4. **Add Quick Links**
   - Enter link name and URL
   - Click "Add Link" or press Enter
   - Click any link to open in new tab

5. **Toggle Theme**
   - Click the moon/sun icon in top-right
   - Theme preference is saved automatically

6. **Backup Data**
   - Use "Export Data" to download all data as JSON
   - Use "Import Data" to restore from backup file

## Data Persistence

All user data persists between browser sessions:
- Tasks remain even after browser restart
- Links are saved indefinitely
- User preferences are remembered
- Data is stored in browser's local storage

### Data Export/Import
- Export creates a JSON backup file
- Import restores data from backup
- Useful for migrating or sharing data

## Design Features

### Responsive Design
- Works on desktop, tablet, and mobile
- Adapts layout based on screen size
- Touch-friendly interface

### Accessibility
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- Sufficient color contrast

### Performance
- Fast loading (no external dependencies)
- Smooth animations and transitions
- Efficient DOM updates
- Minimal memory usage

## Browser Support

The dashboard uses modern web standards and should work in:
- Chrome 60+
- Firefox 55+
- Edge 79+
- Safari 12+

**Note:** Some features may not work in older browsers that don't support ES6+ or Local Storage.

## Development Guidelines

### Code Organization
- **HTML**: Semantic, accessible markup
- **CSS**: Modular styling with CSS variables
- **JavaScript**: Modular functions with clear separation of concerns

### Key Functions
- `init()` - Initializes the application
- `loadFromLocalStorage()` - Loads saved data
- `saveToLocalStorage()` - Persists data
- `renderTasks()` / `renderLinks()` - UI updates
- `showNotification()` - User feedback

## License

This project is open source and available for personal and educational use.

## Credits

- Icons: [Font Awesome](https://fontawesome.com)
- Fonts: [Google Fonts](https://fonts.google.com)
- Color Palette: Modern, accessible color scheme
- Design: Clean, minimalist dashboard interface

---

**Note**: This is a client-side only application. All data is stored locally in your browser and will be lost if you clear browser data or use private/incognito mode.