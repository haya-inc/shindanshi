# 初期化戦略メモ

更新日: 2026-03-26

このリポジトリでは、初期化の判断を次の順序で行います。

## 1. まず公式の scaffold を使う

- Next.js 本体は `create-next-app`
- Fumadocs は既存アプリへの `manual installation`

理由:

- 初期ファイル構成の取りこぼしが減る
- 最新の lint / Tailwind / App Router 前提をそのまま受け取れる
- 古い記事ベースの手書き導入を避けられる

## 2. package manager は一つに固定する

今回は `pnpm` を採用します。

- `pnpm-lock.yaml` を唯一の lockfile にする
- `package.json` の `packageManager` で pnpm の系統も固定する
- `bun.lock` や他 package manager の生成物は混在させない
- ローカル、CI、Vercel で同じ package manager を使う

## 3. docs はアプリに内包する

Fumadocs を別プロジェクトに切るのではなく、同じ Next.js アプリに `/docs` として内包します。

理由:

- ルーティングとデプロイが単純
- 認証やデザインの共有がしやすい
- 単一リポジトリで運用しやすい

## 4. 先に複雑化しない

- i18n は必要になるまで広げない
- OpenAPI 統合は必要になるまで入れない
- 独自検索実装は先に作らない

最初は、表示、検索、ビルドが通る最小構成だけを揃えます。
