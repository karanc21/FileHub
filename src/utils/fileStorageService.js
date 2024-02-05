const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const uploadDir = 'uploads';
const secretKey = 'yourSecretKey';

function createFileStorageService() {
  function encryptFilename(filename) {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encryptedFilename = cipher.update(filename, 'utf-8', 'hex');
    encryptedFilename += cipher.final('hex');
    return encryptedFilename;
  }

  function decryptFilename(encryptedFilename) {
    const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
    let filename = decipher.update(encryptedFilename, 'hex', 'utf-8');
    filename += decipher.final('utf-8');
    return filename;
  }

  async function uploadFile(file) {
    const encryptedFilename = encryptFilename(file.originalname);
    const filePath = path.join(uploadDir, encryptedFilename);
    await fs.writeFile(filePath, file.buffer);
    return filePath;
  }

  async function listFiles() {
    const files = await fs.readdir(uploadDir);
    const decryptedFiles = files.map(decryptFilename);
    return decryptedFiles;
  }

  async function searchFile(filename) {
    const encryptedFilename = encryptFilename(filename);
    const filePath = path.join(uploadDir, encryptedFilename);
    try {
      await fs.access(filePath);
      return filePath;
    } catch (error) {
      throw new Error(`File "${filename}" not found.`);
    }
  }

  async function deleteFile(filename) {
    const encryptedFilename = encryptFilename(filename);
    const filePath = path.join(uploadDir, encryptedFilename);
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      return `File "${filename}" deleted successfully.`;
    } catch (error) {
      throw new Error(`Failed to delete file "${filename}". File may not exist.`);
    }
  }

  return {
    uploadFile,
    listFiles,
    searchFile,
    deleteFile,
  };
}

module.exports = createFileStorageService;
