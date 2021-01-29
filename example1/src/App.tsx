import './App.css'

declare global {
  namespace React {
    interface HTMLAttributes<T>
      extends React.AriaAttributes,
        React.DOMAttributes<T> {
      tw?: any
    }
  }
}

function App() {
  return (
    <div
      tw={{
        space: {
          x: 2,
          y: 2,
        },
      }}
    >
      <button
        type="button"
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        classes
      </button>
      <button
        type="button"
        tw={{
          inline: 'flex', // inline-flex
          items: 'center', // items-center
          px: 2.5, // px-2.5
          py: 1.5, // py-1.5
          bg: 'indigo-600', // bg-indigo-600
          font: 'medium', // font-medium
          rounded: true, // rounded
          shadow: 'sm', // shadow-sm

          // border border-transparent
          border: {
            border: true,
            // ^ results in "border" classname
            // which allows us to use border-transparent as well
            transparent: true,
          },

          // text-xs text-white
          text: {
            xs: true,
            white: true,
          },

          // hover:bg-indigo-700
          'hover:': {
            bg: 'indigo-700',
          },

          // focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
          'focus:': {
            ring: {
              2: true,
              offset: 2,
              'indigo-500': true,
            },
          },
        }}
      >
        tailwind-jss
      </button>
    </div>
  )
}

export default App
