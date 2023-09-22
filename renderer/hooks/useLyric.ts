import { createMemo } from 'solid-js';

import { FlatMap } from 'tstl/experimental';

import { MapElementVector } from 'tstl/internal/container/associative/MapElementVector';

import useConfig from './useConfig';

import { usePlayingInfo } from '../components/PlayingInfoProvider';

const BIAS = 225; // ms
const TRANSITION_DURATION = 225; // ms

const useLyric = () => {
  const [config] = useConfig();
  const { lyrics, progress } = usePlayingInfo();

  const lastIter = () => {
    const tempLyrics = lyrics();
    if (tempLyrics === null) return null;

    const last = tempLyrics.lower_bound(
      progress() + (
        BIAS + (
          config()?.style?.animation !== 'none' && !config()?.style?.animationAtOnce ?
            TRANSITION_DURATION :
            0
        )
      ),
    );

    if (!last.equals(tempLyrics.begin())) {
      return last.prev();
    }

    return last;
  };

  const lyric = createMemo(() => lastIter()?.second);
  const index = createMemo(() => lastIter()?.first);

  const nextLyricsIter = createMemo(() => {
    let nextLyricLength = config()?.lyric.nextLyric;
    if (!nextLyricLength) return null;

    const now = lastIter();
    const tempLyrics = lyrics();

    if (
      !tempLyrics ||
      !now
    ) {
      return null;
    } else if (now.index() + nextLyricLength >= tempLyrics.end().index()) {
      nextLyricLength = tempLyrics.end().index() - now.index() - 1;
    }

    return now.advance(nextLyricLength + 1);
  });

  const getPreviousLyricLength = createMemo(() => {
    let previousLyricLength = config()?.lyric.previousLyric;
    if (!previousLyricLength) return null;
    const now = lastIter();
    const tempLyrics = lyrics();

    if (
      !tempLyrics ||
      !now
    ) {
      return null;
    } else if (now.index() - previousLyricLength < tempLyrics.begin().index()) {
      previousLyricLength = now.index() - tempLyrics.begin().index();
    }

    return previousLyricLength;
  });

  const previousLyricsIter = createMemo(() => {
    const previousLyricLength = getPreviousLyricLength();
    if (!previousLyricLength) return null;
    const now = lastIter();
    const tempLyrics = lyrics();

    if (
      !tempLyrics ||
      !now
    ) {
      return null;
    }

    return now.advance(-previousLyricLength);
  });
  const lyricRange = createMemo(() => {
    const now = lastIter();
    if (!now) return null;

    const prevIter = previousLyricsIter() ?? now;
    const nextIter = nextLyricsIter() ?? now;
  
    if (prevIter.equals(nextIter)) return [now.second];

    const result: string[][] = [];
    for (let v = prevIter; !v.equals(nextIter); v = v.next()) {
      if (v) result.push(v.second);
    }
    if (nextIter.equals(now)) {
      result.push(now.second);
    }
  
    return result;
  });

  return [lyric, index, lyricRange, getPreviousLyricLength] as const;
};

export default useLyric;
