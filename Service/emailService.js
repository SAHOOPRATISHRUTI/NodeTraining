const {transporter, mailOptions} = require("../emailSetup/mailsetUp");


// const emailConstants = require("../constants/emailConstants");

/**FUNC- TO SEND EMAIL TO USER */
const sendEmail = async (
  email,
  emailSubject,
  mailData,

) => {
  const mailOptionsInfo = {
    from: mailOptions.from,
    to: email,
    subject: emailSubject,
    html: mailData,
  
  };
  console.log(mailOptionsInfo);
  const isSuccess = await transporter.sendMail(mailOptionsInfo);
  console.log("isSuccess-------------", isSuccess);
  return isSuccess;
};

module.exports = {
  sendEmail,
};