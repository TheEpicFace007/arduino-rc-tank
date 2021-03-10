export default function setChainedTImeout(callback: (...args: any[]) => void, ms: number[], ...args: any[]) {
  let totalMs;

  let iteration = 0;
  for (let currentMs = 0; currentMs <= ms[ms.length - 1]; currentMs += ms[iteration]) {
    setTimeout(callback, currentMs, ...args);
    iteration++;
  }
}