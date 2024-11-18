const router = require("express").Router();
const nodemailer = require("nodemailer");

router.get("/mail", async (req, res, next) =>{
  res.json({message:"parlamento"})
})

// POST "/api/mails/send-email"
router.post("/send-email", async (req, res, next) => {
  const { name, email, message } = req.body;

  // Validar que los campos estén completos
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  // Configurar el transporte de Nodemailer
  const transporter = nodemailer.createTransport({
    host: "smtp.ionos.es",
    port: 587,
    secure: false,
    auth: {
      user: process.env.IONOS_EMAIL, // Reemplaza con tu correo
      pass: process.env.IONOS_PASSWORD, // Reemplaza con tu contraseña o token de app
    },
  });

  // Configurar el contenido del correo
  const mailOptions = {
    from: process.env.IONOS_EMAIL,
    to: process.env.IONOS_EMAIL, // Tu correo, donde recibirás los mensajes
    subject: `Nuevo mensaje de ${name}`,
    text: `Tienes un nuevo mensaje:\n\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${message}`,
  };

  // Enviar el correo
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Correo enviado con éxito." });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).json({ error: "No se pudo enviar el correo." });
    next(error)
  }
});

module.exports = router