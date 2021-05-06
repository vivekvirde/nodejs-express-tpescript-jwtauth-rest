import express, { Request, Response } from "express";
import * as booksModel from "../models/books";
import * as authConfig from "../authconfig";
import { BasicBook } from "../types/books";
const booksRouter = express.Router();


//Add book
booksRouter.post("/addBook", async (req: Request, res: Response) => {
    const newBook: BasicBook = req.body;
    booksModel.create(newBook, (err: Error, bookId: number) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        if(bookId){
            res.status(200).json({ success: true, "bookId": bookId, message: "Book added!" });
        }
        else{
            res.status(500).json({ success: false, message: "Incorrect author_id or data you passing" });
        }
        
    });

});

//Get all books by author id
booksRouter.get('/:id', async(req, res, next) => {
    const author_id: number = Number(req.params.id);
    booksModel.findOne(author_id, (err: Error, books: BasicBook) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).json({ "data": books });
    })
});

//Update book info
booksRouter.put("/", async (req: Request, res: Response) => {
    const book: BasicBook = req.body;
    booksModel.update(book, (err: Error) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        res.status(200).send({ success: true, message: "Book updated!" });
    })
});

//Delete book info
booksRouter.delete("/:id", authConfig.authenticateToken, async (req: Request, res: Response) => {
    const bookId: number = Number(req.params.id);
    booksModel.findOneByBookId(bookId, (err: Error, books: BasicBook) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        else {
            if (Object.entries(books).length < 1) {
                //Book not found
                res.status(404).send({ success: true, message: "Book not found!" });
            }
            else {
                //Book found and deleted
                booksModel.deleteByBookId(bookId, (err: Error, books: BasicBook) => {
                    if (err) {
                        return res.status(500).json({ "message": err.message });
                    }
                    res.status(200).send({ success: true, message: "Book deleted!" });
                })
            }
        }

    })
});


export { booksRouter };