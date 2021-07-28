import React, {useState} from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({logs, onActivateAllHosts}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      {/* Button below is the Activate All/Decommisssion All button */}
      {/* This isn't always going to be the same color...*/}
      {/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
      <Button onClick={() => {
        onActivateAllHosts(!isActive);
        setIsActive((isActive) => !isActive)
      }} fluid color={isActive ? "green" : "red"} content={isActive ? "DECOMMISSION ALL" : "ACTIVATE ALL"} />
    </Segment>
  );
}

export default LogPanel;
