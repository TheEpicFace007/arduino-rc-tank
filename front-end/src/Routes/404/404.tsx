import React from "react";
import "./404.scss";


export function UnknownPage()
{
  document.title = "Page introuvable";
  
  return (
    <>
      <h1>Page introuvable</h1>
      <p><a href="/">Clique ici pour retourné au menu principale</a></p>
    </>
  );
}