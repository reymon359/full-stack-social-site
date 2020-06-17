import { css } from 'styled-components';

export const theme = {
  colors: {
    // Palette
    primary: '#3f51b5',
    primaryLight: '#92a3fe',
    primaryDark: '#08176c',
    secondary: '#9266c8',
    secondaryLight: '#d3bfec',
    secondaryDark: '#5a4ba3',

    terciary: '#9266c8',
    terciaryLight: '#d3bfec',

    info: '#0284fe',
    warning: '#d6ae3e',
    danger: '#D93025',
    dangerLight: '#ff9089',
    success: '#0ba063',
    successLight: '#72d5ac',

    // Monochrome
    lightest: '#FFFFFF',
    lighter: '#F8F8F8',
    light: '#F3F3F3',
    mediumlight: '#EEEEEE',
    medium: '#DDDDDD',
    mediumdark: '#999999',
    dark: '#666666',
    darker: '#444444',
    darkest: '#333333',
    black: '#000000',

    // border: 'rgba(0,0,0,.1)',
    // boxShadowsmall: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
    // boxShadowmedium: '0 1px 2px 0 rgba(0, 0, 0, 0.6)',
    // boxShadowlarge: '0 1px 2px 0 rgba(0, 0, 0, 0.6)',
  },
  fonts: {
    primary:
      '"Open Sans", "Lato", "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    serif:
      'medium-content-serif-font, Georgia, Cambria, "Times New Roman",  Times, serif',
    code:
      '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    mono: "'Roboto Mono', stack-mono, monospace",
  },
  fontWeights: {
    thin: 200,
    regular: 400,
    bold: 600,
    extrabold: 800,
  },
  fontSizes: {
    small: '.7rem',
    normal: '1rem',
    medium: '1.2rem',
    mediumLarge: '1.5rem',
    large: '1.7rem',
    xLarge: '2rem',
    xxLarge: '36px',
    xxxLarge: '48px',
    xxxxLarge: '72px',
  },
  buttons: {
    primary: { color: '#ffffff', bg: '#0284fe', light: '#cce6ff' },
    secondary: { color: '#ffffff', bg: '#fe7c02', light: '#ffe5cc' },
    terciary: { color: '#ffffff', bg: '#666666', light: '#eeeeee' },
  },
  mq: {
    xs: '22em',
    sm: '40em',
    md: '54em',
    lg: '78em',
    xl: '125em',
  },
  media: {
    xs: (...args: TemplateStringsArray[]) => css`
      @media (max-width: ${theme.mq.xs}) {
        // @ts-ignore
        ${css(...args)}
      }
    `,
    sm: (...args: TemplateStringsArray[]) => css`
      @media (max-width: ${theme.mq.sm}) {
        // @ts-ignore
        ${css(...args)}
      }
    `,
    md: (...args: TemplateStringsArray[]) => css`
      @media (max-width: ${theme.mq.md}) {
        // @ts-ignore
        ${css(...args)}
      }
    `,
    lg: (...args: TemplateStringsArray[]) => css`
      @media (max-width: ${theme.mq.lg}) {
        // @ts-ignore
        ${css(...args)}
      }
    `,
    xl: (...args: TemplateStringsArray[]) => css`
      @media (max-width: ${theme.mq.xl}) {
        // @ts-ignore
        ${css(...args)}
      }
    `,
    hover: (...args: TemplateStringsArray[]) => css`
      @media not all and (hover: none) {
        // @ts-ignore
        ${css(...args)}
      }
    `,
  },
};
