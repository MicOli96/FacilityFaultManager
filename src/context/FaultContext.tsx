import { mockedFaults } from "@/data/mockedFaults";
import { Fault } from "@/types/fault";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Listsidan och formuläret kan inte skicka props till varandra,
// så listan ligger i en Context ovanför båda.

// Namnet listan sparas under i telefonen
const STORAGE_KEY = "faults";

interface FaultContextValue {
  faults: Fault[];
  addFault: (fault: Fault) => void;
}

interface Props {
  children: ReactNode;
}

const FaultContext = createContext<FaultContextValue | undefined>(undefined);

export function FaultProvider(props: Props) {
  const [faults, setFaults] = useState<Fault[]>(mockedFaults);

  // Läser den sparade listan en gång när appen startar.
  // Finns inget sparat än behålls exemplen.
  useEffect(() => {
    async function loadFaults() {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);

        if (saved) {
          // AsyncStorage sparar bara text – JSON.parse gör om den till en lista igen
          setFaults(JSON.parse(saved));
        }
      } catch {
        // Gick det inte att läsa fortsätter appen med exemplen
      }
    }

    loadFaults();
  }, []);

  function addFault(newFault: Fault) {
    // Ny array i stället för push – annars märker inte React ändringen
    const updatedFaults = [newFault, ...faults];

    setFaults(updatedFaults);

    // Sparar hela listan som text. Ingen await – appen behöver inte vänta på att det sparats.
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFaults));
  }

  return (
    <FaultContext.Provider value={{ faults, addFault }}>
      {props.children}
    </FaultContext.Provider>
  );
}

export function useFaults() {
  const context = useContext(FaultContext);

  if (!context) {
    throw new Error("useFaults måste användas inuti FaultProvider");
  }

  return context;
}
