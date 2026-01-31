export interface Memory {
  id: number;
  url: string;
  caption: string;
}

export enum AppStage {
  INTRO = 'INTRO',
  DISTANCE = 'DISTANCE',
  MEMORIES = 'MEMORIES',
  PROPOSAL = 'PROPOSAL',
  ACCEPTED = 'ACCEPTED'
}