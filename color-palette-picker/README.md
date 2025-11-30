# 🎨 Color Palette Picker

A minimal, modern color palette generator that creates beautiful 5-color palettes with one click. Perfect for designers, developers, and anyone looking for color inspiration.

![Color Palette Picker](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

- **Random Palette Generation**: Generate beautiful 5-color palettes instantly
- **Color Names**: Each color displays a creative name (Crimson, Azure, Mint, etc.)
- **One-Click Copy**: Click any color tile to copy its HEX code to clipboard
- **Visual Feedback**: "Copied!" tooltip confirms successful copy action
- **Lock Colors**: Shift+Click to lock/unlock individual colors while generating new palettes
- **PNG Export**: Download your palette as a high-quality PNG image
- **Keyboard Shortcut**: Press Space bar to quickly generate new palettes
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, minimal interface with smooth animations and gradient backgrounds
- **No Dependencies**: Pure vanilla JavaScript - no frameworks required

## 🚀 Quick Start

### Option 1: Direct Use
1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start creating beautiful color palettes!

### Option 2: Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Then open http://localhost:8000
```

## 📖 Usage Guide

1. **Generate Palette**: Click "Generate New Palette" or press `Space` to create a random 5-color palette
2. **Copy Colors**: Click on any color tile to copy its HEX code to your clipboard
3. **Lock Colors**: `Shift + Click` on colors you want to keep, then generate new palettes
4. **Download**: Click "Download as PNG" to save your palette as an image file

## 🛠️ Tech Stack

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with Grid, Flexbox, animations, and gradients
- **JavaScript (ES6+)**: Pure vanilla JS with async/await
- **Google Fonts**: Poppins font family
- **Canvas API**: For PNG palette export
- **Clipboard API**: For seamless copy functionality

## 🎨 Color Name Algorithm

The app intelligently determines color names based on:
- **HSL Color Space**: Converts HEX → RGB → HSL
- **Hue Analysis**: Determines color family (red, blue, green, etc.)
- **Saturation & Lightness**: Identifies grayscale colors
- **Creative Names**: Assigns poetic names like "Crimson", "Azure", "Mint"

## 📱 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome/Edge | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| Mobile browsers | ✅ Full support |

**Note**: Clipboard API requires HTTPS in production (works on localhost for development)

## 🌐 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to **Settings** → **Pages**
3. Select branch (main) and root folder
4. Save and access at `https://yourusername.github.io/repo-name`

### Netlify
1. Drag and drop the project folder to [Netlify Drop](https://app.netlify.com/drop)
2. Or connect your GitHub repo for automatic deployments

### Vercel
```bash
npm i -g vercel
vercel
```

## 📂 Project Structure

```
color-palette-picker/
│
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Core functionality
└── README.md           # Documentation
```

## 🎯 Key Features Explained

### Clipboard API
Uses modern `navigator.clipboard.writeText()` for seamless copy functionality with fallback for older browsers.

### Canvas API
Generates PNG images by drawing color rectangles and text labels on an HTML5 canvas element.

### Responsive Grid
CSS Grid automatically adjusts from 5 columns (desktop) → 3 columns (tablet) → 2 columns (mobile) → 1 column (small mobile).

### Smooth Animations
- Floating logo animation
- Gradient background shift
- Button ripple effects
- Color tile hover transformations
- Tooltip scale animations

### Lock Feature
Keep your favorite colors and regenerate only the unlocked ones - perfect for finding complementary colors!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Tips & Tricks

- Use `Space` bar for rapid palette generation
- `Shift + Click` to lock multiple colors
- Perfect for finding color schemes for web design, branding, or art projects
- Export palettes as PNG to share with your team

## 🔗 Connect

If you found this useful, please give it a ⭐️ on GitHub!

---

Made with ❤️ and JavaScript
