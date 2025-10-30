# SAWO React
Welcome to the SAWO React Application! This guide will help you set up and run the project locally.

---

## 📋 Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

---

## 🚀 Getting Started
Follow these steps to get the application running on your local machine:

### 1️⃣ Clone the Repository
Clone the repository using one of the following commands:

**Clone the default branch:**
```bash
git clone https://github.com/SawoWebDev/sawocom.git
```

**Clone a specific branch:**
```bash
git clone -b "branch-name" https://github.com/SawoWebDev/sawocom.git
```

### 2️⃣ Navigate to the Frontend Directory
```bash
cd frontend
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Run the Application
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`

---

## 🧱 Project Structure
Here's a comprehensive overview of the SAWOJS project layout:

```
SAWOJS/
│
├── backend/
│   ├── app.js
│   ├── .env
│   ├── package.json
│   ├── models/
│   │   ├── db.js
│   │   ├── Template.js            # Model for custom templates
│   │   ├── Page.js                # Model for custom pages that use templates
│   │   ├── Content.js             # Model for form content/input data
│   │   ├── Seo.js                 # Model for SEO fields
│   ├── routes/
│   │   ├── templates.js           # API endpoints for managing templates
│   │   ├── pages.js               # API endpoints for managing custom pages
│   │   ├── content.js             # API endpoints for managing content
│   │   ├── seo.js                 # API endpoints for managing SEO data
│   ├── controllers/
│   │   ├── templatesController.js
│   │   ├── pagesController.js
│   │   ├── contentController.js
│   │   ├── seoController.js
│   ├── middleware/
│   │   ├── auth.js                # Authentication middleware
│   │   ├── validate.js            # Validation middleware
│   ├── utils/
│   │   ├── emailSender.js         # For sending emails
│   │   ├── templateEngine.js      # For rendering templates
│   │   ├── formGenerator.js       # For generating forms from templates
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx         # Reusable Header
│   │   │   ├── Footer.jsx         # Reusable Footer
│   │   │   ├── TemplateRenderer.jsx   # Renders custom templates
│   │   │   ├── FormGenerator.jsx      # Renders forms for template input
│   │   │   ├── SeoFields.jsx          # Component for SEO input fields
│   │   ├── pages/
│   │   │   ├── MainPage.jsx
│   │   │   ├── CustomPage.jsx        # Renders selected custom template/content
│   │   │   ├── CreateTemplate.jsx    # UI for drag-and-drop template creation
│   │   │   ├── ManageTemplates.jsx   # List/select templates
│   │   ├── hooks/
│   │   │   ├── useTemplates.js
│   │   │   ├── useContent.js
│   │   ├── utils/
│   │   │   ├── api.js                # API calls to backend
│   │   ├── App.js
│   │   ├── index.js
│   └── README.md
│
├── database/
│   ├── schema.sql                   # All table definitions (templates, pages, content, seo, etc.)
│
├── docs/
│   ├── architecture.md
│   ├── routes.md
│   ├── templates.md
│   ├── seo.md
│
└── README.md
```

---

## 📦 Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

---

## 🔀 Git Commands
Here are commonly used Git commands for working with this project:

### Check Repository Status
```bash
git status
```

### Switch to a Different Branch
```bash
git checkout branch-name
```

### Create a New Branch

**Create and switch to a new branch:**
```bash
git checkout -b new-branch-name
```

**Or create a branch without switching:**
```bash
git branch new-branch-name
```

### Stage Changes

> **⚠️ Important Note:** When adding files, make sure you are in the correct file path. If the files you want to add are outside of the `frontend` folder, you must navigate outside of the `frontend` folder first before adding those files.

**Add all files:**
```bash
git add .
```

**Add a specific file:**
```bash
git add filename.ext
```
Example:
```bash
git add README.md
```

**Add a specific folder:**
```bash
git add foldername/
```
Example:
```bash
git add frontend/
```

### Commit Changes
```bash
git commit -m "Commit comment"
```

### Push Changes

**Push to main branch:**
```bash
git push origin
```

**Push to a specific branch:**
```bash
git push origin branch-name
```

### Delete a Local Branch

**Switch to main branch:**
```bash
git checkout main
```

**Pull latest changes:**
```bash
git pull origin main
```

**Delete the local branch:**
```bash
git branch -d branch-name
```

**Fetch and prune to remove remote-tracking references:**
```bash
git fetch -p
```

---

## 🛠️ Built With
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Node.js](https://nodejs.org/) - JavaScript runtime
- [npm](https://www.npmjs.com/) - Package manager