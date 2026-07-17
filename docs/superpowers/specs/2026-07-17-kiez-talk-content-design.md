# Kiez-Talk-Inhalt — strukturierter Text unter dem Talk-Video

**Datum:** 2026-07-17
**Ausgelöst durch:** Wunsch von Uli — jeder Kiez-Talk soll unter dem Video eine
Überschrift/Einordnung und beliebig viele Abschnitte (Überschrift + Text) zeigen.
Kurze Talks brauchen wenige Abschnitte, lange Talks mehr.

## Ziel

- **Auf der Seite:** Wenn ein Kiez-Talk läuft, erscheint unter dem Video optional
  eine Headline, eine Einordnung und danach beliebig viele Abschnitte (jeweils
  Überschrift + Fließtext).
- **Im Werkzeug:** Uli pflegt das komplett ohne Code — mit Wiederhol-Feldern, die
  sie per Klick vermehrt („➕ Abschnitt hinzufügen“) bzw. entfernt.

## Datenmodell

Ein optionales Feld pro Folge in `data/series.json` — vollständig abwärtskompatibel
(bestehende Folgen ohne das Feld bleiben gültig):

```json
"talkContent": {
  "headline": "Milo trifft die WG – das Nachgespräch",
  "intro": "Kurze Einordnung. Leerzeile = neuer Absatz.",
  "sections": [
    { "heading": "Über das Älterwerden", "text": "Fließtext …" },
    { "heading": "",                     "text": "Abschnitt ganz ohne Überschrift." }
  ]
}
```

Alle Teile sind optional. Ein Abschnitt braucht **Überschrift oder Text** (nicht beides).
Fehlt `talkContent` ganz, wird nichts gerendert.

## Umsetzung

1. **`assets/js/app.js`** — im Talk-Modus (`seg === "talk"`) rendert `renderTalkBody()`
   den Inhalt unter dem Video. Text kommt von Uli als **reiner Text**, wird daher
   konsequent escaped (`escHtml`) und in Absätze zerlegt (Leerzeile → `<p>`,
   einzelner Umbruch → `<br>`). Kein HTML-Durchschlag möglich.
2. **`assets/css/styles.css`** — `.talk-body*`-Stile (feste helle Farben, da das
   Modal immer dunkel ist). `.modal__box` bekommt `max-height` + `overflow-y:auto`,
   damit lange Talks scrollbar sind.
3. **`werkzeug.html`** — neuer Block „🎙 Kiez-Talk-Inhalt (optional)“ im Folgen-Panel:
   Headline-Feld, Einordnung-Textarea, dynamische Abschnitts-Liste mit
   Hinzufügen/Entfernen und automatischer Nummerierung. Laden beim Auswählen einer
   Folge (`fillTalkContent`), Serialisieren beim Veröffentlichen (`gatherTalkContent`).
   Speicherweg unverändert (GitHub-API → `series.json`).
4. **`scripts/validate-series.mjs`** — optionale Prüfung von `talkContent`
   (Objekt; headline/intro Text; sections Liste aus `{heading,text}`, je nicht-leer).

## Verifikation

- Validator: gültiges `talkContent` ✓, leerer Abschnitt / falscher Typ → Fehler ✓.
- Browser: Talk-Modal rendert Headline/Intro/Abschnitte, escaped rohen `<b>`-Text,
  scrollt bei langem Inhalt, blendet den Text im „▶ Die Folge“-Modus aus.
- Werkzeug: Abschnitte hinzufügen/entfernen nummeriert korrekt neu; Serialisierung
  ergibt das erwartete `talkContent`.
