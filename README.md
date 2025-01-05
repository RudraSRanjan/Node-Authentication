# Node-Authentication


This project is a Node.js application that provides authentication functionality, including sign up, sign in, sign out, password reset, and Google login/signup.


## Features
- **Sign up with Email**: Users can create an account by providing their email and password.
- **Sign In**: Users can sign in with their email and password.
- **Sign Out**: Users can sign out of their accounts.
- **Reset Password**: Users can reset their passwords after signing in.
- **Encrypted Passwords**: Passwords stored in the database are encrypted for security.
- **Google Login/Signup**: Users can sign in or sign up using their Google accounts.[here](https://console.cloud.google.com/apis/credentials/oauthclient/536056079130-v11aanfp4imnsmf22pi2779hm1ouh25a.apps.googleusercontent.com?project=nodejs-authentication-414411)
- **Forgot Password**: Users can reset their passwords via email.
- **Password Strength Validation**: Notifications are displayed for unmatching passwords during sign up and incorrect passwords during sign in.


## Environment Variables

To run the application, you need to set the following environment variables in a `.env` file at the root of your project:

1. **PORT**: Specifies the port number the application listens on.
2. **DB_URL**: Specifies the MongoDB database URL.
3. **CLIENT_ID**: Client ID for Google authentication.
4. **CLIENT_SECRET**: Client Secret for Google authentication (sign in with Google).
5. **EMAIL**: Email address to send Gmail messages.
6. **PASSWORD**: Password for the Gmail account (use Gmail App Password if enabled).
7. **RECAPTCHA_SECRET_KEY**: Secret key to use Google reCAPTCHA.
8. **CLIENT_URL**: URL to redirect after signing in with Google, e.g., "http://localhost:3000/auth/login/success".

Ensure that you have the appropriate values for each variable before running the application.

Example `.env` file:

```plaintext
PORT=4100
DB_URL=mongodb://localhost:27017/mydatabase
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
EMAIL=your_email@gmail.com
PASSWORD=your_gmail_password
CLIENT_URL=http://localhost:4100/auth/login/success
```


## Installation

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/node-authentication.git
    ```
2. Install dependencies:
   ```bash
   npm install

3. Start the server:
   ```bash
   npm start
- `Open your web browser and visit http://localhost:4100 to access the application.`

## Dependencies

- Express.js
- MongoDB
- Passport.js
- bcrypt
- express-session
- express-ejs-layouts
- dotenv
- nodemailer








  
