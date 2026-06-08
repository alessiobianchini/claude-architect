# Claude Architect Simulator

A web-based exam simulator and interactive study guide designed for the **Anthropic Claude Certified Architect (CCA-F)** certification. 

This project provides a complete practice environment featuring 60 scenario-based questions and the official study guide, allowing candidates to test their architectural reasoning regarding the Model Context Protocol (MCP), Agentic workflows, and Claude API.

## Features

- **Exam Simulator**: 60 scenario-based practice questions covering all five domains of the CCA-F exam blueprint.
- **Learning Mode**: An integrated, Markdown-based official study guide with an interactive Table of Contents.
- **Real-time Feedback**: Immediate validation and detailed architectural explanations for every question to enforce learning over memorization.
- **Randomization**: Questions are shuffled on every new session to prevent pattern memorization.
- **Modern UI**: Fully responsive, dark-mode glassmorphism design.

## Tech Stack

- React 18
- Vite
- Vanilla CSS
- `react-markdown` & `remark-gfm` (for study guide rendering)
- Lucide React (for iconography)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alessiobianchini/claude-architect.git
   cd claude-architect
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

The project includes a continuous deployment pipeline configured for **GitHub Pages**. 
Any push to the `main` branch automatically triggers the `.github/workflows/deploy.yml` action, which builds the Vite application and publishes the `dist` directory.

To ensure assets load correctly on GitHub Pages, the `base` path in `vite.config.js` is set to relative (`./`).

## Data Source

The questions and study guide content are sourced and adapted from the open-source community study materials available at [paullarionov/claude-certified-architect](https://github.com/paullarionov/claude-certified-architect).

## License

This project is for educational purposes. Please refer to Anthropic's official certification guidelines regarding exam policies and Non-Disclosure Agreements (NDAs).
