# Eigene Domain bei all-inkl/KAS anbinden

So sorgen Sie dafür, dass Ihre Domain **wg-st-pauli.de** eine Website anzeigt, deren Dateien bei GitHub liegen.

---

## Worum geht es? (in 3 Sätzen)

Die Dateien Ihrer Website liegen kostenlos bei einem Dienst namens GitHub. GitHub veröffentlicht diese Dateien automatisch als fertige Website — das nennt sich "GitHub Pages". Sie sorgen jetzt nur noch dafür, dass Ihre Domain auf diese Website zeigt.

**Zur Beruhigung:** Ihre Seite läuft danach weiterhin unter Ihrer eigenen, gewohnten Adresse (z. B. **www.wg-st-pauli.de**). Es ändert sich nur, *wo* die Dateien gespeichert sind — nicht Ihre Adresse.

---

## Reihenfolge des Vorgehens

Wir machen das in zwei Schritten, damit nichts schiefgeht:

1. **Erst testen** mit einer Test-Adresse (Subdomain) namens **v2.wg-st-pauli.de**.
2. **Wenn alles funktioniert**, schalten wir die richtige Adresse **www.wg-st-pauli.de** scharf.

So bleibt Ihre bestehende Seite erreichbar, während Sie in Ruhe ausprobieren.

---

## Schritt 1: Im KAS einloggen

Melden Sie sich an unter: **https://kas.all-inkl.com/login**

> **Hinweis:** Die Menüs bei all-inkl/KAS können sich von Zeit zu Zeit leicht ändern. Die unten genannten Menüpunkte sind als Wegweiser gedacht — falls etwas anders heißt, suchen Sie nach einem ähnlich klingenden Begriff (z. B. "DNS", "Domain", "Einstellungen").

So finden Sie die richtige Stelle (grober Weg):

- Menüpunkt **„Domains"** anklicken
- Bei der Domain **wg-st-pauli.de** auf die Detail- bzw. Bearbeiten-Ansicht gehen
- Dort den Bereich **„DNS-Einstellungen"** öffnen

Hier tragen Sie gleich die Einträge ein.

---

## Schritt 2: Test-Eintrag für die Subdomain `v2`

Legen Sie zum Testen **einen** neuen Eintrag an:

| Feld | Wert |
|---|---|
| Typ | **CNAME** |
| Name / Host | `v2` |
| Ziel / Wert | siehe unten |

Als Ziel/Wert tragen Sie ein (den **Punkt am Ende nicht vergessen**):

```text
IHR-GITHUB-NUTZER.github.io.
```

> Ersetzen Sie `IHR-GITHUB-NUTZER` durch den tatsächlichen GitHub-Benutzernamen. Falls Sie ihn nicht kennen, fragen Sie kurz die Person, die das GitHub-Konto eingerichtet hat.

Speichern Sie diesen Eintrag.

---

## Schritt 3: GitHub auf die Test-Adresse einstellen

Wechseln Sie zum GitHub-Repository (das Projekt mit den Website-Dateien):

1. Oben auf **Settings** (Einstellungen) klicken
2. Links auf **Pages** klicken
3. Bei **„Custom domain"** die Test-Adresse eintragen:

```text
v2.wg-st-pauli.de
```

4. Auf **Save** (Speichern) klicken

