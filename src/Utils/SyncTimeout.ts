export function syncTimeout(timeout: number): Promise<void>
{
  return new Promise<void>((resolve, reject) =>
  {
    setTimeout(() => resolve(), timeout);
  })
}