import { mockedFaults } from "@/data/mockedFaults";
import { Fault } from "@/types/fault";
import { createContext, ReactNode, useContext, useState } from "react";

// Listsidan och formuläret kan inte skicka props till varandra,
// så listan ligger i en Context ovanför båda.

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

  function addFault(newFault: Fault) {
    // Ny array i stället för push – annars märker inte React ändringen
    setFaults([newFault, ...faults]);
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
