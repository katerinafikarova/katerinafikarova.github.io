# Portfolio: Kateřina Fikarová

Statický web pro GitHub Pages. Nic se nekompiluje: co je ve složce, to je na webu.

## Co je kde

| Soubor | Co v něm je |
|---|---|
| `js/projects.js` | **Všechny projekty.** Tady přidáváš nové práce a upravuješ texty. |
| `index.html` | Úvodní stránka (úvod, vybrané projekty, další práce, kontakt) |
| `projekty.html` | Všechny projekty s filtrem podle oboru |
| `projekt.html` | Detail projektu (obsah se bere z `projects.js` podle `?p=slug`) |
| `o-mne.html` | O mně, praxe, dovednosti, ocenění |
| `css/style.css` | Vzhled. Barvy a písmo (Poppins) jsou úplně nahoře. |
| `images/projekty/<slug>/` | Obrázky k jednotlivým projektům |
| `files/` | CV v PDF a jiné soubory ke stažení |

## Co ještě můžeš doplnit

1. **CV**: ulož do `files/cv-katerina-fikarova.pdf` a v patičce (ve všech `.html`) odkomentuj tlačítko „Stáhnout CV“.
2. **Česká televize a Kytky od Pepy** mají zatím jen jeden obrázek. Další přidej do `gallery` v `projects.js`.
3. **Videa** nahraj na YouTube nebo Vimeo a do `video` vlož embed odkaz, např. `https://www.youtube.com/embed/ID_VIDEA`.
4. Zkontroluj, co smíš zveřejnit (ČT, Staropramen, Topgal, GymRoom), a souhlas Karolíny s fotkami.

**Složka `PROJEKTY/`** obsahuje zdrojové materiály. Na GitHub se nenahrává (je v `.gitignore`), web používá jen zmenšené obrázky ve složce `images/`.

## Odkazy a příspěvky na sítích

- **Příspěvky** (LinkedIn, Instagram…) jsou v `js/projects.js` dole v seznamu `POSTS`. Na úvodní stránce se ukážou v sekci „Na sítích a v médiích“ (nejnovější nahoře), a pokud mají `project`, i na stránce daného projektu.
- **Odkazy u projektu** (AR prototyp, e-shop, Instagram účet…) přidáš do pole `links` u projektu.
- U položek v „Další práci“ můžeš doplnit `link`, pak je název klikací.

## Prezentace „First impressions“ (5 minut)

- Stránka `prezentace.html`: vizitka a představení, tři vybrané projekty a kontakt. Česky i anglicky (tlačítko CZ/EN).
- Ovládání: šipky nebo mezerník, **T** spustí či zastaví časomíru 5:00 (dvojklik na ni vrátí čas), **F** celá obrazovka.
- Texty jsou přímo v `prezentace.html` (anglická verze v `data-en`), vzhled v `css/prezentace.css`.

## Identita: Ferda mravenec, práce všeho druhu

- Barvy jsou v `css/style.css` nahoře: **Claret** `#670626` a **Pink** `#FFBDC5`.
- Mraveneček je v `images/mravenec.svg` (ikona webu je `images/favicon.svg`). Na webu se objeví všude, kde je `<span class="star"></span>`; barvu bere z `background`.

## Anglická verze

- Přepínač **CZ / EN** je v hlavičce. Volba se pamatuje a odkazy ji nesou dál (`?lang=en`).
- Překlady projektů, příspěvků, štítků a odkazů jsou v `js/en.js`. Co tam chybí, ukáže se v angličtině česky.
- Texty přímo v HTML mají anglickou verzi v atributu `data-en="…"`. Když v HTML změníš český text, uprav i ten anglický.
- Obrázky z příspěvků jsou ve složce `images/posty/` a u příspěvku je vybírá pole `img`.

## Mezipaměť prohlížeče

- Když změníš CSS nebo JS, zvyš v HTML číslo za `?v=` (např. `style.css?v=20261124c`), aby návštěvníkům nezůstala stará verze v mezipaměti.

## Jak přidat nový projekt

V `js/projects.js` zkopíruj jeden existující blok `{ ... }`, změň `slug` a texty. Pokud chceš projekt na úvodní stránce, nastav `featured: true`. Malé věci bez vlastní stránky dej s `detail: false`, objeví se v „Další práci“.

## Zveřejnění na GitHub Pages

1. Na github.com vytvoř nový veřejný repozitář. Když ho pojmenuješ `<tvoje-uživatelské-jméno>.github.io`, web pak poběží přímo na té adrese.
2. Nahraj do něj obsah této složky **kromě složky `PROJEKTY`** (přes **Add file → Upload files**, nebo přes GitHub Desktop, který `.gitignore` respektuje sám).
3. V repozitáři otevři **Settings → Pages**, u *Source* zvol **Deploy from a branch**, větev `main` a složku `/ (root)`. Ulož.
4. Za minutu dvě je web na `https://<tvoje-uživatelské-jméno>.github.io/` (u jinak pojmenovaného repozitáře na `.../<název-repozitáře>/`).

**Vlastní doména** (např. `katerinafikarova.cz`): v **Settings → Pages → Custom domain** ji zadej a u registrátora domény nastav DNS podle [návodu GitHubu](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Náhled u sebe na počítači

V Terminálu ve složce webu:

```bash
python3 -m http.server 8000
```

Pak otevři http://localhost:8000.
