# Übergabe & Einrichtung — Schritt für Schritt

Hallo Uli! Diese Anleitung bringt deine neue Website Schritt für Schritt in deine eigenen Hände. Am Ende gehört alles dir, läuft kostenlos und sicher (https) — und du kannst die Seite ganz allein im Browser pflegen. Keine Sorge: Du musst nichts programmieren.

---

## Reihenfolge auf einen Blick

```text
1. Konto      →  Du legst dir ein kostenloses GitHub-Konto an
2. Übertragen →  Der Helfer überträgt dir das Projekt
3. Pages an   →  Du schaltest die Veröffentlichung ein (Website wird live)
4. Domain     →  Deine eigene Adresse (www.wg-st-pauli.de) wird verbunden
```

Arbeite die vier Schritte am besten in genau dieser Reihenfolge ab.

---

## TEIL A — GitHub-Konto für Uli

GitHub ist der Ort, an dem deine Website wohnt. Ein Konto ist kostenlos.

### Schritt 1 — Kostenloses Konto anlegen

1. Gehe auf **github.com** und klicke oben rechts auf **„Sign up"** (Registrieren).
2. Gib der Reihe nach ein:
   - **E-Mail-Adresse** (eine, auf die du Zugriff hast — GitHub schickt dir eine Bestätigung).
   - **Passwort** (gern lang und sicher).
   - **Nutzername** — das ist dein öffentlicher Name bei GitHub.
     - Tipp: etwas gut Merkbares, z. B. `wg-st-pauli` oder dein eigener Name.
     - Der Nutzername taucht später in der Adresse deiner Seite auf, also wähle ihn mit Bedacht.
3. Bestätige deine E-Mail-Adresse (GitHub schickt dir einen Link oder einen Code).

> **Wichtig:** Schreibe dir **Nutzername** und **Passwort** sofort sicher auf (Notizbuch oder Passwort-Manager). Ohne diese Daten kommst du später nicht mehr an dein Projekt.

✅ Wenn du dich bei github.com einloggen kannst, ist Teil A fertig.

---

## TEIL B — Projekt an Uli übertragen

Aktuell liegt die Website im Konto des Helfers (GitHub-Nutzer **`0xdenyo`**). Jetzt wandert sie zu dir.

### Schritt 2 — Der Helfer startet die Übertragung

Das macht **der Helfer** (`0xdenyo`):

1. Im Projekt (Repo) oben auf **„Settings"** (Einstellungen) klicken.
2. Ganz nach unten scrollen bis zum rot markierten Bereich **„Danger Zone"**.
3. Auf **„Transfer ownership"** (Eigentum übertragen) klicken.
4. Ulis **neuen GitHub-Nutzernamen** eintragen und bestätigen.

### Schritt 3 — Uli bestätigt die Übernahme

1. Du (Uli) bekommst eine **E-Mail bzw. Benachrichtigung** von GitHub.
2. Klicke darin auf **„Accept"** (Annehmen) und bestätige die Übernahme.
3. Fertig — ab jetzt gehört das Projekt **dir**. Die Adresse heißt dann z. B.:

   ```text
   github.com/DEIN-NUTZER/wg-st-pauli
   ```

   (`DEIN-NUTZER` ist der Nutzername aus Schritt 1.)

### Schritt 4 — Hinweis: gemeinsam arbeiten (optional)

Falls ihr zwischendurch mal **gemeinsam** etwas bearbeiten wollt, kann der Helfer als **„Collaborator"** (Mitarbeiter) eingeladen werden:

- In deinem Projekt: **Settings → Collaborators** → Person einladen.

Das ist freiwillig und nur nötig, wenn der Helfer weiter mithelfen soll.

✅ Wenn das Projekt unter deinem Nutzernamen auftaucht, ist Teil B fertig.

---

## TEIL C — GitHub Pages aktivieren (Veröffentlichen)

Jetzt machen wir die Website live. Das kostet nichts und bringt automatisch ein Sicherheitsschloss (https) mit.

### Schritt 5 — Veröffentlichung einschalten

In **deinem** Projekt (das jetzt dir gehört):

1. Oben auf **„Settings"** klicken.
2. Links im Menü auf **„Pages"** klicken.
3. Bei **„Source"** auswählen: **„Deploy from a branch"**.
4. Als **Branch** wählst du **`main`**, als Ordner **`/(root)`**.
5. Auf **„Save"** (Speichern) klicken.

Nach **1–2 Minuten** ist deine Seite unter dieser **Test-Adresse** erreichbar:

```text
https://DEIN-NUTZER.github.io/wg-st-pauli/
```

> Diese Adresse ist nur zum Testen. Deine schöne eigene Adresse kommt im nächsten Teil.

✅ Wenn du die Seite unter der Test-Adresse im Browser siehst, ist Teil C fertig.

---

## TEIL D — Eigene Domain anbinden (Kurzfassung)

Hier verbinden wir deine Wunsch-Adresse (deine Domain bei all-inkl/KAS) mit der Website. Die **ausführlichen** Klick-für-Klick-Schritte stehen in der separaten **Hosting-Anleitung** — hier nur der Überblick, damit du die Reihenfolge verstehst.

> Tipp: Erst mit einer **Test-Adresse** üben, dann auf die echte umstellen.
> - Zum Testen: `v2.wg-st-pauli.de`
> - Später echt: `www.wg-st-pauli.de`

### Schritt 6 — Datei „CNAME" im Projekt

Im Projekt wird eine Datei mit dem Namen **`CNAME`** angelegt (genau so geschrieben, ohne Endung). Ihr Inhalt ist **nur** die Wunschdomain, eine Zeile:

```text
v2.wg-st-pauli.de
```

(Später wird daraus `www.wg-st-pauli.de`.)

### Schritt 7 — DNS bei all-inkl/KAS setzen, dann in GitHub eintragen

Die richtige Reihenfolge ist wichtig:

1. **Zuerst** bei **all-inkl/KAS** die DNS-Einträge setzen (welche genau, steht in der **Hosting-Anleitung**).
2. **Danach** in GitHub: **Settings → Pages → Custom domain** → deine Domain eintragen.
3. Den Haken bei **„Enforce HTTPS"** setzen (sorgt für das sichere Schloss).

> Nach dem Umstellen kann es ein paar Minuten bis Stunden dauern, bis die neue Adresse überall ankommt. Das ist normal.

✅ Wenn deine Seite unter deiner eigenen Adresse mit Schloss-Symbol erscheint, ist Teil D fertig.

---

## TEIL E — Alltag

Geschafft! Ab jetzt bist du selbst am Steuer.

### Schritt 8 — Pflegen im Browser

- Du pflegst alles bequem im Browser über das **Werkzeug** (`werkzeug.html`) und die **PFLEGE-Anleitung**.
- Den **Helfer** brauchst du nur noch für größere **Umbauten oder Design-Änderungen** — den normalen Alltag (Texte, Termine, Bilder) machst du allein.

---

## Wenn etwas klemmt

- **Du kommst nicht ins Konto?** → Nutzername/Passwort aus Schritt 1 prüfen; notfalls bei GitHub „Passwort vergessen?" nutzen.
- **Seite erscheint nicht?** → Nach Schritt 5 ein, zwei Minuten warten und Seite neu laden.
- **Eigene Adresse geht noch nicht?** → DNS braucht manchmal etwas Zeit; sonst Hosting-Anleitung Teil D noch einmal durchgehen.
- **Unsicher?** → Lieber kurz beim Helfer nachfragen, bevor du in der „Danger Zone" etwas anklickst.

Viel Erfolg, Uli — du schaffst das! 🌟
