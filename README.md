# 💰 Expense Tracker

A full-stack Expense Tracker application built using the MERN stack that helps users manage their income, expenses, and monthly budgets efficiently. The application provides detailed financial insights through categorized expenses, budget tracking, and summary reports.

---

## 🚀 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Secure Password Hashing using bcrypt
- Logout

### 💵 Income Management
- Add Income
- Update Income
- Delete Income
- View All Income
- Get Single Income
- Filter Income by Date Range
- Monthly Income Summary

### 💸 Expense Management
- Add Expense
- Update Expense
- Delete Expense
- View All Expenses
- Get Single Expense
- Filter Expenses by Date Range
- Expense Category Summary

### 📊 Budget Management
- Set Monthly Budget
- Update Monthly Budget
- View Current Budget
- Delete Budget
- Track Budget Usage
- Remaining Budget Calculation

### 📈 Dashboard
- Total Income
- Total Expenses
- Remaining Balance
- Budget Status
- Expense Distribution by Category

---

# 🛠️ Tech Stack

## Frontend
- React.js
- React Router
- Axios
- CSS

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- cookie-parser
- CORS

---

# 📂 Project Structure

```
Expense-Tracker/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/expense-tracker.git
```

```bash
cd expense-tracker
```

---

## Backend Setup

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run server

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
```

Install dependencies

```bash
npm install
```

Run React app

```bash
npm run dev
```

---

# 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server Port |
| MONGO_URI | MongoDB Connection String |
| JWT_SECRET | JWT Secret Key |

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/signup | Register User |
| POST | /auth/login | Login User |
| POST | /auth/logout | Logout |

---

## Income

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /income | Add Income |
| GET | /income | Get All Income |
| GET | /income/:id | Get Single Income |
| PATCH | /income/:id | Update Income |
| DELETE | /income/:id | Delete Income |
| GET | /income/date-range | Income Between Dates |
| GET | /income/monthly-summary | Monthly Income Summary |

---

## Expenses

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /expense | Add Expense |
| GET | /expense | Get All Expenses |
| GET | /expense/:id | Get Single Expense |
| PATCH | /expense/:id | Update Expense |
| DELETE | /expense/:id | Delete Expense |
| GET | /expense/date-range | Expense Between Dates |
| GET | /expense/category-summary | Expense Category Summary |

---

## Budget

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /budget | Set Monthly Budget |
| GET | /budget | Get Current Budget |
| PATCH | /budget | Update Budget |
| DELETE | /budget | Delete Budget |

---

# 📊 Budget Logic

- Users first set a monthly budget.
- Categories are optional.
- If category budgets are provided, expenses are tracked against each category.
- If no category budgets are set, expenses are tracked only against the total monthly budget.
- Remaining budget is calculated automatically.

---

# 📷 Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Add Expense
- Add Income
- Budget Page
- Reports

---

# 🧪 Future Improvements

- Expense Charts
- Dark Mode
- Export Reports (PDF/Excel)
- Email Notifications
- Recurring Transactions
- Multi-Currency Support
- Savings Goals
- Mobile Responsive UI

---

# 🤝 Contributing

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Ritesh Gurkhe**

GitHub: https://github.com/Riteshg08

LinkedIn: https://www.linkedin.com/in/ritesh-gurkhe-261401323/

---

⭐ If you like this project, don't forget to give it a star!
