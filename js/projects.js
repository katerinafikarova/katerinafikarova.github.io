/*
  ============================================================
  PROJEKTY — tady přidáváš a upravuješ všechno, co je na webu.
  ============================================================

  Jak přidat nový projekt:
  1. Zkopíruj jeden blok { ... } níže a vlož ho do seznamu (pořadí = pořadí na webu).
  2. Změň "slug" (krátký název bez diakritiky a mezer, např. "kampan-xy").
  3. Obrázky nahraj do images/projekty/<slug>/ (ideálně .webp nebo .jpg, šířka do 2000 px).
  4. Ulož, nahraj na GitHub a za minutu je projekt na webu.

  Pole:
  - featured: true → projekt je na úvodní stránce
  - detail: false  → projekt nemá vlastní stránku, jen řádek v „Další práci“
  - status         → štítek stavu („Realizováno“, „Realizuje se“…), nebo null
  - tags           → jen štítky ze seznamu TAGS (podle nich funguje filtr)
  - thumb          → obrázek na kartě (výřez na výšku 4:5)
  - cover          → hlavní obrázek na stránce projektu
  - gallery        → [{ src, alt, wide }]: wide: true = přes celou šířku,
                     jinak se obrázky skládají po dvou vedle sebe
  - video          → embed odkaz z YouTube/Vimea, nebo null
*/

window.TAGS = [
  "Branding",
  "Grafika",
  "Sociální sítě",
  "Koncept a kampaň",
  "UX/UI",
  "Video",
  "Ocenění",
];

const IMG = "images/projekty/";

