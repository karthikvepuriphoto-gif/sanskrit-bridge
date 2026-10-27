import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const artwork = `
  <circle cx="256" cy="176" r="62" fill="#F6E2C8"/>
  <circle cx="256" cy="176" r="28" fill="#E08A3A"/>
  <path d="M96 348c52-92 268-92 320 0" fill="none" stroke="#FFFDFB" stroke-width="28" stroke-linecap="round"/>
  <path d="M128 360h256" fill="none" stroke="#E08A3A" stroke-width="20" stroke-linecap="round"/>
`;

const icon = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="108" fill="#24315C"/>
  ${artwork}
</svg>`;

const maskable = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#24315C"/>
  <g transform="translate(256 256) scale(0.72) translate(-256 -256)">
    ${artwork}
  </g>
</svg>`;

await mkdir('public/icons', { recursive: true });
await sharp(Buffer.from(icon)).resize(192, 192).png().toFile('public/icons/icon-192.png');
await sharp(Buffer.from(icon)).resize(512, 512).png().toFile('public/icons/icon-512.png');
await sharp(Buffer.from(maskable)).resize(512, 512).png().toFile('public/icons/icon-maskable-512.png');
console.log('icons written');
