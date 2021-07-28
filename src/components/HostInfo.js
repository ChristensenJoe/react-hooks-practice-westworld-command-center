import React, { useState } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({hosts, firstName, lastName, gender, active, imageUrl, areaPlace, authorized, areas, id, onInfoChange}) {
  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.

  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  const [options] = useState( areas.map((area) => {
    return {
      key: area.name,
      text: area.name.split("_").filter((part) => {
        if(part==="_") return false;
        return true;
      }).map((part) => {
        return part[0].toUpperCase() + part.slice(1, part.length);
      }).join(" "),
      value: area.name
    }
  }));

  let hostAreaCount = {};
  areas.forEach((area) => {
    hostAreaCount[area.name] = 0;
  })
  hosts.forEach((host) => {
    hostAreaCount[host.area] = hostAreaCount[host.area]+1
  });

  const [value] = useState(areaPlace);

  function handleOptionChange(e, { value }) {
    onInfoChange(id, value, active, hostAreaCount);
  }

  function handleRadioChange() {
    onInfoChange(id, areaPlace, !active, hostAreaCount);
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firstName} | {(gender==="Male") ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={active ? "Active" : "Decommissioned"}
                checked={active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={areaPlace}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
