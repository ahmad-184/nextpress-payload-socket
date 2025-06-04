# nextpress-payload-socket

A developer-focused starter project combining **Express**, **Next.js**, **PayloadCMS**, and **Socket.IO**. It’s designed for those who want:

- A headless CMS backend using PayloadCMS
- Real-time capabilities via WebSockets (Socket.IO)
- A clearly separated backend (Express) and frontend (Next.js)
- A REST API backend for use across web and mobile apps

> ⚠️ This is an early-stage starter. Structure and features are evolving.

---

## 🔧 Tech Stack

- **Express** – backend server
- **Next.js** – frontend rendering
- **PayloadCMS** – headless CMS and authentication
- **Socket.IO** – real-time communication
- **pnpm** – for managing packages and running scripts
- **nodemon** – for hot-reloading the server during development

---

## 📦 Installation

Clone the repo and install dependencies:

```bash
pnpm install
```

---

## 🚀 Development

Start the server with hot-reloading using:

```bash
pnpm dev
```

This runs `nodemon` to watch file changes and restart the Express server automatically.

---

## 🛠 Scripts

| Command        | Description                       |
| -------------- | --------------------------------- |
| `pnpm dev`     | Start the dev server with nodemon |
| `pnpm build`   | Build the Next.js app             |
| `pnpm start`   | Start the production server       |

---

## 🧠 PayloadCMS Setup

PayloadCMS is integrated and configured with the following collections:

- **Media** – For managing file uploads
- **User** – Basic user collection with auth
- **Post** – Example content type

The Payload admin panel is available at:  
```
http://localhost:3000/admin
```

Collections are defined in `payload.config.ts`.

---

## 📡 WebSocket Support

Socket.IO is integrated for adding real-time functionality like:

- Live content updates
- Notifications
- Chat or collaboration tools

Setup is in `socket.ts`.

---

## 📁 Project Status

This project is a starting point created for experimentation and future development. It’s currently in its early stages and the structure will evolve over time.

---

## 📄 License

MIT
