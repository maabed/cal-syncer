import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton, Stack, Text, useDisclosure } from '@chakra-ui/react';
import type { NextComponentType } from 'next';

import { navLinks } from '@/constants/navLinks';

import { NavLink } from './NavLink';
import { ProfileMenu } from './ProfileMenu';
import { ThemeToggleButtonNode } from './ThemeToggleButtonNode';

const Header: NextComponentType = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={'center'}>
          <Text fontSize={'xl'} fontWeight="bold">
            Syncer
          </Text>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            {navLinks.map((link) => (
              <NavLink key={link.id} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={4} justify="center" align="center">
            <ThemeToggleButtonNode />
            <ProfileMenu />
          </Stack>
        </Flex>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {navLinks.map((link) => (
              <NavLink key={link.id} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Header;
