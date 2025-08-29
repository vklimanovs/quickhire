# Pixel Sanctuary

A modern web application for connecting clients with service providers, built with React, TypeScript, and Vite.

## 🚀 Features

- **User Authentication**: Google Sign-In integration with secure token management
- **Role-Based Access**: Separate dashboards for clients and service providers
- **Service Management**: Browse, book, and manage consultations and tasks
- **Real-time Chat**: Integrated chat widget for communication
- **Responsive Design**: Modern UI built with Tailwind CSS and Radix UI components
- **Subscription System**: Premium features with subscription management
- **Multi-language Support**: Internationalization ready
- **3D Graphics**: React Three Fiber integration for enhanced visual experience

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: Radix UI, Tailwind CSS, Framer Motion
- **State Management**: React Context, React Query
- **3D Graphics**: Three.js, React Three Fiber
- **Backend**: Express.js, Node.js
- **Deployment**: Netlify Functions
- **Testing**: Vitest

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd pixel-sanctuary
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:

```bash
npm run dev:full
```

The application will be available at `http://localhost:8080`

## 🚀 Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run dev:full` - Start full development environment (client + server)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run typecheck` - TypeScript type checking
- `npm run format.fix` - Format code with Prettier

## 🏗️ Project Structure

```
pixel-sanctuary/
├── client/                 # Frontend React application
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and contexts
│   └── ui/               # UI component library
├── server/                # Backend Express server
├── netlify/               # Netlify functions
├── shared/                # Shared types and utilities
└── schema/                # JSON schemas
```

## 🔧 Configuration

The project uses several configuration files:

- `vite.config.ts` - Vite configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `netlify.toml` - Netlify deployment configuration

## 🚀 Deployment

The project is configured for deployment on Netlify with serverless functions. The build process creates optimized bundles for both client and server components.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with modern web technologies
- UI components from Radix UI
- Styling with Tailwind CSS
- 3D graphics powered by Three.js
