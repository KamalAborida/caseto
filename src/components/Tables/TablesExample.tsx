import { Tables } from "./Tables";
import type { TableMetadata } from "../TablesCardsContainer";

// Sample tables metadata
const sampleTables: TableMetadata[] = [
  {
    name: "Users",
    columns: ["ID", "Name", "Email", "Role", "Created At"],
  },
  {
    name: "Products",
    columns: ["ID", "Name", "Price", "Category", "Stock"],
  },
  {
    name: "Orders",
    columns: ["ID", "User ID", "Total", "Status", "Date"],
  },
  {
    name: "Categories",
    columns: ["ID", "Name", "Description"],
  },
  {
    name: "Inventory",
    columns: ["Product ID", "Warehouse", "Quantity", "Last Updated"],
  },
  {
    name: "Customers",
    columns: ["ID", "Name", "Phone", "Address", "Membership"],
  },
];

export const TablesExample = () => {
  return <Tables tables={sampleTables} />;
};

