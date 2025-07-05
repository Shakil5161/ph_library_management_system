import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useCreateBorrowMutation } from '@/redux/features/bookManagement/bookManagementApi';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

interface BorrowBookModalProps {
    open: boolean;
    onClose: () => void;
    bookQuantity: number | undefined;
    bookId: string | undefined;
    bookTitle: string | undefined;
}


function BorrowBookModal({open, onClose, bookQuantity, bookId, bookTitle}: BorrowBookModalProps) {
    const form = useForm();
    const navigate = useNavigate();
    const [createBorrow, {}] = useCreateBorrowMutation() 
    const onSubmit:SubmitHandler<FieldValues> = async (data) => {

        const quantity = Number(data.quantity);
        const payload = {
            book: bookId,
            quantity,
            dueDate: data.dueDate,
        };
        if (!quantity || quantity <= 0) {
            toast.error("Please enter a valid quantity");
            return;
        }
        if (bookQuantity !== undefined && quantity > bookQuantity) {
            toast.error(`You cannot borrow more than ${bookQuantity} copies`);
            return;
        }
        try {
            const res = await createBorrow(payload).unwrap();
            toast.info("Book is borrowing ⌛");
            if (res.success) {
                navigate('/borrow-summary');
                toast.success("Book borrowed successfully ✅");
                form.reset();
                onClose();          
            } else {
                toast.error("Something went wrong");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error?.data?.message || "Failed to borrow the book");
        }
    }
    return (
        <div>
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Borrow Book: {bookTitle}</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                            control={form.control}
                            rules={{ required: "Quantity is required" }} 
                            name="quantity"
                            render={({field}) => (
                            <FormItem className="flex-1  mt-3">
                                <FormLabel />
                                <FormControl>
                                { /* Your form field */}
                                </FormControl>
                                <FormLabel>Number of quantity</FormLabel>
                                <Input required placeholder="Enter quantity" type="number" className="max-w-md" {...field} value={field.value}/>
                            
                            </FormItem>
                            )}
                        />
                    <FormField
                    control={form.control}
                    name="dueDate"
                    rules={{ required: "Due date is required" }} 
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                        <FormLabel>When you will back</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                                >
                                {field.value ? (
                                    format(field.value, "PPP")
                                ) : (
                                    <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date < new Date(new Date().setHours(0, 0, 0, 0))
                                }
                                captionLayout="dropdown"
                                required
                            />
                            </PopoverContent>
                        </Popover>
                        </FormItem>
                    )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
                </Form>
            </DialogContent>
        </Dialog>

        </div>
    );
}

export default BorrowBookModal;
