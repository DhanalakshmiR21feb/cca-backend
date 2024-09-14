const express = require("express");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4040;

// Body parser middleware to parse JSON data from requests
app.use(express.json());

//allowing CORS for our site
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your desired origin
  optionsSuccessStatus: 200, // Some legacy browsers (e.g., IE11) choke on a 204 response
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Backend is running");
});
// Define an endpoint to send emails
// let transporter = nodemailer.createTransport(
//   smtpTransport({
//     service: 'gmail',
//     port: 465,
//     // secure: true,
//     auth: {
//       user: 'tempmailhandler@gmail.com',
//       pass: 'wsbi ipnn jwku euig'
//     }
//   })
// )
app.post("/send-email", (req, res) => {
  const { name, email, contactNo, course, message } = req.body;
  const transporter1 = nodemailer.createTransport({
    host: "smtpout.secureserver.net", // GoDaddy SMTP server
    port: 465, // Secure SMTP port
    secure: true, // Use SSL
    auth: {
      user: "info@codecraftacademy.co.in", // Your GoDaddy email
      pass: "codecraftbdvt", // Your GoDaddy email password
    },
  });
  // mail to Admin
  const enqMailOptions = {
    from: "info@codecraftacademy.co.in",
    to: "dhanalakshmir21feb@gmail.com",
    cc: "kiranscad@gmail.com", // recipient's email address
    subject: "New Enquiry",
    text: `Name: ${name}\nEmail: ${email}\nContactNo: ${contactNo}\nInterested Course: ${course}\nMessage: ${message}`,
  };
  //
  // res.status(200).send(email);
  transporter1.sendMail(enqMailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Email could not be sent.");
    } else {
      console.log("61");
      // mail to User
      const enqUserMailOptions = {
        from: '"Code Craft Academy" <info@codecraftacademy.co.in>', // Sender address with your name
        to: email, // Recipient's email address
        subject: "Thank You for Reaching Out to Us!", // Subject line
        text: "Thank you for reaching out to us! We will get back to you shortly.", // Plain text version (optional)
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to us! We have received your request and will get back to you as soon as possible.</p>
          <p>If you have any additional questions, feel free to reply to this email.</p>
          <br/>
          <p>Best Regards,</p>
          <p><strong>Admin</strong></p>
          <p>Code Craft Academy</p>
          <img src="cid:logo" alt="Company Logo" style="width: 150px; height: auto;"/>
        </div>
      `,
      attachments: [
        {
          filename: 'logo.png',
          path: './images/logo.png', // Path to the logo file on your server
          cid: 'logo' // Same as in the img src tag
        }
      ]
      };

      // res.status(200).send(email);
      transporter1.sendMail(enqUserMailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send("Email could not be sent.");
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send("Registered sent successfully.");
        }
      });
    }
  });
});
app.post("/subscription-email", (req, res) => {
  const email = req.body.email;
  const transporter2 = nodemailer.createTransport({
    host: "smtpout.secureserver.net", // GoDaddy SMTP server
    port: 465, // Secure SMTP port
    secure: true, // Use SSL
    auth: {
      user: "info@codecraftacademy.co.in", // Your GoDaddy email
      pass: "codecraftbdvt", // Your GoDaddy email password
    },
  });
  // mail to Admin
  const subMailOptions = {
    from: "info@codecraftacademy.co.in",
    to: "dhanalakshmir21feb@gmail.com",
    cc: "kiranscad@gmail.com", // recipient's email address
    subject: "New Subscription",
    text: `New Subscription Email: ${email} notified`,
  };
  //
  // res.status(200).send(email);
  transporter2.sendMail(subMailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Email could not be sent.");
    } else {
      // mail to User
      const subUserMailOptions = {
        from: '"Code Craft Academy" <info@codecraftacademy.co.in>', // Sender address with your name
        to: email, // Recipient's email address
        subject: "Subscription Confirmation", // Subject line
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .logo {
                text-align: center;
                margin-bottom: 20px;
              }
              .logo img {
                max-width: 150px;
                height: auto;
              }
              .content {
                font-size: 16px;
                color: #333333;
              }
              .content p {
                margin: 0 0 15px;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 12px;
                color: #777777;
              }
              .signature {
                margin-top: 20px;
              }
              .signature p {
                margin: 5px 0;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="logo">
                <img src="cid:logo" alt="Company Logo">
              </div>
              <div class="content">
                <p>Dear Customer,</p>
                <p>Thank you for subscribing to our services! We're thrilled to have you on board and excited to provide you with the latest updates, exclusive offers, and valuable content directly in your inbox.</p>
                <p>You can expect to receive updates about our new products, features, and promotions that will help you get the most out of your experience with us.</p>
                <p>If you have any questions or need further assistance, feel free to contact us at +91 9844437118.</p>
                <p>We look forward to being part of your journey!</p>
                <div class="signature">
                  <p>Best Regards,</p>
                  <p><strong>Customer Support Team</strong></p>
                  <p>Code Craft Academy</p>
                  <p><a href="https://codecraftacademy.co.in">www.codecraftacademy.co.in</a></p>
                </div>
              </div>
              <div class="footer">
                <p>This is an automated email. Please do not reply to this message. If you have any questions, contact our support team at
                <a href="mailto:info@codecraftacademy.co.in">info@codecraftacademy.co.in</a>.</p>
              </div>
            </div>
          </body>
        </html>
      `,
        attachments: [
          {
            filename: 'logo.png',
            path: './images/logo.png', // Path to the logo file on your server
            cid: 'logo' // Same as in the img src tag
          }
        ]
      };
      // res.status(200).send(email);
      transporter2.sendMail(subUserMailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).send("Email could not be sent.");
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send("Subscribed successfully.");
        }
      });
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
