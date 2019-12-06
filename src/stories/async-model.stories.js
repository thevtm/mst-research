import React from "react";
import { types } from "mobx-state-tree";

import { Async } from "./async-model/models/async";
import { Character } from "./async-model/models/character";
import { mockFetchCharacters } from "./async-model/api";
import { CharacterList } from "./async-model/characterList";

export default {
  title: "Async Model"
};

export const FetchResource = () => {
  const type = Async(types.array(Character));
  const instance = type.create({});
  instance.load(mockFetchCharacters());

  return <CharacterList characters={instance} />;
};
