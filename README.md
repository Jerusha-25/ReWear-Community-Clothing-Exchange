#  ReWear - Community Clothing Exchange

ReWear is a full-stack web application that empowers local communities to exchange clothes easily, sustainably, and socially. It’s more than just a swap shop—it's a **community-driven circular fashion movement**.

---

##  About the Project

Fast fashion has contributed to alarming levels of textile waste. **ReWear** was created to **reduce waste**, **promote reuse**, and **foster community engagement** through a localized clothing exchange platform.

Users can:
-  List clothing items they no longer need
-  Browse items others have posted
-  Communicate and arrange swaps
-  Join a trusted, authenticated network of swappers

---

##  Tech Stack

| Layer        | Technology                                   |
|--------------|----------------------------------------------|
| **Frontend** | React, TypeScript, Vite, CSS Modules         |
| **Backend**  | Express.js, TypeScript, Node.js              |
| **Storage**  | In-memory or JSON-based custom storage (for now) |
| **Auth**     | Custom Session-based Authentication with `express-session` |
| **Dev Tools**| ts-node, nodemon, ESLint, Prettier           |

---

##  Features

-  **Post & Exchange Clothing Items**  
  Users can post items they want to give away or exchange.

-  **Custom Authentication System**  
  No third-party login needed—simple and secure session-based auth.

-  **Local Storage Logic**  
  No database required; perfect for demos, local communities, or MVPs.

-  **Shared Types Between Client & Server**  
  Using a `shared/` folder for synced TypeScript types across the stack.

-  **CORS-ready and Dev-optimized**  
  Runs backend on `localhost:3001`, frontend on `localhost:5173`.

---

##  What Makes ReWear Unique?

- **Hyperlocal Circular Economy**  
  Built for small communities, colleges, neighborhoods, and eco-clubs.

-  **Custom-built Authentication**  
  No dependency on Firebase/Auth0/etc. — full control, zero vendor lock-in.

-  **Zero-Waste Philosophy**  
  Every feature promotes sustainability, reuse, and mindful consumption.

-  **Dev-friendly TypeScript Monorepo**  
  Consistent types and behavior across client/server.

---

##  How to Run Locally

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/ReWear-Community-Clothing-Exchange.git
   cd ReWear-Community-Clothing-Exchange
