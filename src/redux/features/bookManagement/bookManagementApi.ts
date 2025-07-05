import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://ph-level-2-assignment-3.vercel.app/api"}),
    tagTypes: ["Books", "Borrows"],
    endpoints: (builder) => ({
        // Api For Books
        getBooks: builder.query({
            query: ({ page = 1, limit = 10 }) => `/books?page=${page}&limit=${limit}`,
            providesTags: ['Books'],
        }),
        getBookById: builder.query({
            query: (id) => `/books/${id}`,
        }),

        createBook: builder.mutation({
            query: (bookData) => ({
                url: "/books",
                method: "POST",
                body: bookData
            }),
            invalidatesTags: ["Books"],
            
        }),
        deleteBook: builder.mutation({
            query: (bookId)=>({
                url: `/books/${bookId}`,
                method: "DELETE",
                body: bookId
            }),
            invalidatesTags: ["Books", "Borrows"],
        }),
        updateBook: builder.mutation({
            query: ({ bookId, bookData }) => ({
                url: `/books/${bookId}`,
                method: "PUT",
                body: bookData
            }),
            invalidatesTags: ["Books"],
        }),
        // Api For Borrows
        getBorrows: builder.query({
            query: () => "/borrow",
            providesTags: ['Borrows'],
        }),
        createBorrow: builder.mutation({
            query: (borrowData) => ({
                url: "/borrow",
                method: "POST",
                body: borrowData
            }),
            invalidatesTags: ["Borrows","Books"],
        }),        
    })
 })

export const { useGetBooksQuery, useGetBookByIdQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation, useGetBorrowsQuery, useCreateBorrowMutation } = baseApi