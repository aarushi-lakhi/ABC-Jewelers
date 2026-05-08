import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { Product } from '../models/product.model';

/**
 * Imports ALL products from the Wix inventory CSV into MongoDB.
 *
 * - Preserves the exact Wix display order per category via sortOrder.
 * - Out-of-stock products with no price are imported with inferred prices
 *   (based on silver/gold patterns and similar products) and stock=0 so they
 *   appear as "Out of Stock" in the shop.
 * - Chains are imported as "per inch" items with generous stock.
 * - Variant rows ("Base | Type: Value") are grouped into one product whose
 *   variant values are stored in options.customization.
 *
 * Usage:
 *   npx ts-node src/scripts/import-wix-csv.ts path/to/wix-export.csv
 */

// ── Wix display order (scraped from abcjewelers.wixsite.com/home) ────────────
// inferredPrice is used when the CSV has $0 / 0 inventory for that product.

interface WixEntry {
  name: string;
  category: 'earrings' | 'rings' | 'charms' | 'chains';
  inferredPrice: number;
  featured?: boolean;
  isNew?: boolean;
}

const WIX_ORDER: WixEntry[] = [
  // ── EARRINGS ────────────────────────────────────────────────────────────────
  { name: 'Sunflower Earrings',               category: 'earrings', inferredPrice: 8.00 },
  { name: 'Cactus Earrings',                  category: 'earrings', inferredPrice: 9.00 },
  { name: 'Ice Cream Cone Earrings',          category: 'earrings', inferredPrice: 9.00 },
  { name: 'Paint Palette Earrings',           category: 'earrings', inferredPrice: 9.00 },
  { name: 'Rose Quartz Heart Earrings',       category: 'earrings', inferredPrice: 8.00 },
  { name: 'Rose Earrings',                    category: 'earrings', inferredPrice: 4.00 },
  { name: 'Pineapple Earrings',               category: 'earrings', inferredPrice: 9.00 },
  { name: 'Leaf Earrings',                    category: 'earrings', inferredPrice: 8.00 },
  { name: 'White Howlite Drop Earrings',      category: 'earrings', inferredPrice: 9.00 },
  { name: 'Hammered Moon Earrings',           category: 'earrings', inferredPrice: 7.00 },
  { name: 'Silver Coin Earrings',             category: 'earrings', inferredPrice: 6.00 },
  { name: 'Panda Earrings',                   category: 'earrings', inferredPrice: 5.00 },
  { name: 'Bumble Bee Earrings',              category: 'earrings', inferredPrice: 6.00 },
  { name: 'Butterfly Earrings',               category: 'earrings', inferredPrice: 4.50 },
  { name: 'Clear Crystal Drop Earrings',      category: 'earrings', inferredPrice: 4.50 },
  { name: 'Pink Rose Resin Earrings',         category: 'earrings', inferredPrice: 4.25 },
  { name: 'Faux Diamond Earrings',            category: 'earrings', inferredPrice: 4.50 },
  { name: 'Faux Blue Topaz Earrings',         category: 'earrings', inferredPrice: 4.50 },
  { name: 'Faux Sapphire Earrings',           category: 'earrings', inferredPrice: 4.50 },
  { name: 'Faux Peridot Earrings',            category: 'earrings', inferredPrice: 4.00 },
  { name: 'Faux Citrine Earrings',            category: 'earrings', inferredPrice: 4.00 },
  { name: 'Pearl Drops',                      category: 'earrings', inferredPrice: 4.50 },
  { name: 'Pearl Studs',                      category: 'earrings', inferredPrice: 3.75 },
  { name: 'Cube Resin Earrings',              category: 'earrings', inferredPrice: 4.00 },
  { name: 'Lollipop Studs',                   category: 'earrings', inferredPrice: 4.00 },
  { name: 'Earthy Triangle Drops',            category: 'earrings', inferredPrice: 4.25 },
  { name: 'Neptune Drop Earrings',            category: 'earrings', inferredPrice: 3.75 },
  { name: 'Blue Drop Earrings',               category: 'earrings', inferredPrice: 3.75 },
  { name: 'Teardrop Earrings',               category: 'earrings', inferredPrice: 3.50 },
  { name: 'Silver Plated Studs',             category: 'earrings', inferredPrice: 4.75 },
  { name: 'Gold Hoop Earrings',              category: 'earrings', inferredPrice: 6.00 },
  { name: 'Gold Plated Moon Earrings',       category: 'earrings', inferredPrice: 6.00 },
  { name: 'Giving Tree Earrings',            category: 'earrings', inferredPrice: 8.00 },
  { name: 'Ladybug Earrings',               category: 'earrings', inferredPrice: 6.00 },
  { name: 'Leaf Shaped Earring',            category: 'earrings', inferredPrice: 4.25 },
  { name: 'Translucent Rectangle Drops',    category: 'earrings', inferredPrice: 3.75 },
  { name: 'Pink Clear Hearts',              category: 'earrings', inferredPrice: 4.00 },
  { name: 'Pink Flower Studs',              category: 'earrings', inferredPrice: 4.00 },
  { name: 'Dangly Dice',                    category: 'earrings', inferredPrice: 3.75 },
  { name: 'Red Glittery Drops',             category: 'earrings', inferredPrice: 3.50 },
  { name: 'Ellipsoid Gem',                  category: 'earrings', inferredPrice: 4.25 },

  // ── RINGS ────────────────────────────────────────────────────────────────────
  { name: 'Silver Curb Chain Ring',                              category: 'rings', inferredPrice: 4.00 },
  { name: 'Gold Curb Chain Ring',                                category: 'rings', inferredPrice: 5.00 },
  { name: 'Silver Middle-Diamond-Stone Ring (Double-Band)',       category: 'rings', inferredPrice: 4.00 },
  { name: 'Gold Middle-Diamond-Stone Ring (Double-Band)',         category: 'rings', inferredPrice: 5.00 },
  { name: 'Silver Middle-Diamond-Stone Ring (Single-Band)',       category: 'rings', inferredPrice: 3.00 },
  { name: 'Gold Middle-Diamond-Stone Ring (Single-Band)',         category: 'rings', inferredPrice: 4.00 },
  { name: 'Silver Bow Ring',                                     category: 'rings', inferredPrice: 4.00 },
  { name: 'Gold Bow Ring',                                       category: 'rings', inferredPrice: 5.00 },
  { name: 'Silver Open Heart Ring',                              category: 'rings', inferredPrice: 4.00 },
  { name: 'Gold Open Heart Ring',                                category: 'rings', inferredPrice: 5.00 },
  { name: 'Silver Knotted Heart Ring',                           category: 'rings', inferredPrice: 3.00 },
  { name: 'Gold Knotted Heart Ring',                             category: 'rings', inferredPrice: 4.00 },
  { name: 'Silver Infinity Ring',                                category: 'rings', inferredPrice: 4.00 },
  { name: 'Gold Infinity Ring',                                  category: 'rings', inferredPrice: 5.00 },
  { name: 'Silver Criss-Cross Ring',                             category: 'rings', inferredPrice: 3.00 },
  { name: 'Gold Criss-Cross Ring',                               category: 'rings', inferredPrice: 4.00 },
  { name: 'Gold Butterfly Ring',                                 category: 'rings', inferredPrice: 5.00 },
  { name: 'Gold Plated Moon Ring',                               category: 'rings', inferredPrice: 5.00 },
  { name: 'Gold Small Heart Ring',                               category: 'rings', inferredPrice: 5.00 },
  { name: 'Gold Wave Ring',                                      category: 'rings', inferredPrice: 5.00 },
  { name: 'Gold Twisted Open Ring with Pearls',                  category: 'rings', inferredPrice: 5.00 },
  { name: 'Gold S Ring',                                         category: 'rings', inferredPrice: 5.00 },
  { name: 'Gold Open-S Ring',                                    category: 'rings', inferredPrice: 5.00 },
  { name: 'Gold Triple Open Band Ring',                          category: 'rings', inferredPrice: 4.00 },
  { name: 'Gold Double Open Band Ring',                          category: 'rings', inferredPrice: 4.00 },
  { name: 'Gold Open X Band Ring',                               category: 'rings', inferredPrice: 4.00 },
  { name: 'Silver 2-Band Open Space Hammered Ring',              category: 'rings', inferredPrice: 3.00 },
  { name: 'Gold 2-Band Open Space Hammered Ring',                category: 'rings', inferredPrice: 4.00 },
  { name: 'Silver Hammered Coil Ring',                           category: 'rings', inferredPrice: 5.00 },
  { name: 'Gold Hammered Coil Ring',                             category: 'rings', inferredPrice: 6.00 },
  { name: 'Gold Triple Open Band with Middle-Diamond-Stone Ring', category: 'rings', inferredPrice: 5.00 },
  { name: 'Silver V Ring',                                       category: 'rings', inferredPrice: 4.00 },
  { name: 'Gold V Ring',                                         category: 'rings', inferredPrice: 5.00 },
  { name: 'Gold Hammered Band',                                  category: 'rings', inferredPrice: 3.00 },
  { name: 'Gold Band',                                           category: 'rings', inferredPrice: 3.00 },
  { name: 'Silver Plain Ring (small)',                           category: 'rings', inferredPrice: 3.00 },
  { name: 'Gold Plain Ring (small)',                             category: 'rings', inferredPrice: 3.75 },
  { name: 'Silver Plain Ring (medium)',                          category: 'rings', inferredPrice: 3.00 },
  { name: 'Gold Plain Ring (medium)',                            category: 'rings', inferredPrice: 3.75 },
  { name: 'Silver Plain Ring (large)',                           category: 'rings', inferredPrice: 3.00 },
  { name: 'Gold Plain Ring (large)',                             category: 'rings', inferredPrice: 3.75 },
  { name: 'Gold Flat Ring',                                      category: 'rings', inferredPrice: 3.00 },
  { name: 'Silver Twisted Ring',                                 category: 'rings', inferredPrice: 4.00 },
  { name: 'Gold Twisted Ring',                                   category: 'rings', inferredPrice: 4.00 },

  // ── CHARMS ───────────────────────────────────────────────────────────────────
  { name: 'Zodiac Sign Charms',                    category: 'charms', inferredPrice: 2.00, featured: true },
  { name: 'Giving Tree Charm',                     category: 'charms', inferredPrice: 2.00 },
  { name: 'Alphabet Charms',                       category: 'charms', inferredPrice: 2.00 },
  { name: 'Heart Locket Charm',                    category: 'charms', inferredPrice: 2.00, isNew: true },
  { name: 'Birthstone Charms',                     category: 'charms', inferredPrice: 2.00, featured: true },
  { name: 'Positive Word Charm: Enjoy Everyday',   category: 'charms', inferredPrice: 2.00 },
  { name: 'Positive Word Charm: Yay!',             category: 'charms', inferredPrice: 2.00 },
  { name: 'Positive Word Charm: You Got This!',    category: 'charms', inferredPrice: 2.00 },
  { name: 'Positive Word Charm: Start Today',      category: 'charms', inferredPrice: 2.00 },
  { name: 'Treble Clef Charm',                     category: 'charms', inferredPrice: 2.00 },
  { name: 'Guitar Charm',                          category: 'charms', inferredPrice: 2.00 },
  { name: 'Airplane Charm',                        category: 'charms', inferredPrice: 2.00 },
  { name: 'Journey Tag Charm',                     category: 'charms', inferredPrice: 2.00 },
  { name: 'Camera Charm',                          category: 'charms', inferredPrice: 2.00 },
  { name: 'Pink Butterfly Charm',                  category: 'charms', inferredPrice: 1.50 },
  { name: 'Purple Butterfly Charm',                category: 'charms', inferredPrice: 1.50 },
  { name: 'Colorful Butterfly Charm',              category: 'charms', inferredPrice: 1.00 },
  { name: 'Mint Petaled Flower Charm with Smiley Face', category: 'charms', inferredPrice: 1.00 },
  { name: 'Pink Petaled Flower Charm with Smiley Face', category: 'charms', inferredPrice: 1.00 },
  { name: 'Flower Bunch Charm',                    category: 'charms', inferredPrice: 1.50 },

  // ── CHAINS ───────────────────────────────────────────────────────────────────
  { name: 'Silver Thin Curb Chain',          category: 'chains', inferredPrice: 0.30, featured: true },
  { name: 'Silver Thin Twisted Curb Chain',  category: 'chains', inferredPrice: 0.30 },
  { name: 'Silver Thin Cable Chain',         category: 'chains', inferredPrice: 0.24 },
  { name: 'Silver Thin Trace Chain',         category: 'chains', inferredPrice: 0.24 },
  { name: 'Silver Pelline Ball Chain',       category: 'chains', inferredPrice: 0.25 },
  { name: 'Silver Thick Cable Trace Chain',  category: 'chains', inferredPrice: 0.32, featured: true },
  { name: 'Silver Round Twisted Trace Chain', category: 'chains', inferredPrice: 0.28 },
  { name: 'Silver Slender Cable Chain',      category: 'chains', inferredPrice: 0.24 },
  { name: 'Gold Curb Chain',                 category: 'chains', inferredPrice: 0.30 },
  { name: 'Gold Round Curb Chain',           category: 'chains', inferredPrice: 0.30 },
  { name: 'Gold Slender Cable Chain',        category: 'chains', inferredPrice: 0.24 },
];

