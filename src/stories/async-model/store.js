import { types } from "mobx-state-tree";

import { Async } from "./models/async";
import { Character } from "./models/character";
import { fetchCharacters } from "./api";

export const AppStore = types
  .model("AppStore", {
    characters: types.optional(Async(types.array(Character)), {})
  })
  .actions(self => ({
    load: () => {
      self.characters.load(fetchCharacters());
    }
  }));
