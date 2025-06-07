# 🌐 Developer Portfolio Website

A clean, interactive, and modern **personal portfolio website** built with **React + Vite + Tailwind CSS + shadcnUI**. It showcases your profile, skills, timeline, projects, contact form, and social links — all customizable and responsive.

---

## 🧑‍💻 Features

### ✅ Hero Section
- Shows **user name**
- Displays **area of interest**
- Renders **user profile image**
- Includes clickable social media icons:
  - 🌐 GitHub
  - 📸 Instagram
  - 💼 LinkedIn
  - 🐦 Twitter
- **Resume download/view** button

---

### 📜 About Me
- Displays an **about image**
- Shows a short **biography / personal introduction**
- Emphasizes passion, focus area, and goals

---

### ⏳ Timeline Section
- Lists educational and professional milestones
- Shows:
  - Title (e.g., "Intern at XYZ")
  - Year / duration
  - Short description
- Clean vertical or horizontal timeline layout

---

### 🛠️ Skills Section
- Grid-based skill view
- Each skill includes:
  - Skill icon/image (uploaded by admin via dashboard)
  - Skill name
  - Proficiency % visualized via a progress bar

---

### 💼 Projects Section
- Showcase of all projects added via the dashboard
- Each project shows:
  - Project image/thumbnail
  - Title
  - Description
  - **Tech stack used**
  - GitHub repo link
  - Live deployed link 
  - Fully responsive layout

---

### 📱 My Apps
- List of custom apps/software/tools created
- App cards or list view with title/icon

---

### 📬 Contact Me
- Interactive **contact form** for visitors:
  - Name
  - Subject
  - Message
- Messages sent are stored (via backend API)
- Toast notification on success/failure

---

## ⚙️ Tech Stack

| Tech                | Description                      |
|---------------------|----------------------------------|
| React + Vite        | Frontend framework               |
| Tailwind CSS        | Styling framework                |
| Axios               | API communication                |
| React Router DOM    | Client-side routing              |
| Toastify            | Notifications                    |
| Shadcn UI           | Reusable styled components       |

---

## 📁 Folder Structure (Client)

client/
├── src/
│ ├── assets/ # Images and static files
│ ├── components/ # Reusable UI components
│ ├── pages/ # Hero, About, Skills, Projects, Contact
│ ├── App.jsx # Main app component
│ └── main.jsx # Entry point
├── public/
├── tailwind.config.js
├── vite.config.js
└── index.html


---

## 🧪 How to Use

### 1. Clone the Repo

```bash
## git clone https://github.com/yourusername/portfolio-website.git
  cd client

## install dependencies
  npm install

## start development server
npm run dev
