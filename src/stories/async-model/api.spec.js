import { types } from "mobx-state-tree";

import { mockFetchCharacters } from "./api";
import { Character } from "./models/character";

test("API > fetchCharacters > should return the correct data format", async () => {
  expect.assertions(3);

  const type = types.array(Character);
  const charactersData = await mockFetchCharacters();

  expect(charactersData).toBeDefined();
  expect(charactersData).toHaveLength(20);

  expect(() => type.create(charactersData)).not.toThrow();
});
