const contactModel = require("../models/contact")
const nodemailer = require('nodemailer')
require('dotenv').config()

const addWhatsapp = async (req, res) => {
  try {
    const { whatsapp, email } = req.body
    const newContact = new contactModel({whatsapp: whatsapp})
    await newContact.save()

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORDEMAIL
      }
    })

    const emailOption = {
      from: process.env.EMAIL,
      to: email,
      subject: "Novo lead",
      html: `
        <div style="border:1px solid #dadce0; border-radius:8px; padding:40px 20px;">
          <center>
            <div style="border-bottom:1px solid #dadce0;">
              <h1>Novo Lead !</h1>
            </div>
            <p>
              Contato: <strong>${whatsapp}</strong> 
            </p>
          </center>
        </div>
      `
    }
    transporter.sendMail(emailOption)
    res.status(200).json({ type: "success", message: "contact has been saved" })

  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

const contactController = {
  addWhatsapp
}

module.exports = { contactController }