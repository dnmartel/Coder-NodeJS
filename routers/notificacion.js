import { Router } from "express";
import { logger } from "../log/logger.js";
import { createTransport } from "nodemailer";
import twilio from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;

const client = twilio(accountSid, authToken);

const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "kayden.kirlin64@ethereal.email",
        pass: "k9g2VvAqKBXHMdPTPA"
    }
});
const router = Router();

router.post("/notificar", async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl} - Metodo: ${req.method}`);

    try {
        logger.info("Enviando correo");
        await transporter.sendMail({
            from: "Backend Node Server",
            to: process.env.TEST_MAIL,
            subject: `Nuevo pedido de ${
                (req.session.name, "+", req.session.email)
            }`,
            text: req.body.mensaje
        });
        logger.info(
            `Nuevo pedido de ${req.body.name + " - " + req.body.email}`
        );
        logger.info("Éxito Email");
    } catch (error) {
        logger.error(error);
    }

    try {
        logger.info("Enviando Whatsapp");
        await client.messages.create({
            body: `Nuevo pedido de ${
                (req.session.name, "+", req.session.email)
            }`,
            from: "whatsapp:+14155238886",
            to: "whatsapp:+5491155693501"
        });
        logger.info("Éxito Whatsapp");
    } catch (error) {}

    try {
        logger.info("Enviando SMS");
        await client.messages.create({
            body: "Su pedido ha sido recibido y se encuentra en proceso.",
            from: "+12057368306",
            to: req.body.phone
        });
        logger.info("Éxito SMS");
    } catch (error) {
        logger.error(error);
    }
});

export default router;
