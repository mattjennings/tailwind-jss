import { transformSync } from '@babel/core'

const presets = ['module:@babel/preset-react']
const plugins = [require('../src')]

test('simple property', () => {
  const res = transformSync(
    `export function App() {
      return <div tw={{ bg: 'blue-500' }}  />;
    }`,
    {
      presets,
      plugins,
    }
  )
  expect(res?.code).toContain(`className: "bg-blue-500"`)
})

test('nested properties', () => {
  const res = transformSync(
    `export function App() {
      return <div tw={{ space: { x: 1, y: 1} }}  />;
    }`,
    {
      presets,
      plugins,
    }
  )
  expect(res?.code).toContain(`className: "space-x-1 space-y-1"`)
})

test('boolean properties', () => {
  const res = transformSync(
    `export function App() {
      return <div tw={{ rounded: true, border: { border: true, transparent: true }, something: false, bg: { 'indigo-500': true } }}  />;
    }`,
    {
      presets,
      plugins,
    }
  )
  expect(res?.code).toContain(
    `className: "rounded border border-transparent bg-indigo-500"`
  )
})

test('responsive', () => {
  const res = transformSync(
    `export function App() {
      return <div tw={{ bg: 'blue-500', 'hover:': { bg: 'blue-500' } }}  />;
    }`,
    {
      presets,
      plugins,
    }
  )
  expect(res?.code).toContain(`className: "bg-blue-500 hover:bg-blue-500"`)
})

// xtest('merges className', () => {
//   const res = transformSync(
//     `export function App() {
//       return <div tw={{ bg: 'blue-500' }} className="text-red-500" />;
//     }`,
//     {
//       presets,
//       plugins,
//     }
//   );
// });
