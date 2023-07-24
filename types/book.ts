import express from 'express';
namespace Book{
    export interface book{
        id: number,
        title: string,
        author: string,
        pubYear: string,
    }
    export interface Request extends express.Request{
        body: book,
        query:{
            name: string,
            pubyear: string,
            page: string,
            pageSize: string,
        }
    }
}
export default Book;