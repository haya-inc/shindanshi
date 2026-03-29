import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import * as mdx from "eslint-plugin-mdx";
import remarkMath from "remark-math";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // MDX ファイルの lint（remark-lint は .remarkrc.mjs を自動検出）
  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: false,
    }),
    // MDX パーサーに remark-math を渡し、数式内の {} を JSX と誤認させない
    languageOptions: {
      ...mdx.flat.languageOptions,
      parserOptions: {
        ...mdx.flat.languageOptions?.parserOptions,
        remarkPlugins: [remarkMath],
      },
    },
    rules: {
      // MDX 本文の JSX 使用をパーサーが検出できず誤検出するため無効化
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // 数式の {} が式文と誤認されるため無効化
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
  {
    ...mdx.flatCodeBlocks,
    rules: {
      ...mdx.flatCodeBlocks.rules,
      // MDX コードブロック内では未使用変数を許容（説明用コード）
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  },

  // Prettier と競合する ESLint ルールを無効化（最後に配置）
  eslintConfigPrettier,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    ".next-check/**",
    ".next-playwright/**",
    ".source/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 参照資料・内部ドキュメント（lint 対象外）
    "_book/**",
    "docs/**",
  ]),
]);

export default eslintConfig;
