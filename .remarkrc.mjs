/**
 * remark-lint 設定
 * eslint-plugin-mdx が自動検出して MDX ファイルの Markdown 構文を検証する。
 */
import remarkFrontmatter from "remark-frontmatter";
import remarkMath from "remark-math";
import remarkPresetLintRecommended from "remark-preset-lint-recommended";
import remarkPresetLintConsistent from "remark-preset-lint-consistent";
import remarkLintHeadingStyle from "remark-lint-heading-style";
import remarkLintNoUndefinedReferences from "remark-lint-no-undefined-references";

const config = {
  plugins: [
    // YAML frontmatter（---）を認識し、setext 見出しとの誤検出を防ぐ
    remarkFrontmatter,
    // 数式ブロック（$...$, $$...$$）を認識し、acorn パースエラーを防ぐ
    remarkMath,
    remarkPresetLintRecommended,
    remarkPresetLintConsistent,
    // MDX では ATX（#）が標準
    [remarkLintHeadingStyle, "atx"],
    // MDX コンテンツの角括弧（数式・説明文脈）が誤検出されるため無効化
    [remarkLintNoUndefinedReferences, false],
  ],
};

export default config;
