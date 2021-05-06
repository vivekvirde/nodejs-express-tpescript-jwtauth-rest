import { BasicAuthor } from "../types/author";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (author: BasicAuthor, callback: Function) => {
    const queryString = "INSERT INTO Tb_Authors (name, email, password) VALUES (?, ?, ?)"
    db.query(
        queryString,
        [author.name, author.email, author.password],
        (err, result) => {
            if (err) { console.log(err); callback(err) };
            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};

export const findOne = (emailId: string, callback: Function) => {
    const queryString = `
        SELECT 
        id
        FROM Tb_Authors
        WHERE email=?`
    db.query(queryString, emailId, (err, result) => {
        if (err) { callback(err) }
        const row = result;
        callback(null, row);
    });
}

export const findByEmailAndPassword = (emailId: string, password: string, callback: Function) => {
    const queryString = `
      SELECT 
        id
      FROM Tb_Authors
      WHERE email=? AND password=?`

    db.query(queryString, [emailId, password], (err, result) => {
        if (err) { callback(err) }
        const row = result;
        callback(null, row);
    });
}