# remix-cloudflare-template

wrangler d1 execute <DATABASE_NAME> --local
--file=./drizzle/0000_short_lockheed.sql

wrangler dev --local --persist

Learn more about [Remix Stacks](https://remix.run/stacks).

```
npx create-remix@latest --template edmundhung/remix-cloudflare-template
```

What's included?

- Development with [Vite](https://vitejs.dev)
- [Github Actions](https://github.com/features/actions) for CI/CD
- [Markdoc](https://markdoc.dev) for rendering markdown
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Playwright](https://playwright.dev/)
- Local third party request mocking with [MSW](https://mswjs.io/)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Development

Before start, copy [.dev.vars.example](./.dev.vars.example) and name it
`.dev.vars` with the required secrets.

```sh
cp .dev.vars.example .dev.vars
```

To starts the vite dev server:

```sh
npm run dev
```

You can also start the Playwright UI mode to test your application. You will
find all the tests defined in the [/tests/e2e](./tests/e2e) directory.

```sh
npm run test
```

To test your application on the workerd runtime, you can start the wrangler dev
server with:

```sh
npm run build && npm run start
```

### New environment variable & secret

To add a new secret, please
[update the value](https://developers.cloudflare.com/workers/configuration/secrets/#secrets-in-development)
on the `.dev.vars` file.

For the rest of the environment variable, you can update the **var** section on
the [wrangler.toml](./wrangler.toml) file with the new variable:

```toml
[vars]
NEW_VARIABLE = "..."
```

The variables will be available from the `env` object in the context.

### Setup a KV Namespace

To setup a new KV namespace on the **development environment**, update
[wrangler.toml](./wrangler.toml) with another object similar to the cache
namespace as shown below:

```toml
kv_namespaces = [
  { binding = "cache", id = "cache" },
  { binding = "new_namespace", id = "new_namespace" }
]
```

Note that the `id` has no effect on the dev environment. You can use the same
name for both `id` and `binding`. The namespace will be available form the `env`
object in the context.

### Generate env types

You can generate the types of the `env` object based on `wrangler.toml` and
`.dev.vars` with:

```sh
npx wrangler types
```

## Deployment

Before your first deployment, make sure all the environment variables and
bindings are set properly on the
[Cloudlfare Dashboard](https://dash.cloudflare.com/login).

