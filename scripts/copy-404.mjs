import { copyFileSync, existsSync } from "node:fs";

const indexPath = "dist/index.html";
const notFoundPath = "dist/404.html";

if (!existsSync(indexPath)) {
  console.error("No se encontró dist/index.html. Ejecuta npm run build primero.");
  process.exit(1);
}

copyFileSync(indexPath, notFoundPath);
console.log("404.html generado correctamente para GitHub Pages.");
