import fs from 'node:fs/promises';
import { createCanvas, loadImage } from 'canvas';

async function generateOGImage() {
  try {
    // Create canvas
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#0c2a1e');
    gradient.addColorStop(0.5, '#1a4d3a');
    gradient.addColorStop(1, '#2d5a47');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);
    
    // Add decorative elements
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(120, 126, 50, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#004d40';
    ctx.beginPath();
    ctx.arc(1020, 189, 40, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#a9532a';
    ctx.beginPath();
    ctx.arc(240, 504, 30, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(900, 441, 60, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.globalAlpha = 1;
    
    // Add text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Main logo
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 72px Georgia, serif';
    ctx.fillText('Ikhaya KaMa', 600, 200);
    
    // Tagline
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '300 36px Georgia, serif';
    ctx.fillText('VACATIONS', 600, 250);
    
    // Description
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '24px Georgia, serif';
    ctx.fillText('Discover the magic of Africa through luxury travel experiences', 600, 350);
    ctx.fillText('From the savannas of Kenya to the vineyards of South Africa', 600, 380);
    
    // CTA button background
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(450, 450, 300, 60);
    
    // CTA text
    ctx.fillStyle = '#0c2a1e';
    ctx.font = 'bold 20px Georgia, serif';
    ctx.fillText('Explore Destinations', 600, 480);
    
    // Save image
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile('public/og/default.jpg', buffer);
    
    console.log('OG image generated successfully: public/og/default.jpg');
  } catch (error) {
    console.error('Error generating OG image:', error);
    
    // Fallback: create a simple colored rectangle
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#0c2a1e';
    ctx.fillRect(0, 0, 1200, 630);
    
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 72px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Ikhaya KaMa VACATIONS', 600, 315);
    
    const buffer = canvas.toBuffer('image/png');
    await fs.writeFile('public/og/default.jpg', buffer);
    
    console.log('Fallback OG image created: public/og/default.jpg');
  }
}

generateOGImage();






