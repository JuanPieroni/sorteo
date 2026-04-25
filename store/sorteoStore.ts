import { create } from "zustand";

export interface Participant {
  id: string;
  name: string;
  createdAt: number;
}

// Resultado de una mesa
export interface MesaResult {
  mesaNumber: number; // Número de mesa (1, 2, 3...)
  players: Participant[]; // Jugadores en esa mesa
}

// Resultado del sorteo completo
export interface DrawResult {
  id: string;
  mesas: MesaResult[]; // Array de mesas con sus jugadores
  participants: Participant[]; // Todos los participantes
  drawnAt: number;
}

interface SorteoState {
  participants: Participant[];
  history: DrawResult[];
  lastResult: DrawResult | null; // Último resultado del sorteo
  numberOfTables: number; // Número de mesas a dividir

  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
  clearParticipants: () => void;
  setNumberOfTables: (num: number) => void; // Cambiar número de mesas
  dividirEnMesas: () => DrawResult | null; // Dividir jugadores en mesas
  clearHistory: () => void;
}

export const useSorteoStore = create<SorteoState>((set, get) => ({
  participants: [],
  history: [],
  lastResult: null,
  numberOfTables: 2, // Por defecto 2 mesas

  addParticipant: (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newParticipant: Participant = {
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      name: trimmed,
      createdAt: Date.now(),
    };
    set((state) => ({
      participants: [...state.participants, newParticipant],
    }));
  },

  removeParticipant: (id: string) => {
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    }));
  },

  clearParticipants: () => set({ participants: [], lastResult: null }),

  setNumberOfTables: (num: number) => {
    // Asegurarse que sea al menos 1 mesa
    if (num < 1) return;
    set({ numberOfTables: num });
  },

  dividirEnMesas: () => {
    const { participants, numberOfTables } = get();
    
    // Validar que haya jugadores
    if (participants.length === 0) return null;

    // Mezclar jugadores aleatoriamente (shuffle)
    const shuffled = [...participants].sort(() => Math.random() - 0.5);

    // Dividir en mesas de forma balanceada
    const mesas: MesaResult[] = [];
    const base = Math.floor(shuffled.length / numberOfTables); // jugadores base por mesa
    const extras = shuffled.length % numberOfTables; // sobrantes que se reparten

    let index = 0;
    for (let i = 0; i < numberOfTables; i++) {
      const size = base + (i < extras ? 1 : 0); // las primeras mesas reciben 1 extra
      const playersInMesa = shuffled.slice(index, index + size);
      index += size;

      if (playersInMesa.length > 0) {
        mesas.push({
          mesaNumber: i + 1,
          players: playersInMesa,
        });
      }
    }

    // Crear resultado
    const result: DrawResult = {
      id: Date.now().toString(),
      mesas,
      participants: [...participants],
      drawnAt: Date.now(),
    };

    // Guardar en historial
    set((state) => ({
      lastResult: result,
      history: [result, ...state.history],
    }));

    return result;
  },

  clearHistory: () => set({ history: [] }),
}));
