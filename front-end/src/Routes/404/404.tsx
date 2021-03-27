import React from "react";


export function UnknownPage()
{
  document.title = "Page introuvable";
  import("./404.scss");
  
  return (
    <>
      <h1>Page introuvable</h1>
      <p><a href="/">Clique ici pour retourner au menu principal</a></p>
    </>
  );
}