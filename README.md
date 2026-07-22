<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">


# Yureeya - FE

<em>Empowering Innovation, Elevating User Experiences Daily</em>

<!-- BADGES -->
<img src="https://img.shields.io/github/last-commit/jueunseuk/CYRProject-FE?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
<img src="https://img.shields.io/github/languages/top/jueunseuk/CYRProject-FE?style=flat&color=0080ff" alt="repo-top-language">
<img src="https://img.shields.io/github/languages/count/jueunseuk/CYRProject-FE?style=flat&color=0080ff" alt="repo-language-count">

<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Recoil-3578E5.svg?style=flat&logo=Recoil&logoColor=white" alt="Recoil">
<br>
<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" alt="Axios">
<img src="https://img.shields.io/badge/styledcomponents-DB7093.svg?style=flat&logo=styled-components&logoColor=white" alt="styledcomponents">

</div>
<br>

---

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Testing](#testing)
- [Features](#features)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Acknowledgment](#acknowledgment)

---

## Overview

CYRProject-FE is the **frontend implementation** of the CYR fan community platform for the artist **Choi Yoori**.  
It provides a responsive and interactive user interface where fans can **share content, participate in polls, manage personalized galleries, and track both official and fan-submitted schedules**.

The frontend is built with **React and Vite** for fast builds, **Recoil** for state management, and integrates with the backend API for seamless fan community features.

**Why CYRProject-FE?**

This project aims to deliver an engaging fan platform experience with:

- 🛠️ **Fan-Centered UI:** Components for posts, comments, polls, galleries, and schedules tailored for Choi Yoori’s fandom.
- 🎯 **Optimized DX:** Vite-powered builds with hot module replacement for rapid iteration.
- 🚀 **Interactive Features:** Supports real-time polls, XP and badge displays, and custom user galleries.
- 🔗 **Backend Integration:** Centralized Axios instance for secure API communication with backend (Spring Boot).
- 🎨 **Responsive Design:** Styled-components used for modern, mobile-friendly layouts.
- 🔍 **Scalability:** Modular structure for continuous feature growth (chat, notifications, reporting).

---

## Features

|      | Component          | Details                                                                                     |
| :--- | :----------------- | :------------------------------------------------------------------------------------------ |
| ⚙️  | **Architecture**   | <ul><li>Component-based React SPA for Choi Yoori fan platform</li><li>Client-side rendering with Vite</li><li>Pages for boards, galleries, schedules, and user profiles</li></ul> |
| 🔩 | **Code Quality**   | <ul><li>ESLint with React-specific plugins</li><li>Consistent code style enforced</li><li>Planned testing with React Testing Library</li></ul> |
| 📄 | **Documentation**  | <ul><li>README includes project purpose and usage</li><li>Vercel deployment configuration</li><li>Comments for maintainability</li></ul> |
| 🔌 | **Integrations**   | <ul><li>React Router for multi-board navigation</li><li>Recoil for state (auth, XP, polls)</li><li>Axios for API calls</li><li>Firebase optional for images/notifications</li></ul> |
| 🧩 | **Modularity**     | <ul><li>Reusable components: polls, schedule calendar, gallery cards</li><li>Custom hooks for API logic</li><li>Scoped styling with styled-components</li></ul> |
| 🧪 | **Testing**        | <ul><li>Planned Jest/React Testing Library coverage</li><li>Focus on UI and API integration tests</li></ul> |
| ⚡️  | **Performance**    | <ul><li>Vite bundling with fast HMR</li><li>Skeleton loaders for smooth UX on slow networks</li></ul> |
| 🛡️ | **Security**       | <ul><li>HTTPS deployment via Vercel</li><li>User report UI for moderation</li></ul> |
| 📦 | **Dependencies**   | <ul><li>React, React Router, Recoil, Axios, styled-components</li><li>Development: Vite, ESLint, @vitejs/plugin-react</li></ul> |

---

## Project Structure

```sh
└── CYRProject-FE/
    ├── README.md
    ├── eslint.config.js
    ├── index.html
    ├── jsconfig.json
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── App.jsx
    │   ├── RouterList.jsx
    │   ├── apis
    │   ├── assets
    │   ├── common
    │   ├── components
    │   ├── constants
    │   ├── hooks
    │   ├── pages
    │   ├── recoil
    │   ├── styles
    │   └── util
    ├── vercel.json
    └── vite.config.js
```

---

## Getting Started

### Prerequisites

This project requires the following dependencies:

- **Programming Language:** JavaScript
- **Package Manager:** Npm

### Installation

Build CYRProject-FE from the source and install dependencies:

1. **Clone the repository:**

    ```sh
    ❯ git clone https://github.com/jueunseuk/CYRProject-FE
    ```

2. **Navigate to the project directory:**

    ```sh
    ❯ cd CYRProject-FE
    ```

3. **Install the dependencies:**

**Using [npm](https://www.npmjs.com/):**

```sh
❯ npm install
```

### Usage

Run the project with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm start
```

### Testing

Cyrproject-fe uses the {__test_framework__} test framework. Run the test suite with:

**Using [npm](https://www.npmjs.com/):**

```sh
npm test
```

---

## Acknowledgments

- Inspired by Choi Yoori fandom and community-driven platforms.

- Thanks to all contributors and open-source projects enabling this work.

<br>

---

<div align="left"><a href="#top">⬆ Return</a></div>

---
