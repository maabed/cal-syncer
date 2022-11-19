import { Box, CircularProgress } from '@chakra-ui/react';
import type { FC } from 'react';

interface Props {
  size?: string;
  thickness?: number;
}

const Loader: FC<Props> = ({ size = '50px', thickness = 0.15 }) => {
  return (
    <Box w="full" textAlign="center" maxH="200px">
      <CircularProgress isIndeterminate size={size} thickness={thickness} />
    </Box>
  );
};

export default Loader;
