# Tosan Website

Monorepo containing:
- **Backend:** Django + Django REST Framework (in `tosan_django/`)
- **Frontend:** React (Create React App) + MUI (in `tosan_front/`)

This setup is intended for local development where:
- Django serves the API (and potentially templates/static/media)
- React runs separately in development and calls the backend API

---

## Purpose & capabilities (short)

This project is a “vitrine” (showcase) website built for a steel holding company to present its **products** and **offers** in a **comprehensive, user-friendly** format.

It also includes a **feature-rich admin panel** with **multi-layer, role-based access control**, enabling different teams/roles to update and manage content efficiently based on the company’s operational needs.

---

## Repository structure (visual tree)

```text
tosan-website/
├─ .gitignore
├─ LICENSE
├─ tosan_django/
│  ├─ Pipfile
│  ├─ Pipfile.lock
│  ├─ manage.py
│  ├─ db.sqlite3
│  ├─ company_data/
│  ├─ dataresolve/
│  ├─ pages_data_api/
│  ├─ media/
│  ├─ static/
│  ├─ templates/
│  └─ tosan_django/
│     ├─ __init__.py
│     ├─ asgi.py
│     ├─ settings.py
│     ├─ urls.py
│     └─ wsgi.py
└─ tosan_front/
   ├─ package.json
   ├─ package-lock.json
   ├─ build/
   ├─ patches/
   ├─ public/
   └─ src/
```

> Notes:
> - `tosan_django/db.sqlite3` is currently committed (SQLite DB for development).
> - Backend CORS appears configured to allow React dev servers on `http://localhost:3000` and `http://localhost:3004`.

---

## Tech stack overview

### Backend (`tosan_django/`)
- Python **3.10** (declared in `Pipfile`)
- Django **4.0.6**
- Django REST Framework
- SQLite (default DB in `settings.py`)
- Gunicorn included (likely for production deployments)

### Frontend (`tosan_front/`)
- React **18**
- Create React App (`react-scripts` 5)
- MUI (Material UI)
- Redux Toolkit
- Uses `patch-package` (`postinstall` runs `npx patch-package`)

---

## Prerequisites

### System requirements
- **Git**
- **Python 3.10**
- **pipenv** (recommended, because backend uses `Pipfile`)
- **Node.js + npm** (for the frontend)

### Recommended versions (for fewer surprises)
- Python: `3.10.x`
- Node: `16+` or `18+` (typical for CRA projects)

---

## Installation & Local Development

### 1) Clone the repository
```bash
git clone https://github.com/AliJavanJ1/tosan-website.git
cd tosan-website
```

---

## Backend setup (Django)

### 2) Install backend dependencies
```bash
cd tosan_django
pipenv install
```

### 3) Activate the virtual environment
```bash
pipenv shell
```

### 4) Run migrations (if needed)
Even though `db.sqlite3` exists in the repo, running migrations is a good sanity check:
```bash
python manage.py migrate
```

### 5) Create an admin user (optional)
```bash
python manage.py createsuperuser
```

### 6) Start the backend server
```bash
python manage.py runserver
```

Backend will typically be available at:
- `http://127.0.0.1:8000/`

---

## Frontend setup (React)

### 7) Install frontend dependencies
Open a new terminal (keep backend running), then:
```bash
cd tosan_front
npm install
```

### 8) Start the frontend dev server
```bash
npm start
```

Frontend will typically be available at:
- `http://localhost:3000/`

---

## CORS / local integration notes

The backend `CORS_ALLOWED_ORIGINS` allows:
- `http://localhost:3000`
- `http://localhost:3004`

If you run the frontend on a different port, update:
- `tosan_django/tosan_django/settings.py`

---

## Common commands

### Backend
```bash
cd tosan_django
pipenv install
pipenv shell
python manage.py migrate
python manage.py runserver
```

### Frontend
```bash
cd tosan_front
npm install
npm start
npm run build
```

---

## License

See the `LICENSE` file in the repository root.
