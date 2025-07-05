import App from "@/App";
import BookDetails from "@/components/module/books/BookDetails";
import AddBooks from "@/pages/AddBooks";
import Books from "@/pages/Books";
import Borrows from "@/pages/Borrows";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                Component: Books
            },
            {
                path: "books",
                Component: Books
            },
            {
                path: "/book-details/:id",
                Component: BookDetails
            },
            {
                path: "borrow-summary",
                element: <Borrows />
            },
            {
                path: "create-book",
                Component: AddBooks 
            }
    ]
    }
])

export default router;