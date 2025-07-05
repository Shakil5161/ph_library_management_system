import { cn } from "@/lib/utils";
import { useLocation } from "react-router";
function Banner() {
  const location = useLocation();
  const currentPathname = location.pathname.split("/")[1];
  
    return (
        <>
           <div className={cn("w-full h-[250px] bg-center bg-no-repeat bg-cover mb-8 md:bg-cover md:h-[200px] flex justify-center items-center", {
            "bg-[url('https://cdn.pixabay.com/photo/2015/05/25/14/53/book-783394_1280.png')]" : currentPathname === "create-book",
            "bg-[url('https://cdn.pixabay.com/photo/2021/01/21/15/54/books-5937716_1280.jpg')]" : currentPathname !== "create-book"
           })}>
           {currentPathname !== "book-details" && (
              <h1 className="text-4xl font-bold capitalize">
                {currentPathname === "" ? "Home" : currentPathname}
              </h1>
          )}
           </div> 
        </>
    );
}

export default Banner;