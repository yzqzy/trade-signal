<div align="center">

# TradeSignal (交易信标)

**交易信标** - 提供实时市场数据和分析功能，助您捕捉市场脉动，做出精准投资决策。

**TradeSignal** - Provides real-time market data and analysis features, helping you capture market dynamics and make precise investment decisions.

富贵险中求，也在险中丢；求时十之一，丢时十之九。

</div>

## 功能特性

* 精准的技术指标计算: MACD、KDJ、BOLL 等
* 智能形态识别: 头肩顶、双底、红三兵等
* 多维度选股策略: 基于技术面、基本面等多维度综合筛选
* 个性化策略构建: 灵活定制您的专属选股条件，满足不同投资偏好

## 开发环境

使用 docker-compose 启动 postgres 。

````bash
docker-compose -p trade-signal -f docker/docker-compose.dev.yml up  -d
```` 

根目录下新建 .env 文件，配置数据库连接信息，示例如下：

```environment
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://postgres:123456@localhost:5432/postgres?schema=public"
``` 

安装依赖并启动服务

````bash
npm install && npm run dev
```` 

## 生产环境

```bash
docker build -t trade-signal:latest .
```

```bash
docker run -d -p 3000:3000 \
  --env-file .env.production \
  trade-signal:latest
```

## 参考

* [AkShare](https://github.com/jindaxiang/akshare) - 开源财经数据接口库
* [AkTools](https://github.com/jindaxiang/aktools) - 基于 AkShare 的 HTTP API 库
* [stock](https://github.com/myhhub/stock) - 提供股票数据、指标计算、选股策略、回测和自动交易
