import { CustomersPageProvider } from "../../contexts/Customers/CustomersPageProvider";
import CustomersContent from "./CustomersContent";

const Customers = () => {
  return (
    <CustomersPageProvider>
      <CustomersContent />
    </CustomersPageProvider>
  );
};

export default Customers;

