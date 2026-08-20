# 🛠️ Smart CLI Toolkit (`smart-cli`)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Interactive CLI](https://img.shields.io/badge/CLI-Interactive-cyan.svg)](#features)

An interactive, modern, feature-packed Command Line Interface (CLI) toolkit built with Node.js, ES Modules, `@inquirer/prompts`, `chalk`, `boxen`, `ora`, and `zlib`.

`smart-cli` provides essential developer utilities ranging from string transformation and tech-stack `.gitignore` template generation to file compression and random developer jokes, all packaged inside a clean, interactive terminal interface.

---

## 🌟 Key Features

### 1. 🔤 Text Transformation Engine
- **UPPERCASE Converter**: Transform any text string into uppercase characters.
- **lowercase Converter**: Convert any text string into lowercase format.
- **Palindrome Inspector**: Performs detailed string analysis to verify whether text is a palindrome (strips non-alphanumeric characters, ignores casing, and provides an line-by-line comparison of original vs. reversed text).

### 2. 🎭 Joke Studio (API & Offline Fallback)
- Fetches fresh random jokes online from [JokeAPI](https://v2.jokeapi.dev/) using `axios`.
- Features elegant error handling with an offline fallback joke if internet connectivity or API availability fails.

### 3. 📦 Gzip File Compressor & Decompressor
- **File Compressor**: Compresses plain text files using Node's native `zlib` (Gzip) with Base64 encoding. Displays detailed compression statistics (original size, compressed size, and percentage of disk space saved).
- **File Decompressor**: Restores Base64 Gzip compressed files back into original plain text files.

### 4. 📝 Tech-Stack `.gitignore` Generator
- Interactively select `.gitignore` templates using terminal checkboxes for popular stacks and developer environments:
  - **Node.js / JavaScript / TypeScript** (`node_modules`, `dist`, `.env`, logs)
  - **React / Next.js / Vue** (`.next`, `out`, `build`, cache)
  - **Python** (`__pycache__`, `venv`, `*.pyc`, `.pytest_cache`)
  - **Java / Maven / Gradle** (`target/`, `.gradle/`, `*.class`, `*.jar`)
  - **Go (Golang)** (`vendor/`, `*.exe`, `*.out`)
  - **OS & Editors** (`.DS_Store`, `Thumbs.db`, `.vscode`, `.idea`)
- Supports **Overwrite**, **Append**, or **Cancel** modes if a `.gitignore` file already exists at the target path.

### 5. 🎨 Terminal UI & Experience
- Rich terminal banners, section headers, double-line result cards, and info boxes rendered with `boxen` and `chalk`.
- Non-blocking animated terminal spinners powered by `ora`.

---

## 📁 Project Structure

```
smart-cli/
├── index.js                      # Entry point & main interactive CLI loop
├── package.json                  # Dependencies, bin configuration, and scripts
├── sample.txt                    # Sample text file for testing compression
├── .env.example                  # Environment configuration template
└── src/
    ├── modules/
    │   ├── compressor.js         # Gzip + Base64 file compression & decompression logic
    │   ├── gitignoreGenerator.js # Tech-stack templates & .gitignore file builder
    │   ├── jokeService.js        # JokeAPI integration with offline fallback
    │   └── textEngine.js         # Text transformation and palindrome inspector
    └── ui/
        └── banner.js             # Boxen & Chalk styled UI cards and headers
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `pnpm`

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/prakash8264/smart-cli.git
   cd smart-cli
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**
   Copy `.env.example` to `.env` to customize the Joke API endpoint:
   ```bash
   cp .env.example .env
   ```

---

## 💻 Usage

### Run Locally
Launch the interactive CLI menu:
```bash
npm start
```
or directly via Node:
```bash
node index.js
```

### Install & Run Globally
To run `smart-cli` anywhere on your machine:
```bash
npm link
```
Then execute it from any terminal location:
```bash
smart-cli
```

---

## 🛠️ Modules Breakdown

| Module | Location | Responsibilities |
| :--- | :--- | :--- |
| **Main Loop** | [`index.js`](file:///c:/Users/EnactOn/Desktop/web%20development/cli/smart@cli/index.js) | Handles interactive terminal menu loop using `@inquirer/prompts`. |
| **UI Banner** | [`src/ui/banner.js`](file:///c:/Users/EnactOn/Desktop/web%20development/cli/smart@cli/src/ui/banner.js) | Formats terminal boxes (`boxen`) and custom color styling (`chalk`). |
| **Text Engine** | [`src/modules/textEngine.js`](file:///c:/Users/EnactOn/Desktop/web%20development/cli/smart@cli/src/modules/textEngine.js) | Performs UPPERCASE/lowercase string conversion and palindrome inspection. |
| **Joke Service** | [`src/modules/jokeService.js`](file:///c:/Users/EnactOn/Desktop/web%20development/cli/smart@cli/src/modules/jokeService.js) | Queries external JokeAPI using `axios` with an `ora` spinner & offline fallback. |
| **Compressor** | [`src/modules/compressor.js`](file:///c:/Users/EnactOn/Desktop/web%20development/cli/smart@cli/src/modules/compressor.js) | Compresses/decompresses files using Node `zlib` (Gzip) & Base64 format. |
| **Gitignore Gen** | [`src/modules/gitignoreGenerator.js`](file:///c:/Users/EnactOn/Desktop/web%20development/cli/smart@cli/src/modules/gitignoreGenerator.js) | Generates customized `.gitignore` files using multi-selected stack templates. |

---

## 📜 License

This project is licensed under the [ISC License](file:///c:/Users/EnactOn/Desktop/web%20development/cli/smart@cli/package.json).
