import React from "react";
import LegalPaper from "../../Components/LegalShit/LegalPaper"
import android from "./android.png";
import ios from "./ios.png"

export function Install() {
  import("./Install.scss");
  let androidImg;
  document.title = "Intallé la manette"
  return (
    <LegalPaper title="Comment installé la manette?">
      <div className="android-instruction instruction">
        <h3>Comment installé l'appli sur android: </h3>
        <ol>
          <li>Va dans google chrome si tu est pas déja dans google chrome</li>
          <li>Appuis sur l'icone avec les 3 point en haut a gauche</li>
          <li>Clique sur "Ajouter a l'écran d'acceuil</li>
        </ol>
        <img src={android} alt="" />
      </div>
      <div className="ios-instruction instruction">
        <h3>Comment installé l'appli sur iOS: </h3>
        <ol>
          <li>Clique sur l'icone pour partagé un lien</li>
          <li>Clique sur "Ajouter sur l'écran d'acceuil"</li>
          <li>Clique sur "Ajouter" en haut a gauche</li>
        </ol>
        <img src={ios} alt="" />
      </div>
    </LegalPaper>
  )
}