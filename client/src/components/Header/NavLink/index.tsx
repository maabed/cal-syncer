import { Link, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';

export const NavLink = ({ children, href }: { children: ReactNode; href: string }) => {
  const router = useRouter();
  const active = router.pathname === href;
  return (
    <Link
      as={NextLink}
      px={2}
      py={1}
      rounded={'md'}
      fontWeight={'500'}
      color={useColorModeValue(active ? 'white' : 'gray.600', active ? 'white' : 'gray.200')}
      bg={active ? 'primary' : ''}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue(active ? 'primary' : 'gray.200', active ? 'primary' : 'gray.700'),
      }}
      href={href}
    >
      {children}
    </Link>
  );
};
