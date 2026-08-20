import chalk from 'chalk';
import boxen from 'boxen';

/**
 * Display the main application banner header
 */
export function displayAppHeader() {
  const bannerText = `${chalk.bold.cyan('✨ SMART CLI TOOLKIT ✨')}\n${chalk.dim('Text Tools • Joke Engine • Compressor • Gitignore Generator')}`;
  
  const boxedBanner = boxen(bannerText, {
    padding: 1,
    margin: { top: 1, bottom: 1 },
    borderStyle: 'round',
    borderColor: 'cyan',
    textAlignment: 'center',
  });

  console.log(boxedBanner);
}

/**
 * Display a section title card
 * @param {string} title 
 */
export function displaySectionHeader(title) {
  console.log(`\n${chalk.bgCyan.black.bold(` 🛠️  ${title.toUpperCase()} `)}\n`);
}

/**
 * Render a result box for string transformations or outputs
 * @param {string} title 
 * @param {string} content 
 */
export function displayResultCard(title, content) {
  const card = boxen(`${chalk.bold.green(`✓ ${title}`)}\n\n${content}`, {
    padding: 1,
    margin: { top: 0, bottom: 1 },
    borderStyle: 'double',
    borderColor: 'green',
  });
  console.log(card);
}

/**
 * Render an info box (e.g. for jokes or analysis stats)
 * @param {string} title 
 * @param {string} content 
 */
export function displayInfoCard(title, content) {
  const card = boxen(`${chalk.bold.yellow(`💡 ${title}`)}\n\n${content}`, {
    padding: 1,
    margin: { top: 0, bottom: 1 },
    borderStyle: 'round',
    borderColor: 'yellow',
  });
  console.log(card);
}

/**
 * Display an error message box
 * @param {string} message 
 */
export function displayError(message) {
  const errBox = boxen(`${chalk.bold.red('✖ ERROR')}\n\n${chalk.white(message)}`, {
    padding: 1,
    margin: { top: 0, bottom: 1 },
    borderStyle: 'single',
    borderColor: 'red',
  });
  console.log(errBox);
}

/**
 * Display exit farewell message
 */
export function displayGoodbye() {
  console.log(`\n${chalk.bold.magenta('👋 Thank you for using Smart CLI Toolkit! See you next time.')}\n`);
}
