/*
 * WG St. Pauli – zentrale Seriendaten
 * Eine einzige Quelle der Wahrheit für Figuren, Staffeln und Folgen.
 * Neue Folge? Einfach unten im jeweiligen Staffel-Array ergänzen.
 */
window.WG = (function () {
  "use strict";

  /* ---------------------------------------------------------------- Figuren */
  const characters = [
    {
      id: "silke",
      name: "Silke",
      role: "Die Heimkehrerin",
      age: "Ende 50",
      img: "assets/img/cast-silke.jpg",
      quote: "Früher habe ich gesagt: Ich werde niemals alt.",
      bio: "Zurück von einem halben Leben unterwegs – ohne Konto, ohne Plan, aber mit jeder Menge Geschichten. Silke zieht ein und bringt das Gleichgewicht der WG gehörig ins Wanken.",
      tags: ["Weltenbummlerin", "pleite", "Optimistin wider Willen"],
      insta: "https://www.instagram.com/wg_st._pauli/",
    },
    {
      id: "kai",
      name: 'Kai „Mauer“',
      role: "Der Hafenarbeiter",
      age: "Ende 50",
      img: "assets/img/cast-kai.jpg",
      quote: "Mein zweites Wohnzimmer ist der Hamburger Hafen.",
      bio: "Breit wie ein Containerkran, weich wie Watte – wenn’s keiner sieht. Kai redet wenig und meint alles. Der ruhende Pol, an dem sich die WG festhält, wenn es laut wird.",
      tags: ["Hafen", "Punk-Herz", "Mann der Tat"],
      insta: "https://www.instagram.com/wg_st._pauli/",
    },
    {
      id: "petra",
      name: "Petra",
      role: "Der Kitt",
      age: "Anfang 50",
      img: "assets/img/cast-petra.jpg",
      quote: "Ich halte diese WG zusammen.",
      bio: "Pflegt, organisiert, schlichtet – und vergisst dabei manchmal sich selbst. Petra ist die Statik dieses Hauses. Ohne sie würde der Laden in einer Woche auseinanderfliegen. Mindestens.",
      tags: ["Pflegerin", "Organisatorin", "Nervenkostüm aus Stahl"],
      insta: "https://www.instagram.com/wg_st._pauli/",
    },
    {
      id: "beate",
      name: "Beate",
      role: "Die Friseuse a. D.",
      age: "50+",
      img: "assets/img/cast-beate.jpg",
      quote: "Der einzige Ort, an dem niemand etwas von mir will.",
      bio: "Hatte mal ihren eigenen Salon, hat heute vor allem Haltung. Beate inszeniert sich selbst wie eine späte Diva – und darunter steckt mehr Verletzlichkeit, als sie je zugeben würde.",
      tags: ["Ex-Salon", "Diva", "Glamour mit Patina"],
      insta: "https://www.instagram.com/wg_st._pauli/",
    },
    {
      id: "frank",
      name: "Frank",
      role: "Der Nachtcoder",
      age: "Anfang 60",
      img: "assets/img/cast-frank.jpg",
      quote: "Ich bin selbständiger Coder.",
      bio: "Arbeitet nachts, schläft selten, versteht Maschinen besser als Menschen – und ausgerechnet er lebt jetzt mit vier davon zusammen. Frank ist der leise Beobachter mit dem trockensten Spruch der WG.",
      tags: ["Coder", "Nachteule", "Trockenhumor"],
      insta: "https://www.instagram.com/wg_st._pauli/",
    },
  ];

  // Macher- / Erzähler-Persona – kein Bewohner, aber Teil des Kosmos.
  const creator = {
    id: "kim",
    name: "Kim Perator",
    role: "Autorin, Produzentin & Erzählerin",
    quote: "Was passiert eigentlich, wenn Rebellen alt werden?",
    bio: "Jahrgang 1990, lebt in Hamburg, direkt neben St. Pauli. Studium der Kulturwissenschaften (Schwerpunkt Medien- und Alltagsästhetik). Jahre hinter Tresen in Bars, Clubs und einer kleinen Fetisch- und Queerbar auf dem Kiez. Aus all dem ist die WG entstanden: erfundene Figuren, echte Dynamiken. Kim schreibt und produziert jede Folge unabhängig – ohne Auftrag, ohne Budget, nur mit KI, Kiez und Sturheit.",
  };

  // Wiederkehrende Nebenfigur in den Talk-Segmenten (Augenzwinkern inklusive).
  const reporter = {
    id: "milo",
    name: "Milo Relotio",
    role: "Journalist (fiktiv)",
    bio: "Der Reporter, der in den Kiez-Talks die großen Fragen stellt – über Plus-WGs, Alter und Zusammenleben. Ob jedes Wort davon stimmt? Der Name ist ein kleiner Wink.",
  };

  /* ---------------------------------------------------------------- Folgen */
  // type: "pilot" | "episode" | "finale"
  // video = Hauptfolge, talk = optionales Kiez-Talk-Segment
  const seasons = [
    {
      id: "s1",
      title: "Staffel 1",
      tagline: "5 Freunde – eine WG. Seit dem 11. April 2026 wird’s eng.",
      episodes: [
        {
          id: "pilot", no: "Pilot", title: "Silkes Einzug", date: "2026-04-11",
          logline: "Silke zieht ein. Fünf Leben, eine Küche, kein Zurück.",
          summary: "Der Anfang von allem: Silke steht mit zwei Koffern und null Plan vor der Tür. Was als Notlösung gedacht war, wird zum Beginn einer höchst eigenwilligen Zweck-WG.",
          video: { id: "1169523564", h: "f44501658c" },
          talk: { id: "1172434235", h: "" },
        },
        {
          id: "s1f1", no: "1", title: "9qm", date: "2026-04-18",
          logline: "9 Quadratmeter für ein ganzes Leben. Geht das gut?",
          summary: "Wer kriegt welches Zimmer? Die erste Bewährungsprobe der WG. Im Kiez-Talk spricht Kim mit Journalist Milo Relotio über Plus-WGs als Lebensform für „ältere“ Menschen.",
          video: { id: "1169522888", h: "abc7171239" },
          talk: { id: "1169523200", h: "986bd7a503" },
        },
        {
          id: "s1f2", no: "2", title: "Knapp bei Kasse", date: "2026-04-25",
          logline: "Das Konto sagt Nein. Der Kiez sagt trotzdem Ja.",
          summary: "Geld ist knapp, der Stolz ist groß. Die WG lernt, dass man manche Dinge eben gemeinsam stemmt – oder gemeinsam vergeigt.",
          video: { id: "1169523004", h: "07a167ba8c" },
          talk: { id: "1169523413", h: "8d93781611" },
        },
        {
          id: "s1f3", no: "3", title: "Herr Schulz", date: "2026-05-02",
          logline: "Besuch vom Vermieter. Die WG probt den Anstand.",
          summary: "Herr Schulz kündigt sich an – und plötzlich versucht eine Bande Unangepasster, für einen Nachmittag bürgerlich zu wirken. Das kann nur schiefgehen.",
          video: { id: "1169536629", h: "8b86bde9a6" },
          talk: { id: "1169538393", h: "5cc32cb9bf" },
        },
        {
          id: "s1f4", no: "4", title: "WG-Party & Kritikstunde", date: "2026-05-09",
          logline: "Silkes Einzug wird gefeiert – mit Ansage und Kritikstunde.",
          summary: "Endlich richtig gefeiert. Und am Ende sagt sich die WG schonungslos die Meinung. Liebe auf Kiez-Art eben.",
          video: { id: "1169541635", h: "24cb8f5b95" },
          talk: { id: "1172469671", h: "80fea2ed4c" },
        },
        {
          id: "s1f5", no: "5", title: "Der Tag danach", date: "2026-05-16",
          logline: "Kopf aus, Technik an. Der Morgen nach der Nacht.",
          summary: "Katerstimmung trifft Frank-Logik. Während die einen leiden, philosophiert der Nachtcoder über die Technik hinter allem.",
          video: { id: "1169546241", h: "82215e0f19" },
          talk: { id: "1169547978", h: "0619f2bbf6" },
        },
        {
          id: "s1f6", no: "6", title: "Nacktputzdienst", date: "2026-05-23",
          logline: "Frühjahrsputz. Dresscode optional.",
          summary: "Eine Wette, ein Putzplan, viel zu wenig Stoff. Die WG beweist: Schamgrenzen sind Verhandlungssache.",
          video: { id: "1169550047", h: "91760a785b" },
          talk: { id: "1169566948", h: "3663b18960" },
        },
        {
          id: "s1fin", no: "Finale", title: "Staffelfinale", date: "2026-05-30", type: "finale",
          logline: "Erste Staffel, letztes Wort. Die WG zieht Bilanz.",
          summary: "Was bleibt nach der ersten Staffel? Die Bewohner ziehen Bilanz – und legen den Grundstein für alles, was noch kommt.",
          video: { id: "1169625998", h: "07e33bc393" },
          talk: { id: "1169801430", h: "962e6a2d3f" },
        },
      ],
    },
    {
      id: "s2",
      title: "Staffel 2",
      tagline: "Die WG geht weiter. Jeden Samstag eine neue Folge.",
      episodes: [
        {
          id: "s2f1", no: "1", title: "Montag", date: "2026-06-05",
          logline: "Montagmorgen. Alle wollen ins Bad. Was nun?",
          summary: "Neue Staffel, altes Problem: ein Bad, fünf Menschen, kein Erbarmen. Der ganz normale Wahnsinn der WG St. Pauli – Folge eins von Staffel zwei.",
          video: { id: "1198079034", h: "3f8237204f" },
          talk: null,
        },
      ],
    },
  ];

  /* ---------------------------------------------------------------- Links */
  const links = {
    steady: "https://steady.page/de/wg-st-pauli",
    steadyAbout: "https://steady.page/de/wg-st-pauli/about",
    instagram: "https://www.instagram.com/wg_st._pauli/",
    facebook: "https://www.facebook.com/WgStPauli/",
    // Mailchimp embedded-form Endpoint (POST)
    newsletterAction: "https://wg-st-pauli.us22.list-manage.com/subscribe/post?u=c3658141b02ee5a099c70b895&id=355013bd77",
    newsletterU: "c3658141b02ee5a099c70b895",
    newsletterId: "355013bd77",
    original: "https://wg-st-pauli.de",
  };

  /* ---------------------------------------------------------------- Helpers */
  // Original-Episodenseiten (Fallback, falls Vimeo-Embed auf fremder Domain blockt)
  const urlMap = {
    pilot: "https://wg-st-pauli.de/2026/02/27/pilot-silkes-einzug/",
    s1f1:  "https://wg-st-pauli.de/2026/02/27/folge-1-9qm/",
    s1f2:  "https://wg-st-pauli.de/2026/02/27/folge-2-knapp-bei-kasse/",
    s1f3:  "https://wg-st-pauli.de/2026/03/03/folge-3-herr-schulz/",
    s1f4:  "https://wg-st-pauli.de/2026/03/04/test/",
    s1f5:  "https://wg-st-pauli.de/2026/03/04/folge-5-der-tag-danach/",
    s1f6:  "https://wg-st-pauli.de/2026/03/04/folge-6-nacktputzdienst/",
    s1fin: "https://wg-st-pauli.de/2026/03/04/staffelfinale-der-ersten-staffel/",
    s2f1:  "https://wg-st-pauli.de/2026/06/05/staffel-2-folge-1-montag/",
  };

  const allEpisodes = seasons.flatMap((s) =>
    s.episodes.map((e) => ({ ...e, season: s.id, seasonTitle: s.title, url: urlMap[e.id] || links.original }))
  );

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
    links,
    allEpisodes,
    latest,
    findEpisode,
  };
})();
