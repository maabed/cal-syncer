import { Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { Container } from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

import MetaTemplate from '../MetaTemplate';

type IMainTemplateProps = {
  metaTitle?: string;
  metaDescription?: string;
  children: ReactNode;
};

const MainTemplate = ({ metaTitle, metaDescription, children }: IMainTemplateProps) => (
  <MetaTemplate title={metaTitle} description={metaDescription}>
    <Grid
      templateAreas={`"header" "main" "footer"`}
      gridTemplateRows={'auto 1fr auto'}
      gridTemplateColumns={'1fr'}
      minH="100vh"
    >
      <GridItem area={'header'} as="header">
        <Container bg={useColorModeValue('gray.100', 'gray.900')} color={useColorModeValue('gray.700', 'gray.200')}>
          <Header />
        </Container>
      </GridItem>
      <GridItem area={'main'} as="main">
        <Container>{children}</Container>
      </GridItem>
      <GridItem area={'footer'} as="footer">
        <Container bg={useColorModeValue('gray.100', 'gray.900')} color={useColorModeValue('gray.700', 'gray.200')}>
          <Footer />
        </Container>
      </GridItem>
    </Grid>
  </MetaTemplate>
);

export default MainTemplate;
