🌟 Features Overview
✅ Public Routes
All pages are publicly accessible without authentication. Users can freely navigate, view, borrow, and manage books.

📖 Book Management
View All Books: Table display of books with columns: Title, Author, Genre, ISBN, Copies, Availability, Actions.

Add Book: Form to create a new book with fields like title, author, description, ISBN, and copies.

Edit Book: Edit book details via modal or separate route. Reflect changes in UI after submission.

Delete Book: Confirmation-based removal of a book.

Borrow Book: Open a borrow form directly from the book list.

📝 Borrow Book
Borrow form includes quantity and due date.

Business rules:

Quantity must not exceed available copies.

When copies reach 0, the book is marked as unavailable.

After borrowing, user is redirected to the Borrow Summary.

📊 Borrow Summary
Displays an aggregated list of borrowed books.

Columns: Book Title, ISBN, Total Quantity Borrowed.

Data is retrieved from a backend aggregation endpoint.

🧩 Pages & Routing
Route	Description
/books	View all books (table with action buttons).
/create-book	Add a new book using a form.
/books/:id	View single book detail.
/edit-book/:id	Edit a book (optional modal or page).
/borrow/:bookId	Borrow form for a specific book.
/borrow-summary	Aggregated borrow records.

💻 Tech Stack
Layer	Technology
Frontend	React, TypeScript
State Management	Redux Toolkit, RTK Query
Styling	Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Forms & Validation	React Hook Form
Date Management	date-fns

🔄 API Integration
All endpoints are integrated using RTK Query.

Strongly typed using TypeScript.

Optimistic UI updates and toast notifications implemented.

📐 Backend Structure
📘 Books Schema
ts
export interface IBook {
    title: string,
    author: string,
    genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn: string,
    description: string,
    copies: number,
    available: boolean,
    createdAt?: Date; 
    updatedAt?: Date;
}

Backend Features
Full CRUD for Books.

Borrow logic with:

Stock check

Auto update of availability

Aggregation API for borrow summary.

Pagination support for books.

Centralized error handling with meaningful messages.

🧠 Business Logic Highlights
Book becomes unavailable when copies reach 0.

Borrowed quantity cannot exceed available stock.

Toast messages give users clear feedback for every action.

Uses optimistic UI updates where appropriate.

🌐 Responsive UI/UX
Fully responsive design with Tailwind CSS.

Clean and minimalist interface.

Mobile-first layout with optimized forms and modals.

Clear labels, buttons, and feedback throughout the UI.

⚡ Bonus Features Implemented
Feature	Status
Optimistic UI Updates	✅
Toast Notifications (sonner)	✅
Fully Responsive Layout	✅
Type-Safe Forms	✅

🚀 Getting Started
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/your-username/library-management-system.git
cd library-management-system
2. Install Dependencies
Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
Backend
bash
Copy
Edit
cd server
npm install
npm run dev
🔗 Deployment
Frontend Live URL: your-frontend-link.com

Backend API URL: your-backend-link.com

👨‍💻 Author
Shakil Ahmed
Frontend & Backend Developer
LinkedIn