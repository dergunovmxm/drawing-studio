import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'

const Content = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Outlet />
    </Suspense>
  )
}

export default Content