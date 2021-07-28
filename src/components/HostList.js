import React, { useState } from "react";
import { Card } from "semantic-ui-react";
import Host from "./Host";

function HostList({hosts, onClickHost, areHostsSelected}) {


  return (
    <Card.Group itemsPerRow={6}>
      {
        hosts.map((host) => {
          return (
            <Host 
              imageUrl={host.imageUrl}
              onClickHost={onClickHost}
              areHostsSelected={areHostsSelected}
              id={host.id}
              key={host.id}
            />
          );
        })
      }
    </Card.Group>
  );
}

export default HostList;
