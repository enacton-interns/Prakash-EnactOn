#!/usr/bin/env node

import dotenv from 'dotenv';
import { select, input, checkbox } from '@inquirer/prompts';
import chalk from 'chalk';

dotenv.config();

import {
  displayAppHeader,
  displaySectionHeader,
  displayResultCard,
  displayInfoCard,
  displayError,
  displayGoodbye,
} from './src/ui/banner.js';

import {
  toUppercase,
  toLowercase,
  checkPalindrome,
} from './src/modules/textEngine.js';

import { fetchRandomJoke } from './src/modules/jokeService.js';
import { compressFile, decompressFile } from './src/modules/compressor.js';
import {
  createGitignoreFile,
  fileExists,
  GITIGNORE_TEMPLATES,
} from './src/modules/gitignoreGenerator.js';

async function mainLoop() {
  console.clear();
  displayAppHeader();

  let keepRunning = true;

  while (keepRunning) {
    try {
      const action = await select({
        message: chalk.bold.cyan('Select a tool feature from the menu below:'),
        choices: [
          {
            name: '1. Convert to UPPERCASE',
            value: 'upper',
            description: 'Transform text into uppercase characters',
          },
          {
            name: '2. Convert to lowercase',
            value: 'lower',
            description: 'Transform text into lowercase characters',
          },
          {
            name: '3. Palindrome Inspector',
            value: 'palindrome',
            description: 'Check if text reads the same forwards and backwards',
          },
          {
            name: '4. Fetch a Random Joke',
            value: 'joke',
            description: 'Get a fresh joke from the API engine',
          },
          {
            name: '5. Compress a File (Gzip)',
            value: 'compress',
            description: 'Compress text file into ./output/compressed.txt',
          },
          {
            name: '6. Decompress a File',
            value: 'decompress',
            description: 'Decompress base64 gzip file back into original format',
          },
          {
            name: '7. Generate .gitignore File',
            value: 'gitignore',
            description: 'Generate or append a .gitignore file with tech stack templates',
          },
          {
            name: '8. Exit Toolkit',
            value: 'exit',
            description: 'Close the application',
          },
        ],
      });

      if (action === 'exit') {
        keepRunning = false;
        displayGoodbye();
        break;
      }

      // Handle Text Transformations
      if (['upper', 'lower', 'palindrome'].includes(action)) {
        displaySectionHeader(action + ' Tool');
        const userText = await input({
          message: 'Enter text string to process:',
          validate: (val) => (val.trim() ? true : 'Please enter a non-empty string.'),
        });

        switch (action) {
          case 'upper':
            displayResultCard('Uppercase Output', toUppercase(userText));
            break;
          case 'lower':
            displayResultCard('Lowercase Output', toLowercase(userText));
            break;
          case 'palindrome': {
            const { details } = checkPalindrome(userText);
            displayInfoCard('Palindrome Analysis', details);
            break;
          }
        }
      }

      // Handle Joke Fetcher
      if (action === 'joke') {
        displaySectionHeader('Joke Studio');
        const jokeObj = await fetchRandomJoke();
        displayInfoCard(`Category: ${jokeObj.category}`, jokeObj.text);
      }

      // Handle Compression
      if (action === 'compress') {
        displaySectionHeader('File Compressor');
        const filePath = await input({
          message: 'Enter relative or absolute path of file to compress:',
          default: './sample.txt',
        });
        
        const outputPath = await input({
          message: 'Enter destination path for compressed file:',
          default: './output/compressed.txt',
        });

        const result = await compressFile(filePath, outputPath);
        if (result) {
          displayResultCard('Compression Summary', result);
        }
      }

      // Handle Decompression
      if (action === 'decompress') {
        displaySectionHeader('File Decompressor');
        const filePath = await input({
          message: 'Enter path of compressed file:',
          default: './output/compressed.txt',
        });

        const outputPath = await input({
          message: 'Enter destination path for decompressed file:',
          default: './output/decompressed.txt',
        });

        const result = await decompressFile(filePath, outputPath);
        if (result) {
          displayResultCard('Decompression Summary', result);
        }
      }

      // Handle Gitignore Generator
      if (action === 'gitignore') {
        displaySectionHeader('Gitignore Generator');

        const outputPath = await input({
          message: 'Enter destination path for .gitignore file:',
          default: './.gitignore',
        });

        let mode = 'overwrite';
        if (await fileExists(outputPath)) {
          const modeAction = await select({
            message: chalk.yellow(`File "${outputPath}" already exists. How would you like to proceed?`),
            choices: [
              { name: 'Overwrite existing file', value: 'overwrite' },
              { name: 'Append to existing file', value: 'append' },
              { name: 'Cancel operation', value: 'cancel' },
            ],
          });

          if (modeAction === 'cancel') {
            console.log(chalk.dim('Operation cancelled. Returning to main menu...'));
            continue;
          }
          mode = modeAction;
        }

        const selectedKeys = await checkbox({
          message: 'Select template categories to include (Use Space to check/uncheck):',
          choices: Object.entries(GITIGNORE_TEMPLATES).map(([key, item]) => ({
            name: `${item.name} - ${chalk.dim(item.description)}`,
            value: key,
            checked: ['node', 'osEditors'].includes(key),
          })),
        });

        const result = await createGitignoreFile({
          selectedKeys,
          outputPath,
          mode,
        });

        if (result) {
          displayResultCard('.gitignore Generation Summary', result);
        }
      }

      // Prompt to continue or return to main menu
      const continueApp = await select({
        message: 'What would you like to do next?',
        choices: [
          { name: 'Return to Main Menu', value: true },
          { name: 'Exit Application', value: false },
        ],
      });

      if (!continueApp) {
        keepRunning = false;
        displayGoodbye();
      } else {
        console.clear();
        displayAppHeader();
      }

    } catch (err) {
      if (err.name === 'ExitPromptError') {
        displayGoodbye();
        process.exit(0);
      }
      displayError(`An unexpected error occurred: ${err.message}`);
    }
  }
}

mainLoop();
