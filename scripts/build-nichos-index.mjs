// build-nichos-index.mjs — WP3b/4b (SDD v1.0.1) — ESM puro
// Fuente unica de verdad: los yaml del kernel Talos. El portal JAMAS edita este manifiesto a mano.
// Escalera determinista (SDD Seccion 3):
//   (1) fuente alcanzable -> regenerar y validar
//   (2) inalcanzable + manifiesto commiteado existe -> warning y continuar
//   (3) inalcanzable + sin manifiesto -> fallar con mensaje determinista
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = process.env.NICHOS_SOURCE_DIR || "\\\\wsl.localhost\\Ubuntu\\home\\papel\\Talos\\nichos";
const outPath = join(root, "nichos.index.json");

// Ortografia oficial de vitrina — el unico mapa de display del sistema (vive aqui, no en UI)
const DISPLAY = {
  odontologia: "Odontología",
  gimnasio: "Gimnasios",
  fisioterapia: "Fisioterapia",
  peluqueria: "Peluquería",
  veterinaria: "Veterinaria",
  agrovet: "Agro-Vet",
  hotel: "Hoteles",
  bicicleteria: "Bicicleterías",
};
const ORDER = ["odontologia","gimnasio","fisioterapia","peluqueria","veterinaria","agrovet","hotel","bicicleteria"];

function main() {
  if (!existsSync(sourceDir)) {
    if (existsSync(outPath)) {
      console.warn(`[nichos] WARN: fuente inalcanzable (${sourceDir}) — se conserva nichos.index.json commiteado.`);
      process.exit(0);
    }
    console.error(`[nichos] FALLO DETERMINISTA: fuente inalcanzable (${sourceDir}) y no existe nichos.index.json. Define NICHOS_SOURCE_DIR.`);
    process.exit(1);
  }

  const files = readdirSync(sourceDir).filter((f) => f.endsWith(".yaml"));
  const nichos = [];
  for (const file of files) {
    const doc = parse(readFileSync(join(sourceDir, file), "utf-8"));
    if (!doc?.nicho || !Array.isArray(doc?.nodos)) {
      console.error(`[nichos] FALLO: ${file} no tiene la estructura esperada (nicho/nodos).`);
      process.exit(1);
    }
    const detect = doc.nodos.find((n) => n.id === "detectar_inactivo");
    const primer = doc.nodos.find((n) => n.tipo === "mensaje");
    const esperas = doc.nodos.filter((n) => n.tipo === "espera");
    nichos.push({
      nicho: doc.nicho,
      nombre: DISPLAY[doc.nicho] ?? doc.nicho,
      grafo: doc.grafo,
      umbral_dias: detect?.params?.umbral_dias ?? null,
      canal: primer?.canal ?? null,
      toques: doc.nodos.filter((n) => n.tipo === "mensaje").length,
      dias_entre_toques: esperas[0]?.params?.dias ?? null,
      plantilla_inicial: primer?.plantilla ?? null,
    });
  }

  nichos.sort((a, b) => {
    const ia = ORDER.indexOf(a.nicho), ib = ORDER.indexOf(b.nicho);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });

  if (nichos.length !== 8) {
    console.error(`[nichos] FALLO DETERMINISTA: se esperaban 8 yaml, se encontraron ${nichos.length}.`);
    process.exit(1);
  }

  writeFileSync(outPath, JSON.stringify({ generado_de: sourceDir, total: nichos.length, nichos }, null, 2) + "\n");
  console.log(`[nichos] OK: ${nichos.length} nichos -> nichos.index.json`);
}

main();
