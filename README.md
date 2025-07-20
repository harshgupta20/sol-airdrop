# 🚀 Solana Airdrop DApp

This is a simple Solana-based airdrop dApp built using React + Vite, and integrated with the `@solana/wallet-adapter` to request test SOL tokens on the **Devnet**.

---

## 🧠 Features

- Connect Phantom or any Solana-compatible wallet
- Automatically fetch wallet address
- Airdrop SOL tokens (Devnet)
- Clean UI using Tailwind CSS
- Shows success/error status after airdrop

---

## 🖥️ Demo

![airdrop-demo](https://your-image-url-or-gif-here.com)

---

## 📦 Tech Stack

- React + Vite
- Tailwind CSS
- @solana/web3.js
- @solana/wallet-adapter

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/solana-airdrop.git
cd solana-airdrop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

---

## 🔧 Configuration

Make sure you have the following packages installed:

```bash
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-react-ui @solana/wallet-adapter-wallets
```

Also install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then configure your `tailwind.config.js` like this:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

And include this in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🔐 Wallet Setup

Wrap your app with WalletProvider in `main.jsx` and configure supported wallets and network (Devnet):

```jsx
import {
  WalletAdapterNetwork,
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter
} from '@solana/wallet-adapter-wallets';

const network = WalletAdapterNetwork.Devnet;

const wallets = [new PhantomWalletAdapter()];

<ConnectionProvider endpoint={`https://api.devnet.solana.com`}>
  <WalletProvider wallets={wallets} autoConnect>
    <WalletModalProvider>
      <App />
    </WalletModalProvider>
  </WalletProvider>
</ConnectionProvider>
```

---

## 📁 Folder Structure

```
.
├── src
│   ├── Airdrop.jsx      # The main airdrop component
│   ├── main.jsx         # Entry point, WalletProvider configured here
│   ├── App.jsx          # Renders Airdrop
│   └── index.css        # Tailwind base styles
```

---

## 🧪 Test it

- Use: https://explorer.solana.com/?cluster=devnet to verify transactions

---

## 🙏 Credits

Built with ❤️ by [Harsh Gupta](https://www.linkedin.com/in/harshgupta2001)

---

## 📜 License

This project is licensed under the MIT License.
