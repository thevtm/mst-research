import { types, getEnv } from "mobx-state-tree";

import { User } from "./user";

export const Article = types
  .model("Article", {
    title: types.string,
    author: types.reference(User)
  })
  .actions(self => ({
    _deleteAction: () => {
      console.log("Delete action!");
    }
  }))
  .views(self => ({
    makeDeleteAction: () => {
      const forbidRes = () => ({ canExecute: false });
      const allowRes = () => ({
        canExecute: true,
        execute: () => self._deleteAction()
      });

      const { loggedInUser } = getEnv(self);

      if (loggedInUser.admin === true || self.author === loggedInUser) {
        return allowRes();
      }

      return forbidRes();
    }
  }));
