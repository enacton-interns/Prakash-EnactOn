import fs from 'fs/promises';
import path from 'path';
import ora from 'ora';
import chalk from 'chalk';

/**
 * Predefined .gitignore templates for various tech stacks and operating systems
 */
export const GITIGNORE_TEMPLATES = {
  node: {
    name: 'Node.js / JavaScript / TypeScript',
    description: 'node_modules, logs, dist, build, .env',
    content: `# Node.js & JavaScript
node_modules/
jspm_packages/

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Build outputs
dist/
build/
out/
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.env*.local

# Diagnostic reports & caches
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json
.cache/
.npm
.eslintcache
.node_repl_history
`,
  },
  reactNext: {
    name: 'React / Next.js / Vue',
    description: '.next, out, build, dist, cache',
    content: `# React / Next.js / Frontend Frameworks
node_modules/
/.pnp
.pnp.js

# Production / Build output
/build
/dist
/.next/
/out/
/.nuxt/
/.vuepress/dist

# Cache
.cache/
.parcel-cache/

# Debug logs & Environment
npm-debug.log*
yarn-debug.log*
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
`,
  },
  python: {
    name: 'Python',
    description: '__pycache__, *.pyc, venv, .env, dist',
    content: `# Python Byte-compiled & cache files
__pycache__/
*.py[cod]
*$py.class
*.so

# Virtual Environments
venv/
env/
ENV/
.venv/
env.bak/
venv.bak/

# Distribution / Packaging
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Environment & Testing
.env
htmlcov/
.tox/
.nox/
.coverage
.pytest_cache/
`,
  },
  java: {
    name: 'Java / Maven / Gradle',
    description: '*.class, target/, .gradle/, build/',
    content: `# Java Compiled classes
*.class

# Log & Package files
*.log
*.jar
*.war
*.ear

# Maven output
target/
pom.xml.tag
pom.xml.releaseBackup

# Gradle output
.gradle/
build/
!gradle/wrapper/gradle-wrapper.jar
`,
  },
  go: {
    name: 'Go (Golang)',
    description: 'Binaries, vendor, *.exe, *.out',
    content: `# Go Binaries
*.exe
*.exe-
*.dll
*.so
*.dylib

# Test binaries & outputs
*.test
*.out

# Dependency directory
vendor/

# Environment files
.env
`,
  },
  osEditors: {
    name: 'OS & Editors (macOS, Windows, VS Code, JetBrains)',
    description: '.DS_Store, Thumbs.db, .vscode, .idea',
    content: `# macOS
.DS_Store
.apple_desktop
.LSOverride
._*
.Spotlight-V100
.Trashes

# Windows
Thumbs.db
ehthumbs.db
[Dd]esktop.ini
$RECYCLE.BIN/

# VS Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace

# JetBrains / IntelliJ
.idea/
*.iws
*.iml
*.ipr

# Vim & Editors
*~
*.swp
*.swo
`,
  },
};

/**
 * Check if a file exists at the given path
 * @param {string} filePath 
 * @returns {Promise<boolean>}
 */
export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Generate or append to a .gitignore file
 * @param {Object} options
 * @param {string[]} options.selectedKeys Array of template keys (e.g. ['node', 'osEditors'])
 * @param {string} [options.outputPath] Target path for .gitignore file (default: './.gitignore')
 * @param {'overwrite' | 'append'} [options.mode] Write mode ('overwrite' or 'append')
 * @returns {Promise<string|null>} Summary message or null on failure
 */
export async function createGitignoreFile({
  selectedKeys = [],
  outputPath = './.gitignore',
  mode = 'overwrite',
}) {
  const spinner = ora(`Generating .gitignore file at "${outputPath}"...`).start();

  try {
    const sections = [];

    // Header metadata
    sections.push(`# Created by Smart CLI Toolkit - ${new Date().toISOString().split('T')[0]}`);

    // Combine contents from selected templates
    selectedKeys.forEach((key) => {
      const tmpl = GITIGNORE_TEMPLATES[key];
      if (tmpl) {
        sections.push(tmpl.content.trim());
      }
    });

    const finalContent = sections.join('\n\n') + '\n';
    const targetDir = path.dirname(path.resolve(outputPath));

    // Ensure target directory exists
    await fs.mkdir(targetDir, { recursive: true });

    if (mode === 'append' && (await fileExists(outputPath))) {
      const existing = await fs.readFile(outputPath, 'utf-8');
      const combined = `${existing.trim()}\n\n# --- Appended by Smart CLI Toolkit ---\n\n${finalContent}`;
      await fs.writeFile(outputPath, combined, 'utf-8');
      spinner.succeed(chalk.green(`.gitignore updated successfully (Appended)!`));
    } else {
      await fs.writeFile(outputPath, finalContent, 'utf-8');
      spinner.succeed(chalk.green(`.gitignore created successfully!`));
    }

    const fileStats = await fs.stat(outputPath);
    const addedTemplates = selectedKeys
      .map((k) => GITIGNORE_TEMPLATES[k]?.name || k)
      .join(', ');

    return [
      `Target Path     : ${chalk.cyan(outputPath)}`,
      `Write Mode      : ${chalk.yellow(mode === 'append' ? 'Appended to existing file' : 'Overwritten / Created new')}`,
      `Templates Used  : ${chalk.white(addedTemplates || 'None')}`,
      `File Size       : ${chalk.bold.green(`${fileStats.size} Bytes`)}`,
    ].join('\n');
  } catch (err) {
    spinner.fail(chalk.red(`Failed to write .gitignore file: ${err.message}`));
    return null;
  }
}
