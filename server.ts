import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  // Render sätter automatiskt PORT, annars används 3000 lokalt
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API route för kontaktformuläret
  app.post("/api/contact", async (req, res) => {
    const { name, email, service, message } = req.body;

    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: "Alla fält är obligatoriska." });
    }

    // Konfigurera e-post (Transporter)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
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
        console.warn("E-postuppgifter saknas!");
        return res.status(500).json({ error: "E-post är inte konfigurerad på servern." });
      }

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Meddelandet har skickats!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Kunde inte skicka meddelandet. Försök igen senare." });
    }
  });

  // Visa filer i huvudmappen (index.html, bilder osv.)
  app.use(express.static(process.cwd()));
  
  // Visa src-mappen om dina script/bilder ligger där
  app.use('/src', express.static(path.join(process.cwd(), 'src')));

  // Fånga upp alla andra förfrågningar och skicka index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(process.cwd(), "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
