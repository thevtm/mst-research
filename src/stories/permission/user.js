import { types } from "mobx-state-tree";

export const User = types
  .model("User", {
    id: types.identifier,
    name: types.string,
    admin: types.boolean,
    permissions: types.array(
      types.enumeration("UserPermissions", [
        "ReadArticle",
        "WriteArticle",
        "DeleteArticle"
      ])
    )
  })
  .views(self => ({
    isAllowedToDeleteArticles: () => self.permissions.includes("DeleteArticle")
  }));
