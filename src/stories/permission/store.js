import { types } from "mobx-state-tree";

import { User } from "./user";
import { Article } from "./article";

export const AppStore = types
  .model("AppStore", {
    users: types.array(User),
    articles: types.array(Article)
  })
  .actions(self => ({
    addUser: user => self.users.push(user),
    addArticle: article => self.articles.push(article)
  }));
