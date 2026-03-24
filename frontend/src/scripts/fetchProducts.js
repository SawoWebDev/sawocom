/**
 * fetchProducts.js
 *
 * Usage: node fetchProducts.js
 * 
 * Requirements: npm install node-fetch fs-extra
 */

import fetch from 'node-fetch'; // Node-fetch v3 uses ESM
import fs from 'fs-extra';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

// -----------------------------
// Path setup for ES modules
// -----------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -----------------------------
// Configuration
// -----------------------------
const WP_API_URL = 'https://www.sawo.com/wp-json/sawo/v1/products'; // Updated API
const ASSETS_DIR = path.join(__dirname, '../assets');
const IMAGES_DIR = path.join(ASSETS_DIR, 'products');
const DATA_FILE = path.join(ASSETS_DIR, 'data', 'products.json');

// -----------------------------
// Ensure directories exist
// -----------------------------
fs.ensureDirSync(IMAGES_DIR);
fs.ensureDirSync(path.join(ASSETS_DIR, 'data'));

// -----------------------------
// Helper: download image
// -----------------------------
async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(IMAGES_DIR, filename);
    const file = fs.createWriteStream(filePath);
    https.get(url, response => {
      if (response.statusCode !== 200) {
        return reject(`Failed to download ${url}: ${response.statusCode}`);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(`/assets/products/${filename}`);
      });
    }).on('error', err => {
      fs.unlink(filePath, () => {});
      reject(err.message);
    });
  });
}

// -----------------------------
// Main function
// -----------------------------
async function fetchAndCacheProducts() {
  try {
    console.log('Fetching products from SAWO API...');

    const response = await fetch(WP_API_URL);
    if (!response.ok) throw new Error(`SAWO API error: ${response.statusText}`);
    const wpProducts = await response.json();

    const products = [];

    for (const p of wpProducts) {
      const product = {
        name: p.name || 'Untitled',
        content: p.content || '',
        categories: p.categories || [],
        tags: p.tags || [],
        date: p.date || '',
        image: ''
      };

      // Image handling
      if (p.image) {
        const filename = path.basename(p.image);
        try {
          product.image = await downloadImage(p.image, filename);
          console.log(`Downloaded image: ${filename}`);
        } catch (err) {
          console.warn(`Image download failed for ${p.name}: ${err}`);
        }
      }

      products.push(product);
    }

    // Write JSON
    await fs.writeJson(DATA_FILE, products, { spaces: 2 });
    console.log(`Products saved to ${DATA_FILE}`);
  } catch (err) {
    console.error('Error fetching products:', err);
  }
}

// -----------------------------
// Run
// -----------------------------
fetchAndCacheProducts();