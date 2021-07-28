import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ imageUrl, id, onClickHost, areHostsSelected}) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  return (
    <Card
      className={areHostsSelected[id] ? "host selected" : "host"}
      onClick={() => {
        onClickHost(id);
      }}
      image={imageUrl}
      raised
      link
    />
  );
}

export default Host;
