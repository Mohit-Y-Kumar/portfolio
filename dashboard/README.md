# 📊 Dashboard

A modern, responsive, and fully functional admin dashboard built with **React 19**, **Vite**, **Tailwind CSS**, **Redux Toolkit**, and **shadcn/ui** components. This dashboard is part of a full-stack portfolio project and can be extended for analytics, admin management, or SaaS platforms.

## ✨ Features

- ⚡️ Blazing fast with Vite
- 🎨 Modern UI powered by Tailwind CSS & shadcn/ui
- 🌐 React Router DOM v7 for navigation
- 🧠 State management with Redux Toolkit
- 🔔 Notifications using React Toastify
- 🌙 Dark mode ready (via Tailwind + Radix)
- 📦 API calls with Axios
- ✅ Eslint for clean code and linting

## 🚀 Features Overview

### 👤 User Management
- Displays **user profile image**
- Shows **portfolio link**
- Presents **about section** and other personal info
- Lists **services provided**

### 📁 Project Management
- Add new projects with image, title, GitHub/demo links, etc.
- View all added projects
- Delete or update projects
- Show each project in real-time on the frontend portfolio

### 🛠️ Skills Management
- Add skills with SVG/image, title, and percentage (out of 100)
- Render a **progress bar** representing skill level visually
- Delete or update skills
- Organized grid layout with skill icons and titles

### 📦 Software Applications
- View a list of key **software/tools used**
- Option to add/remove applications or tools

### 🕒 Timeline Management
- Add experiences or milestones with title, year, and description
- Modify or delete timeline entries
- Show these chronologically in the frontend portfolio


## 🛠️ Tech Stack

| Technology         | Usage                |
|--------------------|----------------------|
| React 19           | Frontend framework   |
| Vite               | Build tool           |
| Tailwind CSS       | Styling              |
| shadcn/ui + Radix  | UI components        |
| Redux Toolkit      | State management     |
| React Router DOM   | Routing              |
| Axios              | HTTP requests        |
| React Toastify     | Toast notifications  |
| Eslint             | Code linting         |

## 📁 Project Structure

dashboard/
├── public/
├── src/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ ├── routes/
│ └── main.jsx
├── .eslintrc
├── tailwind.config.js
└── vite.config.js


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-dashboard-repo.git
cd dashboard
### 2. Install dependencies
npm install
### 3. Run the development server
npm run dev