window.PROJECTS = [
  {
    slug: "na-zdravi-smichove",
    title: "Na zdraví, Smíchove",
    subtitle: "Přes ulici i přes století",
    type: "Grafický 2D návrh",
    year: "2026",
    client: "Pivovary Staropramen, POPAI Student Award",
    role: "Koncept, grafický návrh, AR zážitek",
    credits: "Spolu s Karolínou Princovou",
    status: "Vítěz kategorie",
    tags: ["Grafika", "Koncept a kampaň", "Ocenění"],
    featured: true,
    detail: true,
    thumb: IMG + "na-zdravi-smichove/cover.webp",
    cover: IMG + "na-zdravi-smichove/cover.webp",
    short:
      "Nová podoba mostu přes ulici Svornosti. Ruka sládka z roku 1869 si na něm přiťukne s rukou dneška.",
    award: "Vítěz POPAI Student Award 2026, kategorie Grafický 2D návrh",
    problem:
      "Pivovary Staropramen hledaly v soutěži POPAI Student Award novou podobu mostu přes ulici Svornosti na Smíchově. Most spojuje dvě budovy pivovaru a vidí ho každý, kdo jde kolem.",
    needs:
      "Návrh musel fungovat roky, ne jednu sezónu. Proto je záměrně bez obalu a etikety. A měl něco říct o tom, odkud Staropramen pochází: pivovar založili dva přátelé a je pevně spjatý se Smíchovem.",
    solution:
      "Most spojuje dvě budovy, náš motiv přípitku spojuje dvě epochy: ruka sládka z roku 1869 si ťuká s rukou dneška. Součástí řešení je technický výkres plachty z PVC mesh (12 350 × 3 700 mm) a AR zážitek pro chodce. Když na most namíří telefon, ruce si přiťuknou a objeví se „Na zdraví,“ s jejich jménem.",
    result:
      "Porota návrh vybrala jako vítěze kategorie Grafický 2D návrh 20. ročníku POPAI Student Award. Plakát byl vystavený na slavnostním vyhlášení.",
    gallery: [
      { src: IMG + "na-zdravi-smichove/digital.webp", alt: "Digitální prezentace návrhu: vizualizace mostu, koncept, technika, AR zážitek a výkres" },
      { src: IMG + "na-zdravi-smichove/poster.webp", alt: "Soutěžní plakát Na zdraví, Smíchove" },
      { src: IMG + "na-zdravi-smichove/vystava-plakatu.webp", alt: "Výstava soutěžních plakátů na kartonových stojanech" },
      { src: IMG + "na-zdravi-smichove/Katerina-a-Karolina-u-plakatu.webp", alt: "Kateřina a Karolína u svého plakátu na výstavě" },
      { src: IMG + "na-zdravi-smichove/Katerina-a-Karolina-s-trofeji-a-diplomem.webp", alt: "Kateřina a Karolína s trofejí a diplomem vítězek kategorie", wide: true },
      { src: IMG + "na-zdravi-smichove/trofej-pred-plakatem.webp", alt: "Skleněná trofej POPAI Student Award před plakátem" },
      { src: IMG + "na-zdravi-smichove/diplom-vitez-kategorie.webp", alt: "Diplom Vítěz kategorie POPAI Student Award 2026" },
    ],
    video: null,
  },
  {
    slug: "topgal-x",
    title: "Topgal X",
    subtitle: "Jak se školní projekt proměnil ve skutečnou značku",
    type: "Vizuální identita a strategie",
    year: "2025–2026",
    client: "Topgal, Czech Promotion, VŠKK",
    role: "Výzkum, brand strategie, claimy, vizuální identita",
    credits: "Spolu s Karolínou Princovou",
    status: "Realizováno",
    tags: ["Branding", "Koncept a kampaň", "Sociální sítě", "Ocenění"],
    featured: true,
    detail: true,
    thumb: IMG + "topgal-x/fotky.webp",
    cover: IMG + "topgal-x/cover.webp",
    short:
      "Sub-brand pro teenagery, který vyhrál klientskou prezentaci a o rok později se batohy s claimem Better than your e[x] začaly prodávat.",
    award: "Vítězný koncept, dnes v prodeji",
    problem:
      "Batoh od Topgalu měl na zádech skoro každý prvňák v Česku. Jenže prvňáci rostou, a v pubertě značku opouštějí: nechtějí nosit batoh, který jim vybrala máma. Spontánní znalost značky mezi lety 2023 a 2024 klesla z 50 na 45 %, konkurence rostla.",
    needs:
      "Brief zněl jasně: sub-brand pro teens (13–20 let). Prémiový, stylový, městský. Zachovat důvěru v kvalitu Topgalu, ale úplně změnit identitu, tón i přístup. A jediné omezení: musí fungovat se šnekem, symbolem mateřské značky.",
    solution:
      "Insight: přechod ze základky na střední je první velký upgrade vlastní identity. Ústředním symbolem se stalo X v hranatých závorkách: křižovatka, neznámá i proměnná, a závorky připomínají zip. Vznikl claim „Better than your e[x]“, manifest, tone of voice, logomanuál a strategie obsahu pro TikTok a Reels.",
    result:
      "Koncept vyhrál prezentaci před klientem. Pak přišla stáž v Czech Promotion a v červnu 2026 launch: kolekce VIKI X, SANY X a EZRA X je v prodeji a claim je přímo na popruzích batohů.",
    gallery: [
      { src: IMG + "topgal-x/napad.webp", alt: "Nápad: jedno písmeno X v hranatých závorkách" },
      { src: IMG + "topgal-x/slogan.webp", alt: "Slogan Better than your e[x]" },
      { src: IMG + "topgal-x/identita.webp", alt: "Vizuální identita: logo, systém závorek, typografie a barevnost", wide: true },
      { src: IMG + "topgal-x/launch.webp", alt: "Launch: batohy Topgal X v prodeji, detail popruhu s claimem", wide: true },
      { src: IMG + "topgal-x/billboard.webp", alt: "Přesah značky: spolupráce s Prima COOL a vystavení na NáplavKKa" },
      { src: IMG + "topgal-x/upgrade.webp", alt: "Tohle nebyl rozchod se školním projektem. Tohle byl upgrade." },
    ],
    video: null,
  },
  {
    slug: "padel-league",
    title: "Padel League",
    subtitle: "Značka a aplikace pro padelové turnaje",
    type: "Brand a app design",
    year: "2026",
    client: "Padel League",
    role: "Logo, vizuální systém, design aplikace, šablony pro sítě",
    credits: "Spolu s Karolínou Princovou",
    status: "Bude se realizovat",
    tags: ["Branding", "UX/UI", "Sociální sítě"],
    featured: true,
    detail: true,
    thumb: IMG + "padel-league/aplikace-ruce.webp",
    cover: IMG + "padel-league/cover.webp",
    short:
      "Vizuální systém, který z každého zápasu udělá grafiku, kterou hráči chtějí sdílet.",
    award: null,
    problem:
      "Většina padelových turnajů se organizuje v nepřehledných WhatsApp skupinách. Chybí struktura, výsledky se ztrácí a vizuální identita prakticky neexistuje. Kluby propagují turnaje ručně generickou grafikou z Canvy.",
    needs:
      "Profesionální a energický vizuál, který esteticky i funkčně překoná chaos ve WhatsAppu a přiláká hráče z celého světa. Výstupy od náhledů odkazů po výsledky měly být tak atraktivní, aby je hráči sami rádi sdíleli.",
    solution:
      "Komplexní vizuální systém, ne jen statické obrázky. Nové logo inspirované pohybem, dynamická paleta (oranžová, tmavě modrá), typografie Dazzle Unicase a Satoshi a šablony event karet a hráčských karet pro Instagram. Systém se automaticky plní daty z aplikace a generuje tisíce unikátních grafik.",
    result:
      "Návrh aplikace s profilem hráče, achievementy a sdílením výsledků do stories. Projekt se bude realizovat.",
    gallery: [
      { src: IMG + "padel-league/logo-kurt.webp", alt: "Logo Padel League na fotografii kurtu", wide: true },
      { src: IMG + "padel-league/logo.webp", alt: "Logotyp Padel League" },
      { src: IMG + "padel-league/barvy.webp", alt: "Barevná paleta: oranžová, tmavě modrá a světlá" },
      { src: IMG + "padel-league/pismo.webp", alt: "Primární písmo Dazzle Unicase" },
      { src: IMG + "padel-league/typografie.webp", alt: "Typografická kompozice s padelovými výrazy" },
      { src: IMG + "padel-league/ikona.webp", alt: "Ikona aplikace Padel League" },
      { src: IMG + "padel-league/match-karta.webp", alt: "Karta zápasu v aplikaci: Join match" },
      { src: IMG + "padel-league/achievementy.webp", alt: "Achievementy: rakety podle výkonu" },
      { src: IMG + "padel-league/stories.webp", alt: "Šablona výsledku zápasu pro Instagram stories" },
      { src: IMG + "padel-league/plakat-naplavka.webp", alt: "Plakát projektu pro výstavu NáplavKKa 2026" },
      { src: IMG + "padel-league/zaver.webp", alt: "Padel League: Ready for the next match?" },
    ],
    video: null,
  },
  {
    slug: "gymroom",
    title: "GymRoom",
    subtitle: "Redesign loga a vizuální identita",
    type: "Logo redesign",
    year: "2026",
    client: "GymRoom, soukromá posilovna",
    role: "Redesign loga, vizuální identita",
    credits: null,
    status: "Realizuje se",
    tags: ["Branding", "Grafika"],
    featured: true,
    detail: true,
    thumb: IMG + "gymroom/cover.webp",
    cover: IMG + "gymroom/cover.webp",
    short:
      "Nové logo a vizuální systém pro privátní posilovnu. Logo už visí na pobočkách.",
    award: null,
    problem:
      "GymRoom postrádal ucelenou vizuální identitu a jednotný styl ve vysoce konkurenčním segmentu fitness. Bez škálovatelného vizuálního systému bylo těžké udržet značku konzistentní online i na pobočkách.",
    needs:
      "Silná, rozpoznatelná identita, která obstojí na fasádě, ve dveřích, na webu i v kampaních, a pravidla, podle kterých ji půjde používat jednotně.",
    solution:
      "Redesign loga: dvě spojená O ve slově GymRoom tvoří symbol dvou zaklesnutých hexagonů. Teplá žlutá #FEC900 s černou a bílou jako základní paleta. Logo je už naimplementované a slouží jako základ připravovaného brand manuálu.",
    result: "Nové logo je v provozu na pobočkách a na webu. Brand manuál vzniká.",
    gallery: [
      { src: IMG + "gymroom/web.webp", alt: "Web GymRoom s novým logem na notebooku", wide: true },
    ],
    video: null,
  },
  {
    slug: "ceska-televize",
    title: "Česká televize",
    subtitle: "Akademie ČT24 a Kariéra ČT na sociálních sítích",
    type: "Content creation a sociální sítě",
    year: "2025–2026",
    client: "Česká televize",
    role: "Vizuální styl, obsah, natáčení, střih, copywriting, moderování",
    credits: null,
    status: "Realizováno",
    tags: ["Sociální sítě", "Video", "Grafika", "Branding"],
    featured: true,
    detail: true,
    thumb: IMG + "ceska-televize/cover.webp",
    cover: IMG + "ceska-televize/cover.webp",
    short:
      "Instagram, který přibližuje zákulisí televize, stáže a workshopy studentům. Obsah tvořím od nápadu po střih a sama v něm vystupuju.",
    award: null,
    problem:
      "Kariérní příležitosti a vzdělávací programy České televize (Kariéra ČT, Akademie ČT24) se potřebovaly víc přiblížit mladé generaci. Komunikace na sociálních sítích potřebovala oživení, aby zaujala Gen Z.",
    needs:
      "Svěží obsahová strategie, která atraktivně ukáže zákulisí televize, odborné workshopy i stáže. Vizuálně poutavý a konzistentní obsah, který podpoří employer branding.",
    solution:
      "Pro Akademii ČT24 jsem navrhla vizuální styl (typografie, paleta, grafické prvky) a šablony pro feed, stories a carousely. Obsah tvořím celý, v terénu i ve studiu: námět, scénář, focení, natáčení, střih a copywriting. V příspěvcích vystupuju jako moderátorka a průvodkyně.",
    result:
      "Kampaně jako „Reportéři na startu“ a studentské workshopy. Online komunikace se zmodernizovala a vzrostl organický dosah.",
    gallery: [],
    video: null,
  },
  {
    slug: "kytky-od-pepy",
    title: "Kytky od Pepy",
    subtitle: "Redesign e-shopu za tři hodiny",
    type: "UX/UI redesign",
    year: "2026",
    client: "Kytky od Pepy",
    role: "UX/UI design (Figma Make)",
    credits: null,
    status: "Case study",
    tags: ["UX/UI"],
    featured: true,
    detail: true,
    thumb: IMG + "kytky-od-pepy/cover.webp",
    cover: IMG + "kytky-od-pepy/cover.webp",
    short:
      "E-shop, který konečně vypadá jako nové pobočky. S náhledem kytice v košíku a výběrem pobočky na mapě.",
    award: null,
    problem:
      "Kamenné pobočky prošly úspěšným rebrandem, ale e-shop zůstal zastaralý a vizuálně s nimi neladil. Zákazníky brzdil složitý nákup: v košíku chyběly náhledy produktů, výběr pobočky byl nepřehledný a volba času vyzvednutí zdlouhavá.",
    needs:
      "Sjednotit online design s vizuálem prodejen a zjednodušit nákup: okamžitý náhled kytice a intuitivní výběr místa i času převzetí.",
    solution:
      "Ve Figma Make vznikl za tři hodiny kompletní redesign. Náhled kytice přímo v košíku, vyhledávání poboček s mapou a geolokací a kalendář, ve kterém zvolíš čas na dvě kliknutí.",
    result: "Web vizuálně navazuje na pobočky a nákup je kratší a přehlednější.",
    gallery: [],
    video: null,
  },

  /* ---------- Další práce (bez vlastní stránky) ---------- */
  {
    slug: "kreativni-kancl",
    title: "Obsah pro sociální sítě",
    year: "2026–dosud",
    client: "Kreativní Kancl",
    role: "Social Media Content Manager",
    tags: ["Sociální sítě"],
    detail: false,
  },
  {
    slug: "czech-promotion",
    title: "Koncepty a kreativní strategie",
    year: "2026",
    client: "Czech Promotion",
    role: "Externí spolupráce",
    tags: ["Koncept a kampaň"],
    detail: false,
  },
];
