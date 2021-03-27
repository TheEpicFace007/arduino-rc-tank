import React from "react";

export default function LegalPaper(props: {
  children: JSX.Element | JSX.Element[];
}) {
  import("./legal-shit.scss");
  return (
    <div className="legal-paper">
      <h2>Mentions légal:</h2>
      <div className="attr-list">{props.children}</div>
    </div>
  )
}