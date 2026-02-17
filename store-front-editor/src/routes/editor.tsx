import { createFileRoute } from '@tanstack/react-router'
import Editor from '@/components/editor/editor'

export const Route = createFileRoute('/editor')({
  component: EditorPage,
})

function EditorPage() {
  return <Editor />
}
