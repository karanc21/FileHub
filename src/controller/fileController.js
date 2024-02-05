const fs = require('fs').promises;
const path = require('path');
const uploadDir = 'uploads';

async function uploadFile(req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    const file = req.files.file;
    const filePath = path.join(uploadDir, file.name);

    await file.mv(filePath);
    
    // Your file handling logic here

    res.status(200).json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function listFiles(req, res) {
  try {
    const files = await fs.readdir(uploadDir);
    res.status(200).json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function searchFile(req, res) {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);
  try {
    await fs.access(filePath);
    res.status(200).json({ message: 'File found', filePath });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ error: `File "${filename}" not found.` });
  }
}

async function deleteFile(req, res) {
  const { filename } = req.params;
  const filePath = path.join(uploadDir, filename);
  try {
    await fs.unlink(filePath);
    res.status(200).json({ message: `File "${filename}" deleted successfully.` });
  } catch (error) {
    console.error(error.message);
    res.status(404).json({ error: `Failed to delete file "${filename}". File may not exist.` });
  }
}

module.exports = {
  uploadFile,
  listFiles,
  searchFile,
  deleteFile,
};
