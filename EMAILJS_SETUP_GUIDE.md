# EmailJS Setup Guide for Portfolio Contact Form

Follow these steps to set up EmailJS so you can receive emails from your portfolio contact form.

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider:
   - **Gmail** (recommended for Gmail users like yourself)
   - **Outlook** 
   - **Yahoo**
   - Or any other provider
4. For Gmail:
   - Click on "Gmail"
   - Click "Connect Account" 
   - Sign in with your Gmail account (kmmayank08@gmail.com)
   - Allow EmailJS permissions
5. Copy the **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template content:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Template Content:**
```
Hello Mayank,

You have received a new message from your portfolio contact form.

From: {{from_name}} ({{from_email}})
To: {{to_name}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
Reply-to: {{reply_to}}
```

4. Click **Save** and copy the **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `user_AbCdEf123456`)
3. Copy this key

## Step 5: Update Your .env File

Open the `.env` file in your project root and replace the placeholder values:

```env
# EmailJS Configuration - Replace with your actual values
VITE_EMAILJS_SERVICE_ID=service_your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=template_your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key

# Development Configuration
VITE_APP_TITLE=Mayank Chouhan Portfolio
VITE_APP_DESCRIPTION=Full-stack developer specializing in React, Node.js, and modern web technologies
```

**Example with actual values:**
```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_AbCdEf123456
```

## Step 6: Test Locally

1. Save the `.env` file
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Go to the contact page and test the form
4. Check the browser console for any errors
5. Check your email for the test message

## Step 7: Deploy to Production

After testing locally:

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Configure EmailJS for contact form"
   git push origin main
   ```

2. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

## Important Security Notes

- The `.env` file is already added to `.gitignore` so your keys won't be committed to GitHub
- For production deployment, you'll need to set environment variables in GitHub Actions or your hosting platform
- The public key is safe to expose in the frontend (it's designed for client-side use)

## Troubleshooting

### Common Issues:

1. **"EmailJS is not properly configured" error:**
   - Make sure you've replaced all placeholder values in `.env`
   - Restart your dev server after changing `.env`

2. **Email not received:**
   - Check your spam folder
   - Verify the email template is set up correctly
   - Make sure the service is connected to the right email account

3. **CORS errors:**
   - EmailJS should handle CORS automatically
   - Make sure you're using the correct service ID and public key

4. **Template errors:**
   - Ensure all template variables match what's being sent from the form
   - Check the template in EmailJS dashboard

### Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Check EmailJS dashboard for service status
3. Verify all IDs are copied correctly (no extra spaces)
4. Test with a simple template first

## Free Plan Limits

EmailJS free plan includes:
- 200 emails per month
- Basic templates
- Standard support

This should be sufficient for a portfolio contact form.

---

Once you complete these steps, your contact form will be fully functional and you'll receive emails at kmmayank08@gmail.com whenever someone fills out the form on your portfolio!
