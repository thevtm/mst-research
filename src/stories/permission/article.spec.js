import { User } from "./user";
import { Article } from "./article";
import { AppStore } from "./store";

describe("Article", () => {
  it("author should be allowed to delete article", () => {
    const user = User.create({
      id: "1",
      name: "Bob",
      permissions: ["DeleteArticle"],
      admin: false
    });

    const store = AppStore.create(
      {
        users: [user],
        articles: []
      },
      { loggedInUser: user }
    );

    const article = Article.create({ title: "Hello World", author: user });
    store.addArticle(article);

    const deleteAction = article.makeDeleteAction();

    expect(deleteAction.canExecute).toBeTruthy();
    expect(deleteAction.execute).toBeDefined();
  });

  it("regular user should not be allowed to delete article", () => {
    const user = User.create({
      id: "1",
      name: "Bob",
      permissions: ["DeleteArticle"],
      admin: false
    });

    const author = User.create({
      id: "2",
      name: "Frank",
      permissions: ["DeleteArticle"],
      admin: false
    });

    const store = AppStore.create(
      {
        users: [user, author],
        articles: []
      },
      { loggedInUser: user }
    );

    const article = Article.create({ title: "Hello World", author });
    store.addArticle(article);

    const deleteAction = article.makeDeleteAction();

    expect(deleteAction.canExecute).toBeFalsy();
    expect(deleteAction.execute).toBeUndefined();
  });
});
