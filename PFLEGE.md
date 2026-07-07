# Seite pflegen — ohne Programmierkenntnisse

Hallo Uli! Diese Anleitung ist für dich. Du brauchst **kein** Programm, **kein** Terminal und musst dir **nichts installieren**. Alles passiert in einem einzigen Browser-Tab: **`werkzeug.html`**. Felder ausfüllen, auf **„Veröffentlichen“** klicken, fertig — du musst nie Code anfassen oder irgendwo Text einfügen.

---

## 1. Einmalig: Zugang einrichten

Bevor du loslegen kannst, braucht das Werkzeug einmalig einen Zugangs-Schlüssel von GitHub, damit es Änderungen direkt für dich speichern darf. Das machst du **einmal**, danach nie wieder.

Öffne `werkzeug.html` und klick oben auf **„Wie bekomme ich einen Zugangs-Schlüssel?“** — dort steht eine Klick-für-Klick-Anleitung. Kurz zusammengefasst:

1. Den Link zu GitHubs Token-Seite öffnen (steht im Werkzeug), einloggen.
2. Nur `wg-st-pauli` als Repository auswählen.
3. Bei den Berechtigungen **„Contents: Read and write“** einstellen.
4. „Generate token“ klicken, den Code kopieren.
5. Den Code oben im Werkzeug einfügen und auf **„Verbinden“** klicken.

Der Code wird nur in deinem eigenen Browser gespeichert — nirgendwo sonst. Danach zeigt dir das Werkzeug einen grünen Punkt: „Seite ist aktuell und live ✓“.

Falls der Zugang irgendwann nicht mehr funktioniert (z. B. weil der Code abgelaufen ist), einfach nach derselben Anleitung einen neuen erstellen.

---

## 2. Der Ablauf — für alles gleich

Im Werkzeug gibt es oben **sechs Reiter** — du wählst, was du gerade tun willst:

- **＋ Neue Folge** — eine neue Folge anlegen (das machst du jeden Samstag)
- **✎ Folge bearbeiten** — eine Folge, die es schon gibt, korrigieren
- **◐ Bewohner** — Name, Rolle, Zitat, Bio, Schlagworte einer Figur ändern
- **↗ Links** — Steady, Instagram, Facebook, Original-Website
- **✦ Staffel-Texte** — Überschrift und Untertitel einer Staffel
- **✧ Team** — Profiltext von Kim Perator (Macherin) und Milo Relotio (Reporter) ändern

Egal welcher Reiter: du füllst die Felder aus, siehst rechts sofort eine **Vorschau**, und klickst auf **„Veröffentlichen“**. Nach 1–2 Minuten ist die Änderung live. Das war's — kein Kopieren, kein Einfügen bei GitHub, keine Klammern oder Kommas, um die du dich kümmern musst.

---

## 3. Neue Folge anlegen (jeden Samstag)

Das ist deine Routine-Aufgabe.

1. **Werkzeug öffnen** und oben auf **＋ Neue Folge** klicken.
2. Die **Felder ausfüllen**: Staffel, Folgen-Nummer, Titel, Datum (immer der Samstag), Logline (ein knackiger Satz), Beschreibung (2–3 Sätze).
3. Den **Vimeo-Link der Folge** einfügen. Du kopierst ihn einfach aus dem Teilen-/Einbetten-Fenster bei Vimeo. Das Werkzeug erkennt den Link automatisch — darunter erscheint grün „Erkannt“. Wenn es einen Kiez-Talk gibt, kommt dessen Vimeo-Link ins nächste Feld (sonst leer lassen). Im letzten Feld trägst du den Link zur Original-Folgenseite ein.
4. Rechts siehst du die **Vorschau** der Folgenkarte — so wird sie aussehen.
5. Auf **„Veröffentlichen“** klicken.

Fertig! Nach ein, zwei Minuten ist die neue Folge live auf der Seite.

> **Kleiner Vimeo-Tipp:** Damit die Videos überall sauber laufen, muss bei jedem Vimeo-Video unter *Privatsphäre → Wo darf eingebettet werden* die Domain der Seite eingetragen sein. Das ist eine einmalige Sache pro Video.

---

## 4. Eine Folge bearbeiten (Texte korrigieren!)

Hat sich ein Fehler eingeschlichen? Zum Beispiel eine **falsche Folgen-Beschreibung**? Kein Problem, das ist schnell korrigiert und nichts geht dabei kaputt.

1. **Werkzeug öffnen** und oben auf **✎ Folge bearbeiten** klicken.
2. Im Auswahl-Feld die **Folge aussuchen**, die du ändern willst. Die Felder **füllen sich dann von selbst** mit dem aktuellen Text.
3. Den **Text korrigieren** — also genau das Feld ändern, das falsch ist.
4. In der Vorschau prüfen, ob es jetzt richtig aussieht.
5. Auf **„Veröffentlichen“** klicken.

Nach 1–2 Minuten zeigt die Seite den korrigierten Text.

---

## 5. Bewohner, Links und Staffel-Texte ändern

Genauso einfach: Reiter wählen, in der Auswahl die Person bzw. Staffel aussuchen, Felder anpassen, Vorschau prüfen, veröffentlichen.

Bei **Links** siehst du bewusst nicht die technischen Newsletter-Felder (Mailchimp) — dort würde ein falscher Wert die Anmeldung unbemerkt kaputt machen. Wenn daran mal etwas geändert werden muss, bitte den Helfer fragen.

