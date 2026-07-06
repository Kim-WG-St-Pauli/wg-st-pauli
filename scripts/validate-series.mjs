#!/usr/bin/env node
/*
 * Prüft data/series.json, bevor die Seite veröffentlicht wird.
 * Bricht mit einer klaren Fehlermeldung ab, wenn etwas nicht stimmt –
 * damit eine kaputte Datei nie live geht, sondern der alte Stand bleibt.
 */
import { readFileSync } from "node:fs";

const PATH = "data/series.json";
const errors = [];

function fail(message) {
  errors.push(message);
}

function isNonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function checkVideo(video, where) {
  if (video === null) return;
  if (typeof video !== "object" || !isNonEmptyString(video.id)) {
    fail(`${where}: video muss null oder { id } sein (h ist optional)`);
  }
}

let raw;
try {
  raw = readFileSync(PATH, "utf8");
} catch (err) {
  console.error(`✗ ${PATH} konnte nicht gelesen werden: ${err.message}`);
  process.exit(1);
}

let data;
try {
  data = JSON.parse(raw);
} catch (err) {
  console.error(`✗ ${PATH} ist kein gültiges JSON: ${err.message}`);
  process.exit(1);
}

for (const key of ["characters", "creator", "reporter", "seasons", "links", "urlMap"]) {
  if (!(key in data)) fail(`Oberste Ebene: "${key}" fehlt`);
}

function isObject(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

if (Array.isArray(data.characters)) {
  data.characters.forEach((c, i) => {
    if (!isObject(c)) { fail(`characters[${i}]: muss ein Objekt sein`); return; }
    if (!isNonEmptyString(c.id)) fail(`characters[${i}]: id fehlt`);
    if (!isNonEmptyString(c.name)) fail(`characters[${i}]: name fehlt`);
  });
} else {
  fail("characters muss eine Liste sein");
}

const seenEpisodeIds = new Set();

if (Array.isArray(data.seasons)) {
  data.seasons.forEach((season, si) => {
    if (!isObject(season)) { fail(`seasons[${si}]: muss ein Objekt sein`); return; }
    if (!isNonEmptyString(season.id)) fail(`seasons[${si}]: id fehlt`);
    if (!isNonEmptyString(season.title)) fail(`seasons[${si}]: title fehlt`);
    if (!Array.isArray(season.episodes)) {
      fail(`seasons[${si}]: episodes muss eine Liste sein`);
      return;
    }
    season.episodes.forEach((ep, ei) => {
      if (!isObject(ep)) { fail(`seasons[${si}].episodes[${ei}]: muss ein Objekt sein`); return; }
      const where = `seasons[${si}].episodes[${ei}] (${ep.id})`;
      if (!isNonEmptyString(ep.id)) fail(`${where}: id fehlt`);
      else if (seenEpisodeIds.has(ep.id)) fail(`${where}: id "${ep.id}" ist doppelt vergeben`);
      else seenEpisodeIds.add(ep.id);
      if (!isNonEmptyString(ep.no)) fail(`${where}: no fehlt`);
      if (!isNonEmptyString(ep.title)) fail(`${where}: title fehlt`);
      if (!isNonEmptyString(ep.date)) fail(`${where}: date fehlt`);
      if (!isNonEmptyString(ep.logline)) fail(`${where}: logline fehlt`);
      if (!isNonEmptyString(ep.summary)) fail(`${where}: summary fehlt`);
      checkVideo(ep.video, where);
      checkVideo(ep.talk, where);
    });
  });
} else {
  fail("seasons muss eine Liste sein");
}

if (typeof data.urlMap === "object" && data.urlMap !== null) {
  for (const [id, url] of Object.entries(data.urlMap)) {
    if (!isNonEmptyString(url)) fail(`urlMap.${id}: muss eine nicht-leere URL sein`);
  }
}

if (errors.length > 0) {
  console.error(`✗ ${PATH} hat ${errors.length} Problem(e):\n`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}

console.log(`✓ ${PATH} ist gültig (${seenEpisodeIds.size} Folgen, ${data.characters.length} Bewohner).`);
