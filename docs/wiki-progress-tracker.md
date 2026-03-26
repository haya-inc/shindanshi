# wiki 進捗トラッカー

更新日: 2026-03-26

## 状態の意味

- 未着手: 公開面にまだ反映していない
- 骨子あり: 公開面に章名や論点一覧はあるが、本文は薄い
- 執筆中: 公開面に学習用の説明や優先順位が入り始めている
- 公開済み: 単独ページとして使える品質まで達している
- 要更新: 制度変更や情報更新で再確認が必要

## 品質ゲート

- `G1`: 試験範囲とページの役割が明記されている
- `G2`: 学習のポイントや優先順位がある
- `G3`: 典型的なつまずき、解き方、比較軸などの学習支援がある
- `G4`: 関連ページへの導線がある
- `G5`: `pnpm lint`、`pnpm build`、表示確認などの検証が終わっている
- `G6`: 更新論点では確認日と一次情報が整理されている

## 状態判定ルール

- `骨子あり`: `G1` と `G5` を満たす
- `執筆中`: `G1`、`G2`、`G4`、`G5` を満たす
- `公開済み` の安定論点: `G1` から `G5`
- `公開済み` の更新論点: `G1` から `G6`

## 第1次試験

| 章 | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 第1章 ミクロ経済学 | `/docs/first-stage/economics-and-economic-policy/microeconomics` | 安定論点 | 公開済み | `G1-G5` | 図の読み方と典型問題パターンを追加する |
| 第2章 マクロ経済学 | `/docs/first-stage/economics-and-economic-policy/macroeconomics` | 安定論点 | 公開済み | `G1-G5` | 政策比較表と国際マクロの補強を追加する |
| 第3章 簿記の基礎 | `/docs/first-stage/finance-and-accounting/bookkeeping-basics` | 安定論点 | 公開済み | `G1-G5` | 仕訳例と決算整理の典型パターンを追加する |
| 第4章 企業会計の基礎 | `/docs/first-stage/finance-and-accounting/corporate-accounting-basics` | 安定論点 | 公開済み | `G1-G5` | 財務諸表の比較表と制度論点を補強する |
| 第5章 原価計算 | `/docs/first-stage/finance-and-accounting/cost-accounting` | 安定論点 | 公開済み | `G1-G5` | 個別原価計算と標準原価計算の手順を具体化する |
| 第6章 経営分析 | `/docs/first-stage/finance-and-accounting/management-analysis` | 安定論点 | 公開済み | `G1-G5` | 指標の比較表と CVP 分析への導線を補強する |
| 第7章 利益と資金の管理 | `/docs/first-stage/finance-and-accounting/profit-and-cash-management` | 安定論点 | 公開済み | `G1-G5` | 間接法と FCF の計算手順を具体化する |
| 第8章 ファイナンス | `/docs/first-stage/finance-and-accounting/finance` | 安定論点 | 公開済み | `G1-G5` | WACC、NPV、DCF のつながりを比較表で補強する |
| 第9章 経営戦略論 | `/docs/first-stage/business-management-theory/management-strategy` | 安定論点 | 公開済み | `G1-G5` | 競争戦略、PPM、VRIO の比較表を追加する |
| 第10章 組織論 | `/docs/first-stage/business-management-theory/organization-theory` | 安定論点 | 公開済み | `G1-G5` | 組織構造、動機づけ、リーダーシップの比較表を追加する |
| 第11章 マーケティング論 | `/docs/first-stage/business-management-theory/marketing` | 安定論点 | 公開済み | `G1-G5` | STP、4P、チャネル、CRM のつながりを補強する |
| 第12章 生産管理 プランニング | `/docs/first-stage/operations-management/production-planning` | 安定論点 | 公開済み | `G1-G5` | 生産方式、在庫、品質、IE の比較表を追加する |
| 第13章 生産管理 オペレーション | `/docs/first-stage/operations-management/production-operations` | 安定論点 | 公開済み | `G1-G5` | PERT/CPM、OEE、物流情報の使いどころを比較表で補強する |
| 第14章 店舗・販売管理 | `/docs/first-stage/operations-management/store-and-sales-management` | 安定論点 | 公開済み | `G1-G5` | 商圏分析、VMD、販売管理指標の比較表を追加する |
| 第15章 会社法 | `/docs/first-stage/business-law/company-law` | 更新論点 | 公開済み | `G1-G6` | 機関設計、株主総会決議、組織再編の比較表を追加する |
| 第16章 知的財産権 | `/docs/first-stage/business-law/intellectual-property` | 更新論点 | 公開済み | `G1-G6` | 産業財産権4法と著作権の比較表を追加する |
| 第17章 民法と取引関連法 | `/docs/first-stage/business-law/civil-and-transaction-law` | 更新論点 | 公開済み | `G1-G6` | 契約、消費者保護、個人情報、取適法の比較表を追加する |
| 第18章 情報通信技術の基礎 | `/docs/first-stage/management-information-systems/ict-basics` | 安定論点 | 公開済み | `G1-G5` | SQL、ネットワーク、セキュリティの比較表を追加する |
| 第19章 経営情報管理 | `/docs/first-stage/management-information-systems/information-management` | 安定論点 | 公開済み | `G1-G5` | 開発モデル、運用管理、DX ガバナンスの比較表を追加する |
| 第20章 中小企業経営 | `/docs/first-stage/sme-management-and-policy/sme-management` | 更新論点 | 公開済み | `G1-G6` | 白書テーマ、定義、統計の読み方を比較表で補強する |
| 第21章 中小企業政策 | `/docs/first-stage/sme-management-and-policy/sme-policy` | 更新論点 | 公開済み | `G1-G6` | 計画認定、金融、補助金、取引適正化を一覧表で補強する |

## 第2次試験

| 章 | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 第22章 2次試験の概要と解答プロセス | `/docs/second-stage/overview` | 更新論点 | 公開済み | `G1-G6` | 令和8年度の正式案内公開時に制度説明と時間配分例を更新する |
| 第23章 事例Ⅰ 組織・人事 | `/docs/second-stage/case-1-organization-and-hr` | 安定論点 | 公開済み | `G1-G5` | レイヤー別の設問パターン表を追加する |
| 第24章 事例Ⅱ マーケティング・流通 | `/docs/second-stage/case-2-marketing-and-distribution` | 安定論点 | 公開済み | `G1-G5` | 顧客別の施策パターン表とデータ読解例を追加する |
| 第25章 事例Ⅲ 生産・技術 | `/docs/second-stage/case-3-production-and-technology` | 安定論点 | 公開済み | `G1-G5` | QCD別の改善キーワード表を追加する |
| 第26章 事例Ⅳ 財務・会計 | `/docs/second-stage/case-4-finance-and-accounting` | 安定論点 | 公開済み | `G1-G5` | 論点別の計算手順表と時間配分例を追加する |

## 参照資料

| ページ | 公開導線 | 論点区分 | 状態 | 達成ゲート | 次の作業 |
| --- | --- | --- | --- | --- | --- |
| 受験ガイド | `/docs/reference/exam-guide` | 更新論点 | 公開済み | `G1-G6` | 令和8年度の正式案内公開時に即更新する |
