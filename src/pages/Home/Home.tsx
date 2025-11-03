import { TablesPageProvider } from "../../contexts/Tables/TablesPageProvider";
import HomeContent from "./HomeContent";

const Home = () => {
  return (
    <TablesPageProvider>
      <HomeContent />
    </TablesPageProvider>
  );
};

export default Home;
