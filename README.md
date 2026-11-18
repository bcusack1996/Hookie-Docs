# Hookie documentation

This repository publishes the guides and API reference at
[docs.hookie.ai](https://docs.hookie.ai). Hookie collects events, routes and delivers
webhooks, and prepares workspace knowledge for people and connected AI agents.

Start with the [quickstart](https://docs.hookie.ai/quickstart),
[plans and limits](https://docs.hookie.ai/limits-and-plans), or
[Workspace Brain](https://docs.hookie.ai/knowledge-graph).

## Editing and validation

Pages use MDX with YAML frontmatter. Navigation, branding and footer links are in
`docs.json`. Keep public prices, limits and behavior consistent with the deployed
application, and check whether a package has actually been published before
adding an installation command.

`openapi.json` is copied byte-for-byte from the production specification at
[https://hookie.ai/openapi.json](https://hookie.ai/openapi.json). The OpenAPI sync
workflow checks that it matches; do not hand-edit it here. The generated portion
of `cli/commands.mdx` comes from the application's CLI tool catalog.

For a local Mintlify preview, install the
[Mintlify CLI](https://www.npmjs.com/package/mint), then run `mint dev` from this
repository. Validate changed MDX, navigation targets and page links before
opening a pull request.

## Publishing

The Mintlify GitHub integration publishes the default branch. A documentation
merge can therefore change the public site. Confirm application and package
availability before merging guides for new behavior, and check the rendered pages
after publication.

The first public `@hookieai/node` npm release is pending as of November 17, 2026.
The SDK page identifies the intended version and links to HTTP and signature
alternatives until it is available.

## Company

[Hookie](https://hookie.ai) · [Contact](https://hookie.ai/contact/) ·
[LinkedIn](https://www.linkedin.com/company/hookie-ai/)
