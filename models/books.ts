import { BasicBook } from "../types/books";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (book: BasicBook, callback: Function) => {
    const queryString = "INSERT INTO Tb_Books (title, description, author_id, category) VALUES (?, ?, ?, ?)"
    db.query(
        queryString,
        [book.title, book.description, book.author_id, book.category],
        (err, result) => {
            if (err) { callback(err) };
            if (result) {
                const insertId = (<OkPacket>result).insertId;
                callback(null, insertId);
            }
            else {
                callback(null);
            }

        }
    );
};

export const findOne = (authorId: number, callback: Function) => {
    const queryString = `
        SELECT o.id,o.title, o.description, o.author_id, o.category, c.name AS author_name
        FROM Tb_Books AS o
        INNER JOIN Tb_Authors AS c ON c.id=o.author_id
        WHERE o.author_id=?`

    db.query(queryString, authorId, (err, result) => {
        if (err) { callback(err) }
        const row = result;
        callback(null, row);
    });
}

export const update = (book: BasicBook, callback: Function) => {
    db.query('UPDATE Tb_Books SET ? WHERE ?', [{ title: book.title, description: book.description, category: book.category }, { id: book.id }],
        (err, result) => {
            if (err) { callback(err) }
            else {
                callback(null);
            }

        }
    );
}

export const findOneByBookId = (bookId: number, callback: Function) => {
    const queryString = `
        SELECT 
        id
        FROM Tb_Books
        WHERE id=?`

    db.query(queryString, bookId, (err, result) => {
        if (err) { callback(err) }
        const row = result;
        callback(null, row);
    });
}

export const deleteByBookId = (bookId: number, callback: Function) => {
    const queryString = `DELETE FROM Tb_Books WHERE id = ?`;
    db.query(queryString, bookId, (err, result) => {
        if (err) { callback(err) }

        const row = result;
        callback(null, row);
    });
}
