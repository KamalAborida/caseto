import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Navbar";

export const MainLayout = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        <Outlet />
      </Box>
    </Box>
  );
};

