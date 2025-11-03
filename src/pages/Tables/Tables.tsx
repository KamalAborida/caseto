import { TablesPageProvider } from "../../contexts/Tables/TablesPageProvider";
import TablesContent from "./TablesContent";

const Tables = () => {
  return (
    <TablesPageProvider>
      <TablesContent />
    </TablesPageProvider>
  );
};

export default Tables;

