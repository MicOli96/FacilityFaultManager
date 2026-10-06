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
├── context/
│   └── FaultContext.tsx  Gemensam lista som alla sidor når
├── data/
│   ├── categories.ts     Kategorierna
│   └── mockedFaults.ts   Exempel-felanmälningar
└── types/
    └── fault.ts          Typen för en felanmälan
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
- [ ] 3. Appen **hämtar data från ett Web-API**
- [ ] 4. **Användningen av AI-verktyg dokumenteras i README** – vilka verktyg du använt, till vad, och hur du verifierat att koden gör det du tror. Ta även upp det i presentationens reflekterande del.
