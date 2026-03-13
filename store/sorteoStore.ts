import { create } from "zustand";

export interface Participant {
  id: string;
  name: string;
  createdAt: number;
}

export interface DrawResult {
  id: string;
  winner: Participant;
  participants: Participant[];
  drawnAt: number;
}

interface SorteoState {
  participants: Participant[];
  history: DrawResult[];
  lastWinner: Participant | null;

  addParticipant: (name: string) => void;
  removeParticipant: (id: string) => void;
  clearParticipants: () => void;
  drawWinner: () => Participant | null;
  clearHistory: () => void;
}

export const useSorteoStore = create<SorteoState>((set, get) => ({
  participants: [],
  history: [],
  lastWinner: null,

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

  clearParticipants: () => set({ participants: [], lastWinner: null }),

  drawWinner: () => {
    const { participants } = get();
    if (participants.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];

    const result: DrawResult = {
      id: Date.now().toString(),
      winner,
      participants: [...participants],
      drawnAt: Date.now(),
    };

    set((state) => ({
      lastWinner: winner,
      history: [result, ...state.history],
    }));

    return winner;
  },

  clearHistory: () => set({ history: [] }),
}));
