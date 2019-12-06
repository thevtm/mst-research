import { types } from "mobx-state-tree";

export const Character = types.model("Character", {
  id: types.identifier,
  name: types.string,
  image: types.string
});
