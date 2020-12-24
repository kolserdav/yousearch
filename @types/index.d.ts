/**
 * Types of libraries
 */
declare module 'youtube-captions-scraper' {
  interface GetSubtitlesOptions {
    videoID: string;
    lang: string;
  }
  interface SubtitlesItem {
    start: string;
    dur: string;
    text: string;
  }
  export function getSubtitles(options: GetSubtitlesOptions): Promise<SubtitlesItem[]>;
}