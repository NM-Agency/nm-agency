import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API route for contact form
  app.post("/api/contact", async (req, res) => {
    const { name, email, service, message } = req.body;

    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: "Alla fält är obligatoriska." });
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        // Detta löser felet "self-signed certificate" på din lokala dator
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "agencymarketingnm@gmail.com",
      subject: `Ny förfrågan från NM Agency: ${service}`,
      text: `Namn: ${name}\nE-post: ${email}\nTjänst: ${service}\n\nMeddelande:\n${message}`,
      replyTo: email
    };

    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("E-postuppgifter saknas i .env-filen.");
        return res.status(500).json({ error: "Servern är inte korrekt konfigurerad (saknar .env)." });
      }

      await transporter.sendMail(mailOptions);
      console.log("Email skickat utan problem!");
      res.json({ success: true, message: "Meddelandet har skickats!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Kunde inte skicka meddelandet. Kontrollera ditt app-lösenord." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();