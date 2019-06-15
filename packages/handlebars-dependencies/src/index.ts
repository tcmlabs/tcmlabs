import Handlebars from 'handlebars';
import * as _ from 'lodash';

type Template = string;

type TemplateDependencyName = string;

enum StatementType {
  MUSTACHE_STATEMENT = 'MustacheStatement',
}

export function templateDependencies(template: Template): TemplateDependencyName[] {
  const ast = Handlebars.parse(template);
  const mustacheStatements = ast.body.filter(
    ({ type }) => type === StatementType.MUSTACHE_STATEMENT,
  );

  const dependencyRoots = _.map(mustacheStatements, 'path.parts[0]');

  return dependencyRoots;
}

type DependencyName = string;

interface HandlebarsTemplate {
  name: string;
}

export function templateNames(templates: HandlebarsTemplate[]): DependencyName[] {
  return templates.map(({ name }) => name);
}

export function existingDependencies(
  templates: HandlebarsTemplate[],
  template: Template,
): TemplateDependencyName[] {
  const dependencyComponents = templateNames(templates);
  const functionDependencies = templateDependencies(template);

  const dependencies = _.intersection(functionDependencies, dependencyComponents);

  return dependencies;
}

export function missingDependencies(
  templates: HandlebarsTemplate[],
  template: Template,
): TemplateDependencyName[] {
  const dependencyComponents = templateNames(templates);
  const functionDependencies = templateDependencies(template);

  const dependencies = _.difference(functionDependencies, dependencyComponents);

  return dependencies;
}

interface DependencyVerification {
  name: DependencyName;
  exist: boolean;
}

export function markDependencyPresences(
  templates: HandlebarsTemplate[],
  template: Template,
): DependencyVerification[] {
  const validDependencies = existingDependencies(templates, template).map(name => ({
    name,
    exist: true,
  }));
  const invalidDependencies = missingDependencies(templates, template).map(name => ({
    name,
    exist: false,
  }));

  const analysedDependencies = [...validDependencies, ...invalidDependencies];

  return analysedDependencies;
}
