# innoTMSGO – várólista landing

Az innoTMSGO várólistás landingje és köszönőoldala, az elfogadott dizájn szerint. Statikus oldal
(HTML + CSS + kevés JavaScript), build lépés és függőség nélkül.

## Felépítés

```
public/
  index.html              várólista landing (főoldal)
  koszonjuk/index.html    köszönőoldal az űrlap után (YouTube-videó, kattintásra töltődik be)
  404.html                hibaoldal
  assets/
    css/landing.css       a landing és a köszönőoldal stílusa, animációi, esti mód
    js/landing.js         űrlap (ellenőrzés, „Mindegyiket elfogadom”), videó betöltése, esti mód kapcsoló
    img/                  logók, fotók, favicon
```

A főoldal szakaszai: hős (élő fuvar animáció) → Minden egy helyen → négy erősség → Miért a várólista →
Négy lépés → Kinek való → Kalkulátor helye (`#kalkulator`, helyőrző) → Várólista-űrlap → GYIK →
záró felhívás → lábléc.

Az elrendezés nagy része inline stílus az oldalakban; a közös stílus, a színszerepek és az animációk
a `landing.css`-ben vannak. Az elérési utak gyökér-relatívak (`/assets/...`), ezért az oldal egy domain
vagy aldomain gyökeréről működik így; alkönyvtárba téve az útvonalakat igazítani kell.

## Helyi megtekintés

```bash
python3 -m http.server 8787 --directory public
```

Utána: http://localhost:8787 (bármilyen statikus webszerver megfelel).

## Esti mód

Alapból mindig világos (a rendszer sötét beállítása sem kapcsolja át). A fejlécben lévő kapcsolóval lehet
sötétre és vissza váltani; a választás a böngészőben megmarad (`localStorage`, kulcs: `innotmsgo-tema`).
A színek a `landing.css` elején lévő szerepekből jönnek (`--ink`, `--surface`, `--alt`, `--navy` stb.);
az esti mód csak ezeket írja át. A sárga szakaszokon a szöveg mindig sötétkék.

## Integrálás

- **Űrlap beküldése:** most érvényes kitöltés után a `/koszonjuk/` oldalra visz, adatot nem küld.
  A `public/assets/js/landing.js`-ben jelölt helyen kell bekötni a beküldést (pl. `fetch`), és csak
  sikeres küldés után továbblépni.
- **Kalkulátor:** a főoldal `#kalkulator` szakasza helyőrző; a kész kalkulátor ide, teljes szélességben épül be.
- **Indexelés:** az oldalakon `noindex, nofollow` meta van; élesítéskor le kell venni.
- **Betűtípusok:** a Montserrat és a Poppins most a Google Fontsból töltődik; igény szerint saját tárhelyre tehetők.
- **Még szükséges élesítés előtt:** konverziómérés az űrlapküldésre / a köszönőoldalra, sütisáv és
  hozzájárulás-kezelés, a Sütibeállítások és az Impresszum linkje.