**Der Abschnitt „Der Look ist kein Versehen“** auf der Startseite (und auf `kosmos.html`) liegt nicht im Werkzeug, sondern direkt in `index.html`. Den darfst du weiterhin frei umschreiben — dafür kurz den Helfer fragen oder direkt bei GitHub den Text zwischen den `<p>…</p>`-Klammern nach dem Wort `flackern` anpassen.

**Ein Bild hochladen (z. B. ein neues Bewohner-Foto)** läuft weiterhin direkt über GitHub, nicht über das Werkzeug:

1. Diesen Link öffnen: [github.com/.../upload/main/assets/img](https://github.com/Kim-WG-St-Pauli/wg-st-pauli/upload/main/assets/img) — bringt dich direkt zum Hochladen-Fenster im richtigen Ordner.
2. Bild hineinziehen oder auswählen. Gib ihm einen einfachen Namen **ohne Leerzeichen**, z. B. `cast-silke.jpg`. Unten „Commit changes“.
3. **Soll das Bild ein bestehendes ersetzen?** Dann lade es einfach mit **genau demselben Dateinamen** hoch — die Seite zeigt sofort das neue Bild, du musst sonst nichts ändern.
4. **Neuer Dateiname für einen bestehenden Bewohner:** im Werkzeug bei „Bewohner“ im Feld „Foto“ den neuen Dateinamen eintragen — das Werkzeug prüft direkt, ob es das Bild findet (grünes Häkchen).
5. **Einen komplett neuen Bewohner** hinzufügen: siehe Abschnitt 5a unten.

---

## 5a. Einen Bewohner hinzufügen oder entfernen

**Hinzufügen:**

1. Im Werkzeug auf **◐ Bewohner** klicken.
2. Neben der Auswahl-Liste auf **„＋ Neu“** klicken — die Felder leeren sich, du legst eine neue Person an.
3. Falls es ein Foto geben soll: erst wie oben beschrieben hochladen, dann den Dateinamen ins Feld „Foto“ eintragen (das Werkzeug prüft automatisch, ob es gefunden wird).
4. **Name** und **Bio** ausfüllen (Pflichtfelder — ohne die bleibt „Veröffentlichen“ ausgegraut). Rolle, Alter, Zitat und Schlagworte sind optional.
5. In der Vorschau rechts prüfen, dann auf **„Veröffentlichen“** klicken.

Das Werkzeug vergibt automatisch eine passende interne Kennung aus dem Namen — darum musst du dich nicht kümmern.

**Entfernen:**

1. Im Werkzeug auf **◐ Bewohner** klicken und die Person in der Auswahl-Liste aussuchen.
2. Unter „Veröffentlichen“ auf **„Bewohner entfernen“** klicken (nur sichtbar, wenn eine bestehende Person ausgewählt ist, nicht bei „＋ Neu“).
3. Die Sicherheitsabfrage bestätigen.

Auch das ist **jederzeit rückgängig zu machen** — genau wie bei allen anderen Änderungen über das Werkzeug landet das Entfernen als eigener Punkt in der GitHub-Historie. Anleitung dazu: [rueckgaengig.html](rueckgaengig.html).

---

## 6. Kims und Milos Profiltext ändern

Auch der Text über Kim (die Macherin der Serie) und über Milo (den Reporter aus den Kiez-Talks) lässt sich im Werkzeug pflegen.

1. **Werkzeug öffnen** und oben auf **✧ Team** klicken.
2. Im Auswahl-Feld **Kim Perator** oder **Milo Relotio** aussuchen. Die Felder füllen sich automatisch mit dem aktuellen Text.
3. **Name, Rolle und Bio** anpassen. Bei Kim gibt es zusätzlich ein **Zitat**-Feld — das gibt es bei Milo bewusst nicht, weil er als Figur kein eigenes Zitat hat; das Feld verschwindet automatisch, wenn du Milo auswählst.
4. In der Vorschau rechts prüfen, ob es gut aussieht.
5. Auf **„Veröffentlichen“** klicken.

Nach 1–2 Minuten zeigt die Seite den neuen Text.

---

## 7. Wenn doch mal was klemmt

**Keine Sorge — du kannst nichts endgültig kaputtmachen.** Zwei Sicherheitsnetze fangen dich auf:

1. **Die Seite prüft jede Änderung automatisch**, bevor sie live geht. Ist etwas unvollständig, wird einfach nicht neu veröffentlicht — der letzte gute Stand bleibt online. Das Werkzeug zeigt dir das oben mit einem roten Warnzeichen an.
2. **Jede Veröffentlichung lässt sich rückgängig machen.** GitHub speichert jede Version für immer. Genaue Klick-für-Klick-Anleitung mit Bildern: [rueckgaengig.html](rueckgaengig.html) (auch über das Werkzeug verlinkt).

Trau dich also ruhig.

---

## 8. Was du *nicht* anfassen musst

Für die ganz normale Pflege — neue Folgen, Texte, Bilder — brauchst du **nur** das Werkzeug aus dieser Anleitung.

Das **Design und Layout** (die Dateien im Ordner `assets/css`) und die **Technik** (`assets/js/app.js`, `data/series.js`, `.github/workflows`) musst du **nicht** anfassen. Da ist alles eingerichtet. Wenn am Aussehen oder an der Technik wirklich mal etwas geändert werden soll, ist dafür dein Helfer da — das ist nicht deine Aufgabe.

Viel Spaß beim Pflegen — du schaffst das mit links. 💪
