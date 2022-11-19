import type { ContainerProps } from '@chakra-ui/react';
import { Container as ChakraContainer } from '@chakra-ui/react';
import type { FC } from 'react';

export const Container: FC<ContainerProps> = ({ children, ...props }) => {
  return (
    <ChakraContainer maxW="full" px={6} {...props}>
      {children}
    </ChakraContainer>
  );
};
