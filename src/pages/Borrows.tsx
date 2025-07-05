import Loader from "@/components/ui/loader";
import { useGetBorrowsQuery } from "@/redux/features/bookManagement/bookManagementApi";
import type { IBorrow } from "@/type";

function Borrows() {

    const {data, isLoading, isError} = useGetBorrowsQuery(undefined);

    return (
        <div className="overflow-x-auto w-full">
          <table className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            {!isLoading && (
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Book Title</th>
                    <th scope="col" className="px-6 py-3">ISBN</th>
                    <th scope="col" className="px-6 py-3">Total Quantity</th>
                </tr>
                </thead>
            )}

            <tbody>
                {isLoading && (
                <tr>
                    <td colSpan={3} className="text-center py-4">
                    <Loader />
                    </td>
                </tr>
                )}

                {isError && (
                <tr>
                    <td colSpan={3} className="text-center py-4">
                    Something went wrong!
                    </td>
                </tr>
                )}

                {!isLoading &&
                data?.data.slice().reverse().map((item: IBorrow) => (
                    <tr
                    key={item.book.isbn}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {item.book.title}
                    </th>
                    <td className="px-6 py-4">{item.book.isbn}</td>
                    <td className="px-6 py-4">{item.totalQuantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        </div>
    );
}

export default Borrows;