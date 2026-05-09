import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { User } from '../models/user.model';

/**
 * Creates an admin user or promotes an existing user to admin.
 *
 * Usage:
 *   npx ts-node src/scripts/create-admin.ts <email> <password>
 *
 * If an account with that email already exists, it is promoted to admin
 * (password is ignored). If it doesn't exist, a new admin account is created.
 */
async function createAdmin(email: string, password: string) {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) { console.error('MONGODB_URI not set'); process.exit(1); }

  await mongoose.connect(MONGODB_URI);

  const existing = await User.findOne({ email });

  if (existing) {
    if (existing.role === 'admin') {
      console.log(`✓ ${email} is already an admin.`);
    } else {
      existing.role = 'admin';
      await existing.save();
      console.log(`✓ Promoted ${email} to admin.`);
    }
  } else {
    await User.create({ name: 'Admin', email, password, role: 'admin' });
    console.log(`✓ Created admin account: ${email}`);
  }

  await mongoose.disconnect();
}

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage: npx ts-node src/scripts/create-admin.ts <email> <password>');
  process.exit(1);
}

createAdmin(email, password).catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
