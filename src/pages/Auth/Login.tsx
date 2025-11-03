import { Box, Flex } from '@chakra-ui/react';
import { LoginForm } from '../../components/LoginForm';
import { LanguageSwitcher } from '../../components/LanguageSwitcher';

const Login = () => {
  return (
    <Box minHeight="100vh" position="relative">
      <Flex justifyContent="flex-end" padding="4">
        <LanguageSwitcher />
      </Flex>

      <Flex
        alignItems="center"
        justifyContent="center"
        minHeight="calc(100vh - 80px)"
      >
        <LoginForm />
      </Flex>
    </Box>
  );
};

export default Login;

