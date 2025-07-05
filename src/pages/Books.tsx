import BooksTable from '@/components/module/books/BooksTable';
import Loader from '@/components/ui/loader';
import { cn } from "@/lib/utils";
import { useGetBooksQuery } from '@/redux/features/bookManagement/bookManagementApi';
import type { IBook } from '@/type';
import { useState } from 'react';
function Books() {
    
    const [page, setPage] = useState(1);
    const limit = 10;

     const { data, isLoading } = useGetBooksQuery({page, limit, sortBy: 'createdAt', sort: 'desc', });
                                                                    
  
    return (
        <>
        
            {
               isLoading === true && <Loader/>
            }
            <div className="relative overflow-x-auto min-h-[500px]">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className={cn("text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",  {
            "hidden" : isLoading === true
        })}>
        <tr>
            <th scope="col" className="px-6 py-3"> Title </th>
            <th scope="col" className="px-6 py-3"> Author </th>
            <th scope="col" className="px-6 py-3"> Genre </th>
            <th scope="col" className="px-6 py-3"> ISBN </th>
            <th scope="col" className="px-6 py-3"> Copies </th>
            <th scope="col" className="px-6 py-3"> Availability </th>
            <th scope="col" className="px-6 py-3"> Actions </th>
        </tr>
        </thead>
        
            {
                isLoading === true || data?.data.map((item: IBook) => <BooksTable book={item} key={item._id}/>)
            }
            </table>
            </div>

            <div className="flex justify-center mt-6 gap-2">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-1">Page {page}</span>
                <button
                    onClick={() =>
                    setPage((prev) =>
                        data?.meta?.total && prev * limit < data.meta.total ? prev + 1 : prev
                    )
                    }
                    disabled={!data?.meta?.total || page * limit >= data.meta.total}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>
                </div>

        </>
    );
}

export default Books;

