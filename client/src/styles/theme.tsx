import { css } from 'styled-components';

// export const theme = {
//   primaryText: '#1876f2',
//   secondaryText: '#050505',
//   tertiaryText: '#65676b',
//   errorText: '#D93025',
//   inputColor: '#f0f2f5',
//   placeholderColor: '#90949c',
//   primaryBackground: '#e7f3ff',
//   secondaryBackground: '#e4e6eb',
//   secondaryHoverBackground: '#d8dadf',
//   tertiaryBackground: '#F2F2F2',
//   boxShadow1: '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
//   boxShadow2: '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
// };

export const theme = {
  colors: {
    primary: '#3f51b5',
    secondary: '',
    tertiary: '',
    primaryText: '#000000',
    secondaryText: '#ffffff',
    tertiaryText: '#65676b',
    danger: '#D93025',
    lightDanger: '#ff9089',
    white: '#ffffff',
    black: '#000000',
    blue: '#3f51b5',
    darkBlue: '#08176c',
    lightBlue: '#92a3fe',
    gray: '#656a73',
    lightGray: '#d5d8d6',
    darGray: '#414757',
    gray500: '#94989E',
    primaryBackground: '#dad9d9',
    blue900: '#1e2733',
    yellow500: '#EBC86E',
    yellow700: '#6b6349',

    // grey: ''

    // background: '#fffff8',
    // contrast: '#111',
    // accent: 'red',
    // white: '#ffffff'
  },
  fonts: {
    primary:
      '"Open Sans", "Lato", "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
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
