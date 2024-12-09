"use client";

import { useEffect } from "react";
import { useStockContext } from "./StockContext";

const StockList = () => {
  const { filters } = useStockContext();

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return <div>StockList</div>;
};

export default StockList;
