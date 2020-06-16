import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const reset = () => `
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}

*[hidden] {
    display: none;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
`;

const styles = () => `
html, body {
  height: 100%;
  font-size: 14px;
}

body {
  background: ${theme.colors.lightest};
  color: ${theme.colors.darkest};
  font-family: ${theme.fonts.primary};
  backface-visibility: hidden;
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 300;
  line-height: inherit;
}

a {
  cursor: pointer;
  color: ${theme.colors.primary};
  text-decoration: none;
  transition: color ease-in .2s;

  &:hover {
    color:  ${theme.colors.secondary};
  }
}

button:focus {
  outline:0;
}

* {
  box-sizing: border-box;
  line-height: 1.4em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-kerning: auto;
}

::selection {
  color: ${theme.colors.primaryLight};
  background: transparent;
}
`;

export const GlobalStyle = createGlobalStyle`
${reset()}
${styles()}

`;
