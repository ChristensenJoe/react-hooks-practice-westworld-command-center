import React, { useState, useEffect } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap"
import Headquarters from "./Headquarters"
import { Log } from "../services/Log";

function App() {
  const [areas, setAreas] = useState(null);
  const [hosts, setHosts] = useState(null);
  const [selectedHost, setSelectedHost] = useState(null);
  const [logs, setLogs] = useState([]);

  let initialAreHostsSelected = {};
  const [areHostsSelected, setAreHostsSelected] = useState(initialAreHostsSelected);

  useEffect(() => {
    fetch("http://localhost:3001/areas")
      .then(res => res.json())
      .then(data => setAreas(data));
  }, [])

  useEffect(() => {
    fetch("http://localhost:3001/hosts")
      .then(res => res.json())
      .then(data => setHosts(data));
  }, [])

  function handleUpdateInfo(id, area, active, hostAreaCount) {
    const specificArea = areas.filter((elem) => {
      if (elem.name === area) return true;
      return false;
    })[0];

    if (area !== selectedHost.area) {
      if ((selectedHost.authorization) || (!specificArea.auth_req)) {
        if (hostAreaCount[area] < specificArea.limit) {
          fetch(`http://localhost:3001/hosts/${id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                area: area,
                active: active
              })
            })
            .then(res => res.json())
            .then(data => {
              setLogs((logs) => [Log.notify(`${selectedHost.firstName} set in area ${area.split("_").filter((part) => {
                if (part === "_") return false;
                return true;
              }).map((part) => {
                return part[0].toUpperCase() + part.slice(1, part.length);
              }).join(" ")}`), ...logs]);

              setHosts((hosts) => hosts.map((host) => {
                if (host.id === id) return {
                  ...host,
                  area: area,
                  active: active
                };
                return host;
              }));
              setSelectedHost((selectedHost) => {
                return {
                  ...selectedHost,
                  area: area,
                  active: active
                }
              });
            });
        }
        else {
          console.log("error")
          setLogs((logs) => [Log.error(`Too many hosts. Cannot add ${selectedHost.firstName} to ${area.split("_").filter((part) => {
            if (part === "_") return false;
            return true;
          }).map((part) => {
            return part[0].toUpperCase() + part.slice(1, part.length);
          }).join(" ")}`), ...logs]);
        }
      }
      else {
        setLogs((logs) => [Log.error(`${selectedHost.firstName} does not have proper authorization be in ${area.split("_").filter((part) => {
          if (part === "_") return false;
          return true;
        }).map((part) => {
          return part[0].toUpperCase() + part.slice(1, part.length);
        }).join(" ")}`), ...logs])
      }
    }
    if (active !== selectedHost.active) {
      fetch(`http://localhost:3001/hosts/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            area: area,
            active: active
          })
        })
        .then(res => res.json())
        .then(data => {
          if (active) {
            setLogs((logs) => [Log.warn(`Activated ${selectedHost.firstName}`), ...logs])
          }
          else {
            setLogs((logs) => [Log.notify(`Decommissioned ${selectedHost.firstName}`), ...logs])
          }

          setHosts((hosts) => hosts.map((host) => {
            if (host.id === id) return {
              ...host,
              area: area,
              active: active
            };
            return host;
          }));
          setSelectedHost((selectedHost) => {
            return {
              ...selectedHost,
              area: area,
              active: active
            }
          });
        });
    }
  }

  function handleHostClick(id) {
    setSelectedHost(hosts.filter((host) => {
      if (host.id === id) return true;
      return false;
    })[0]);
    setAreHostsSelected({
      ...initialAreHostsSelected,
      [id]: true
    });
  }

  function handleActivateAllHosts(isActive) {
    if (isActive) {
      let id=1;
      updateActive(id, isActive);

      setLogs((logs) => [Log.warn(`Activating all hosts!`), ...logs]);

      setHosts((hosts) => hosts.map((host) => {
        return {
          ...host,
          active: true
        };
      }))
    }
    else {
      let id = 1;
      updateActive(id, isActive);

      setLogs((logs) => [Log.notify(`Decommissioning all hosts!`), ...logs]);

      setHosts((hosts) => hosts.map((host) => {
        return {
          ...host,
          active: false
        };
      }))
    }
  }

  function updateActive(id, active) {
    fetch(`http://localhost:3001/hosts/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active: active
          })
        })
          .then(res => res.json())
          .then(data => {
            if(id < hosts.length) {
              id++;
              updateActive(id, active)
            }
          });
  }

  return (
    <Segment id="app">
      {areas && hosts &&
        <WestworldMap
          areas={areas}
          handleHostClick={handleHostClick}
          hosts={hosts}
          areHostsSelected={areHostsSelected}
        />}
      {hosts && areas &&
        <Headquarters
          hosts={hosts}
          areas={areas}
          onInfoChange={handleUpdateInfo}
          handleHostClick={handleHostClick}
          areHostsSelected={areHostsSelected}
          selectedHost={selectedHost}
          logs={logs}
          handleActivateAllHosts={handleActivateAllHosts}
        />}
    </Segment>
  );
}

export default App;
