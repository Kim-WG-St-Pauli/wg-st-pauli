# WG St. Pauli — Website-Redesign (Entwurf)

Ein kompletter Neuentwurf der Website für **WG St. Pauli**, eine fortlaufende
KI-Mockumentary über fünf Menschen jenseits der 50, die gemeinsam in einer WG
auf St. Pauli (Hamburg) leben – *„Alt, aber nicht artig.“*

> Dies ist ein **Design-Entwurf** zur Abnahme, kein offizieller Relaunch. Inhalte
> stammen aus der bestehenden Seite [wg-st-pauli.de](https://wg-st-pauli.de) und
> wurden im Ton beibehalten, aber sprachlich aufpoliert.

**Live-Vorschau:** https://0xdenyo.github.io/wg-st-pauli/

---

## Was ist neu?

Die bestehende Seite ist eine nackte WordPress-Standardseite (weißer Hintergrund,
gestapelte Buttons, Textwüste). Dieser Entwurf macht daraus eine eigenständige,
professionelle Marke:

- **Eigene Designsprache** mit drei umschaltbaren Themes (Knopf oben rechts):
  - **„Kiez“ (Standard)** – gealtertes Kraftpapier, eigenes Vintage-Rot, Tintenschwarz,
    Messing. Inspiriert von alten Kiez-Etiketten & dem Messing-Türschild, bewusst eine
    *eigene* Gestaltung (kein Marken-Logo/-Schriftzug, kein Herz-Anker → keine Markenrechts-Probleme).
  - **„Creme“** – heller, ruhiger; **„Neon“** – das ursprüngliche Neon-Noir.
  - Plakat-Typografie, Film-Grain. Passt zu St. Pauli *und* zur KI-Ästhetik.
- **Klare Navigation** statt Button-Liste: Start · Der Kosmos · Folgen · Bewohner · Mitmachen.
- **Mediathek** mit Staffel-Filter, „Ticket“-Folgenkarten und Klick-zum-Abspielen.
- **Fortschritt merken** – „Weiterschauen“ + Fortschrittsbalken (lokal im Browser,
  kein Login, kein Tracking). Sinnvoll für eine fortlaufende Serie.
- **Countdown** bis zur nächsten Folge (jeden Samstag) – treibt Wiederbesuche.
- **„Warum sehen die so seltsam aus?“** – ein eigener Abschnitt, der die KI-Eigenheiten
  vom Bug zum Stilmittel erklärt. (Das war die zentrale Verständnis-Hürde.)
- **Smarte CTAs** zu Steady (Unterstützen) und zur Gästeliste (Newsletter), überall sinnvoll platziert.
- **Voll responsiv**, barrierearm (reduzierte Bewegung wird respektiert), schnelle, statische Seiten.

Ausführliche Ziele & Konzept: siehe [`GOALS.md`](GOALS.md).

---

## Technik

Bewusst **build-frei und statisch** – maximal einfach zu hosten und zu pflegen:

- Reines HTML + CSS + Vanilla-JavaScript, kein Framework, kein Build-Step.
- Eine zentrale Datenquelle: [`data/series.js`](data/series.js) (Figuren, Staffeln, Folgen).
- Gemeinsame Navigation/Footer/Logik: [`assets/js/app.js`](assets/js/app.js).
- Designsystem: [`assets/css/styles.css`](assets/css/styles.css).
- Schriften via Google Fonts (Anton, Space Grotesk, DM Mono).

### Struktur

```text
wg-st-pauli/
├── index.html          # Startseite
├── kosmos.html         # Konzept / „Der WG-Kosmos“
├── folgen.html         # Mediathek (Staffeln, Folgen, Fortschritt)
├── bewohner.html       # Die fünf Bewohner + Kim Perator
├── mitmachen.html      # Unterstützen (Steady), Newsletter, Social
├── impressum.html      # Impressum (§ 5 DDG, offizielle Angaben)
├── data/series.js      # ← hier neue Folgen eintragen
├── assets/css/styles.css
├── assets/js/app.js
└── assets/img/         # Cast-Fotos (aus dem Original) + zugeschnittene Porträts
```

---

## Lokal ansehen

```bash
cd wg-st-pauli
python3 -m http.server 8000
# Browser: http://localhost:8000
```

(Einfach `index.html` doppelklicken geht auch, ein lokaler Server ist aber sauberer.)

---

## ⚠️ Wichtig: Videos & Vimeo-Domainsperre

Die Folgen liegen auf **Vimeo** und sind dort **auf die Domain `wg-st-pauli.de`
beschränkt** (Privatsphäre-Einstellung „nur auf bestimmten Domains einbettbar“).

Das bedeutet:

- Auf `wg-st-pauli.de` spielen die eingebetteten Player normal.
- Auf jeder **anderen** Domain (z. B. der GitHub-Pages-Vorschau) zeigt Vimeo sonst
  *„Sorry, because of its privacy settings…“*.

Damit die Vorschau trotzdem gut aussieht, schaltet die Seite außerhalb von
`wg-st-pauli.de` automatisch in einen **Vorschau-Modus**: statt des Players gibt es
einen sauberen Hinweis + einen Button „Folge auf wg-st-pauli.de ansehen“.

**Damit die Player überall direkt laufen** (zwei Wege, einer reicht):

1. **Empfohlen:** In den Vimeo-Einstellungen jedes Videos unter
   *Privatsphäre → Wo darf eingebettet werden* die neue Domain ergänzen
   (z. B. `0xdenyo.github.io` für die Vorschau bzw. später die finale Domain).
2. Oder die Domain-Prüfung in [`assets/js/app.js`](assets/js/app.js) anpassen
   (Konstante `VIDEO_HOST`).

---

## Neue Folge eintragen

**Ohne Code-Kenntnisse (für den/die Betreiber:in):** Es gibt ein eingebautes
**Werkzeug** unter `werkzeug.html` mit drei Modi:
**＋ Neue Folge**, **✎ Folge bearbeiten** (bestehende Texte korrigieren – Folge wählen,
Felder füllen sich, ändern, Block ersetzen) und **✦ Texte & Bilder** (Bewohner-Texte,
der „Look ist kein Versehen“-Abschnitt, Bilder hochladen). Ausfüllen → Code kopieren →
per GitHub-Web-Editor einfügen → automatisch live.

Anleitungen für Betreiber:in:
- [`PFLEGE.md`](PFLEGE.md) – der Pflege-Alltag (neue Folge, Texte, Bilder)
- [`UEBERGABE.md`](UEBERGABE.md) – eigenes GitHub-Konto + Projekt übernehmen
- [`HOSTING.md`](HOSTING.md) – eigene Domain bei all-inkl/KAS anbinden (mit DNS-Werten)

**Manuell (technisch):** In [`data/series.js`](data/series.js) im passenden
Staffel-Array einen Eintrag ergänzen:

```js
{
  id: "s2f2", no: "2", title: "Titel", date: "2026-06-12",
  logline: "Ein Satz, der Lust macht.",
  summary: "Zwei, drei Sätze Beschreibung.",
  video: { id: "VIMEO_ID", h: "HASH" },   // aus der Vimeo-Embed-URL
  talk:  { id: "VIMEO_ID", h: "HASH" },   // optionales Talk-Segment, sonst null
}
```

Die Vimeo-ID + der Hash stehen in der Embed-URL: `player.vimeo.com/video/<ID>?h=<HASH>`.
Bitte auch die Original-Episodenseite in der `urlMap` (gleiche Datei) ergänzen, damit
der Fallback-Link stimmt.

---

## Inhalt & Rechte

Alle Texte, Figuren und Medien stammen von **WG St. Pauli** /
**Kim Perator** und dienen hier ausschließlich dem Redesign-Entwurf. Die Cast-Fotos
sind aus dem bestehenden öffentlichen Auftritt übernommen; die Einzelporträts wurden
aus dem offiziellen Gruppenfoto zugeschnitten.

Die Zuordnung *Gesicht → Name* der fünf Porträts ist eine fundierte Annahme anhand
der Figurenbeschreibungen und lässt sich in `data/series.js` mit einem Handgriff tauschen.
