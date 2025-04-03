
Built by https://www.blackbox.ai

---

```markdown
# Tracking Website

## Project Overview
Tracking Website is a web application that allows users to generate unique tracking links and collect geolocation data. This application is built on Node.js with Express framework and utilizes SQLite for database management. Users can view the tracking data through a dedicated admin panel.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/tracking-website.git
   cd tracking-website
   ```

2. **Install the dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed, then run:
   ```bash
   npm install
   ```

3. **Create the SQLite database:**
   Ensure you have the SQLite3 command-line tool installed. Run the following command to create the database and the necessary tables:
   ```bash
   node server.js
   ```

## Usage

After installation, you can start the application with:
```bash
npm start
```

Visit `http://localhost:3000` in your web browser to access the application. You can generate tracking links, view tracking data, and manage it via the admin panel, which can be accessed at `http://localhost:3000/admin`.

### Admin Credentials
The default credentials for accessing the admin panel are:
- **Username:** admin
- **Password:** tracking123

## Features
- Generate unique tracking links.
- Collect geolocation data (latitude, longitude, accuracy).
- Capture user information including IP address and user agent.
- View recent tracking data through a secure admin panel.
- Basic authentication for the admin panel.

## Dependencies
The project relies on the following dependencies:
- [Express](https://expressjs.com/): A web framework for Node.js
- [SQLite3](https://www.npmjs.com/package/sqlite3): SQLite database for data storage
- [Body-Parser](https://www.npmjs.com/package/body-parser): Middleware for parsing request bodies
- [CORS](https://www.npmjs.com/package/cors): Middleware for enabling CORS

You can find the full list of dependencies in the `package.json` file.

## Project Structure
```
tracking-website
├── package.json         # Project metadata and dependencies
├── package-lock.json    # Dependency tree for package management
├── server.js            # Main server file containing API endpoints and middleware
└── public               # Directory for static files (HTML pages)
    ├── index.html       # Frontend landing page
    ├── track.html       # Page for tracking details
    └── admin.html       # Admin panel page
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.

```
Feel free to modify the links and usernames as needed for your actual project!
```