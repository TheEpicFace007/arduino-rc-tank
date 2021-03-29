import { isCompositeComponent } from "react-dom/test-utils";

export type ScreenOrientation = "landscape" | "portrait";

export function getScreenOrientation(): ScreenOrientation {
  //@ts-ignore
  const orientation = (window.screen.orientation || {}).type ;
  if (orientation === "portrait-primary" || orientation === "portrait-secondary")
    return "portrait";
  else 
    return "landscape";
}

//@ts-ignore
window.getScreenOrientation = getScreenOrientation