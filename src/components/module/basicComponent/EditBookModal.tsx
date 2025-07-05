// components/ui/Modal.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateBookMutation } from "@/redux/features/bookManagement/bookManagementApi";
import type { IBook } from "@/type";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";


interface ModalProps {
  open: boolean;
  onClose: () => void;
  bookProps: IBook;
}

const EditBookModal = ({ open, onClose, bookProps }: ModalProps) => {

  const form = useForm();
  const [updateBook, {}] = useUpdateBookMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data: IBook) => {
    console.log("Submitted data:", data); 
    const bookData = {
      ...data,
      isLoading: false
    }
    try {
      let res = await updateBook({bookId: bookProps._id, bookData}).unwrap();
      if (res.success) {
        toast.success(`${res.data.title} book is updated successfully ✅`);
        onClose();
        form.reset();
      }
    } catch (error) {
      toast.error("Failed to update book. Please try again.");
      console.error("Error updating book:", error);
    }
  }


  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>

       <Form {...form} >
          <form  onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="title"
                render={({field}) => (
                <FormItem>
                    <FormLabel />
                    <FormControl>
                    </FormControl>
                    <FormLabel>Book Name</FormLabel>
                    <Input required {...field} value={field.value || bookProps.title}/>
                    
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
                    <Input required {...field} value={field.value || bookProps.author}/>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="flex gap-5">
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem className="mt-3 flex-1">
                  <FormLabel>Genre</FormLabel>
                  <Select required onValueChange={field.onChange} value={field.value || bookProps.genre}>
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
                <FormItem className="flex-1  mt-3">
                    <FormLabel />
                    <FormControl>
                    { /* Your form field */}
                    </FormControl>
                    <FormLabel>Number of Copies</FormLabel>
                    <Input required className="max-w-md" type="number" {...field} value={field.value || bookProps.copies}/>
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
                    <Input required {...field} value={field.value || bookProps.isbn}/>
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
                    <Textarea required {...field} value={field.value || bookProps.description}/>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
                )}
            />
            
            <div className="flex justify-center gap-5 mt-5">
                <Button className="cursor-pointer" type="submit">Save</Button>
            </div>
               
            </form>
        </Form>

      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
