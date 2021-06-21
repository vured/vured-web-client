export type PlayerEventDto = {
  isPaused: boolean,
  volume: number,
  title?: string,
  author?: string,
  isStream?: boolean,
  uri?: string,
  duration?: number,
  position?: number
}
