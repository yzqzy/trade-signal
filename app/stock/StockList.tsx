"use client";

import { useEffect, useState } from "react";
import { get } from "@/shared/request";
import { StockSelection } from "@prisma/client";
import { Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStockContext } from "./StockContext";
import { TAB_CONFIGS } from "./StockListConfig";
import StockTable from "./StockTable";

const StockList = () => {
  const { filters } = useStockContext();

  const [orderBy, setOrderBy] = useState("newPrice");
  const [order, setOrder] = useState("desc");

  const [stockList, setStockList] = useState<StockSelection[]>([]);
  const [statistics, setStatistics] = useState<{ date: string }>({ date: "" });

  const [loading, { open, close }] = useDisclosure(false);
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const getStockList = async (currentPage: number, hasMore: boolean) => {
    if (!hasMore || (currentPage > 1 && loading)) return;

    if (currentPage === 1) {
      open();
    }

    const response = await get("/api/stock/list", {
      ...filters,
      page: currentPage,
      pageSize: 20,
      orderBy,
      order,
      industries: filters.industries?.join(","),
      concepts: filters.concepts?.join(",")
    });

    if (currentPage === 1) {
      setIsFirstLoading(false);
    }

    if (response.success) {
      const { data, pagination } = response;
      if (currentPage === 1) {
        setStockList(data);
        setTotal(pagination.total);
        setStatistics(response.statistics);
      } else {
        setStockList(prev => [...prev, ...data]);
      }
      setHasMore(currentPage < pagination.totalPage);
    }

    close();
  };

  const handleSort = (key: string) => {
    setOrderBy(key);
    setOrder(key === orderBy ? (order === "asc" ? "desc" : "asc") : "desc");
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    open();
    setPage(1);
    setHasMore(true);
    getStockList(1, true);
  }, [filters, orderBy, order]);

  useEffect(() => {
    if (page > 1 && !loading) {
      getStockList(page, hasMore);
    }
  }, [page]);

  return (
    <Tabs defaultValue="overview">
      <Tabs.List>
        {TAB_CONFIGS.map(tab => (
          <Tabs.Tab key={tab.value} value={tab.value}>
            {tab.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {TAB_CONFIGS.map(tab => (
        <Tabs.Panel key={tab.value} value={tab.value}>
          <StockTable
            columns={tab.columns}
            data={stockList}
            firstLoading={isFirstLoading}
            loading={loading}
            total={total}
            pageSize={20}
            statisticsDate={statistics.date}
            orderBy={orderBy}
            order={order}
            onLoadMore={handleLoadMore}
            onSort={handleSort}
          />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default StockList;
