# Vini's MobX-State-Tree research project

I've made this project to test the abstractions that I can create in MobX-State-Tree.

## Usage

Use `yarn start` to run the project. It's going to open the Storybook page with all the "examples".

## Abstractions

### Async

I've noticed a common pattern in both MobX and Redux based applications where the loading state & code would be entangled with the rest of the application.

Example:

```javascript
const Articles = types
  .model("Articles", {
    articles: types.array(string),
    state: types.enumeration("State", ["initial", "loading", "done", "error"])
  })
  .actions(self => ({
    load: flow(function*() {
      self.state = "loading";

      try {
        const value = yield fetchArticles();
        self.articles = value;
        self.state = "done";
      } catch (err) {
        console.error(err);
        self.state = "error";
      }
    })
  }));
```

A more interesting approach would be to extract async state into it's own data structure.

```javascript
const Articles = types.model("Articles", {
  articles: Async(types.array(string))
});
```

### Permission

Permission systems can cause business logic to leak to the components.

Example:

```javascript
const Article = ({ user, article }) => {
  return (
    // ...
    {((user.isAllowedDeleteArticles && article.author === user) || isAdmin) && <button onClick={deleteArticle}>Delete</button>}
    // ...
  )
}
```

This leads to an increase in the cognitive overhead required to write components, as the developer is required to know and remember all the possible permission (and logic) required for each action.

It also promotes duplication of code.

A better way would be to tye the action creator and the requirement together.

```javascript
const Article = ({ article }) => {
  const deleteAction = article.makeDeleteAction()
  return (
    // ...
    {deleteAction.canExecute && <button onClick={deleteAction.execute()}>Delete</button>}
    // ...
  )
}
```

The logic of the requirements is tied up with the action creator. It lives in the model inside of the `makeDeleteAction` function.

Using an interface like this makes it clear for the developer that the user might not be able to perform and action.

### Procedures

Use case:

- Trigger a sequence of actions based on the previous results
-

Example:

- User click on a button to create a new document
- If User has a document open, open a modal asking the user to "save", "not save" or "cancel"
- Then open modal asking what name should the new document be given
