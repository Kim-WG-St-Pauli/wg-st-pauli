/*
 * WG St. Pauli – zentrale Seriendaten
 * Lädt die eigentlichen Daten aus data/series.json und baut daraus die
 * abgeleiteten Listen (allEpisodes, latest, findEpisode) auf, damit sich
 * für app.js und alle Seiten nichts ändert.
 *
 * Die Daten selbst NICHT hier bearbeiten – das passiert über werkzeug.html
 * oder direkt in data/series.json.
 */
window.WG = (function () {
  "use strict";

  const FALLBACK = { characters: [], creator: {}, reporter: {}, seasons: [], tiers: [], links: {}, urlMap: {} };

  function loadData() {
    try {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "data/series.json", false); // synchron: window.WG muss sofort verfügbar sein
      xhr.send(null);
      if (xhr.status !== 0 && xhr.status !== 200) throw new Error("HTTP " + xhr.status);
      return JSON.parse(xhr.responseText);
    } catch (err) {
      console.error("WG: data/series.json konnte nicht geladen werden – Seite zeigt keine Inhalte an.", err);
      return FALLBACK;
    }
  }

  const data = loadData();
  const { characters, creator, reporter, seasons, links, urlMap } = data;
  const tiers = data.tiers || [];

  // Zeitschaltung: Folgen mit Zukunftsdatum bleiben bis zu ihrem Tag um RELEASE_HOUR Uhr
  // (Uhr des Besuchers) unsichtbar. "?vorschau=1" zeigt sie vorab, markiert als geplant.
  const RELEASE_HOUR = 12;
  const vorschau = new URLSearchParams(location.search).has("vorschau");
  const releaseAt = (e) => new Date(e.date + "T" + String(RELEASE_HOUR).padStart(2, "0") + ":00:00");

  const allEpisodes = seasons.flatMap((s) =>
    s.episodes.map((e) => ({ ...e, season: s.id, seasonTitle: s.title, url: urlMap[e.id] || links.original, scheduled: releaseAt(e) > new Date() }))
  ).filter((e) => vorschau || !e.scheduled);

  // chronologisch sortiert – letzte Folge zuerst
  const byDateDesc = [...allEpisodes].sort((a, b) => b.date.localeCompare(a.date));
  const latest = byDateDesc[0];

  function findEpisode(id) {
    return allEpisodes.find((e) => e.id === id) || null;
  }

  return {
    characters,
    creator,
    reporter,
    seasons,
    tiers,
    links,
    allEpisodes,
    latest,
    findEpisode,
    releaseHour: RELEASE_HOUR,
    vorschau,
  };
})();
