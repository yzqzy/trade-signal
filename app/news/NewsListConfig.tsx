import { News } from "@prisma/client";
import Link from "next/link";
import { HoverCard, Pill, Text } from "@mantine/core";
import { Column } from "../components/tables/DataTable/types";
import { formatDateDiff } from "../components/tables/DataTable/util";

// 定时来源类型
enum SourceType {
  SINA = "sina"
}

// 定义市场类型枚举
enum MarketType {
  CN = "cn", // A股
  US = "us", // 美股
  HK = "hk", // 港股
  FUND = "fund", // 基金
  CFF = "cff", // 期货
  FOREX = "foreign", // 外汇
  WORLD_INDEX = "worldIndex", // 全球指数
  COMMODITY = "commodity", // 大宗商品
  GLOBAL = "global", // 全球
  GLOBAL_BOND = "globalbd" // 全球债券
}

// 来源映射
export const SOURCE_MAP: Record<string, string> = {
  [SourceType.SINA]: "新浪财经"
};

// 颜色映射
export const MARKET_COLORS: Record<string, string> = {
  [MarketType.CN]: "red", // 红色 - 中国市场传统色
  [MarketType.US]: "blue", // 蓝色 - 代表美国市场
  [MarketType.HK]: "green", // 绿色 - 港股传统色
  [MarketType.FUND]: "violet", // 紫色 - 代表基金投资
  [MarketType.CFF]: "orange", // 橙色 - 代表期货交易
  [MarketType.FOREX]: "cyan", // 青色 - 代表外汇市场
  [MarketType.WORLD_INDEX]: "indigo", // 靛蓝 - 代表全球指数
  [MarketType.COMMODITY]: "yellow", // 黄色 - 对应大宗商品（如黄金）
  [MarketType.GLOBAL]: "teal", // 青绿 - 代表全球市场
  [MarketType.GLOBAL_BOND]: "lime" // 青柠 - 代表债券市场
};

// 市场标签映射
export const MARKET_LABELS: Record<string, string> = {
  [MarketType.CN]: "A股",
  [MarketType.US]: "美股",
  [MarketType.HK]: "港股",
  [MarketType.FUND]: "基金",
  [MarketType.CFF]: "期货",
  [MarketType.FOREX]: "外汇",
  [MarketType.WORLD_INDEX]: "全球指数",
  [MarketType.COMMODITY]: "大宗商品",
  [MarketType.GLOBAL]: "全球",
  [MarketType.GLOBAL_BOND]: "全球债券"
};

const getMarketColor = (market: string): string => {
  return MARKET_COLORS[market.toLowerCase()] || "gray";
};

const getMarketLabel = (market: string): string => {
  return MARKET_LABELS[market.toLowerCase()] || market;
};

interface Stock {
  market: string; // cn 国内，us 美股, hk 港股, fund 基金
  code: string;
  name: string;
}

const generateRowKey = (row: News, stock: Stock) =>
  `${row.id}-${stock.code}-${stock.market}-${stock.name}`;

const formatStocks = (stocks: Stock[], row: News) => {
  if (!stocks || stocks.length === 0) return "--";

  try {
    return stocks.map(stock => {
      const isCn =
        stock.market === MarketType.CN &&
        ["sz", "sh"].some(key => stock.code.startsWith(key));
      const marketLabel = getMarketLabel(stock.market);
      const marketColor = getMarketColor(stock.market);

      return (
        <HoverCard key={generateRowKey(row, stock)} position="top">
          <HoverCard.Target>
            <Pill
              size="sm"
              c={marketColor}
              style={{
                margin: "0 4px 4px 0"
              }}
            >
              {`${marketLabel} · ${stock.code}`}
            </Pill>
          </HoverCard.Target>
          <HoverCard.Dropdown p="xs">
            <Text size="xs">市场：{marketLabel}</Text>
            {isCn ? (
              <Text size="xs">
                代码：
                <Link href={`/stock?symbol=${stock.code}`} target="_blank">
                  {stock.code}
                </Link>
              </Text>
            ) : (
              <Text size="xs">代码：{stock.code}</Text>
            )}
            <Text size="xs">名称：{stock.name}</Text>
          </HoverCard.Dropdown>
        </HoverCard>
      );
    });
  } catch (error) {
    return "--";
  }
};

export const COLUMNS: Column<News>[] = [
  {
    key: "date",
    title: "发布时间",
    width: 140,
    align: "left",
    render: formatDateDiff
  },
  {
    key: "stocks",
    title: "关联市场",
    width: 240,
    align: "left",
    render: formatStocks
  },
  {
    key: "content",
    title: "内容",
    align: "left"
  },
  {
    key: "source",
    title: "来源",
    align: "center",
    width: 200,
    render: source => SOURCE_MAP[source] || source
  }
];
