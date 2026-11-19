# Hookie examples

Choose a framework, open its preview and send a sample. The six form examples use the published `@hookieai/forms` browser package and the same public endpoint. Each StackBlitz link opens the framework entry point and runs its development server.

| Example | Open in StackBlitz | Start locally |
| --- | --- | --- |
| HTML | [Try it](https://stackblitz.com/github/bcusack1996/Hookie-Docs/tree/main/examples?startScript=html&file=plain/main.js) | `npm run html` |
| React | [Try it](https://stackblitz.com/github/bcusack1996/Hookie-Docs/tree/main/examples?startScript=react&file=react/main.jsx) | `npm run react` |
| Next.js | [Try it](https://stackblitz.com/github/bcusack1996/Hookie-Docs/tree/main/examples?startScript=next&file=next/pages/index.jsx) | `npm run next` |
| Astro | [Try it](https://stackblitz.com/github/bcusack1996/Hookie-Docs/tree/main/examples?startScript=astro&file=astro/src/pages/index.astro) | `npm run astro` |
| Vue | [Try it](https://stackblitz.com/github/bcusack1996/Hookie-Docs/tree/main/examples?startScript=vue&file=vue/App.vue) | `npm run vue` |
| Svelte | [Try it](https://stackblitz.com/github/bcusack1996/Hookie-Docs/tree/main/examples?startScript=svelte&file=svelte/App.svelte) | `npm run svelte` |
| Worker | [Try it](https://stackblitz.com/github/bcusack1996/Hookie-Docs/tree/main/examples?startScript=worker&file=worker/receiver.mjs) | `npm run worker` |

## Run locally

Install Node.js 22.23.4 or later, open this directory and run `npm ci`. Start a preview using the command in the table and open its local URL. Run `npm run build` to build all six form apps and `npm test` to check the Worker receiver.

## What the previews send

The forms post to `https://app.hookie.ai/v1/examples/submit`. Choose one of three sample event types. Hookie records the framework and event type together in a dedicated sample table and returns a receipt. Sending the same pair again returns the same receipt. The endpoint accepts only preset fields, discards honeypot submissions and limits requests per IP. It cannot forward samples to a destination.

The Worker preview runs a Web-standard Worker handler in a local Node server. It signs its fixtures with a new secret on every start and lets you compare valid and modified samples. The receiver uses the Standard Webhooks verifier. No Hookie account or signing key is needed.
