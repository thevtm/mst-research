import { types } from "mobx-state-tree";

import { Async } from "./async";

describe("Async model", () => {
  it("should be able to load primitive", async () => {
    const promise = Promise.resolve("Foo");
    const type = Async(types.string);
    const instance = type.create();

    expect(instance.state).toBe("initial");
    expect(instance.value).toBeUndefined();

    instance.load(promise);

    expect(instance.state).toBe("loading");
    expect(instance.value).toBeUndefined();

    await promise;

    expect(instance.state).toBe("done");
    expect(instance.value).toBe("Foo");
  });
});
