// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from '@chakra-ui/react';
import styles from '@renderer/theme/styles';
import Button from '@renderer/theme/components/button';

const theme = extendTheme({
  styles,
  components: {
    Button,
  },
});

export default theme;
