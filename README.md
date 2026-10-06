# FacilityFaultManager

En app för att rapportera och hålla koll på fel i fastigheter, byggd med React Native, Expo och TypeScript.

## Beskrivning

FacilityFaultManager är till för fastighetsskötare och hyresgäster som vill rapportera fel i en fastighet – en trasig lampa, en läckande kran eller en dörr som inte går att låsa – och få en samlad överblick över alla felanmälningar.

**Det här kan du göra i appen:**

- **Se alla felanmälningar** i en lista, med den nyaste överst.
- **Skapa en ny felanmälan** med titel, beskrivning, plats och kategori (El, VVS, Ventilation, Lås eller Övrigt). Appen kontrollerar att alla fält är ifyllda innan den sparar.
- **Fylla i platsen automatiskt** med telefonens GPS. Adressen går alltid att ändra för hand, till exempel om du skriver anmälan hemma men felet finns någon annanstans.
- **Bifoga en bild** från telefonens bildgalleri.
- **Öppna en felanmälan** och se all information om den, inklusive bilden.
- **Känna i handen** att något hänt – telefonen vibrerar lätt när du väljer kategori, sparar eller har glömt fylla i något.
- **Hålla koll på fikan** ☕ – överst på startsidan visar fikaklockan veckodag, vecka och hur länge det är kvar till nästa fika (09:30 och 14:30). På lediga dagar blir det fika hemma.

> **Obs:** Första gången appen startar visas tio exempel-felanmälningar. Nya felanmälningar sparas i telefonen och finns kvar när appen startas om.

## Så bygger och kör du projektet

**Det här behöver du:**

- [Node.js](https://nodejs.org/) (LTS-versionen) och Git på datorn
- Appen **Expo Go** på din telefon ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)). Projektet använder Expo SDK 57, så Expo Go behöver vara uppdaterad.
- Telefonen och datorn måste vara anslutna till **samma wifi**.

**Steg för steg:**

1. Klona projektet och gå in i mappen:

   ```bash
   git clone https://github.com/MicOli96/FacilityFaultManager.git
   cd FacilityFaultManager
   ```

2. Installera paketen:

   ```bash
   npm install
   ```

3. Starta utvecklingsservern:

   ```bash
   npx expo start
   ```

4. Öppna appen på telefonen:
   - **iOS:** skanna QR-koden i terminalen med kameran och öppna länken i Expo Go.
   - **Android:** öppna Expo Go och skanna QR-koden därifrån.

5. Första gången du trycker på **Använd min plats** frågar telefonen om appen får använda din plats. Svara **Tillåt** för att testa funktionen.

> Fastnar det på "Opening project..." brukar det hjälpa att köra `npx expo start --tunnel` – då går anslutningen via internet i stället för det lokala nätverket.

## Använda React Native-komponenter

| Komponent | Används till |
|---|---|
| `View` | Grundbehållare för layouten på alla sidor, t.ex. raden med kategoriknappar. |
| `Text` | All text i appen – rubriker, etiketter och innehållet i felanmälningarna. |
| `TextInput` | Fälten för titel, beskrivning och plats i formuläret. |
| `Pressable` | Kategoriknapparna i formuläret, och korten i listan som öppnar en felanmälan. |
| `FlatList` | Listan med alla felanmälningar på startsidan. |
| `ScrollView` | Gör formuläret scrollbart, så att spara-knappen syns även när en bild är vald. |
| `Button` | Knapparna Spara, Lägg till bild och Använd min plats. |

## Använda Expo SDK-moduler

| Modul | Används till |
|---|---|
| `expo-location` | Hämtar telefonens position och gör om den till en adress, som fylls i i platsfältet. |
| `expo-image-picker` | Öppnar telefonens bildgalleri så att man kan välja en bild till felanmälan. |
| `expo-image` | Visar den valda bilden – som förhandsvisning i formuläret och på detaljsidan. |
| `expo-haptics` | Ger en lätt vibration när man väljer kategori, en "lyckades"-vibration när man sparar och en "fel"-vibration när något fält saknas. |

## Extern modul

