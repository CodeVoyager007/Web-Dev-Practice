const phrases = [
    "🎨 Generating beautiful palettes...",
    "✨ Making design easy...",
    "🎉 Get inspired by colors...",
    "🚀 Transform your ideas..."
];

let currentPhrase = 0;
let isDeleting = false;
let typedText = '';
let typingSpeed = 100;

function typeText() {
    const fullText = phrases[currentPhrase];
    if (isDeleting) {
        typedText = fullText.substring(0, typedText.length - 1);
    } else {
        typedText = fullText.substring(0, typedText.length + 1);
    }

    document.getElementById('typedText').textContent = typedText;

    if (!isDeleting && typedText === fullText) {
        isDeleting = true;
        typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && typedText === '') {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
        typingSpeed = 200; // Speed up for typing next phrase
    } else {
        typingSpeed = isDeleting ? 50 : 100;
    }

    setTimeout(typeText, typingSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    typeText();
    generatePalette(); // Generate initial palette on page load
});

// Generates a random hex color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Converts an input color to hex
function convertToHex(color) {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.fillStyle = color;
    return ctx.fillStyle;
}

// Converts hex color to RGB
function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
}

// Converts RGB color to HSL
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
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h * 360, s * 100, l * 100];
}

// Converts HSL color to hex
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

// Generates complementary and analogous colors
function generateColorSchemes(baseColor) {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(...rgb);

    const analogous1 = hslToHex((hsl[0] + 30) % 360, hsl[1], hsl[2]);
    const analogous2 = hslToHex((hsl[0] - 30 + 360) % 360, hsl[1], hsl[2]);
    const complementary = hslToHex((hsl[0] + 180) % 360, hsl[1], hsl[2]);

    return [baseColor, analogous1, analogous2, complementary];
}

// Generates the color palette
function generatePalette() {
    const paletteContainer = document.getElementById('palette');
    paletteContainer.innerHTML = ''; // Clear the existing palette
    const baseColorInput = document.getElementById('colorInput').value || getRandomColor();
    const baseColor = convertToHex(baseColorInput);

    const colors = generateColorSchemes(baseColor);

    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.className = 'color-box';
        colorBox.style.backgroundColor = color;

        const colorLabel = document.createElement('span');
        colorLabel.textContent = color;
        colorBox.appendChild(colorLabel);

        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy CSS';
        copyButton.onclick = () => copyToClipboard(`background-color: ${color};`);
        colorBox.appendChild(copyButton);

        paletteContainer.appendChild(colorBox);
    });
}

// Copies the CSS code to clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('CSS code copied to clipboard!');
}
