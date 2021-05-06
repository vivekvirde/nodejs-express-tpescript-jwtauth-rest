import express, { Request, Response } from "express";
import * as authorModel from "../models/author";
import { BasicAuthor } from "../types/author";
const authorsRouter = express.Router();
const jwt = require('jsonwebtoken');
import * as dotenv from "dotenv";
dotenv.config();

//Register new author
authorsRouter.post("/signup", async (req: Request, res: Response) => {

    const newAuthor: BasicAuthor = req.body;
    const email: string = req.body.email;

    authorModel.findOne(email, (err: Error, author: BasicAuthor) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        else {
            if (Object.entries(author).length < 1) {
                //If author not exist adding new one
                authorModel.create(newAuthor, (err: Error, authorId: number) => {
                    if (err) {
                        return res.status(500).json({ "message": err.message });
                    }

                    res.status(200).json({ success : true, "data": authorId, message : "Author created" });
                });
            }
            else{
                //If author exist
                res.status(200).json({success : true, message : "Author with same email is already exist" });
            }
        }
    })
});

//Login author
authorsRouter.post("/login", async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const password: string = req.body.password;
    
    authorModel.findOne(email, (err: Error, author: BasicAuthor) => {
        if (err) {
            return res.status(500).json({ "message": err.message });
        }
        else{
            if (Object.entries(author).length > 0) {
                //author exist
                authorModel.findByEmailAndPassword(email,password, (err: Error, author: BasicAuthor) => {
                    if (err) {
                        return res.status(500).json({ "message": err.message });
                    }
                    else {
                        if (Object.entries(author).length > 0) {
                            //JWT auth token 
                            const token = jwt.sign({ id: email }, process.env.TOKEN_SECRET, {
                                expiresIn: 86400 // expires in 24 hours
                              });
                            res.status(200).json({ success : true, author : author, message : "Author logged in!", authToken : token });
                        }
                        else{
                            res.status(200).json({ success : true, message : "Email and Password doesn't match!" });
                        }
                    }
                })
            }
            else{
                //author not exist
                res.status(200).json({ success : true, message : "Author with given email does not exists!" });
            }
        }
    });
});


export { authorsRouter };