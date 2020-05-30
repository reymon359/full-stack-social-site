import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
html {
overflow-y: scroll;
}

html, body {
font-size: 62.5%;
} 
body {
background-color: #f0f2f5;
}
#root {
 width: 100%;
 height: 100%;
}

a {
text-decoration: none;
}
`;
