import React from "react";
import { Segment } from "semantic-ui-react";
import HostList from "./HostList";

function ColdStorage({hosts, areas, onClickHost, areHostsSelected}) {

  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList 
          areas={areas}
          hosts={hosts}
          onClickHost={onClickHost}
          areHostsSelected={areHostsSelected}
        />
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
