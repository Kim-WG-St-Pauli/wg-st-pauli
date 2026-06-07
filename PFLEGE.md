# Seite pflegen — ohne Programmierkenntnisse

Diese Anleitung ist für **Kim** (oder wen auch immer die Seite pflegt). Du brauchst
**kein Terminal, kein Programm, keine Vorkenntnisse** – nur einen Browser und einen
GitHub-Login.

## Jeden Samstag: neue Folge eintragen

1. **Werkzeug öffnen:** Geh auf `…/werkzeug.html` der Seite
   (z. B. <https://0xdenyo.github.io/wg-st-pauli/werkzeug.html>).
2. **Formular ausfüllen:** Titel, Datum, Logline, Beschreibung und die **Vimeo-Links**
   (einfach den Teilen-/Einbetten-Link aus Vimeo reinkopieren – das Werkzeug zieht
   sich ID und Hash selbst raus).
3. **Zwei Code-Blöcke kopieren**, die rechts erscheinen (Block 1 = die Folge,
   Block 2 = die Fallback-Adresse).
4. **In GitHub einfügen:**
   - Datei `data/series.js` im Repo öffnen → oben rechts auf das **Stift-Symbol** (Edit).
   - **Block 1** ganz oben in den `episodes:`-Block der richtigen Staffel einfügen.
   - **Block 2** ganz oben in den `urlMap`-Block einfügen.
   - Unten **„Commit changes“** klicken.
5. **Warten:** Nach ein, zwei Minuten ist die neue Folge automatisch online. Fertig.

> Faustregel beim Einfügen: Die neue Folge sieht genauso aus wie die anderen
> drüber/drunter – mit `{ … },` drumherum. Solange Klammern und Kommas stimmen,
> kann nichts kaputtgehen.

## Andere Inhalte ändern

Alles Inhaltliche steht in **einer** Datei: `data/series.js`.

- **Figuren/Bewohner** (Name, Spruch, Beschreibung): im `characters`-Block.
- **Staffel-Texte / Reihenfolge:** im `seasons`-Block.
- **Links** (Steady, Instagram, Facebook, Newsletter): im `links`-Block.

Immer nach dem Bearbeiten: **„Commit changes“** → automatisch live.

Design und Layout liegen in `assets/css/styles.css` bzw. `assets/js/app.js` – die
muss man für normale Pflege **nicht** anfassen.

## Videos laufen nur auf wg-st-pauli.de?

Die Vimeo-Videos sind absichtlich auf die Domain `wg-st-pauli.de` beschränkt. Auf
anderen Adressen (z. B. der GitHub-Vorschau) zeigt die Seite dann einen sauberen
Hinweis mit „auf wg-st-pauli.de ansehen“-Button statt des Players.

Damit der Player **überall** direkt läuft: In Vimeo bei jedem Video unter
*Einstellungen → Privatsphäre → Wo darf das Video eingebettet werden* die jeweilige
Domain ergänzen.

## Wenn doch mal was klemmt

Im Zweifel den letzten Commit in GitHub rückgängig machen (Datei-Historie → „Revert“)
– die Seite ist dann sofort wieder im alten Stand. Kaputtmachen ist also reversibel.
