import { Box } from "@chakra-ui/react";
import { Table } from "../Table";
import { getCustomersColumns, type Request } from "./CustomersColumns";

// Static dummy data
const dummyData: Request[] = [
  {
    depth: "100cm",
    color: "Blue",
    height: "50cm",
    quantity: "10",
    typeOfSlide: "Standard",
    capacity: "500kg",
    resultCode: "RC001",
    bh: "25",
    bo: "30",
    priceAfterDiscount: "$450",
    totalPrice: "$4,500",
  },
  {
    depth: "120cm",
    color: "Red",
    height: "60cm",
    quantity: "15",
    typeOfSlide: "Premium",
    capacity: "750kg",
    resultCode: "RC002",
    bh: "30",
    bo: "35",
    priceAfterDiscount: "$680",
    totalPrice: "$10,200",
  },
  {
    depth: "90cm",
    color: "Green",
    height: "45cm",
    quantity: "8",
    typeOfSlide: "Basic",
    capacity: "400kg",
    resultCode: "RC003",
    bh: "20",
    bo: "25",
    priceAfterDiscount: "$350",
    totalPrice: "$2,800",
  },
];

export const CustomersTable = () => {
  const columns = getCustomersColumns();

  return (
    <Box width="100%">
      <Table
        columns={columns}
        data={dummyData}
        interactive
        showBorder
        showColumnBorder
      />
    </Box>
  );
};