// ── Featured products (shown first on the "Shop All" page) ──────────────────
// First 16 earrings + first 22 rings + first 5 charms + 1st & 3rd chains.
const FEATURED_NAMES = new Set([
  // Earrings 1-16
  'Sunflower Earrings', 'Cactus Earrings', 'Ice Cream Cone Earrings', 'Paint Palette Earrings',
  'Rose Quartz Heart Earrings', 'Rose Earrings', 'Pineapple Earrings', 'Leaf Earrings',
  'White Howlite Drop Earrings', 'Hammered Moon Earrings', 'Silver Coin Earrings', 'Panda Earrings',
  'Bumble Bee Earrings', 'Butterfly Earrings', 'Clear Crystal Drop Earrings', 'Pink Rose Resin Earrings',
  // Rings 1-22
  'Silver Curb Chain Ring', 'Gold Curb Chain Ring',
  'Silver Middle-Diamond-Stone Ring (Double-Band)', 'Gold Middle-Diamond-Stone Ring (Double-Band)',
  'Silver Middle-Diamond-Stone Ring (Single-Band)', 'Gold Middle-Diamond-Stone Ring (Single-Band)',
  'Silver Bow Ring', 'Gold Bow Ring',
  'Silver Open Heart Ring', 'Gold Open Heart Ring',
  'Silver Knotted Heart Ring', 'Gold Knotted Heart Ring',
  'Silver Infinity Ring', 'Gold Infinity Ring',
  'Silver Criss-Cross Ring', 'Gold Criss-Cross Ring',
  'Gold Butterfly Ring', 'Gold Plated Moon Ring', 'Gold Small Heart Ring', 'Gold Wave Ring',
  'Gold Twisted Open Ring with Pearls', 'Gold S Ring',
  // Charms 1-5
  'Zodiac Sign Charms', 'Giving Tree Charm', 'Alphabet Charms', 'Heart Locket Charm', 'Birthstone Charms',
  // Chains: 1st (Silver Thin Curb) and 3rd (Silver Thin Cable)
  'Silver Thin Curb Chain', 'Silver Thin Cable Chain',
]);

