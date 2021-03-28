import React from "react";

export default function LegalPaper(props: {
  title?: string;
  children: JSX.Element | JSX.Element[];
}) {
  import("./legal-shit.scss");
  return (
    <>
      <div className="legal-paper">
      <button onClick={() => document.location.pathname = "/"} className="go-back">Retour vers le menu principale</button>
        <h2>
          {props.title ?? "Mentions légal:"}
        </h2>
        <div className="attr-list">{props.children}</div>

      </div>
    </>
  )
}