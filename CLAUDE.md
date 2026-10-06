@AGENTS.md

<!-- Skriver detta så att andra agenter är medvetna om upplägget -->
Så här jobbar vi

Vanlig kod (formulär, Context, navigering, styling, backend), etapp för etapp:
1. Planera: AI:n beskriver kort vad etappen ska göra och vilka filer som ändras. Studenten godkänner eller justerar.
2. AI:n skriver koden.
3. Studenten granskar: AI:n listar vad som ändrats och vad Studenten ska kolla. Läs koden och fråga om allt som är oklart.
4. Testa: Studenten kör appen. AI:n kör typkontroll.
5. Commit: Studenten committar, en etapp per commit.

SDK-koden (plats, bildväljare, PDF, mejl, delning), som Studenten redovisar:
1. AI:n förklarar begreppen och vad funktionerna gör, utan färdig kod.
2. Studenten skriver koden.
3. AI:n granskar och ställer frågor ("vad händer om användaren nekar?").
4. Studenten förklarar tillbaka med egna ord. Det är det bästa sättet att komma ihåg, och samma sak som Studenten gör på redovisningen.

Att lära sig använda AI bra

I varje etapp tränar vi vanor som gör AI-arbete produktivt. Det här är de viktigaste:

1. Ge sammanhang. AI:n gör bättre jobb när den vet vad, varför och hur det ska se ut. "Gör ett formulär" ger sämre resultat än "Gör ett formulär för felanmälan med titel, plats och kategori, i samma stil som index.tsx".
2. Planera innan AI:n kodar. Be om en plan först, granska den och låt AI:n koda sen. Det är billigare att rätta en plan än kod.
3. Små steg. En etapp i taget blir lättare att granska, testa och ångra.
4. Granska alltid. AI:n kan ha fel men låta säker. Studenten såg det själv i GitHub-exemplet med loopen i useEffect. Läs igenom ändringarna innan Studenten committar.
5. Verifiera. Typkontroll, köra appen, testa felfallen. "Det ser rätt ut" räcker inte.
6. Säg ifrån. Precis som när Studenten bad AI:n ta bort koden och börja om. Att styra AI:n är en del av jobbet.