// ── CSV Parsing ──────────────────────────────────────────────────────────────

interface RawRow {
  imageUrl: string;
  variantName: string;
  sku: string;
  unitPrice: number;
  inventory: number;
}

function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') { inQuotes = !inQuotes; }
    else if (char === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
    else { current += char; }
  }
  values.push(current.trim());
  return values;
}

function parseCSV(filePath: string): RawRow[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(l => l.trim());
  if (lines.length < 2) return [];

  const rows: RawRow[] = [];
  for (const line of lines.slice(1)) {
    const [imageUrl, variantName, sku, totalValueStr, inventoryStr] = parseCSVLine(line);
    if (!variantName || variantName === '.' || !sku || sku === 'Unknown') continue;

    const inventory = parseInt(inventoryStr?.trim() || '0', 10) || 0;
    const totalValue = parseFloat((totalValueStr || '').replace(/[$,\s]/g, '')) || 0;
    const rawUnitPrice = inventory > 0 ? totalValue / inventory : 0;

    rows.push({
      imageUrl: (imageUrl || '').trim(),
      variantName: variantName.trim(),
      sku: sku.trim(),
      unitPrice: Math.round(rawUnitPrice * 100) / 100,
      inventory,
    });
  }
  return rows;
}

// ── Image URL ────────────────────────────────────────────────────────────────

