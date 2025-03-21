import { createTheme, rem } from '@mantine/core';
// import { useMediaQuery } from '@mantine/hooks';

const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily:
    'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  fontFamilyMonospace:
    'SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
  headings: {
    fontWeight: '600',
    sizes: {
      h1: {
        fontSize: rem(21.981),
        // fontSize: breakpoint ? rem(39.813) : rem(21.981),
        lineHeight: '1.205',
      },
      h2: {
        fontSize: rem(21.318),
        // fontSize: breakpoint ? rem(33.178) : rem(21.318),
        lineHeight: '1.205',
      },
      h3: {
        fontSize: rem(20.765),
        // fontSize: breakpoint ? rem(27.648) : rem(20.765),
        lineHeight: '1.205',
      },
      h4: {
        fontSize: rem(20.304),
        // fontSize: breakpoint ? rem(23.04) : rem(20.304),
        lineHeight: '1.205',
      },
      h5: {
        fontSize: rem(19.2), // Example for h5 (16px)
        lineHeight: '1.205',
      },
      h6: {
        fontSize: rem(13.333), // Example for h6 (14px)
        lineHeight: '1.205',
      },
    },
  },
});

export default theme;
