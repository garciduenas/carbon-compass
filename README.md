# 🌱 Carbon Compass - Frontend

The React frontend for the Sustainability AI Agent, providing an intuitive web interface for eco-friendly travel planning.

## 🚀 Features

- **Interactive Chat Interface**: Natural language queries for travel planning
- **Real-time Recommendations**: Live updates from the AI backend
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Component library
- **React Router** - Client-side routing

## 📋 Prerequisites

- Node.js 16+
- npm or yarn

## 🔧 Setup

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── AgentChatBox.tsx    # Main chat interface
│   ├── AgentResponse.tsx   # Response display
│   ├── FeatureGrid.tsx     # Feature showcase
│   ├── Navbar.tsx          # Navigation
│   └── ui/                 # Reusable UI components
├── pages/
│   ├── Index.tsx           # Home page
│   └── NotFound.tsx        # 404 page
├── hooks/
│   └── use-toast.ts        # Toast notifications
└── lib/
    └── utils.ts            # Utility functions
```

## 🔌 API Integration

The frontend communicates with the Python backend via REST API calls. Make sure the backend is running on the configured port.

## 🎨 Customization

### Styling
- Uses Tailwind CSS for styling
- Custom components in `src/components/ui/`
- Theme configuration in `tailwind.config.ts`

### Adding New Components
```bash
# Generate new component with shadcn/ui
npx shadcn-ui@latest add [component-name]
```

## 📱 Usage

1. Start the development server
2. Open `http://localhost:5173`
3. Ask travel-related questions in natural language
4. Receive sustainable travel recommendations

## 🤝 Contributing

- Follow the main project contribution guidelines
- Use TypeScript for all new code
- Test components on multiple screen sizes
- Maintain accessibility standards

---

Part of the [Sustainability AI Agent](https://github.com/your-repo/sustainability-ai-agent) project.</content>
<parameter name="oldString"># Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
