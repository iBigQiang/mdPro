import type { IConfigOption } from '../types'
import type { ThemeName } from './theme-css'

// 导出 CSS 主题（新主题系统）
export { baseCSSContent, themeMap, type ThemeName } from './theme-css'

export const themeOptionsMap = {
  default: {
    label: `经典`,
    value: `default`,
    desc: ``,
  },
  grace: {
    label: `优雅`,
    value: `grace`,
    desc: `@brzhang`,
  },
  simple: {
    label: `简洁`,
    value: `simple`,
    desc: `@okooo5km`,
  },
  WXGreen: {
    label: `微信绿`,
    value: `WXGreen`,
    desc: `@BigQiang`,
  },
  WXColour: {
    label: `多彩微信`,
    value: `WXColour`,
    desc: `@BigQiang`,
  },
}

export const themeOptions: IConfigOption<ThemeName>[] = [
  {
    label: `经典`,
    value: `default`,
    desc: ``,
  },
  {
    label: `优雅`,
    value: `grace`,
    desc: `@brzhang`,
  },
  {
    label: `简洁`,
    value: `simple`,
    desc: `@okooo5km`,
  },
  {
    label: `微信绿`,
    value: `WXGreen`,
    desc: `@BigQiang`,
  },
  {
    label: `多彩微信`,
    value: `WXColour`,
    desc: `@BigQiang`,
  },
]
