import { createTokenizer } from "@orama/tokenizers/japanese";
import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

const api = createFromSource(source, {
  tokenizer: createTokenizer(),
});

export async function GET(request: Request) {
  return api.GET(request);
}
