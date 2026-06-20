# Seite pflegen — ohne Programmierkenntnisse

Hallo Uli! Diese Anleitung ist für dich. Du brauchst **kein** Programm, **kein** Terminal und musst dir **nichts installieren**. Alles passiert in zwei Browser-Tabs. Nimm dir die erste neue Folge in Ruhe vor — beim zweiten Mal geht es schon wie von selbst.

---

## 1. Der Überblick: alles läuft über zwei Dinge

Du arbeitest immer mit denselben zwei Werkzeugen, beide im Browser:

1. **Das Werkzeug** — die Seite `werkzeug.html`. Sie ist nicht im Menü versteckt, du rufst sie direkt auf. Hier füllst du ein paar Felder aus und das Werkzeug **baut dir den fertigen Code** und legt ihn dir zum Kopieren bereit. Du musst nie selbst etwas Technisches schreiben.
2. **GitHub im Browser** — dort liegt die Seite. Du öffnest dort eine Datei, fügst den kopierten Code ein und klickst auf einen Speichern-Knopf. GitHub veröffentlicht die Seite dann **automatisch** neu.

Der Ablauf ist immer gleich:

> **Werkzeug ausfüllen → Code kopieren → bei GitHub einfügen → „Commit changes“ → nach 1–2 Minuten ist es live.**

Im Werkzeug gibt es oben **drei Knöpfe** — du wählst einfach, was du gerade tun willst:

- **＋ Neue Folge** — eine neue Folge anlegen (das machst du jeden Samstag)
- **✎ Folge bearbeiten** — eine Folge, die es schon gibt, korrigieren
- **✦ Texte & Bilder** — alles andere: Bewohner-Texte, Links, Bilder

---

## 2. Neue Folge anlegen (jeden Samstag)

Das ist deine Routine-Aufgabe. So geht sie:

1. **Werkzeug öffnen** (`werkzeug.html`) und oben auf **＋ Neue Folge** klicken.
2. Die **Felder ausfüllen**: Staffel, Folgen-Nummer, Titel, Datum (immer der Samstag), Logline (ein knackiger Satz), Beschreibung (2–3 Sätze).
3. Den **Vimeo-Link der Folge** einfügen. Du kopierst ihn einfach aus dem Teilen-/Einbetten-Fenster bei Vimeo. Das Werkzeug erkennt den Link automatisch — darunter erscheint grün „Erkannt“. Wenn es einen Kiez-Talk gibt, kommt dessen Vimeo-Link ins nächste Feld (sonst leer lassen). Im letzten Feld trägst du den Link zur Original-Folgenseite ein.
4. Rechts erscheinen jetzt **zwei Code-Blöcke**. Beide brauchst du:
   - **Block 1** — die eigentliche Folge.
   - **Block 2** — eine einzelne Zeile für den `urlMap`-Bereich.
5. Jetzt zu **GitHub**: die Datei **`data/series.js`** öffnen und oben rechts auf das **Stift-Symbol** („Edit“) klicken.
6. **Block 1 einfügen**: Bei der richtigen Staffel in den `episodes:`-Bereich, am besten ganz **oben als erste Folge**. Klick im Werkzeug auf **„Code kopieren“**, dann bei GitHub an die richtige Stelle einfügen.
7. **Block 2 einfügen**: In den `urlMap`-Bereich (weiter unten in derselben Datei), ebenfalls oben. Im Werkzeug auf **„Zeile kopieren“** klicken und einfügen.
8. Unten bei GitHub auf **„Commit changes“** klicken.

Fertig! Nach ein, zwei Minuten ist die neue Folge live auf der Seite.

> **Kleiner Vimeo-Tipp:** Damit die Videos überall sauber laufen, muss bei jedem Vimeo-Video unter *Privatsphäre → Wo darf eingebettet werden* die Domain der Seite eingetragen sein. Das ist eine einmalige Sache pro Video.

---

## 3. Eine Folge bearbeiten (Texte korrigieren!)

Hat sich ein Fehler eingeschlichen? Zum Beispiel eine **falsche Folgen-Beschreibung** — etwa weil eine Figur falsch beschrieben wurde? Kein Problem, das ist schnell korrigiert und nichts geht dabei kaputt.

1. **Werkzeug öffnen** und oben auf **✎ Folge bearbeiten** klicken.
2. Im Auswahl-Feld die **Folge aussuchen**, die du ändern willst. Die Felder **füllen sich dann von selbst** mit dem aktuellen Text.
3. Den **Text korrigieren** — also genau das Feld ändern, das falsch ist (z. B. die Beschreibung, in der die Figur falsch beschrieben war).
4. Rechts erscheint der **neue Block** für diese Folge. Klick auf **„Neuen Block kopieren“**.
5. Jetzt zu **GitHub**: die Datei **`data/series.js`** öffnen und auf das **Stift-Symbol** klicken.
6. In der Datei den **alten Block dieser Folge suchen**. Du erkennst ihn an der **`id`-Zeile** — das Werkzeug zeigt dir genau, wonach du suchen musst, z. B. `id: "s2f1",`. (Mit `Strg+F` bzw. `Cmd+F` kannst du im Browser danach suchen.)
7. Den **alten Block durch den neuen ersetzen**: vom öffnenden `{` bis zum passenden `},`. Die Folgen darüber und darunter rührst du nicht an.
8. Unten auf **„Commit changes“** klicken.

