import { PlayerEventQueueItem } from 'src/app/layout/player/player-event-queue-item';

export type PlayerEventDto = {
  isPaused: boolean,
  volume: number,
  title?: string,
  author?: string,
  isStream?: boolean,
  uri?: string,
  duration?: number,
  position?: number,
  identifier?: string,
  queue?: PlayerEventQueueItem[]
}
