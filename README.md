# ☁️ Intelligent Cloud Application Catalog

A modern, full-stack cloud resource management system built with **Spring Boot** (Java) and **React + Vite**. This project demonstrates a complete Cloud-Native workflow: from a containerized backend to a managed PostgreSQL database on Supabase.

## 🚀 Live Demo
**Frontend:** [https://cloud-app-catalog-eight.vercel.app](https://cloud-app-catalog-eight.vercel.app)  
**Backend API:** [https://cloud-app-backend-rkh4.onrender.com/api/applications](https://cloud-app-backend-rkh4.onrender.com/api/applications)  
*(Note: Uses Render Free Tier; please allow ~50s for the cold-start if the site is idle.)*

---

## ✨ Features
* **Dynamic Cataloging** — Add, categorize, and track cloud applications in real-time.
* **Intelligent Filtering** — Filter by category (DevOps, Database, Frontend) and sort by usage count.
* **Cloud-Native Architecture** — Containerized backend using Docker for consistent deployments.
* **Scalable Database** — Powered by Supabase (PostgreSQL) with connection pooling.
* **Modern UI** — Responsive dashboard built with Tailwind CSS and Framer Motion for smooth transitions.

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS | High-performance UI & Dashboard |
| **Backend** | Spring Boot 3, Java 21, JPA | RESTful API & Business Logic |
| **Database** | PostgreSQL (Supabase) | Persistent Cloud Storage |
| **Container** | Docker | Environment Parity & Deployment |
| **Hosting** | Render (API), Vercel (Web) | Multi-Cloud Deployment |

---

## 🏗️ Project Structure
```text
Full-Cloud-App/
├── backend/
│   ├── src/                 # Java Source Code (Spring Boot)
│   ├── Dockerfile           # Multi-stage Docker build instructions
│   ├── mvnw                 # Maven Wrapper
│   └── pom.xml              # Project Dependencies
├── frontend/
│   ├── src/                 # React Components & Pages
│   ├── public/              # Static Assets
│   └── package.json         # Scripts and UI Dependencies
└── README.md                # Project Documentation