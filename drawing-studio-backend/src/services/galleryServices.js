import { query } from "../db.js";
export const getGallery = async () => {
  const { rows } = await query("SELECT * FROM gallery");
  return rows;
};
