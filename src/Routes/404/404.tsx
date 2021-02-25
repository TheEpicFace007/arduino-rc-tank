import React from "react";
import "./404.scss";

document.title = "Page introuvable";

export function UnknownPage()
{
  return (
    <>
      <h1>Page introuvable</h1>
      <p><a href="/">Clique ici pour retourné au menu principale</a></p>
    </>
  );
}