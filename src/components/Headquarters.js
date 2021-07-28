import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel"
import HostInfo from "./HostInfo";

function Headquarters({ handleActivateAllHosts, hosts, areas, onInfoChange, logs, handleHostClick, areHostsSelected, selectedHost }) {

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage
          hosts={hosts}
          onClickHost={handleHostClick}
          areHostsSelected={areHostsSelected}
        />
      </Grid.Column>
      <Grid.Column width={5}>
        {
          selectedHost ? 
          <HostInfo 
            firstName={selectedHost.firstName}
            lastName={selectedHost.lastName}
            imageUrl={selectedHost.imageUrl}
            gender={selectedHost.gender}
            areaPlace={selectedHost.area}
            active={selectedHost.active}
            authorized={selectedHost.authorized}
            areas={areas}
            id={selectedHost.id}
            hosts={hosts}
            onInfoChange={onInfoChange}
            handleActivateAllHosts={handleActivateAllHosts}
          /> 
          : 
          <Details />
        }
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel 
          onActivateAllHosts={handleActivateAllHosts}
          logs={logs}
        />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
