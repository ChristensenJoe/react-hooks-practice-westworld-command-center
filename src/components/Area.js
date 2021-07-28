import React from "react";
import {Card} from "semantic-ui-react"
import "../stylesheets/Area.css";
import Host from "./Host";

function Area({name, hosts, areHostsSelected, handleHostClick, limit}) {
  let cleanName = name.split("_").filter((part) => {
    if(part==="_") return false;
    return true;
  }).map((part) => {
    return part[0].toUpperCase() + part.slice(1, part.length);
  }).join(" ");

  const activeHosts = hosts.filter((host) => {
    if(host.active) return true;
    return false;
  })

  

  return (
    <div
      className="area"
      id={name}
    >
      <h3 className="labels">
        {cleanName}
      </h3>
      <Card.Group itemsPerRow={limit/2}>
      {activeHosts.map((host) => {
        return (
          <Host 
            imageUrl={host.imageUrl}
            onClickHost={handleHostClick}
            areHostsSelected={areHostsSelected}
            id={host.id}
            key={host.id}
          />
        )
      })}
      </Card.Group>
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
