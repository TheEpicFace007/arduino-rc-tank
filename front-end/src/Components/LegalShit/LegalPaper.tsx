import React from "react";

export default function LegalPaper(props: {
  children: JSX.Element | JSX.Element[];
  paper_name?: string;
}) {
  import("./legal-shit.scss");
  return (
    <div className="legal-paper">
      <h2>{props.paper_name ?? "Mentions légal:"}</h2>
      <div className="attr-list">{props.children}</div>
    </div>
  )
}