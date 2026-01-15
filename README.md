## Password Generator & Manager

A user-friendly Password Generator, Strength Checker, and Password Manager designed to help users create, evaluate, and store secure passwords.
This tool emphasizes security, simplicity, and real-time feedback to encourage strong password habits.

## Features
- Password Generator

Customizable password length (8–32 characters)

Options to include:

Uppercase letters

Lowercase letters

Numbers

Symbols

Real-time password strength indicator

One-click copy to clipboard

- Password Strength Checker

Utilizes the zxcvbn library for advanced strength analysis.

Real-time password evaluation

Displays estimated crack times (online & offline)

Offers actionable suggestions to improve password strength

Color-coded visual strength bars

- Password Manager

Store and manage passwords securely within your browser.

Save entries with:

Website name

URL

Username

Password

Master password lock/unlock system

Add, edit, and delete password entries

Search functionality for quick access

One-click copy for usernames and passwords

All data stored locally using localStorage (fully offline, no servers)

- Technologies Used

HTML

CSS

JavaScript

zxcvbn (password strength evaluation)

localStorage API

## How to Host Locally

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gcop06/password-manager.git
   cd password-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   - The terminal will show you the local URL (usually `http://localhost:5173/`)
   - Click the URL or manually navigate to it in your browser

5. **Stop the server:**
   - Press `Ctrl + C` in the terminal

### Available Commands

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Check code quality with ESLint

### Troubleshooting

- **Port already in use:** If port 5173 is in use, Vite will automatically use the next available port
- **Dependencies issues:** Try deleting `node_modules` folder and running `npm install` again
- **Cache issues:** Hard refresh the browser (Ctrl+F5) to clear cached files

## How to access the website

- Security Notes

All passwords are stored only on the user’s device using localStorage.

No information is sent to external servers.

Users should manually back up passwords when switching or resetting devices.

- Future Enhancements

Encrypted backup/export functionality

Optional cloud sync with end-to-end encryption

Auto-generate passwords based on site policy detection

Biometric unlock support

Dark mode / custom themes

- Contributing

Contributions are welcome!
Feel free to open an issue or submit a pull request with improvements or suggestions.