function fixImageUrl(thumbnailUrl: string): string {
  const match = thumbnailUrl.match(/https:\/\/static\.wixstatic\.com\/media\/([^/]+)/);
  if (!match) return thumbnailUrl;
  return `https://static.wixstatic.com/media/${match[1]}/v1/fill/w_800,h_800,q_90/file.jpg`;
}

// ── Materials Inference ──────────────────────────────────────────────────────

function inferMaterials(name: string): string[] {
  const n = name.toLowerCase();
  if (n.startsWith('silver') || (n.includes('silver') && !n.includes('gold'))) return ['Sterling Silver'];
  if (n.includes('gold plated') || n.includes('plated')) return ['Gold-Plated'];
  if (n.startsWith('gold') || (n.includes('gold') && !n.includes('silver'))) return ['Gold-Plated'];
  return ['Silver', 'Gold-Plated'];
}

// ── Description Generation ───────────────────────────────────────────────────

const IMPACT = 'Every purchase supports ABC Jewelers\' mission to fund medical care for low-income patients.';
const CHAIN_TOGETHER = 'Chains are sold per inch — add your desired quantity at checkout. Pair with any of our charms to build a custom necklace or bracelet.';

function generateDescriptions(
  baseName: string,
  category: string,
  variantType?: string,
): { short: string; long: string } {
  const variantNote = variantType ? ` Available in multiple ${variantType.toLowerCase()} options.` : '';

  if (category === 'chains') {
    return {
      short: `${baseName} — sold per inch. Pair with our charms to create a custom necklace or bracelet.`,
      long: `${baseName} is a versatile, high-quality chain sold by the inch. ${CHAIN_TOGETHER} ${IMPACT}`,
    };
  }
  if (category === 'charms') {
    return {
      short: `${baseName} — a fun, meaningful charm to personalize any necklace or bracelet.${variantNote}`,
      long: `Add personality to any chain or bracelet with the ${baseName}. Perfect for gifting or building a custom jewelry piece.${variantNote} Pair with one of our chains for the complete look. ${IMPACT}`,
    };
  }
  if (category === 'rings') {
    return {
      short: `${baseName} — a delicate ring crafted for everyday elegance.${variantNote}`,
      long: `The ${baseName} is a beautifully crafted ring that adds a subtle touch of elegance to any look. Lightweight and comfortable for all-day wear.${variantNote} ${IMPACT}`,
    };
  }
  // earrings default
  return {
    short: `${baseName} — lightweight, eye-catching earrings for everyday wear.${variantNote}`,
    long: `${baseName} are a charming addition to any jewelry collection. Lightweight and comfortable for all-day wear — perfect for casual outings, gifting, or adding a pop of personality.${variantNote} ${IMPACT}`,
  };
}

