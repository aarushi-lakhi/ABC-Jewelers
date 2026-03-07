import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { Product } from '../models/product.model';

/**
 * Imports products from a Wix Stores CSV export into MongoDB.
 *
 * Usage:
 *   npx ts-node src/scripts/import-wix-csv.ts path/to/wix-export.csv
 *
 * Expected Wix CSV columns (standard export):
 *   handleId, fieldType, name, description, productImageUrl,
 *   collection, sku, ribbon, price, surcharge, visible,
 *   discountMode, discountValue, inventory, weight
 *
 * Adjust the column mapping below if your export differs.
 */

interface WixRow {
  [key: string]: string;
}

function parseCSV(filePath: string): WixRow[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));

  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const row: WixRow = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || '';
    });
    return row;
  });
}

const CATEGORY_MAP: Record<string, string> = {
  earrings: 'earrings',
  charms: 'charms',
  chains: 'chains',
  rings: 'rings',
};

function normalizeCategory(collection: string): string {
  const lower = collection.toLowerCase().trim();
  for (const [key, value] of Object.entries(CATEGORY_MAP)) {
    if (lower.includes(key)) return value;
  }
  return lower || 'uncategorized';
}

async function importCSV(csvPath: string) {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('MONGODB_URI is not set in .env');
    process.exit(1);
  }

  if (!fs.existsSync(csvPath)) {
    console.error(`File not found: ${csvPath}`);
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const rows = parseCSV(csvPath);
  console.log(`Parsed ${rows.length} rows from CSV`);

  let imported = 0;
  let skipped = 0;

  for (const row of rows) {
    const name = row['name'] || row['Name'] || '';
    if (!name) {
      skipped++;
      continue;
    }

    const price = parseFloat(row['price'] || row['Price'] || '0');
    const description = row['description'] || row['Description'] || '';
    const imageUrl = row['productImageUrl'] || row['Product Image Url'] || '';
    const collection = row['collection'] || row['Collection'] || '';
    const inventory = parseInt(row['inventory'] || row['Inventory'] || '0', 10);
    const ribbon = (row['ribbon'] || row['Ribbon'] || '').toLowerCase();

    const product = {
      name,
      description: description || `${name} from ABC Jewelers.`,
      longDescription: description || `${name} — a beautiful piece from ABC Jewelers' collection.`,
      price,
      images: imageUrl ? [imageUrl] : ['/products/placeholder.jpg'],
      category: normalizeCategory(collection),
      featured: ribbon.includes('best seller'),
      new: ribbon.includes('new'),
      options: { materials: ['Silver'], customization: [] as string[] },
      reviews: [],
      relatedProducts: [],
      stock: isNaN(inventory) ? 10 : inventory,
    };

    await Product.findOneAndUpdate({ name: product.name }, product, {
      upsert: true,
      new: true,
    });

    console.log(`  Imported: ${name} ($${price}) [${product.category}]`);
    imported++;
  }

  console.log(`\nDone: ${imported} imported, ${skipped} skipped`);
  await mongoose.disconnect();
}

const csvPath = process.argv[2];
if (!csvPath) {
  console.error('Usage: npx ts-node src/scripts/import-wix-csv.ts <path-to-csv>');
  process.exit(1);
}

importCSV(path.resolve(csvPath)).catch((err) => {
  console.error('Import failed:', err);
  process.exit(1);
});
