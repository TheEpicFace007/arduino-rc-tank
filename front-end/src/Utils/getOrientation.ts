export type ScreenOrientation = "landscape" | "portrait";

export function getScreenOrientation(): ScreenOrientation
{
  if (window.screen.availHeight > window.screen.availWidth)
    return "portrait";
  else
    return "landscape";
}