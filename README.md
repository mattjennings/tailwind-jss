# tailwind-jss

An experimental babel plugin that allows tailwind classes to be described as an object.

This is an attempt at solving the "long className" problem. Specifically, having a string that is 4x wider than
the rest of your code is frustrating. I wanted to find a way to express tailwind classes vertically and with a bit of organization.

Don't use this for anything important. It's just an idea at this point.

# Usage

```
npm install tailwind-jss
```

Add to your babel config

```json
{
  "plugins": ["tailwind-jss"]
}
```

You can use the `tw` prop and it will automatically be converted into a className.

```jsx
export function App() {
  return (
    <button
      tw={{
        bg: 'blue-600',
        rounded: true,
        p: 2,
        text: 'white',

        // responsive states work as well
        'hover:': {
          bg: 'blue-700',
        },
      }}
      // will result in the following prop:
      // className="bg-blue-600 rounded p-2 text-white hover:bg-blue-700"
    >
      My Cool Button
    </button>
  )
}
```

# TODO?

- I'm not a fan of some of the syntax. Specifically the following:

```js
{
  // is there a better way to specify "border" and also allow "border-blue-500"?
  border: {
    border: true
  }
}
```

```js
{
  // 'hover:': is weird to type
  'hover:': {
    bg: 'blue-700'
  }

  // maybe this is better?
  ':hover': {
    bg: 'blue-700'
  },
}
```

- Merge with existing className prop
- Generate typescript types from tailwind.config.js file (for autocompletion)
- Support purgecss
