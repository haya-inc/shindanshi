import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";

import {
  createValidationContent,
  normalizeDocRoutePath,
  resolveRelativeDocHref,
  toDocUrlFromRelativePath,
} from "./check-doc-links.mjs";
import {
  detectActualGates,
  parseClaimedGates,
} from "./check-wiki-maintenance.mjs";
import {
  extractLevel2Headings,
  findMissingSections,
  normalizeHeading,
} from "./check-doc-page-structure.mjs";

const docsRoot = path.join(process.cwd(), "content", "docs");

test("check-doc-links は route group と index を docs ルートへ正規化する", () => {
  assert.equal(
    normalizeDocRoutePath("finance-and-accounting/index.mdx"),
    "finance-and-accounting",
  );
  assert.equal(
    toDocUrlFromRelativePath("finance-and-accounting/cost-accounting.mdx"),
    "/finance-and-accounting/cost-accounting",
  );
  assert.equal(toDocUrlFromRelativePath("reference/index.mdx"), "/reference");
});

test("check-doc-links は相対リンクを公開 URL と hash 付き URL へ解決する", () => {
  const filePath = path.join(
    docsRoot,
    "finance-and-accounting",
    "cost-accounting.mdx",
  );

  assert.equal(
    resolveRelativeDocHref(filePath, "./cost-accounting-summary.mdx#practice"),
    "/finance-and-accounting/cost-accounting-summary#practice",
  );
  assert.equal(
    resolveRelativeDocHref(filePath, "../reference/index.mdx"),
    "/reference",
  );
});

test("check-doc-links は本文監査前に相対リンクを docs URL へ寄せて数式を除く", () => {
  const filePath = path.join(docsRoot, "reference", "index.mdx");
  const content = `
# 参照

[試験案内](./exam-guide.mdx)
<Card href="./study-time-model.mdx">学習時間</Card>
<a href='./important-formulas.mdx#profit'>公式</a>

$E=mc^2$
`;
  const normalized = createValidationContent(filePath, content);

  assert.match(normalized, /\]\(\/reference\/exam-guide\)/u);
  assert.match(normalized, /href="\/reference\/study-time-model"/u);
  assert.match(normalized, /href='\/reference\/important-formulas#profit'/u);
  assert.doesNotMatch(normalized, /\$E=mc\^2\$/u);
});

test("check-doc-page-structure は見出しからインラインマークアップを除去する", () => {
  assert.equal(normalizeHeading("`CVP分析`の基本"), "CVP分析の基本");
  assert.equal(normalizeHeading("[参照ページ](/ref)"), "参照ページ");
  assert.equal(normalizeHeading("<br/>見出し"), "見出し");
});

test("check-doc-page-structure はコードフェンス内の ## を無視する", () => {
  const content = `
## 本文の見出し

\`\`\`markdown
## コードブロック内の見出し
\`\`\`

## もう一つの見出し
`;
  const headings = extractLevel2Headings(content);

  assert.deepEqual(headings, ["本文の見出し", "もう一つの見出し"]);
});

test("check-doc-page-structure は不足セクションを検出する", () => {
  const headings = ["このページの役割", "学習のポイント"];
  const required = [
    { label: "このページの役割", patterns: [/^このページの役割$/u] },
    { label: "典型的なつまずき", patterns: [/^典型的なつまずき$/u] },
  ];
  const missing = findMissingSections(headings, required);

  assert.deepEqual(missing, ["典型的なつまずき"]);
});

test("check-wiki-maintenance は達成ゲートの短縮記法を展開する", () => {
  assert.deepEqual(parseClaimedGates("G1-G5"), ["G1", "G2", "G3", "G4", "G5"]);
  assert.deepEqual(parseClaimedGates("G1-G6"), [
    "G1",
    "G2",
    "G3",
    "G4",
    "G5",
    "G6",
  ]);
  assert.deepEqual(parseClaimedGates("G1, G4, G5"), ["G1", "G4", "G5"]);
});

test("check-wiki-maintenance は更新論点ページの根拠から G1-G6 を検出する", () => {
  const content = `
## このページの役割

## 2026-03-28 時点での読み方

## 典型的なつまずき

[関連ページ](/reference/exam-guide)
[一次情報](https://www.smrj.go.jp/)

2026-03-28
`;
  const actual = detectActualGates(content, true);

  assert.deepEqual([...actual].sort(), ["G1", "G2", "G3", "G4", "G5", "G6"]);
});

test("check-wiki-maintenance は鮮度台帳がない場合に G6 を付けない", () => {
  const content = `
## このページの役割

## 2026-03-28 時点での読み方

## 典型的なつまずき

[関連ページ](/reference/exam-guide)
[一次情報](https://www.smrj.go.jp/)

2026-03-28
`;
  const actual = detectActualGates(content, false);

  assert.equal(actual.has("G6"), false);
});
