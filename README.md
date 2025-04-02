# 🤖 ECHOAI

ECHOAI is a modern AI-powered chat platform that merges the power of large language models with a beautiful user interface and secure authentication. Designed with scalability, performance, and user experience in mind, ECHOAI is your go-to AI chat starter project.

---

## ✨ Features

- 🔐 **Authentication with Clerk**
- 💬 **Real-time AI chat using Google Generative AI**
- 📸 **Image uploads and hosting with ImageKit**
- 🗃️ **MongoDB for storing chat sessions**
- ⚡ **React + Vite frontend for blazing fast UI**
- 🌐 **Express backend with CORS and environment configs**

---

## 🧱 Tech Stack

### 🖥️ Client

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [@clerk/clerk-react](https://www.npmjs.com/package/@clerk/clerk-react)
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- [@tanstack/react-query](https://tanstack.com/query)
- [ImageKit React](https://www.npmjs.com/package/imagekitio-react)

### 🔧 Server

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Clerk Express](https://www.npmjs.com/package/@clerk/express)
- [ImageKit SDK](https://docs.imagekit.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js v20 or later
- MongoDB database URI
- Clerk API keys
- ImageKit public/private keys

---

### 📁 Clone the Repository

```bash
git clone https://github.com/yourusername/ECHOAI.git
cd ECHOAI
```

---

### 🖥️ Set up Backend

```bash
cd backend
npm install
cp .env.example .env  # Create a .env file with your config
npm run dev           # Start backend in development mode
```

---

### 🌐 Set up Frontend

```bash
cd client
npm install
npm run dev           # Runs frontend on http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `/backend` folder and add the following:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

---

## ⚙️ Scripts

### Backend

```bash
npm run dev     # Start development server
npm start       # Start production server
```

### Frontend

```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
npm run preview # Preview production build
```

---

## 📦 Deployment

- Ready to deploy on **Vercel**
- Includes a `vercel.json` for backend + frontend configuration

---

## 📸 Screenshots

Screenshot 2025-04-02 134228.png
Screenshot 2025-04-02 134306.png

---

## 🙋‍♂️ Author

**Pranav Pachpande**  
https://github.com/pranavRP

---
