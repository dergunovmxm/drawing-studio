import * as galleryService from "../services/galleryServices.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await galleryService.getGallery();
    res.status(200).json(gallery);
  } catch (e) {
    console.error("Ошибка запроса галерии", e);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
