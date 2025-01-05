import { searchContacts } from "../controllers/ContactsController.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactsRoute = Router();

contactsRoute.post("/search", verifyToken, searchContacts);

export default contactsRoute;
