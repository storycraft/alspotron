import { LyricProviderList } from './provider';

export const DEFAULT_STYLE = {
  font: 'Pretendard JP Variable',
  fontWeight: '400',
  animation: 'pretty',
  animationAtOnce: false,
  maxHeight: 400,
  proximityOpacity: 0,
  proximitySensitivity: 2,
  rowGap: 2,

  nowPlaying: {
    color: '#FFFFFF',
    background: 'rgba(29, 29, 29, .50)',
    backgroundProgress: 'rgba(29, 29, 29, .80)',
    fontSize: 13,
    maxWidth: 300,
    visible: true,
    stoppedOpacity: 0.5,
  },

  lyric: {
    color: '#FFFFFF',
    background: 'rgba(29, 29, 29, .70)',
    fontSize: 13,
    maxWidth: 700,
    stoppedOpacity: 0.5,
    containerRowGap: 1,
    multipleContainerRowGap: 1,
    direction: 'column' as const,
    nextLyric: 0,
    previousLyric: 0,
    nextLyricScale: 0.9,
    previousLyricScale: 0.9,
    nextLyricOpacity: 0.5,
    previousLyricOpacity: 0.5,
  },

  position: {
    availableAnchor: [
      'top-left' as const,
      'top' as const,
      'top-right' as const,
      'left' as const,
      'center' as const,
      'right' as const,
      'bottom-left' as const,
      'bottom' as const,
      'bottom-right' as const,
    ],
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    index: 0,
  },

  userCSS: null,
};

export const DEFAULT_CONFIG = {
  version: 2 as const,

  views: [
    {
      enabled: true,
      theme: 'Default Theme',
      position: {
        anchor: 'bottom-right' as const,
        display: null as number | null,
        top: 32,
        left: 32,
        bottom: 32,
        right: 32,
      },
    }
  ],
  appTheme: 'system' as const,
  language: 'ko' as 'ko' | 'en' | 'ja' | 'de',
  developer: false,
  hardwareAcceleration: true,
  streamingMode: false,
  lyricProvider: LyricProviderList[0].provider as 'alsong',
  playingProvider: 'tuna-obs' as const,

  plugins: {
    list: {},
    disabled: {},
    config: {},
  },

};

export const PRESET_PREFIX = '__preset__';
