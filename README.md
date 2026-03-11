# rizwankhan
Portfolio

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

## Contact Form – Email Notifications

The contact form uses **[EmailJS](https://www.emailjs.com)** to deliver email notifications whenever someone submits a message. Follow the steps below to activate it.

### 1 – Create a free EmailJS account

Go to <https://www.emailjs.com> and sign up (the free tier allows 200 emails/month).

### 2 – Add an email service

In the EmailJS dashboard, click **Email Services → Add New Service** and connect your Gmail (or any other provider). Copy the **Service ID** (e.g. `service_xxxxxxx`).

### 3 – Create an email template

Click **Email Templates → Create New Template**. Design the notification email you want to receive. The form fields map to these template variables:

| Template variable | Form field |
|---|---|
| `{{from_name}}` | Sender's name |
| `{{reply_to}}` | Sender's email address |
| `{{subject}}` | Message subject |
| `{{message}}` | Message body |

Save the template and copy the **Template ID** (e.g. `template_xxxxxxx`).

### 4 – Get your Public Key

In the dashboard go to **Account → General → Public Key** and copy it.

### 5 – Set environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

For production on **Vercel**, add the same three variables in **Project Settings → Environment Variables**.

### 6 – Test locally

```bash
npm run dev
```

Fill out the contact form and submit – you should receive an email at the address connected to your EmailJS service.

---

## Deploying to Vercel

### Option 1 – Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. Vercel will detect the Vite framework automatically.

### Option 2 – Vercel Dashboard (recommended)

1. Push this repository to GitHub (or GitLab / Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects the **Vite** framework and sets the build command to `npm run build` and the output directory to `dist`.
4. Add the three `VITE_EMAILJS_*` environment variables in **Project Settings → Environment Variables**.
5. Click **Deploy** – your site will be live in seconds.

> **Note:** The `vercel.json` at the root configures client-side routing so all paths are served by `index.html`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |

