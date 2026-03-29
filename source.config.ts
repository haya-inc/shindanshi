import { execSync } from "node:child_process";
import path from "node:path";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { remarkFeedbackBlock } from "fumadocs-core/mdx-plugins/remark-feedback-block";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

/**
 * git log を1回だけ実行し、全ファイルの最終更新日を一括取得する。
 * デフォルトの lastModified はファイルごとに git プロセスを spawn するため、
 * 347ファイル分のオーバーヘッドを1プロセスに削減する。
 */
function createBatchGitTimestamp(): (filePath: string) => Promise<Date | null> {
  let cache: Map<string, Date> | null = null;

  function loadAll(): Map<string, Date> {
    const output = execSync(
      'git log --format="COMMIT:%ai" --name-only -- content/docs/',
      { encoding: "utf-8", maxBuffer: 50 * 1024 * 1024 },
    );
    const map = new Map<string, Date>();
    let currentDate: Date | null = null;

    for (const line of output.split("\n")) {
      if (line.startsWith("COMMIT:")) {
        const d = new Date(line.slice(7));
        if (!isNaN(d.getTime())) currentDate = d;
      } else if (line.trim() && currentDate) {
        // git log は新しい順 → 最初に見つかった日付が最新
        const abs = path.resolve(line.trim());
        if (!map.has(abs)) {
          map.set(abs, currentDate);
        }
      }
    }
    return map;
  }

  return async (filePath: string): Promise<Date | null> => {
    if (!cache) cache = loadAll();
    return cache.get(filePath) ?? null;
  };
}

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      extractLinkReferences: true,
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => [[rehypeKatex, { strict: false }], ...plugins],
    remarkPlugins: (plugins) => [
      remarkMath,
      [remarkFeedbackBlock, { generateBody: true }],
      ...plugins,
    ],
  },
  plugins: [lastModified({ versionControl: createBatchGitTimestamp() })],
});
