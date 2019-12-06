import React from "react";

export const storeContext = React.createContext(null);

export const StoreProvider = ({ store, children }) => {
  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);

  if (store == null) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.");
  }

  return store;
};
