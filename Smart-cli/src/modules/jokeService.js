import axios from 'axios';
import ora from 'ora';
import chalk from 'chalk';

/**
 * Fetch a random joke from external API
 * @returns {Promise<{ category: string, text: string }>}
 */
export async function fetchRandomJoke() {
  const spinner = ora({
    text: 'Fetching a fresh joke from the web...',
    color: 'yellow',
  }).start();

  const apiUrl = process.env.API_URL || 'https://v2.jokeapi.dev/joke/Any?safe-mode';

  try {
    const response = await axios.get(apiUrl, { timeout: 5000 });
    const data = response.data;

    spinner.succeed(chalk.green('Joke retrieved successfully!'));

    if (data.type === 'twopart') {
      return {
        category: data.category || 'General',
        text: `${data.setup}\n\n${chalk.bold.cyan('👉 ' + data.delivery)}`,
      };
    }

    return {
      category: data.category || 'General',
      text: data.joke || `${data.setup}\n\n${chalk.bold.cyan('👉 ' + data.punchline)}`,
    };
  } catch (error) {
    spinner.fail(chalk.red('Failed to fetch joke from external API.'));

    return {
      category: 'Offline Joke',
      text: 'Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛',
    };
  }
}

