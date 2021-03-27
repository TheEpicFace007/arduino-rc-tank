import React from "react";

export interface LegalAttributionProps {
  projectName: string;
  copyRightText: string;
  projectLink: string;
  key?: React.Key;
};

export default function LegalAtribution(props: LegalAttributionProps) {
  import("./legal-shit.scss")
  const u = new URL(props.projectLink);
  
  const getFancyURL = () => u.host + (u.pathname == "/" ? "" : u.pathname);
  return (
    <div className="attr-notice">
      <div className="proj-info">
        <h4 className="proj-name">{props.projectName}</h4>
        <h5 className="proj-link">
          <a href={props.projectLink}>{getFancyURL()}</a>
        </h5>
      </div>
      <p>{props.copyRightText}</p>
    </div>
  )
}