export const MIN_REQUEST_DELAY = 200;
export const MAX_REQUEST_DELAY = 300;

export function getDelay() {
  return Math.floor(Math.random() * ((MAX_REQUEST_DELAY-MIN_REQUEST_DELAY)+1) + MIN_REQUEST_DELAY);
}
