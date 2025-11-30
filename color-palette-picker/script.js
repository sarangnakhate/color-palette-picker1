// Color names database
const colorNames = {
    red: ['Crimson', 'Ruby', 'Cherry', 'Rose', 'Scarlet', 'Coral', 'Salmon'],
    orange: ['Tangerine', 'Apricot', 'Peach', 'Amber', 'Sunset', 'Copper'],
    yellow: ['Lemon', 'Honey', 'Gold', 'Butter', 'Canary', 'Sunflower'],
    green: ['Mint', 'Sage', 'Emerald', 'Forest', 'Lime', 'Olive', 'Jade'],
    blue: ['Azure', 'Navy', 'Ocean', 'Sky', 'Cobalt', 'Sapphire', 'Teal'],
    purple: ['Lavender', 'Violet', 'Plum', 'Orchid', 'Amethyst', 'Lilac'],
    pink: ['Blush', 'Fuchsia', 'Magenta', 'Rose', 'Bubblegum', 'Flamingo'],
    brown: ['Chocolate', 'Coffee', 'Mocha', 'Caramel', 'Chestnut', 'Walnut'],
    gray: ['Slate', 'Charcoal', 'Silver', 'Ash', 'Smoke', 'Steel'],
    white: ['Pearl', 'Ivory', 'Cream', 'Snow', 'Vanilla', 'Alabaster'],
    black: ['Onyx', 'Ebony', 'Midnight', 'Coal', 'Obsidian', 'Raven']
};

// Get color name based on HEX
function getColorName(hex) {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    const hue = hsl.h;
    const sat = hsl.s;
    const light = hsl.l;
    
    // Determine color family
    let colorFamily;
    if (sat < 10) {
        if (light > 90) colorFamily = 'white';
        else if (light < 20) colorFamily = 'black';
        else colorFamily = 'gray';
    } else if (hue < 15 || hue >= 345) colorFamily = 'red';
    else if (hue < 45) colorFamily = 'orange';
    else if (hue < 70) colorFamily = 'yellow';
    else if (hue < 150) colorFamily = 'green';
    else if (hue < 200) colorFamily = 'blue';
    else if (hue < 260) colorFamily = 'blue';
    else if (hue < 290) colorFamily = 'purple';
    else if (hue < 345) colorFamily = 'pink';
    else colorFamily = 'red';
    
    // Get random name from family
    const names = colorNames[colorFamily];
    return names[Math.floor(Math.random() * names.length)];
}

// Convert HEX to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

// Generate random HEX color
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Locked colors state
let lockedColors = new Set();

// Generate palette of 5 colors
function generatePalette() {
    const colors = [];
    const tiles = document.querySelectorAll('.color-tile');
    
    for (let i = 0; i < 5; i++) {
        if (lockedColors.has(i) && tiles[i]) {
            // Keep locked color
            const hexCode = tiles[i].querySelector('.hex-code').textContent;
            colors.push(hexCode);
        } else {
            colors.push(generateRandomColor());
        }
    }
    return colors;
}

// Toggle lock on color
function toggleLock(index, tile) {
    if (lockedColors.has(index)) {
        lockedColors.delete(index);
        tile.classList.remove('locked');
    } else {
        lockedColors.add(index);
        tile.classList.add('locked');
    }
}

// Create color tile element
function createColorTile(color, index) {
    const tile = document.createElement('div');
    tile.className = 'color-tile';
    if (lockedColors.has(index)) {
        tile.classList.add('locked');
    }
    tile.style.backgroundColor = color;
    tile.dataset.index = index;
    
    const colorInfo = document.createElement('div');
    colorInfo.className = 'color-info';
    
    const colorName = document.createElement('div');
    colorName.className = 'color-name';
    colorName.textContent = getColorName(color);
    
    const hexCode = document.createElement('div');
    hexCode.className = 'hex-code';
    hexCode.textContent = color;
    
    colorInfo.appendChild(colorName);
    colorInfo.appendChild(hexCode);
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = '✓ Copied!';
    
    tile.appendChild(colorInfo);
    tile.appendChild(tooltip);
    
    // Copy to clipboard on click
    tile.addEventListener('click', (e) => {
        if (!e.shiftKey) {
            copyToClipboard(color, tooltip);
        }
    });
    
    // Lock/unlock with Shift+Click
    tile.addEventListener('click', (e) => {
        if (e.shiftKey) {
            toggleLock(index, tile);
        }
    });
    
    return tile;
}

// Copy color to clipboard
async function copyToClipboard(color, tooltip) {
    try {
        await navigator.clipboard.writeText(color);
        showTooltip(tooltip);
    } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = color;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showTooltip(tooltip);
    }
}

// Show tooltip animation
function showTooltip(tooltip) {
    tooltip.classList.add('show');
    setTimeout(() => {
        tooltip.classList.remove('show');
    }, 1200);
}

// Render palette to DOM
function renderPalette(colors) {
    const container = document.getElementById('paletteContainer');
    container.innerHTML = '';
    
    colors.forEach((color, index) => {
        const tile = createColorTile(color, index);
        container.appendChild(tile);
    });
}

// Download palette as PNG
function downloadPalette() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Canvas dimensions
    const tileWidth = 240;
    const tileHeight = 360;
    canvas.width = tileWidth * 5;
    canvas.height = tileHeight;
    
    // Get current colors
    const colorTiles = document.querySelectorAll('.color-tile');
    
    colorTiles.forEach((tile, index) => {
        const color = tile.style.backgroundColor;
        const colorName = tile.querySelector('.color-name').textContent;
        const hexCode = tile.querySelector('.hex-code').textContent;
        
        // Draw color rectangle
        ctx.fillStyle = color;
        ctx.fillRect(index * tileWidth, 0, tileWidth, tileHeight);
        
        // Draw info background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fillRect(index * tileWidth, tileHeight - 80, tileWidth, 80);
        
        // Draw color name
        ctx.fillStyle = '#333333';
        ctx.font = 'bold 22px Poppins, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(colorName, index * tileWidth + tileWidth / 2, tileHeight - 55);
        
        // Draw HEX code
        ctx.fillStyle = '#666666';
        ctx.font = '18px "Courier New", monospace';
        ctx.fillText(hexCode, index * tileWidth + tileWidth / 2, tileHeight - 30);
    });
    
    // Download image
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `color-palette-${Date.now()}.png`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    });
}

// Event listeners
document.getElementById('generateBtn').addEventListener('click', () => {
    const colors = generatePalette();
    renderPalette(colors);
});

document.getElementById('downloadBtn').addEventListener('click', downloadPalette);

document.getElementById('lockBtn').addEventListener('click', () => {
    if (lockedColors.size > 0) {
        lockedColors.clear();
        document.querySelectorAll('.color-tile').forEach(tile => {
            tile.classList.remove('locked');
        });
        document.getElementById('lockBtn').innerHTML = '<span>🔓</span> Lock Colors';
    } else {
        alert('💡 Tip: Shift+Click on individual colors to lock/unlock them!');
    }
});

// Keyboard shortcut: Space to generate
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        const colors = generatePalette();
        renderPalette(colors);
    }
});

// Generate initial palette on load
window.addEventListener('DOMContentLoaded', () => {
    const colors = generatePalette();
    renderPalette(colors);
});
