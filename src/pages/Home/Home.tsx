import { Box, Heading, VStack } from "@chakra-ui/react";
import { useTranslation } from "../../hooks/useTranslation";
import { Tables } from "../../components/Tables";
import { useEffect, useState } from "react";
import { useGetRequest } from "../../hooks/useGetRequest";
import { Loader } from "../../components/Loader";
import { ErrorMsg } from "../../components/ErrorMsg";
import type { TableMetadata } from "@/components/TablesCardsContainer/TablesCardsContainer";

const Home = () => {
  const { t } = useTranslation();
  const { execute, loading, error, reset, data } = useGetRequest();
  const [tables, setTables] = useState<TableMetadata[]>([]);

  useEffect(() => {
    reset();
    execute("user/tables/list");
  }, [execute, reset, t]);

  useEffect(() => {
    if (data) {
      setTables(data.tables.map((table: string) => ({ name: table })));
    }
  }, [data]);

  return (
    <Box
      padding={"4"}
    >
      <VStack gap={6}>
        {loading && <Loader isLoading={loading} />}
        {error && <ErrorMsg isError={true} errorMsg={error} />}
        {tables.length > 0 && <Tables tables={tables} />}
      </VStack>
    </Box>
  );
};

export default Home;
