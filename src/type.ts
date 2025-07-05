export interface IBook {
    _id?:string
    title?: string,
    author?: string,
    genre?: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY",
    isbn?: string,
    description?: string,
    copies?: number,
    available?: boolean,
    createdAt?: Date; 
    updatedAt?: Date;
}


interface FieldError {
    message: string;
    name: string;
    kind: string;
    path: string;
  }
  
  interface ValidationError {
    name: string;
    errors: {
      [key: string]: FieldError;
    };
  }
  
export interface APIErrorResponse {
    status: number;
    data: {
      message: string;
      success: boolean;
      error: ValidationError;
    };
  }
  
export interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

export interface IBorrow {
  book: {
    isbn: string;
    title: string;
  },
  totalQuantity: number;
}