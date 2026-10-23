# Portfolio

Personal portfolio of Cristian Sánchez (GitHub: [crisnsz](https://github.com/crisnsz)), built with [Astro](https://astro.build). It is a static site with zero client-side JavaScript, plain CSS and light/dark themes. It is published from the `crisnsz.github.io` repository and served at https://portfolio.0xcris.dev.

## Commands

Requires Node.js 22.23.4 or newer.

```sh
npm install        # install dependencies
npm run dev        # dev server at http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npx astro check    # type and template checks
```

## Add a project

Drop a markdown file in `src/content/projects/`. The file name becomes the URL (`my-project.md` -> `/projects/my-project/`). The frontmatter is validated by the schema in `src/content.config.ts`:

```md
---
title: My project
summary: One line shown on the card.
problem: What problem it solves.
stack: [Go, gRPC]
repo: https://github.com/crisnsz/my-project
order: 4          # lower numbers come first
featured: false
status: Optional status text
---

The markdown body is the solution and details.
```

<!-- Future project slot: "Go + gRPC + RabbitMQ". Add src/content/projects/<name>.md with order 4 once the repository exists. -->

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site with `withastro/action` and publishes it with `actions/deploy-pages`. Actions are pinned to full commit SHAs.

One-time setup in the GitHub repository: Settings -> Pages -> Source: **GitHub Actions**. The custom domain is set by `public/CNAME` and the `site` value in `astro.config.mjs`. DNS: a DNS-only (not proxied) CNAME `portfolio` -> `crisnsz.github.io`, managed in Terraform.

## Content to complete

Experience and skills live in `src/pages/index.astro`, sourced from the CV.
