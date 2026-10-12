// Generates the static /en/, /ja/ and /zh/ pages from index.html (Korean source) and i18n.json.
// Link previews (X, KakaoTalk, Slack...) don't run JavaScript, so each language needs real HTML.
// Run after editing index.html or i18n.json:  bun build-i18n.ts
const SITE = "https://miettes.sanguneo.com";
const LANGS = {
  en: { html: "en", og: "en_US" },
  ja: { html: "ja", og: "ja_JP" },
  zh: { html: "zh-CN", og: "zh_CN" },
} as const;

const dir = import.meta.dir;
const source = await Bun.file(`${dir}/index.html`).text();
const dict: Record<string, Record<string, string>> = await Bun.file(`${dir}/i18n.json`).json();

for (const [lang, meta] of Object.entries(LANGS)) {
  const t = dict[lang];
  const missing: string[] = [];
  const pick = (key: string) => {
    if (t[key] == null) missing.push(key);
    return t[key] ?? "";
  };
  const url = `${SITE}/${lang}/`;
  const out = new HTMLRewriter()
    .on("html", { element: (el) => el.setAttribute("lang", meta.html) })
    .on("title", { element: (el) => el.setInnerContent(pick("title")) })
    .on('meta[name="description"], meta[property="og:description"]', {
      element: (el) => el.setAttribute("content", pick("desc")),
    })
    .on('meta[property="og:title"]', { element: (el) => el.setAttribute("content", pick("title")) })
    .on('meta[property="og:url"]', { element: (el) => el.setAttribute("content", url) })
    .on('meta[property="og:locale"]', { element: (el) => el.setAttribute("content", meta.og) })
    .on('link[rel="canonical"]', { element: (el) => el.setAttribute("href", url) })
    .on("[data-i18n]", { element: (el) => el.setInnerContent(pick(el.getAttribute("data-i18n")!), { html: true }) })
    .on("[data-i18n-attr]", {
      element: (el) => {
        for (const pair of el.getAttribute("data-i18n-attr")!.split(";")) {
          const [attr, key] = pair.split(":");
          el.setAttribute(attr, pick(key));
        }
      },
    })
    .transform(source);
  if (missing.length) throw new Error(`${lang}: missing keys ${missing.join(", ")}`);
  await Bun.write(`${dir}/${lang}/index.html`, out);
  console.log(`${lang}/index.html`);
}
