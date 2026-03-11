# Snippet Vault

## Stack

Next.js + NestJS + MongoDB + TypeScript

---

## Run locally

### Backend

cd backend

npm install

npm run start:dev

### Frontend

cd frontend

npm install

npm run dev

---

## ENV

backend/.env

DATABASE_CONNECTION_STRING

frontend/.env

NEXT_PUBLIC_API

---

## API

POST /snippets

{
"title": "React docs",
"content": "https://react.dev",
"tags": ["react"],
"type": "link"
}

GET /snippets?q=react&tag=js&page=1&limit=10

GET /snippets?id=eeqfwfqfs213sfa

PATCH /snippets?id=eeqfwfqfs213sfa

DELETE /snippets?id=eeqfwfqfs213sfa

---

## Build


Backend

npm run build

npm run start:prod


Frontend

npm run build

npm start