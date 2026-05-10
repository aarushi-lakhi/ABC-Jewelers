import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { Newsletter } from '../models/newsletter.model';

const STORE_EMAIL = 'jewelersabc@gmail.com';

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  });
}

export const emailController = {
  // POST /api/email/contact
  contact: async (req: Request, res: Response) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const transporter = getTransporter();
    if (!transporter) {
      console.log(`[Contact form — email not configured]\nFrom: ${name} <${email}>\nSubject: ${subject}\n\n${message}`);
      return res.json({ ok: true });
    }

    try {
      await transporter.sendMail({
        from: `"ABC Jewelers Contact" <${process.env.EMAIL_USER}>`,
        to: STORE_EMAIL,
        replyTo: email,
        subject: `[ABC Jewelers] ${subject}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr/>
          <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
      });
      res.json({ ok: true });
    } catch (err) {
      console.error('Contact email error:', err);
      res.status(500).json({ error: 'Failed to send message. Please email us directly at jewelersabc@gmail.com.' });
    }
  },

  // POST /api/email/newsletter
  newsletter: async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    try {
      await Newsletter.create({ email });
    } catch (err: any) {
      if (err.code === 11000) {
        return res.json({ ok: true, alreadySubscribed: true });
      }
      return res.status(500).json({ error: 'Could not subscribe. Please try again.' });
    }

    const transporter = getTransporter();
    if (transporter) {
      // Welcome email to subscriber
      transporter.sendMail({
        from: `"ABC Jewelers" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Welcome to ABC Jewelers!',
        html: `
          <h2>Thank you for subscribing!</h2>
          <p>You're now on our list for new products, special offers, and impact stories.</p>
          <p>Every purchase you make funds medical care for low-income patients — thank you for being part of our mission.</p>
          <br/>
          <p>Shop our collection: <a href="${process.env.FRONTEND_URL}/shop">ABC Jewelers</a></p>
          <br/>
          <p style="color:#888;font-size:12px;">To unsubscribe, reply to this email with "Unsubscribe".</p>
        `,
      }).catch(console.error);

      // Notify store owner
      transporter.sendMail({
        from: `"ABC Jewelers" <${process.env.EMAIL_USER}>`,
        to: STORE_EMAIL,
        subject: `New newsletter subscriber: ${email}`,
        text: `${email} just subscribed to the newsletter.`,
      }).catch(console.error);
    }

    res.json({ ok: true });
  },
};
