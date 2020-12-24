/* eslint-disable no-unused-vars */
/**
 * Webworker file
 */
import * as Comlink from 'comlink';
import * as Types from '../../next-env';

interface Search {
  (
    subtitles: Types.Schema.Values.SubtitlesItem[],
    search: string
  ): Promise<Types.Schema.Values.SubtitlesItem[]>;
}
/**
 * Capitalize first letter
 * @param string {string}
 */
function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const search: Search = async (subtitles, search) => {
  const words = search.split(' ');
  const result = [];
  for (let n = 0; words[n]; n++) {
    const word = words[n];
    const wordReg = new RegExp(word);
    const wordRegCap = new RegExp(capitalize(word));
    const wordRegUp = new RegExp(word.toUpperCase());
    const wordRegLow = new RegExp(word.toLowerCase());
    for (let i = 0; subtitles[i]; i++) {
      const sbt = subtitles[i];
      if (wordReg.test(sbt.text)) {
        sbt.text = sbt.text.replace(wordReg.exec(sbt.text)[0], `<b>${word}</b>`);
        result.push(sbt);
      } else if (wordRegCap.test(sbt.text)) {
        const wordCap = wordRegCap.exec(sbt.text)[0];
        sbt.text = sbt.text.replace(wordCap, `<b>${wordCap}</b>`);
        result.push(sbt);
      } else if (wordRegUp.test(sbt.text)) {
        const wordUp = wordRegUp.exec(sbt.text)[0];
        sbt.text = sbt.text.replace(wordUp, `<b>${wordUp}</b>`);
        result.push(sbt);
      } else if (wordRegLow.test(sbt.text)) {
        const wordLow = wordRegLow.exec(sbt.text)[0];
        sbt.text = sbt.text.replace(wordLow, `<b>${wordLow}</b>`);
        result.push(sbt);
      }
    }
  }
  return result;
};

export interface WorkerApi {
  search: Search;
}

const workerApi: WorkerApi = {
  search,
};

Comlink.expose(workerApi);
