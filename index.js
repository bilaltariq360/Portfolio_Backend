const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors());

app.post("/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "hafizbilaltariq360@gmail.com",
      pass: "bklh nlqb uxbh recf",
    },
  });

  let info = await transporter.sendMail({
    from: {
      name: "Portfolio",
      address: "hafizbilaltariq360@gmail.com",
    },
    to: `hafizbilaltariq360@gmail.com`,
    subject: `${subject}`,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 1px solid #eee;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
                color: #444;
            }
            .content {
                padding: 20px 0;
            }
            .content p {
                margin: 0 0 10px;
            }
            .content p span {
                font-weight: bold;
                color: #51CBCE;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Contact Form Submission</h1>
            </div>
            <div class="content">
                <p><span>Name:</span> ${name}</p>
                <p><span>Email:</span> ${email}</p>
                <p><span>Phone:</span> ${phone}</p>
                <p><span>Subject:</span> ${subject}</p>
                <p><span>Message:</span></p>
                <p>${message}</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 BrainDev. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `,
  });
  const sendMail = async (transporter, mailOptions) => {
    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error(error);
    }
  };
  res.send({ name: "Bilal Tariq" });
});

const server = app.listen("3000");