| Modul | Används till |
|---|---|
| [`@react-native-async-storage/async-storage`](https://reactnative.directory/package/@react-native-async-storage/async-storage) | Sparar felanmälningarna i telefonen, så att de finns kvar när appen startas om. |

## Web-API

| API | Används till |
|---|---|
| [Svenska dagar](https://sholiday.faboul.se/) | Hämtar veckodag, veckonummer och om dagen är arbetsfri. Visas i fikaklockan på startsidan. Ingen API-nyckel behövs. |

## Navigering

Appen använder **Expo Router**. Startsidan (`src/app/index.tsx`) visar listan, formuläret ligger i `src/app/fault-form.tsx`, och detaljsidan `src/app/fault/[id].tsx` tar emot felanmälans id som parameter och hämtar det med `useLocalSearchParams`.

## Projektstruktur

```
src/
├── app/                  Sidor (Expo Router)
│   ├── _layout.tsx         Navigering och rubriker
│   ├── index.tsx           Listan med felanmälningar
│   ├── fault-form.tsx      Formulär för ny felanmälan
│   └── fault/[id].tsx      Detaljsida för en felanmälan
├── api/
│   └── swedishDay.ts     Hämtar dagens datum från Svenska dagar-API:t
├── components/
│   └── FikaClock.tsx     Fikaklockan överst på startsidan
├── context/
│   └── FaultContext.tsx  Gemensam lista som alla sidor når
├── data/
│   ├── categories.ts     Kategorierna
│   └── mockedFaults.ts   Exempel-felanmälningar
├── types/
│   └── fault.ts          Typen för en felanmälan
└── utils/
    └── fika.ts           Räknar ut tiden till nästa fika
```
## AI användning

``` 
Verktyg

Under projektet användes Claude Code, modell Opus 5.5

Uppdelning av arbetet

idén till projektet delades med Claude och en plan sattes upp.
Till en början användes Claude som en "kollega" där vi diskuterade fram och tillbaka, AI:n föreslog förbättringar eller förenklingar av kod. Efter samtal med lärare om vad jag ville få ut av inlämningen ändrades planen. En del av appen var redan färdig därför bestämdes ett nytt upplägg, kan läsas under **CLAUDE.md**.

- AI:n skrev vanlig kod i små etapper: plan, godkännande av mig,  AI skriver, jag granskar, jag testar, commit.
- Själv skrev jag all Expo SDK-kod, eftersom jag ville öva på den delen och att läsa dokumentationen. AI:n förklarade begreppen, granskade och ställde frågor, och jag förklarade tillbaka.

Vilka delar jag skrev och vilka delar AI:n skrev syns på commithistoriken, dock är commit 3a93d76 skriven ihop med AI. Jag ändrade meddelandet efter att AI:n commitat då jag inte tyckte att meddelandet stämde helt och då försvann AI stämpeln.

Hur koden har verifierats

- npx tsc --noEmit före varje commit, för typfel i hela projektet.
- Testade på telefonen, även felfallen: tomma fält, avbrutet bildval, nekad platsbehörighet, flygplansläge och omstart av appen (AsyncStorage).
- Granskningsfrågor: efter varje etapp svarade jag på frågor om koden. Kunde jag inte svara förstod jag inte koden än.
- Förklarade tillbaka min SDK-kod med egna ord.
- Jämförde plan och resultat efter varje etapp.
- Kontrollerade AI:ns påståenden mot dokumentationen, t.ex. Expos dokumentation för SDK 57.

Tillfällen då jag styrde eller rättade AI:n

1. Bildbehörigheten: AI:n sa att behörighetsfrågan inte behövdes. Jag ifrågasatte det, resonerade om användarens trygghet och kontrollerade sedan på iPhone, som själv förklarar att appen bara får den valda bilden. jag har skärmdumpen.
2. "Koden är densamma": Bad AI:n flytta ut SDK kod efter att jag var färdig då `src/app/fault-form.tsx` blev stor enligt mig. jag såg att den lagt till returtyper och ändrat logiken, och bad den ångra allt.
3. Planen följdes inte helt: i etapp 2 lade AI:n till saker som inte stod i planen. jag märkte det och ifrågasatte.
4. Ändringar jag inte bett om: i början ändrade AI:n i min kod när jag bara ville ha svar, och jag bad den ångra det. Detta var innan upplägget men AI:n "satte i minnet" att inte ändra kod om jag bara ställer en fråga.
5. Börja om: jag lät AI:n skriva fas B–D, insåg att jag inte lärde mig och bad den ta bort allt och förklara steg för steg i stället. Det var i detta skedet som jag skrev hur jag ville ha det och hur jag ville lära mig på ett sådant förklarande sätt att vi skapade upplägget.
6. Backenden togs bort: AI:n byggde en backend, men på grund av brandväggen, tiden och risken på presentationen valde jag bort den.
7. Eget val av API: AI:n rekommenderade väder API:t för att det skulle passa in men jag valde en annan approach.

Reflektion
Jag har varit lite rädd för att använda AI eftersom jag var orolig att inte lära mig ordentligt. Men efter upplägget har det gått bra, jag fick se till ibland när det inte följdes men har gått mestadels bra. Använde AI för mycket som jag redan kan men passade på att skriva ny typ av kod själv. Oavsett om det var jag eller AI så "pratade" vi om koden och min förståelse för att se så jag inte missuppfattat något jag läst i dokumentation tex. Eftersom jag också granskade koden som AI skrivit ser jag det som en repetition och har därmed blivit mer bekväm med att släppa in AI i arbetet.

Det som underlättades av AI användandet var att jag kunde lägga mer tid på saker jag kanske inte kunde ordentligt eller förstod. Skapade lite styling till en början men lät AI styla efter att jag gjort grunderna, ansåg inte att det var den viktigaste delen för mig. Det som dock var jobbigt med AI användandet var just när den gjorde lite som den ville eller sa något som inte stämde.
```
## Uppfyllda krav

### Krav för godkänt (G)

- [x] 1. Projektet använder minst **4 RN-komponenter** och minst **4 moduler från Expo SDK**
- [x] 2. De använda komponenterna och modulerna är **antecknade i README.md**, tillsammans med en lista över uppfyllda krav
- [x] 3. **Expo Router** används för navigering i appen, och minst en skärm tar emot en parameter
- [x] 4. **Git och GitHub** har använts, med commits spridda över arbetets gång
- [x] 5. Projektmappen innehåller en **README.md** enligt beskrivningen ovan
- [ ] 6. Uppgiften är **inlämnad i tid**
- [ ] 7. **Muntlig presentation** är genomförd

### Krav för väl godkänt (VG)

- [ ] 1. Alla punkter för godkänt är uppfyllda
- [x] 2. **Ytterligare en valfri extern modul** används i projektet från [reactnative.directory](https://reactnative.directory)
- [x] 3. Appen **hämtar data från ett Web-API**
- [x] 4. **Användningen av AI-verktyg dokumenteras i README** – vilka verktyg du använt, till vad, och hur du verifierat att koden gör det du tror. Ta även upp det i presentationens reflekterande del.
