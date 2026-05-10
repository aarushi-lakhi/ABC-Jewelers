import express from 'express';
import { emailController } from '../controllers/email.controller';

const router = express.Router();

router.post('/contact', emailController.contact);
router.post('/newsletter', emailController.newsletter);

export const emailRoutes = router;
