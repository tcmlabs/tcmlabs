# handlebars-dependencies

Analyse Handlebars templates which cross-reference data.

The purpose of this package is to detect Handlebars templates which may try to interpolate `someValue`, using `{{ someValue }}`, that may be missing in a global Object.

Some of the currently supported features:

- Introspect Handlebars templates, and return a complete dependency graph of interpolated data
- View missing dependency references, ie `foo.ext` template references `{{ bar }}`, but `bar` data does not exist
- View unreferenced/orphans data, ex. `foo` data never referenced as `{{ foo }}` in any template.
