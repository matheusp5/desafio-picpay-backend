import { mailerTransporter } from '../configs/nodemailer'

const sendMail = async (
  from: string,
  to: string,
  subject: string,
  content: string,
) => {
  const info = await mailerTransporter.sendMail({
    from,
    to,
    subject,
    text: content,
  })

  return info.accepted
}

export { sendMail }
