# File Management API

This project is a simple Node.js API for file management, allowing users to upload, list, and delete files, along with file categorization functionality.

## Project Structure

The project is organized into the following directories:

- **routes:** Contains route definitions.
- **controllers:** Implements route handlers.
- **services:** Implements business logic and interacts with the file system.
- **middleware:** Includes middleware functions like logging.
- **uploads:** The directory where uploaded files are stored.

## Dependencies

- Node.js (latest stable version)
- Express.js for routing
- Express-fileupload for handling file uploads
- fs.promises for file system operations

## API Endpoints

- POST /api/files/upload: Upload a file.
- GET /api/files/list: List all uploaded files.
- GET /api/files/search/:filename: Search for a file by filename.
- DELETE /api/files/delete/:filename: Delete a file by filename.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/karanc21/FileHub
   cd FileHub

2. Start the server
   ```bash
   npm install
   npm start

