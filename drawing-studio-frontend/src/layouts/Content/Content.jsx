import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import Loader from '../../components/ui/Loader'

const Content = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Outlet />
    </Suspense>
  )
}

export default Content