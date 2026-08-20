
import chalk from 'chalk';

/**
 * Convert string to UPPERCASE
 * @param {string} input 
 * @returns {string}
 */
export function toUppercase(input) {
  if (!input) return '';
  return input.toUpperCase();
}

/**
 * Convert string to lowercase
 * @param {string} input 
 * @returns {string}
 */
export function toLowercase(input) {
  if (!input) return '';
  return input.toLowerCase();
}



/**
 * Inspect whether a string is a palindrome with detailed breakdown
 * @param {string} input 
 * @returns {{ isPalindrome: boolean, details: string }}
 */
export function checkPalindrome(input) {
  if (!input || input.trim() === '') {
    return {
      isPalindrome: false,
      details: 'Input is empty.',
    };
  }

  // Clean text: strip non-alphanumeric characters and lowercase
  const cleaned = input.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const reversed = cleaned.split('').reverse().join('');
  const isPalindrome = cleaned.length > 0 && cleaned === reversed;

  const details = [
    `Original Input : "${chalk.cyan(input)}"`,
    `Sanitized Text : "${chalk.yellow(cleaned)}"`,
    `Reversed Text  : "${chalk.yellow(reversed)}"`,
    `Status         : ${isPalindrome ? chalk.bold.green('YES, IT IS A PALINDROME! 🎉') : chalk.bold.red('NO, NOT A PALINDROME ❌')}`,
  ].join('\n');

  return { isPalindrome, details };
}


