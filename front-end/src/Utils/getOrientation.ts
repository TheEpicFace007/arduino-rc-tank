export type ScreenOrientation = "landscape" | "portrait";

export function getScreenOrientation(): ScreenOrientation
{
  if (window.innerHeight > window.innerWidth)
    return "portrait";
  else
    return "landscape";
}

//@ts-ignore
global.getScreenOrientation = getScreenOrientation