import random from "lodash.random";

export enum CoinSide {
  Pile,
  Face
}

export function flipCoin(): CoinSide {
  return random(0, 1, false);
}