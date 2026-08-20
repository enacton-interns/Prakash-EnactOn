import fs from 'fs/promises';
import path from 'path';
import zlib from 'zlib';
import ora from 'ora';
import chalk from 'chalk';

/**
 * Format bytes to readable size string
 * @param {number} bytes 
 * @returns {string}
 */
function formatBytes(bytes) {
  if (!bytes) return '0 Bytes';
  if (bytes < 1024) return `${bytes} Bytes`;
  return `${(bytes / 1024).toFixed(2)} KB`;
}

/**
 * Compress a text file using Gzip base64 encoding
 * @param {string} sourcePath 
 * @param {string} [outputPath] 
 */
export async function compressFile(sourcePath, outputPath = './output/compressed.txt') {
  const spinner = ora(`Compressing "${sourcePath}"...`).start();

  try {
    // Read source file content
    const content = await fs.readFile(sourcePath);

    // Compress content and encode to Base64
    const compressedBuffer = zlib.gzipSync(content);
    const base64Data = compressedBuffer.toString('base64');

    // Create output directory if needed and write file
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, base64Data, 'utf-8');

    const originalSize = content.length;
    const compressedSize = Buffer.byteLength(base64Data);
    const savedBytes = originalSize - compressedSize;
    const savedPercent = originalSize > 0 
      ? ((savedBytes / originalSize) * 100).toFixed(1) 
      : '0';

    spinner.succeed(chalk.green('File compressed successfully!'));

    return [
      `Source File     : ${chalk.cyan(sourcePath)}`,
      `Output File     : ${chalk.yellow(outputPath)}`,
      `Original Size   : ${chalk.white(formatBytes(originalSize))}`,
      `Compressed Size : ${chalk.white(formatBytes(compressedSize))}`,
      `Space Saved     : ${chalk.bold.green(`${savedPercent}% (${formatBytes(savedBytes)})`)}`,
    ].join('\n');
  } catch (err) {
    spinner.fail(chalk.red(`Failed to compress file: ${err.message}`));
    return null;
  }
}

/**
 * Decompress a base64 gzip compressed file
 * @param {string} sourcePath 
 * @param {string} [outputPath] 
 */
export async function decompressFile(sourcePath, outputPath = './output/decompressed.txt') {
  const spinner = ora(`Decompressing "${sourcePath}"...`).start();

  try {
    // Read compressed base64 data
    const base64Data = await fs.readFile(sourcePath, 'utf-8');
    const buffer = Buffer.from(base64Data.trim(), 'base64');

    // Decompress buffer back to original data
    const decompressed = zlib.gunzipSync(buffer);

    // Create output directory if needed and write restored file
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, decompressed);

    spinner.succeed(chalk.green('File decompressed successfully!'));

    return [
      `Source File     : ${chalk.yellow(sourcePath)}`,
      `Restored File   : ${chalk.cyan(outputPath)}`,
      `Restored Size   : ${chalk.bold.green(formatBytes(decompressed.length))}`,
    ].join('\n');
  } catch (err) {
    spinner.fail(chalk.red(`Failed to decompress file: ${err.message}`));
    return null;
  }
}

