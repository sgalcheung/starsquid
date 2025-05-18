<div align="center" style="margin-bottom: 20px;">

⚠️ **This package has been renamed from `starlight-squidex` to [`starsquid`](https://www.npmjs.com/package/starsquid)** ⚠️  
Please update your dependencies with:  
`npm uninstall starlight-squidex`  
`npm install starsquid`

</div>

<div align="center">
  <h1>💜 starsquid ❤️</h1>
  <p>Starlight plugin to pull articles from Squidex(3rd-party API) to your documentation.</p>
  <p>
    <a href="/screenshot.gif" title="Screenshot of starsquid">
      <img alt="Screenshot of starsquid" src="/screenshot.gif" width="520" />
    </a>
  </p>
</div>

> origin discussion [Pull main docs Content from 3rd-party API (a headless CMS) · withastro/starlight · Discussion #1790 (github.com)](https://github.com/withastro/starlight/discussions/1790)

## 🌠 Getting Started

Want to get started immediately? Check out the source code or check out the [example](https://starsquid.netlify.app) to see the plugin in action.

## 🚀 Project Structure

```test
.
├── LICENSE
├── README.md -> ./playground/README.md
├── biome.json
├── node_modules
├── package.json
├── packages
└── starsquid
    ├── CHANGELOG.md
    ├── README.md
    ├── astro.d.ts
    ├── dist
    ├── generated
    ├── node_modules
    ├── package.json
    ├── src
    ├── ts-to-zod.config.cjs
    ├── tsconfig.base.json
    ├── tsconfig.json
    └── tsup.config.ts
├── playground
│   ├── CHANGELOG.md
│   ├── README.md
│   ├── astro.config.mjs
│   ├── codegen.ts
│   ├── components.json
│   ├── dist
│   ├── generated
│   ├── node_modules
│   ├── package.json
│   ├── public
│   ├── src
│   └── tsconfig.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── screenshot.gif
├── screenshot.png
└── scripts
    ├── cmd
    ├── index.js
    ├── jsconfig.json
    ├── node_modules
    ├── package.json
    └── release.mjs
```

## ⚙️ Features

A [Starlight](https://starlight.astro.build) plugin to server render contents, it is experment, more features are under development.

- SSR render contents
- Refresh(Inprogress)
- Singleton
  [See detail](https://starsquid.netlify.app/docs)

> [!IMPORTANT]
> This package inspired from [dewp](https://github.com/delucis/dewp).
> This README format inspired from [starlight-blog](https://github.com/HiDeoo/starlight-blog/blob/main/packages/starlight-blog/README.md).

## Licensing

[MIT Licensed](./LICENSE). Made with ❤️ by [Sgal Cheung](https://github.com/sgalcheung).

<!-- Test Changeset -->
