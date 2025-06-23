const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendAppointmentMail = async (to, subject, htmlContent) => {
  try {
    const mailOptions = {
      from: `"Hospital Booking" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};

module.exports = sendAppointmentMail;