GitHub prüft jetzt die Adresse. Das kann etwas dauern (siehe „Geduld" weiter unten).

---

## Schritt 4: Testen

Rufen Sie im Browser auf:

```text
https://v2.wg-st-pauli.de
```

Wenn Ihre Website erscheint — super, der Mechanismus funktioniert. (Falls noch nicht: meist nur Wartezeit, siehe unten.)

> **Wichtig für die Videos:** Damit die Vimeo-Videos auf der Test-Seite angezeigt werden, müssen Sie noch eine Kleinigkeit in Vimeo erledigen — siehe den Abschnitt **„Wichtig: Vimeo-Videos"** weiter unten.

---

## Schritt 5: Auf die richtige Adresse umstellen (`www` + ohne `www`)

Wenn der Test geklappt hat, schalten wir die echte Adresse scharf.

### a) Eintrag für `www`

Legen Sie im KAS (wieder unter **DNS-Einstellungen**) diesen Eintrag an:

| Feld | Wert |
|---|---|
| Typ | **CNAME** |
| Name / Host | `www` |
| Ziel / Wert | siehe unten |

```text
IHR-GITHUB-NUTZER.github.io.
```

(Auch hier den **Punkt am Ende** nicht vergessen.)

### b) Einträge für die „nackte" Domain (ohne www)

Damit auch **wg-st-pauli.de** (ohne „www" davor) funktioniert, legen Sie zusätzlich **vier** Einträge vom Typ **A** an. Diese zeigen auf die festen Adressen von GitHub:

| Typ | Name / Host | Ziel / Wert |
|---|---|---|
| A | (leer / `@`) | `185.199.108.153` |
| A | (leer / `@`) | `185.199.109.153` |
| A | (leer / `@`) | `185.199.110.153` |
| A | (leer / `@`) | `185.199.111.153` |

Die vier Adressen noch einmal zum Abtippen:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

> „Name / Host" bleibt bei diesen vier Einträgen leer oder enthält ein `@` — je nachdem, wie das KAS-Formular es vorgibt. Das `@` steht einfach für die Domain selbst.

### c) GitHub auf die echte Adresse umstellen

Zurück in GitHub unter **Settings → Pages → Custom domain**: dort jetzt eintragen:

```text
www.wg-st-pauli.de
```

und auf **Save** klicken.

---

## Schritt 6: HTTPS (das Schloss-Symbol) aktivieren

In GitHub unter **Settings → Pages** gibt es ein Kästchen **„Enforce HTTPS"**.

- Dieses Kästchen erscheint erst, wenn GitHub für Ihre Adresse ein Sicherheitszertifikat erstellt hat. **Das passiert automatisch**, kann aber nach der Umstellung ein paar Stunden dauern.
- Sobald das Kästchen anklickbar ist: **Haken setzen.** Dann ist Ihre Seite über das sichere `https://` mit Schloss-Symbol erreichbar.

---

## Reihenfolge & Geduld (bitte lesen)

- **Erst** die DNS-Einträge bei KAS speichern, **dann** die Adresse in GitHub eintragen.
- DNS-Änderungen verbreiten sich nicht sofort im Internet. Es ist völlig normal, dass eine neue Adresse **erst nach einigen Stunden** erreichbar ist (selten bis zu einem Tag).
- Nicht beunruhigen, wenn die Seite direkt nach dem Speichern noch nicht erscheint — meistens ist es nur diese Wartezeit.

---

## Wichtig: Vimeo-Videos freischalten

Die Videos auf der Seite kommen von **Vimeo** und sind dort **auf die Domain wg-st-pauli.de beschränkt** (das ist ein Schutz, damit niemand Fremdes die Videos einbettet). Auf einer anderen Adresse zeigt Vimeo sonst statt des Videos nur einen sauberen Vorschau-Hinweis.

### Während des Tests (Subdomain v2)

In **jedem einzelnen Vimeo-Video** müssen Sie die Test-Adresse zusätzlich erlauben:

1. Bei Vimeo das Video öffnen
2. Zu **Einstellungen → Privatsphäre** gehen
3. Beim Punkt **„Wo darf das Video eingebettet werden"** zusätzlich eintragen:

```text
v2.wg-st-pauli.de
```

Erst dann läuft das Video auch auf der Test-Seite.

### Auf der finalen Seite (www)

Sobald die echte Adresse scharf ist, genügt in Vimeo:

```text
wg-st-pauli.de
```

und, falls Vimeo es getrennt verlangt, zusätzlich:

```text
www.wg-st-pauli.de
```

---

## Wenn was klemmt

- **„Die Seite ist (noch) nicht erreichbar."**
  Meistens ist das nur die **DNS-Wartezeit**. Ein paar Stunden später noch einmal probieren. Prüfen Sie zwischendurch, ob die Einträge im KAS exakt so gespeichert sind wie oben (besonders der **Punkt am Ende** beim CNAME-Ziel).

- **„Kein Schloss / keine sichere Verbindung."**
  Das **Sicherheitszertifikat kommt automatisch**, aber nicht sofort. Warten Sie ein paar Stunden und setzen Sie dann in GitHub den Haken bei **„Enforce HTTPS"** (Schritt 6).

- **„Das Video wird nicht angezeigt, nur ein Vorschau-Hinweis."**
  Dann fehlt in Vimeo die Freigabe für die aktuelle Adresse — siehe Abschnitt **„Wichtig: Vimeo-Videos"**. Bei der Test-Seite muss `v2.wg-st-pauli.de` in **jedem** Video ergänzt sein.

- **„GitHub zeigt eine Warnung bei der Custom Domain."**
  Oft nur, weil die DNS-Einträge noch nicht überall angekommen sind. Etwas warten und die Seite **Settings → Pages** neu laden.
