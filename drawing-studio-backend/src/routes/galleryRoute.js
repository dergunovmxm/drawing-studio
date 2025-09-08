import express from "express";

import * as galleryController from "../controllers/galleryController.js";

const router = express.Router();

router.get("/gallery", galleryController.getGallery);

export default router;