Nach 1–2 Minuten zeigt die Seite den korrigierten Text. So einfach ist eine Korrektur.

---

## 4. Texte & Bilder ändern

Klick im Werkzeug oben auf **✦ Texte & Bilder**. Diese Ansicht zeigt dir genau, **wo welcher Text steht**. Fast alles Inhaltliche liegt in **einer einzigen Datei**: `data/series.js`. Du öffnest sie bei GitHub, klickst auf das Stift-Symbol, änderst den Text **zwischen den Anführungszeichen** und klickst „Commit changes“.

**Wo steht was?**

- **Bewohner-Texte** (Name, Spruch, Beschreibung, Schlagworte) — im Bereich `characters`. Jede Person hat `name`, `role`, `quote`, `bio` und `tags`. Du änderst nur den Text zwischen den `"…"`.
- **Links** (Steady, Instagram, Facebook, Newsletter) — im Bereich `links`.
- **Staffel-Texte** (Überschrift und Untertitel einer Staffel) — im Bereich `seasons`, bei `title` und `tagline`.
- **Folgen-Texte** — auch im Bereich `seasons`. Bequemer geht das aber über den Modus **✎ Folge bearbeiten** (siehe oben).

**Der Abschnitt „Der Look ist kein Versehen“**

Dieser Text steht **nicht** in `data/series.js`, sondern auf der Startseite in der Datei `index.html` (und ebenso in `kosmos.html`). Du darfst ihn frei umschreiben. So findest du ihn: In `index.html` nach dem Wort **`flackern`** suchen — dort steht der Absatz. Ändere nur den Text **zwischen den `<p>…</p>`-Klammern**, die spitzen Klammern selbst bleiben stehen.

**Ein Bild hochladen (z. B. ein neues Bewohner-Foto)**

1. Bei GitHub in den Ordner **`assets/img`** gehen.
2. Auf **„Add file“ → „Upload files“** klicken und dein Bild hochladen. Gib ihm einen einfachen Namen **ohne Leerzeichen**, z. B. `cast-silke.jpg`. Unten „Commit changes“.
3. **Soll das Bild ein bestehendes ersetzen?** Dann lade es einfach mit **genau demselben Dateinamen** hoch — die Seite zeigt sofort das neue Bild, du musst sonst nichts ändern.
4. Für ein **ganz neues** Bewohner-Bild trägst du in `data/series.js` bei der Person noch den Pfad ein, z. B. `img: "assets/img/cast-silke.jpg"`.

---

## 5. Die eine Faustregel

Achte beim Einfügen immer auf die **geschweiften Klammern `{ }`** und die **Kommas**. Das ist alles, was zählt.

> **Merksatz:** Eine neue oder geänderte Folge muss **genauso aussehen** wie die Folgen direkt darüber und darunter. Vergleich einfach kurz: gleiche Einrückung, jede Zeile mit Komma am Ende, ein `{` am Anfang und ein `},` am Schluss. Sieht es aus wie die Nachbarn, ist alles richtig.

---

## 6. Wenn doch mal was klemmt

**Keine Sorge — du kannst nichts endgültig kaputtmachen.** Jede Änderung lässt sich mit einem Klick rückgängig machen:

1. Bei GitHub die geänderte Datei öffnen und die **Datei-Historie** ansehen (der Link mit der Uhr / „History“).
2. Die letzte Änderung anklicken und auf **„Revert“** gehen.
3. Bestätigen — und die Seite ist **sofort wieder im alten Stand**, so als wäre nichts gewesen.

Trau dich also ruhig. Im schlimmsten Fall klickst du einmal auf „Revert“ und alles ist wie vorher.

---

## 7. Was du *nicht* anfassen musst

Für die ganz normale Pflege — neue Folgen, Texte, Bilder — brauchst du **nur** die Dinge aus dieser Anleitung.

Das **Design und Layout** (die Dateien im Ordner `assets/css`) und die **Technik** (`assets/js/app.js`) musst du **nicht** anfassen. Da ist alles eingerichtet. Wenn am Aussehen oder an der Technik wirklich mal etwas geändert werden soll, ist dafür dein Helfer da — das ist nicht deine Aufgabe.

Viel Spaß beim Pflegen — du schaffst das mit links. 💪
