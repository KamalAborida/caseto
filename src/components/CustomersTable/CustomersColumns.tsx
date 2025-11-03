import type { Column } from "../Table/Table";

interface Request extends Record<string, unknown> {
  depth: string;
  color: string;
  height: string;
  quantity: string;
  typeOfSlide: string;
  capacity: string;
  resultCode: string;
  bh: string;
  bo: string;
  priceAfterDiscount: string;
  totalPrice: string;
}

export const getCustomersColumns = (): Column<Request>[] => {
  return [
    {
      key: "depth",
      header: "Depth",
      textAlign: "start",
    },
    {
      key: "color",
      header: "Color",
      textAlign: "start",
    },
    {
      key: "height",
      header: "Height",
      textAlign: "start",
    },
    {
      key: "quantity",
      header: "Quantity",
      textAlign: "start",
    },
    {
      key: "typeOfSlide",
      header: "Type of Slide",
      textAlign: "start",
    },
    {
      key: "capacity",
      header: "Capacity",
      textAlign: "start",
    },
    {
      key: "resultCode",
      header: "Result Code",
      textAlign: "start",
    },
    {
      key: "bh",
      header: "BH",
      textAlign: "start",
    },
    {
      key: "bo",
      header: "BO",
      textAlign: "start",
    },
    {
      key: "priceAfterDiscount",
      header: "Price after discount",
      textAlign: "start",
    },
    {
      key: "totalPrice",
      header: "Total Price",
      textAlign: "start",
    },
  ];
};

export type { Request };

