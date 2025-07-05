import { useDeleteBookMutation } from '@/redux/features/bookManagement/bookManagementApi';
import type { IBook } from '@/type';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import BorrowBookModal from '../basicComponent/BorrowBookModal';
import ConfirmDialog from '../basicComponent/ConfirmDialog';
import EditBookModal from '../basicComponent/EditBookModal';

interface IProps{
    book: IBook
}

function BooksTable({book}: IProps) {
    const [deleteBook, {}] = useDeleteBookMutation();
    const [openModal, setOpenModal] = useState(false);
    const [openBorrowModal, setOpenBorrowModal] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const navigate = useNavigate();
    const handleDeleteClick = (id: string) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!deleteId) return;
            try {
                const res = await deleteBook(deleteId).unwrap(); 
                if (res.success) {
                toast.success("Book deleted successfully ✅");
            }
        } catch (error) {
            toast.error("Failed to delete the book");
        } finally {
            setConfirmOpen(false);
            setDeleteId(null);
        }
    };
    return (
        <>
        <EditBookModal open={openModal} onClose={() => setOpenModal(false)} bookProps={book} />
        <BorrowBookModal open={openBorrowModal} onClose={() => setOpenBorrowModal(false)} bookId={book._id} bookQuantity={book.copies} bookTitle={book.title}/>
        <ConfirmDialog
            open={confirmOpen}
            onConfirm={handleConfirmDelete}
            onCancel={() => setConfirmOpen(false)}
            title="Delete Book"
            message="Are you sure you want to delete this book? This action cannot be undone."
        />
        <tbody>
        <tr  onClick={() => navigate(`/book-details/${book._id}`)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {book.title} </th>
            <td className="px-6 py-4"> {book.author} </td>
            <td className="px-6 py-4"> {book.genre} </td>
            <td className="px-6 py-4"> {book.isbn} </td>
            <td className="px-6 py-4"> {book.copies} </td>
            <td className="px-6 py-4 text-center"> {book.copies !== 0 ? "✅" : "❌"} </td>
            <td className="px-6 py-4 text-center flex gap-2"> 
                <div onClick={(e)=>{ e.stopPropagation(); handleDeleteClick(book._id || '')}} className="btn-delete cursor-pointer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#577b79" d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17"/></svg>
                </div>
                <div onClick={(e) => {e.stopPropagation(); setOpenModal(true)}} className="btn-edit cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#577b79" d="m18.988 2.012l3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287l-3-3L8 13z"/><path fill="#577b79" d="M19 19H8.158c-.026 0-.053.01-.079.01c-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2z"/></svg>
                </div>
                <div onClick={(e) => {
                    e.stopPropagation();
                    if (book.copies === 0) {
                    toast.error("This book is not available for borrowing. ❌");
                    } else {
                    setOpenBorrowModal(true);
                    }
                }} className="btn-borrow cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#577b79" d="M13 17.5c0 1.75.69 3.33 1.82 4.5H6c-1.11 0-2-.89-2-2V4a2 2 0 0 1 2-2h1v7l2.5-1.5L12 9V2h6a2 2 0 0 1 2 2v7.03c-.16-.03-.33-.03-.5-.03a6.5 6.5 0 0 0-6.5 6.5m6 2.5a2.5 2.5 0 0 1-2.5-2.5c0-.4.09-.78.26-1.12l-1.09-1.09c-.42.63-.67 1.39-.67 2.21c0 2.21 1.79 4 4 4V23l2.25-2.25L19 18.5zm0-6.5V12l-2.25 2.25L19 16.5V15a2.5 2.5 0 0 1 2.5 2.5c0 .4-.09.78-.26 1.12l1.09 1.09c.42-.63.67-1.39.67-2.21c0-2.21-1.79-4-4-4"/></svg>
                </div>
            </td>
        </tr>
        </tbody>
    

        </>
    );
}

export default BooksTable;