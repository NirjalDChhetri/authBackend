import { Otp } from "../entity/otp.entity"

export const otpHtml = (otp:string) => {
    return `
      <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <!-- font family -->
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      />
      <title>OPT Verification</title>
    </head>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Poppins", sans-serif !important;
      }
      body {
        background-color: rgb(233, 233, 233);
        padding: 2rem 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }
  ​
      h1,
      h2 {
        display: flex;
        justify-content: center;
        font-weight: 500;
      }
      h2 {
        padding-bottom: 1.5rem;
      }
      h1 {
        font-weight: 700;
        padding: 1rem 0;
        font-size: 26px;
      }
      h4 {
        padding-bottom: 0.5rem;
        font-weight: 400;
        font-size: 1.2rem;
      }
      h5 {
        padding-top: 1rem;
        font-size: 16px;
        font-weight: 400;
      }
    </style>
    <body>
      <div class="box">
        <h2>OTP Verification</h2>
        <h4>Hello,</h4>
        <h4>
          Please use the verification code below on the wada kanoon
          Delivery App
        </h4>
        <!-- replace OPT  -->
        <h1>${otp}</h1>
        <h4>
          If you did not request for this, please ignore this email or let us
          know.
        </h4>
        <h5>
          Thanks! <br />
          
        </h5>
      </div>
    </body>
  </html>
      
      `
  }
  