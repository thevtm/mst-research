import React from "react";
import { observer } from "mobx-react-lite";

export const CharacterList = observer(({ characters }) => {
  if (characters.state !== "done") {
    return <div>Loading</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {characters.value.map(character => (
        <img
          style={{ width: 128, height: 128, margin: 8 }}
          src={character.image}
          alt={character.name}
        />
      ))}
    </div>
  );
});
