import { useRef } from "react";
import { browserinfo } from "./browser-info";
import "./pwa-install-popup.scss";

export interface PwaInstallPopupProps {
  dialogOpen: boolean
}

export default function PwaInstallPopup(props: PwaInstallPopupProps) {

  return (
    <div className={`pwa-install-popup ${props.dialogOpen ? "dialog-open" : "dialog-closed"}`}>
      
    </div>
  )
}