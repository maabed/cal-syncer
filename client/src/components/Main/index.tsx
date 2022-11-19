import { Box } from '@chakra-ui/react';
import type { FC } from 'react';

interface IMainProps {
  children: React.ReactNode;
}
const Main: FC<IMainProps> = ({ children }) => {
  return <Box as="main">{children}</Box>;
};

export default Main;
