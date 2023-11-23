import { z } from 'zod';

import { DEFAULT_CONFIG, DEFAULT_STYLE } from '../constants';

export const StyleConfigSchema = z.object({
  font: z.string().catch(DEFAULT_STYLE.font),
  fontWeight: z.string().catch(DEFAULT_STYLE.fontWeight),
  animation: z.string().catch(DEFAULT_STYLE.animation),
  animationAtOnce: z.boolean().catch(DEFAULT_STYLE.animationAtOnce),
  maxHeight: z.number().catch(DEFAULT_STYLE.maxHeight),
  proximityOpacity: z.number().catch(DEFAULT_STYLE.proximityOpacity),
  proximitySensitivity: z.number().catch(DEFAULT_STYLE.proximitySensitivity),
  rowGap: z.number().catch(DEFAULT_STYLE.rowGap),

  nowPlaying: z.object({
    color: z.string().catch(DEFAULT_STYLE.nowPlaying.color),
    background: z.string().catch(DEFAULT_STYLE.nowPlaying.background),
    backgroundProgress: z.string().catch(DEFAULT_STYLE.nowPlaying.backgroundProgress),
    fontSize: z.number().catch(DEFAULT_STYLE.nowPlaying.fontSize),
    maxWidth: z.number().catch(DEFAULT_STYLE.nowPlaying.maxWidth),
    visible: z.boolean().catch(DEFAULT_STYLE.nowPlaying.visible),
    stoppedOpacity: z.number().catch(DEFAULT_STYLE.nowPlaying.stoppedOpacity),
  }),

  lyric: z.object({
    color: z.string().catch(DEFAULT_STYLE.lyric.color),
    background: z.string().catch(DEFAULT_STYLE.lyric.background),
    fontSize: z.number().catch(DEFAULT_STYLE.lyric.fontSize),
    maxWidth: z.number().catch(DEFAULT_STYLE.lyric.maxWidth),
    stoppedOpacity: z.number().catch(DEFAULT_STYLE.lyric.stoppedOpacity),
    containerRowGap: z.number().catch(DEFAULT_STYLE.lyric.containerRowGap),
    multipleContainerRowGap: z.number().catch(DEFAULT_STYLE.lyric.multipleContainerRowGap),
    direction: z.union([
      z.literal('column'),
      z.literal('column-reverse'),
    ]).catch(DEFAULT_STYLE.lyric.direction),
    nextLyric: z.number().catch(DEFAULT_STYLE.lyric.nextLyric),
    previousLyric: z.number().catch(DEFAULT_STYLE.lyric.previousLyric),
    nextLyricScale: z.number().catch(DEFAULT_STYLE.lyric.nextLyricScale),
    previousLyricScale: z.number().catch(DEFAULT_STYLE.lyric.previousLyricScale),
    nextLyricOpacity: z.number().catch(DEFAULT_STYLE.lyric.nextLyricOpacity),
    previousLyricOpacity: z.number().catch(DEFAULT_STYLE.lyric.previousLyricOpacity),
  }),

  userCSS: z.string().nullable(),
});

export const ConfigSchema = z.object({
  version: z.literal(1),
  selectedTheme: z.string().catch(DEFAULT_CONFIG.selectedTheme),

  windowPosition: z.object({
    anchor: z.union([
      z.literal('top-left'),
      z.literal('top'),
      z.literal('top-right'),
      z.literal('left'),
      z.literal('center'),
      z.literal('right'),
      z.literal('bottom-left'),
      z.literal('bottom'),
      z.literal('bottom-right'),
    ]).catch(DEFAULT_CONFIG.windowPosition.anchor),
    display: z.number().nullable().catch(DEFAULT_CONFIG.windowPosition.display),
    top: z.number().catch(DEFAULT_CONFIG.windowPosition.top),
    left: z.number().catch(DEFAULT_CONFIG.windowPosition.left),
    bottom: z.number().catch(DEFAULT_CONFIG.windowPosition.bottom),
    right: z.number().catch(DEFAULT_CONFIG.windowPosition.right),
  }),

  syncThrottle: z.number(),

  language: z.union([
    z.literal('ko'),
    z.literal('en'),
    z.literal('ja'),
    z.literal('de'),
  ]).catch(DEFAULT_CONFIG.language),
  developer: z.boolean().catch(DEFAULT_CONFIG.developer),

  plugins: z.object({
    list: z.record(z.string().optional()),
    disabled: z.record(z.boolean().optional()),
    config: z.record(z.record(z.unknown())),
  }),
});
export const LyricMapperSchema = z.record(z.number().optional());
export const GameListSchema = z.record(z.string().optional());

export type StyleConfig = z.infer<typeof StyleConfigSchema>;
export type Config = z.infer<typeof ConfigSchema>;

export type LyricMapper = z.infer<typeof LyricMapperSchema>;
export type GameList = z.infer<typeof GameListSchema>;
export type ThemeList = Record<string, StyleConfig>;
