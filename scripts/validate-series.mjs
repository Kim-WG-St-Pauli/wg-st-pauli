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

function checkTalkContent(tc, where) {
  if (tc === undefined || tc === null) return; // optional
  if (typeof tc !== "object" || Array.isArray(tc)) {
    fail(`${where}: talkContent muss ein Objekt sein`);
    return;
  }
  if ("headline" in tc && typeof tc.headline !== "string") fail(`${where}: talkContent.headline muss Text sein`);
  if ("intro" in tc && typeof tc.intro !== "string") fail(`${where}: talkContent.intro muss Text sein`);
  if ("sections" in tc) {
    if (!Array.isArray(tc.sections)) {
      fail(`${where}: talkContent.sections muss eine Liste sein`);
      return;
    }
    tc.sections.forEach((s, si) => {
      if (typeof s !== "object" || s === null || Array.isArray(s)) {
        fail(`${where}: talkContent.sections[${si}] muss ein Objekt sein`);
        return;
      }
      if (!isNonEmptyString(s.heading) && !isNonEmptyString(s.text)) {
        fail(`${where}: talkContent.sections[${si}] braucht Überschrift oder Text`);
      }
      if ("heading" in s && typeof s.heading !== "string") fail(`${where}: talkContent.sections[${si}].heading muss Text sein`);
      if ("text" in s && typeof s.text !== "string") fail(`${where}: talkContent.sections[${si}].text muss Text sein`);
    });
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

if (isObject(data.creator)) {
  if (!isNonEmptyString(data.creator.name)) fail("creator: name fehlt");
  if (!isNonEmptyString(data.creator.bio)) fail("creator: bio fehlt");
} else {
  fail("creator muss ein Objekt sein");
}

if (isObject(data.reporter)) {
  if (!isNonEmptyString(data.reporter.name)) fail("reporter: name fehlt");
  if (!isNonEmptyString(data.reporter.bio)) fail("reporter: bio fehlt");
} else {
  fail("reporter muss ein Objekt sein");
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
      checkTalkContent(ep.talkContent, where);
    });
  });
} else {
  fail("seasons muss eine Liste sein");
}

if ("tiers" in data) {
  if (Array.isArray(data.tiers)) {
    let featuredCount = 0;
    data.tiers.forEach((t, i) => {
      if (!isObject(t)) { fail(`tiers[${i}]: muss ein Objekt sein`); return; }
      const where = `tiers[${i}] (${t.id})`;
      if (!isNonEmptyString(t.id)) fail(`${where}: id fehlt`);
      if (!isNonEmptyString(t.name)) fail(`${where}: name fehlt`);
      if (!isNonEmptyString(t.tagline)) fail(`${where}: tagline fehlt`);
      if (Array.isArray(t.perks)) {
        if (t.perks.length === 0) fail(`${where}: perks darf nicht leer sein`);
        t.perks.forEach((p, pi) => {
          if (!isNonEmptyString(p)) fail(`${where}.perks[${pi}]: muss ein nicht-leerer Text sein`);
        });
      } else {
        fail(`${where}: perks muss eine Liste sein`);
      }
      if (t.featured === true) featuredCount++;
    });
    if (featuredCount > 1) fail(`tiers: höchstens eine Stufe darf "featured": true haben (gefunden: ${featuredCount})`);
  } else {
    fail("tiers muss eine Liste sein");
  }
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
