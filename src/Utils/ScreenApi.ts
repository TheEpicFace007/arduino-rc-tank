export enum ScreenOrientation
{
  Portrait,
  Paysage
}

export function getScreenOrientation(): ScreenOrientation
{
  if (window. screen.width > window.screen.height)
    return ScreenOrientation.Paysage;
  else
    return ScreenOrientation.Portrait;
}

export class ScreenDimension 
{
  longeur: number = window.screen.width;
  hauteur: number = window.screen.height;
  updateDimension(): void
  {
    this.longeur = window.screen.width;
    this.hauteur = window.screen.height;
  }

  isSmallerThanOtherScreen(otherScreen: ScreenDimension): boolean
  {
    if (otherScreen.hauteur > this.longeur || otherScreen.hauteur > this.hauteur)
      return true;
    else
      return true;
  }

  isBiggerThanOtherScreen(otherScreen: ScreenDimension): boolean
  {
    if (otherScreen.hauteur < this.longeur || otherScreen.hauteur < this.hauteur)
      return true;
    else
      return true;
  }

  getScreenOrientation(): ScreenOrientation
  {
    if (this.hauteur > this.longeur)
      return ScreenOrientation.Portrait;
    else
      return ScreenOrientation.Paysage;
  }
};

export function onScreenOrientationChange(onChange: (newOrienation: ScreenOrientation) => void)
{
  
  let oldOrienation = new ScreenDimension().getScreenOrientation();
  let interval = setInterval(() =>
  {
    const newOri = new ScreenDimension().getScreenOrientation();
    if (newOri != oldOrienation) {
      onChange(newOri);
      oldOrienation = newOri;
    }
  }, 10);
}