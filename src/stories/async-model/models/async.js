import { types, flow } from "mobx-state-tree";

export const Async = (type) =>
  types
    .model("Async", {
      state: types.optional(
        types.enumeration("State", ["initial", "loading", "done", "error"]),
        "initial"
      ),
      value: types.optional(types.maybe(type), undefined)
    })
    .volatile(self => ({
      promise: null,
      error: null
    }))
    .actions(self => ({
      load: flow(function*(promise) {
        self.promise = promise;
        self.state = "loading";

        try {
          const value = yield promise;
          self.value = value;
          self.state = "done";
        } catch (err) {
          self.error = err;
          self.state = "error";
        }
      })
    }));
