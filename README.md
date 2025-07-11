# HisabKitab - Payment Tracker App

## 📌 Overview
HisabKitab is a **Payment Tracking App** designed to simplify managing and recording payments for events like weddings, group expenses, and contributions. It allows users to generate QR codes for payments, track transactions, and get AI-based payment suggestions(Not Till Now).

## 🚀 Features
- ✅ **QR Code Generation:** Each friend gets a QR code to make transactions easily.
- ✅ **Transaction History:** View a detailed history of payments received and made.
- ✅ **UPI Integration:** Supports **UPI** for payments.
- ✅ **AI-Based Payment Suggestions:** Provides smart suggestions based on transaction history.(working)
- ✅ **User Summary:** Track total money received and given.
- ✅ **Secure Authentication:** Uses **JWT-based authentication** for secure access.

## 🏗️ Tech Stack
### 💻 Frontend
- **React.js** (with Vite for fast development)
- **CSS** (for modern UI design)
- **React Router** (for navigation)

### 🛠️ Backend
- **Node.js & Express.js** (for API handling)
- **MongoDB Atlas** (for cloud database storage)
- **Mongoose** (for schema management)
- **JWT Authentication** (for secure user login)

### 📡 Deployment
- **Frontend:** Deployed on **vercel Hosting**
- **Backend:** Deployed on **Render** (or your current deployment platform)
- **Database:** Hosted on **MongoDB Atlas**


## 📦 Installation & Setup
### Prerequisites
- Node.js & npm installed
- MongoDB Atlas setup
  

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/manurana26770/HisabKitab.git
cd hisabkitab
```

### 2️⃣ Install Dependencies
```bash
# Backend
cd backend1
npm install

# Frontend
cd ../clientside
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the backend directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
PORT=

```

### 4️⃣ Run the Application
```bash
# Start Backend
cd backend
npm run dev

# Start Frontend
cd frontend
npm run dev
```

## 🌎 Live Demo
https://hisab-kitab-n3k6.vercel.app/


## 📌 Future Enhancements
- 🔹 **Export Transactions as PDF**
- 🔹 **Add Expense Categories**
- 🔹 **Graphical Insights & Analytics**

## 📬 Contact
📧 **Email:** manurana26770@gmail.com  



---
🚀 **HisabKitab** - Track Your Payments Like a Pro!

