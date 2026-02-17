import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/editor',
    })
  },
  component: App,
})

function App() {
  return <div className="p-2">Redirecting to editor...</div>
}
