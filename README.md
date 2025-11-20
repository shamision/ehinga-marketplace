# e-Hinga Marketplace Platform

A comprehensive agricultural marketplace platform for Rwanda, built with Next.js 15. This platform connects producers, buyers, and traders in Rwanda's agricultural sector, providing real-time market insights and facilitating trade.

## 🌐 Live Application

**Web App**: [https://ehinga-marketplace.vercel.app/](https://ehinga-marketplace.vercel.app/)

## 🌾 Features

- **Interactive Dashboard**: Real-time analytics with revenue trends, value chain distribution, and market performance
- **Marketplace**: Browse and purchase agricultural products from local producers
- **AI Chatbot**: Smart assistant integrated with Railway API for market intelligence
- **Payment Processing**: Mobile money integration (MTN Mobile Money & Airtel Money)
- **THRIVE 2030 Metrics**: Impact indicators and progress tracking

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shamision/ehinga-marketplace.git
   cd ehinga-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_CHATBOT_API_URL=https://e-hinga-chatbot-production.up.railway.app
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Deployment**: Vercel

---

