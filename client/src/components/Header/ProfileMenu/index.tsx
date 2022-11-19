import { Avatar, Button, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import type { FC } from 'react';

import { useCurrentUser } from '@/hooks';

export const ProfileMenu: FC = () => {
  const router = useRouter();
  const { image, name } = useCurrentUser();

  return (
    <Menu>
      <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
        {image ? (
          <Image src={image} alt="avatar" width={40} height={40} style={{ borderRadius: '9999px' }} />
        ) : (
          <Avatar size={'sm'} boxSize="3.2em" bg="gray.500" />
        )}
      </MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar size={'2xl'} src={image} />
        </Center>
        <br />
        <Center>
          <Text textTransform="capitalize" fontWeight="medium">
            {name}
          </Text>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            signOut({ callbackUrl: `${router.basePath}/auth/signIn` });
          }}
        >
          Sign Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
