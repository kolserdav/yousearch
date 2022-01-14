export interface Search {
  // eslint-disable-next-line no-unused-vars
  (subtitles: Schema.Values.SubtitlesItem[], search: string): Promise<
    Schema.Values.SubtitlesItem[]
  >;
}
/**
 * Capitalize first letter
 * @param string {string}
 */
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const search: Search = async (subtitles, search) => {
  const words = search.split(' ');
  // Get entry for all words
  const newS = JSON.parse(JSON.stringify(subtitles));
  for (let n = 0; words[n]; n++) {
    const word = words[n];
    const wordReg = new RegExp(word);
    const wordRegCap = new RegExp(capitalize(word));
    const wordRegUp = new RegExp(word.toUpperCase());
    const wordRegLow = new RegExp(word.toLowerCase());
    // Mark each word
    for (let i = 0; newS[i]; i++) {
      const sbt = newS[i];
      if (wordReg.test(sbt.text)) {
        sbt.text = sbt.text.replace(wordReg.exec(sbt.text)[0], `<b>${word}</b>`);
      } else if (wordRegCap.test(sbt.text)) {
        const wordCap = wordRegCap.exec(sbt.text)[0];
        sbt.text = sbt.text.replace(wordCap, `<b>${wordCap}</b>`);
      } else if (wordRegUp.test(sbt.text)) {
        const wordUp = wordRegUp.exec(sbt.text)[0];
        sbt.text = sbt.text.replace(wordUp, `<b>${wordUp}</b>`);
      } else if (wordRegLow.test(sbt.text)) {
        const wordLow = wordRegLow.exec(sbt.text)[0];
        sbt.text = sbt.text.replace(wordLow, `<b>${wordLow}</b>`);
      }
    }
  }
  const reg = /<b>[a-zA-Zа-яА-Я0-9\s]+<\/b>/g;
  // Filter matches
  const result = newS.filter((item) => reg.test(item.text));
  // Sort is match several words
  result.sort((a, b) => {
    const lengthA = ((a.text || '').match(reg) || []).length;
    const lengthB = ((b.text || '').match(reg) || []).length;
    if (lengthA > lengthB) {
      return -1;
    }
    return 1;
  });
  // Sort when full match
  const boldWords = words.map((item) => `<b>${item}</b>`);
  const fullReg = new RegExp(boldWords.join(' '));
  result.sort((a, b) => {
    if (fullReg.test(a.text) && !fullReg.test(b.text)) {
      return -1;
    }
    return 1;
  });
  return result;
};

export const TOKEN_COOKIE_NAME = '_auth_t';
