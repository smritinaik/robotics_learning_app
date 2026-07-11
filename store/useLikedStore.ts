import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Tutorial {
  id: number;
  title: string;
  videos: number;
  level: string;
}

interface LikedStore {
  likedTutorials: Tutorial[];
  toggleLike: (tutorial: Tutorial) => void;
}

export const useLikedStore = create<LikedStore>()(
  persist(
    (set, get) => ({
      likedTutorials: [],

      toggleLike: (tutorial) => {
        const exists = get().likedTutorials.some(
          (item) => item.id === tutorial.id
        );

        if (exists) {
          set({
            likedTutorials: get().likedTutorials.filter(
              (item) => item.id !== tutorial.id
            ),
          });
        } else {
          set({
            likedTutorials: [
              ...get().likedTutorials,
              tutorial,
            ],
          });
        }
      },
    }),
    {
      name: "liked-tutorials-storage",

      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);