// ── Group CSV rows by base product name ─────────────────────────────────────

interface CsvGroup {
  variantType?: string;
  variantValues: string[];
  totalStock: number;
  price: number;
  primaryImageUrl: string;
}

function buildCsvGroups(rows: RawRow[]): Map<string, CsvGroup> {
  // Pass 1: compute unit prices for rows with inventory
  const skuPriceMap = new Map<string, number>();
  const baseNamePriceMap = new Map<string, number>();

  for (const row of rows) {
    if (row.unitPrice > 0) {
      skuPriceMap.set(row.sku, row.unitPrice);
      const m = row.variantName.match(/^(.+?) \| /);
      const base = m ? m[1].trim() : row.variantName;
      if (!baseNamePriceMap.has(base)) baseNamePriceMap.set(base, row.unitPrice);
    }
  }

  // Pass 2: fill zero prices
  for (const row of rows) {
    if (row.unitPrice > 0) continue;
    if (skuPriceMap.has(row.sku)) { row.unitPrice = skuPriceMap.get(row.sku)!; continue; }
    const m = row.variantName.match(/^(.+?) \| /);
    const base = m ? m[1].trim() : row.variantName;
    if (baseNamePriceMap.has(base)) row.unitPrice = baseNamePriceMap.get(base)!;
  }

  // Pass 3: group by base name
  const groups = new Map<string, CsvGroup>();
  for (const row of rows) {
    const m = row.variantName.match(/^(.+?) \| (.+?): (.+)$/);
    const baseName = m ? m[1].trim() : row.variantName;
    const variantType = m ? m[2].trim() : undefined;
    const variantValue = m ? m[3].trim() : undefined;

    if (!groups.has(baseName)) {
      groups.set(baseName, {
        variantType,
        variantValues: [],
        totalStock: 0,
        price: 0,
        primaryImageUrl: row.imageUrl,
      });
    }
    const g = groups.get(baseName)!;
    g.totalStock += row.inventory;
    if (row.unitPrice > 0 && g.price === 0) g.price = row.unitPrice;
    if (row.inventory > 0 && !g.primaryImageUrl) g.primaryImageUrl = row.imageUrl;
    if (variantValue && !g.variantValues.includes(variantValue)) g.variantValues.push(variantValue);
  }

  return groups;
}

// ── Main Import ──────────────────────────────────────────────────────────────

