import { declare } from '@babel/helper-plugin-utils';

export default declare(api => {
  api.assertVersion(7);

  return {
    name: 'tailwind-jss',
    visitor: {
      JSX(path) {
        // @ts-ignore
        const attributes = path.node?.openingElement?.attributes ?? [];

        // const existingClassNameAttribute = attributes.find(
        //   (att: any) => att.name.name === 'className'
        // );
        const filteredAttributes = attributes.filter(
          (att: any) => att.name.name !== 'className'
        );

        for (const attribute of filteredAttributes) {
          if (attribute.name.name === 'tw') {
            attribute.name.name = 'className';
            attribute.value.type = 'StringLiteral';
            attribute.value.value = toClassName(
              attribute.value.expression.properties
            );
          }
        }
      },
    },
  };
});

function toClassName(nodes: any[], prefix?: string): string {
  function addPrefix(value: string) {
    const delimiter = prefix?.endsWith(':') ? '' : '-';
    return `${prefix ? prefix + delimiter : ''}${value}`;
  }

  return nodes
    .flatMap(node => {
      const { key, value } = node;
      // if key is coming from an object, it'll be in .value
      const keyName = key.name ?? key.value;

      if (value.type === 'StringLiteral' || value.type === 'NumericLiteral') {
        return addPrefix(`${keyName}-${value.value}`);
      }

      if (value.type === 'BooleanLiteral' && value.value === true) {
        if (prefix !== keyName) {
          return addPrefix(keyName);
        } else {
          return keyName;
        }
      }

      if (value.type === 'ObjectExpression') {
        return addPrefix(
          `${toClassName(value.properties, addPrefix(keyName))}`
        );
      }

      if (value.type === 'ObjectProperty') {
        addPrefix(`${toClassName(value.value, addPrefix(keyName))}`);
      }

      return false;
    })
    .filter(Boolean)
    .join(' ')
    .trim();
}
