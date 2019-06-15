import * as HandlebarsAnalyser from '.';

describe('Dependency graph', () => {
  test('Retrieve a single template dependencies', () => {
    const template = `
      {{ foo }}
      {{ baz.duh }}
      {{ missing.quxProperty }}
    `;

    const dependencies = HandlebarsAnalyser.templateDependencies(template);

    expect(dependencies).toMatchSnapshot();
  });

  test('Retrieve multiple template names', () => {
    const templates = [{ name: 'foo', content: '{{ bar }}' }];

    const components = HandlebarsAnalyser.templateNames(templates);

    expect(components).toMatchSnapshot();
  });

  test('Retrieve template existing dependencies', () => {
    const template = `
      {{ foo }}
      {{ baz.duh }}
      {{ missing.quxProperty }}
    `;

    const templates = [{ name: 'foo', content: '{{ bar }}' }];

    const existingDependencies = HandlebarsAnalyser.existingDependencies(templates, template);

    expect(existingDependencies).toMatchSnapshot();
  });

  test('Retrieve template missing dependencies', () => {
    const template = `
      {{ foo }}
      {{ baz.duh }}
      {{ missing.quxProperty }}
    `;

    const templates = [
      { name: 'foo', content: '{{ bar }}' },
      { name: 'baz', content: '{{ qux }}' },
    ];

    const missingDependencies = HandlebarsAnalyser.missingDependencies(templates, template);

    expect(missingDependencies).toMatchSnapshot();
  });

  test('Analyse dependencies', () => {
    const template = `
      {{ foo }}
      {{ baz.duh }}
      {{ missing.quxProperty }}
    `;

    const templates = [
      { name: 'foo', content: '{{ bar }}' },
      { name: 'baz', content: '{{ qux }}' },
    ];

    const analysedDependencies = HandlebarsAnalyser.markDependencyPresences(templates, template);

    expect(analysedDependencies).toMatchSnapshot();
  });
});
