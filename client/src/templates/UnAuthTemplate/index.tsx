import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { ThemeToggleButtonNode } from '@/components/Header/ThemeToggleButtonNode';

import MetaTemplate from '../MetaTemplate';

type IUnAuthTemplateProps = {
  metaTitle?: string;
  metaDescription?: string;
  children: ReactNode;
};

const UnAuthTemplate = ({ children, metaTitle, metaDescription }: IUnAuthTemplateProps) => (
  <MetaTemplate title={metaTitle} description={metaDescription}>
    <Box pos={'absolute'} top="3" right="6" zIndex="1">
      <ThemeToggleButtonNode />
    </Box>
    {children}
  </MetaTemplate>
);

export default UnAuthTemplate;
