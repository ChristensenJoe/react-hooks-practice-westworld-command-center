import React, {useState} from "react";
import { Segment } from "semantic-ui-react";

import Area from "./Area";

function WestworldMap({areas, handleHostClick, hosts, areHostsSelected}) {


  return <Segment id="map">
    {
      hosts && areas.map((area) => {
        const specificAreaHosts= hosts.filter((host) => {
          if(host.area === area.name) return true;
          return false;
        })

        return (
          <Area 
            name={area.name}
            handleHostClick={handleHostClick}
            areHostsSelected={areHostsSelected}
            limit={area.limit}
            hosts={specificAreaHosts}
            key={area.id}
          />
        );
      })
    }
  </Segment>;
}

export default WestworldMap;
