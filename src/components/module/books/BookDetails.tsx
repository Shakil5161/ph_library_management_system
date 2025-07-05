import Loader from "@/components/ui/loader";
import { useGetBookByIdQuery } from "@/redux/features/bookManagement/bookManagementApi";
import { useParams } from "react-router";


function BookDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetBookByIdQuery(id);

  if (isLoading) return <Loader/>;
  if (isError || !data) return <div>Error fetching book</div>;

  const book = data.data;

  return (
    <div className="pt-6">
    
<div className="flex justify-center items-center p-0 sm:p-6">
    <div className="max-w-[720px] mx-auto">
        <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
           
        </div>

        <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row">
            <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                <img
                    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1198&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="card-image" className="object-cover w-full h-full" />
            </div>
            <div className="p-4 sm:p-6">
                <h6
                    className="block mb-4 font-sans text-xs sm:text-base text-left antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                        
                    Author: {book.author}
                </h6>
                <h4 className="block mb-2 font-sans text-1xl sm:text-2xl text-left antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {book.title}
                </h4>
                <p className="block mb-8 font-sans text-base text-left antialiased font-normal leading-relaxed text-gray-700">
                    {book.description}
                 
                </p>
                <p className="font-sans text-xs sm:text-base text-left antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">ISBN: {book.isbn}</p>
                <p className="font-sans text-xs sm:text-base text-left antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">Genre: {book.genre}</p>
                <p className="font-sans text-xs sm:text-base text-left antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">Stock: {book.copies}</p>
                <a href="#" className="inline-block">
                    <span className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[260px]"></span>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                        type="button">
                        Go Book-list
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            stroke-width="2" className="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
                        </svg>
                    </button>
                </a>
            </div>
        </div>
    </div>
</div>
    </div>
  );
}

export default BookDetails;
