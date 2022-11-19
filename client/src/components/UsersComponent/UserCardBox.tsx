import {
  Avatar,
  Heading,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import type { FC } from 'react';

import type { IMeetingApiResponse } from '@/types/ApiResponse';

export const UserCardBoxSkeleton: FC = () => {
  return (
    <Stack
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
      align="center"
    >
      <SkeletonCircle size="20" mb={4} mx={'auto'} pos={'relative'} />
      <Skeleton height="15px" w="150px" mb={2} />
      <Skeleton height="15px" w="200px" mb={4} />
      <SkeletonText width="full" pt="4" noOfLines={4} spacing="2" />
    </Stack>
  );
};

export const UserCardBox: FC<IMeetingApiResponse['users'][0]> = ({ name, image, email }) => {
  return (
    <Stack
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
      align="center"
      borderWidth="1px"
    >
      <Avatar size={'2xl'} src={image} mb={4} pos={'relative'} />
      <Heading fontSize={'lg'} fontFamily={'body'}>
        {name}
      </Heading>
      <Text fontWeight={600} color={'gray.500'} pb={2}>
        {email}
      </Text>
      <Text textAlign={'center'} fontSize="md" color={useColorModeValue('gray.700', 'gray.400')}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. At obcaecati aut sint corrupti adipisci consequatur quo
        quasi.
      </Text>
    </Stack>
  );
};
