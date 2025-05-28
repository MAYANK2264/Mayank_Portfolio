import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    name: 'company/ecub.png',
    url: 'https://ecub.co/wp-content/uploads/2023/01/ecub-logo.png'
  },
  {
    name: 'company/iiitsurat.png',
    url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/39/IIIT_Surat_Logo.jpg/220px-IIIT_Surat_Logo.jpg'
  },
  {
    name: 'projects/skysync.png',
    url: 'https://raw.githubusercontent.com/MAYANK2264/skysync/main/public/screenshot.png'
  },
  {
    name: 'projects/yourplaces.png',
    url: 'https://raw.githubusercontent.com/MAYANK2264/yourplaces/main/frontend/public/screenshot.png'
  },
  {
    name: 'projects/jarvis.png',
    url: 'https://raw.githubusercontent.com/MAYANK2264/jarvis-ai-assistant/main/screenshot.png'
  }
];

const downloadImage = (url, filename) => {
  const dir = path.join(__dirname, 'public', path.dirname(filename));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filepath = path.join(__dirname, 'public', filename);
  const file = fs.createWriteStream(filepath);

  https.get(url, response => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  }).on('error', err => {
    fs.unlink(filepath, () => {
      console.error(`Error downloading ${filename}:`, err.message);
    });
  });
};

// Download images
images.forEach(img => {
  downloadImage(img.url, img.name);
});