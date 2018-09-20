# Reusing GraphQL types to type check React Component props using TypeScript


When developing a universal application for one of our client, we wanted to enjoy type safety not only when interacting with our GraphQL server, but also when writing GraphQL queries used by our React components.

We needed to find a way to automatically:
- reuse these GraphQL types when type-checking React Component `<Props>`
- enjoy type checking within GraphQL queries defined as strings in Java

That is: cross-language type checking from GraphQL to TypeScript, all the way from server to the client.

This article assumes that you're already familiar with GraphQL, TypeScript and React Apollo. If not, we definitely recommend that you checkout these great tools.

## Walkthrough

Our approach requires to use two tools:
* `apollo-codegen` CLI
* the GraphQL for VSCode extension

### Introspecting a GraphQL schema and building TypeScript types

`apollo-codegen` reads a `.graphqlconfig` file, which is used for two things:

1. introspect the local schema as defined in the `.gql` files residing in your code base, generating a JSON representation of a GraphQL schema.

```bash
apollo-codegen introspect-schema \
  $(cat server/**/*.gql >| generated/schema.gql && echo "generated/schema.gql") \
  --output generated/schema.json
```

2. Generate TypeScript based on this freshly generated `schema.json` file:

```bash
apollo-codegen generate !(node_modules)/**/*.tsx \
  --add-typename \
  --schema generated/schema.json \
  --target typescript \
  --output generated/Types.ts
```

Example `.graphqlconfig` file:

```json
{
  "schemaPath": "schema.graphql",
  "includes": ["**/*.gql"]
}
```

Running these two commands will generate a `Types.ts` file in which GraphQL types are transformed into TypeScript types.

### IDE integration: typechecking and autocompleting GraphQL queries, with visual feedback in VSCode

A second piece of configuration must be defined: a `.gqlconfig` file is read by the [GraphQL for VSCode
](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode) extension.

This extension will:
- typecheck all GraphQL queries, most often defined in your source code using a `gql` tag from the `graphql-tag` module available on npmjs.org.
- provide autocompletion for available GraphQL fields and arguments within that tag

```js
{
  schema: {
    files: "**/*.gql"
  },
  query: {
    files: [
      {
        match: '**/*.tsx',
        parser: ['EmbeddedQueryParser', { startTag: 'gql`', endTag: '`' }]
      }
    ],
  },
}
```

## Benefits

TODO: screenshot benefits in VSCode, with syntax highlighting, error reporting and autocompletion.


## Automation: rebuild GraphQL schema and TypeScript type definitions on change

These two steps should be automated and executed whenever a file changes.
* when the `*.gql` files change (server-side), the schema should be introspected again
* when the `*.tsx` files change (universal/isomorphic), the TypeScript type definitions should be re-generated


# Tooling IDE

- step1: execute schema introspection query and store output
- step2: generate typescript types based on schema


## Extra bonus points: type-check and auto-complete remote GraphQL API

Remote GraphQL API can be automatically introspected, and TypeScript types defined from the schema. The benefits are:
- do introspection of remote GraphQL schema API
- enjoy type-safe programming


There's a bit of plumbing and that could be packed into an extension. We'll leave this as an exercice to the reader.

* * *

About us ? [TCM Labs](http:/www.tcmlabs.fr) is a French consulting firm specialized in software engineering and IT automation. We're passionnate about functional programming, DevOps, data processing and distributed systems. Come talk to us on [Slack](https://tcmlabs.slack.com/messages/C50RJSFB3) or follow us on Twitter [@tcmlabs](https://twitter.com/tcmlabs).
