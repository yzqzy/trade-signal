"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface StockFilters {
  // 行业
  industry?: string | null;
  // 概念
  concept?: string | null;
  // 价格
  price?: number | null;
  // 总市值
  totalMarketValue?: number | null;
  // 流通市值
  floatMarketValue?: number | null;
  // 市盈率
  peRatio?: number | null;
  // 股息率
  dividendYield?: number | null;
  // 毛利率
  saleGpr?: number | null;
  // 每股经营现金流
  perNetcashOperate?: number | null;
}

export interface StockContextType {
  filters: StockFilters;
  setFilters: (filters: StockFilters) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<StockFilters>({
    industry: "全部行业"
  });

  return (
    <StockContext.Provider value={{ filters, setFilters }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStockContext() {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error("useStockContext must be used within a StockProvider");
  }
  return context;
}
