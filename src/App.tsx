import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react'
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import Showroom from './showroom/Showroom'
import { Toasts } from './shared/ui'

// Cada demo vive en src/demos/<slug>/index.tsx y se carga bajo demanda (rápido en móvil)
const modules = import.meta.glob<{ default: ComponentType }>('./demos/*/index.tsx')
const demos: Record<string, LazyExoticComponent<ComponentType>> = {}
for (const path in modules) {
  const slug = path.split('/')[2]
  demos[slug] = lazy(modules[path])
}

function DemoRoute() {
  const { slug = '' } = useParams()
  const Demo = demos[slug]
  if (!Demo) return <Navigate to="/showroom" replace />
  return <Demo key={slug} />
}

function Loader() {
  return (
    <div className="grid min-h-dvh place-items-center bg-[#0b0b12]">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-white/15 border-t-lime-300" />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/showroom" replace />} />
          <Route path="/showroom" element={<Showroom />} />
          <Route path="/demo/:slug" element={<DemoRoute />} />
          <Route path="*" element={<Navigate to="/showroom" replace />} />
        </Routes>
      </Suspense>
      <Toasts />
    </HashRouter>
  )
}