async function importCSV(csvPath: string) {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }
  if (!fs.existsSync(csvPath)) { console.error(`File not found: ${csvPath}`); process.exit(1); }

  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB\n');

  const rows = parseCSV(csvPath);
  console.log(`Parsed ${rows.length} rows from CSV`);

  const csvGroups = buildCsvGroups(rows);
  console.log(`Grouped into ${csvGroups.size} distinct products\n`);

  const importedNames = new Set<string>();
  let imported = 0;

  for (let i = 0; i < WIX_ORDER.length; i++) {
    const entry = WIX_ORDER[i];
    const { name, category, inferredPrice, featured = false, isNew = false } = entry;

    // sortOrder is 1-based position within each category's WIX_ORDER slice
    const sortOrder = i + 1;

    const csvGroup = csvGroups.get(name);

    // Determine price and stock
    const csvPrice = csvGroup?.price || 0;
    const price = csvPrice > 0 ? csvPrice : inferredPrice;
    let stock = csvGroup?.totalStock ?? 0;

    // Chains are per-inch — a stock of 1 in the CSV means "currently have 1 length".
    // Set a generous stock so the item never shows "Out of Stock" from the default quantity.
    if (category === 'chains' && stock > 0) stock = 100;

    const imageUrl = csvGroup?.primaryImageUrl ? fixImageUrl(csvGroup.primaryImageUrl) : '';
    const variantType = csvGroup?.variantType;
    const variantValues = csvGroup?.variantValues ?? [];
    const desc = generateDescriptions(name, category, variantType);
    const materials = inferMaterials(name);

    const productDoc = {
      name,
      description: desc.short,
      longDescription: desc.long,
      price,
      images: imageUrl ? [imageUrl] : [],
      category,
      featured: FEATURED_NAMES.has(name),
      new: isNew,
      options: {
        materials,
        customization: variantValues,
      },
      reviews: [],
      relatedProducts: [],
      stock,
      sortOrder,
    };

    await Product.findOneAndUpdate({ name }, productDoc, { upsert: true, new: true });

    const stockLabel = stock === 0 ? 'OUT OF STOCK' : `stock:${stock}`;
    const priceSource = csvPrice > 0 ? '' : ' (inferred)';
    const variantLabel = variantValues.length > 0 ? ` [${variantValues.length} ${variantType} options]` : '';
    console.log(`  ${String(i + 1).padStart(3)}. ✓ ${name} — $${price.toFixed(2)}${priceSource} [${category}] ${stockLabel}${variantLabel}`);

    importedNames.add(name);
    imported++;
  }

  // Also import any CSV products not in the Wix order list (extra/unlisted items)
  let extras = 0;
  for (const [name, group] of csvGroups) {
    if (importedNames.has(name)) continue;
    if (group.price === 0 && group.totalStock === 0) continue;

    const category = inferCategory(name);
    const desc = generateDescriptions(name, category, group.variantType);

    await Product.findOneAndUpdate(
      { name },
      {
        name,
        description: desc.short,
        longDescription: desc.long,
        price: group.price,
        images: group.primaryImageUrl ? [fixImageUrl(group.primaryImageUrl)] : [],
        category,
        featured: false,
        new: false,
        options: { materials: inferMaterials(name), customization: group.variantValues },
        reviews: [],
        relatedProducts: [],
        stock: group.totalStock,
        sortOrder: 999,
      },
      { upsert: true, new: true }
    );
    console.log(`  extra: ${name} — $${group.price.toFixed(2)} [${category}]`);
    extras++;
  }

  console.log(`\n── Done ───────────────────────────────────`);
  console.log(`  Wix catalog: ${imported} products`);
  if (extras > 0) console.log(`  Extra (CSV-only): ${extras} products`);

  await mongoose.disconnect();
}

function inferCategory(name: string): string {
  const n = name.toLowerCase();
  if (/ ring\b/.test(n) || n.endsWith(' band') || (/ band /.test(n) && !n.includes('chain'))) return 'rings';
  if (n.includes('chain')) return 'chains';
  if (
    n.includes('charm') || n.includes('locket') || n.includes('treble clef') ||
    n.includes('guitar') || n.includes('airplane') || n.includes('journey tag') ||
    n.includes('camera') || n.includes('flower bunch') || n.includes('positive word') ||
    n.includes('zodiac') || n.includes('birthstone') || n.includes('alphabet')
  ) return 'charms';
  return 'earrings';
}

const csvPath = process.argv[2];
if (!csvPath) {
  console.error('Usage: npx ts-node src/scripts/import-wix-csv.ts <path-to-csv>');
  process.exit(1);
}

importCSV(path.resolve(csvPath)).catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
