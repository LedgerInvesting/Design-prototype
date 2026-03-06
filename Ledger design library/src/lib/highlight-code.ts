import { codeToHtml } from "shiki";

export async function highlightCode(code: string, language = "tsx") {
  const html = await codeToHtml(code, {
    lang: language,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
    transformers: [
      {
        pre(node) {
          node.properties.class =
            "no-scrollbar min-w-0 overflow-x-auto px-4 py-3.5 outline-none !bg-transparent";
        },
        code(node) {
          node.properties["data-line-numbers"] = "";
        },
        line(node) {
          node.properties["data-line"] = "";
        },
      },
    ],
  });

  return html;
}
