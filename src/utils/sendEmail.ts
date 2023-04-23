import nodemailer from 'nodemailer'
import log from 'npmlog'

interface ISendEmail {
  to: string
  subject: string
  html: string
  from?: string
  text?: string
}

const sendEmail = async ({ to, subject, html, text = '', from = 'ilanalarmi@example.com ' }: ISendEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    const emailInfo = await transporter.sendMail({
      text,
      from,
      to,
      subject,
      html,
    })

    log.info('email', `email was sent: ${emailInfo.response} | ${emailInfo.accepted.join(',')}`)
  } catch (err) {
    log.warn('email', `email could"t be sent: ${err}`)
  }
}

export default sendEmail
