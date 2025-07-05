import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/features/bookManagement/bookManagementApi";
import type { APIErrorResponse, IBook } from "@/type";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";


function AddBooks() {
    const navigate = useNavigate();
    const form = useForm();
    const [createBook, {}] = useCreateBookMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (data: IBook) => {
        console.log(data)
        const bookData = {
            ...data,
            isLoading: false
        }
        try {
            toast.success('The Book is being added ⌛')
            const res = await createBook(bookData).unwrap(); 
            if (res.success) {
                navigate("/");
                toast.success(`${res.data.title} book is added successfully ✅`)
            }
            
        
        } catch (err: any) {
            const apiError = err as APIErrorResponse;
          
            if (apiError.data?.error?.errors) {
              console.log('Error from adding book', err)  
              const fieldErrors = apiError.data.error.errors;
          
              // Loop through each field and log the message
              for (const field in fieldErrors) {
                const errorMsg = fieldErrors[field].message;
                console.log(`Error in ${field}: ${errorMsg}`);
                toast(`Error in ${field} 🤖`, {
                                description: `${errorMsg}`,
                                action: {
                                  label: "Cancel",
                                  onClick: () => console.log("❌"),
                                },
                              })
              }
            } else {
              console.error("Unknown error:", err);
            }
          }
        form.reset();
    }


    return (
        <div className="m-auto pt-10 max-w-[800px]">

        <Form {...form} >
          <form  onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                <FormItem>
                    <FormLabel />
                    <FormControl>
                    { /* Your form field */}
                    </FormControl>
                    <FormLabel>Book Name</FormLabel>
                    <Input required {...field} value={field.value || ''}/>
                    
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="author"
                render={({field}) => (
                <FormItem>
                    <FormLabel />
                    <FormControl>
                    { /* Your form field */}
                    </FormControl>
                    <FormLabel>Author Name</FormLabel>
                    <Input required {...field} value={field.value || ''}/>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="flex gap-5">
            <FormField
              control={form.control}
              name="genre"
              rules={{ required: "Select a option from here" }} 
              render={({ field }) => (
                <FormItem className="mt-3 flex-1">
                  <FormLabel>Genre</FormLabel>
                  <Select  onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="w-auto">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent >
                      <SelectItem value="FICTION">FICTION</SelectItem>
                      <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                      <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                      <SelectItem value="HISTORY">HISTORY</SelectItem>
                      <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                      <SelectItem value="FANTASY">FANTASY</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <FormField
                control={form.control}
                name="copies"
                render={({field}) => (
                <FormItem  className="flex-1  mt-3">
                    <FormLabel />
                    <FormControl>
                    { /* Your form field */}
                    </FormControl>
                    <FormLabel>Number of Copies</FormLabel>
                    <Input required className="max-w-md" {...field} type="number" value={field.value || ''}/>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>

            <FormField
                control={form.control}
                name="isbn"
                render={({field}) => (
                <FormItem>
                    <FormLabel />
                    <FormControl>
                    { /* Your form field */}
                    </FormControl>
                    <FormLabel>ISBN</FormLabel>
                    <Input required {...field} value={field.value || ''}/>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({field}) => (
                <FormItem>
                    <FormLabel />
                    <FormControl>
                    { /* Your form field */}
                    </FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea required {...field} value={field.value || ''}/>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
                )}
            />
            
            <div className="flex justify-center gap-5 mt-5">
                <Button onClick={ ()=> form.reset() } className="bg-blue-500 hover:bg-blue-500 cursor-pointer">Reset </Button>
                
                <Button className="cursor-pointer" type="submit">Save</Button>
            </div>
               
            </form>
        </Form>

        </div>
    );
}

export default AddBooks;