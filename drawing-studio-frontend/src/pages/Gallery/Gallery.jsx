import { useMemo } from "react"
import styles from './Gallery.module.scss'
import Carousel from "../../components/Carousel"
import Typography from "../../components/ui"
import { useGroupImage } from "../../hooks/useGroupImage"
import CarouselSkeleton from "../../components/Carousel/CarouselSkeleton"
import { useNavigate } from "react-router"
import { useFetchImage } from "../../hooks/uaeFetchImage"


const Gallery = () => {
 
  const navigate = useNavigate()
  const {data, isLoading, isFetching, isPending, error} = useFetchImage()

  const grouped = useGroupImage(data ?? [])
  const placeholderAliases = ["section-1", "section-2", "section-3"]
  const shouldShowSkeleton = isLoading || isFetching || isPending || (Array.isArray(data) && data.length === 0)
  const hasEntries = grouped.some(({ items }) => Array.isArray(items) && items.length > 0)

  const pathSegments = useMemo(() => location.pathname.split("/").filter(Boolean), [location.pathname])
  console.log(pathSegments)
  if (error) return <div>Ошибка: {error?.message}</div>

  if (window.location.pathname.includes('znaki')) {
    return (
      <main className={styles.root}>
        {data.filter(item => item.alias === 'znaki').map((item => <img src={item.link} width={200} height={200}/>))}
      </main>
    )
  }

  if (window.location.pathname.includes('poetry')) {
    return (
      <main>
        {data.filter(item => item.alias === 'poetry').map((item => <img src={item.link} width={200} height={200}/>))}
      </main>
    )
  }

  if (window.location.pathname.includes('free')) {
    return (
      <main>
        {data.filter(item => item.alias === 'free').map((item => <img src={item.link} width={200} height={200}/>))}
      </main>
    )
  }

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        { shouldShowSkeleton || !hasEntries ? (
          placeholderAliases.map((alias) => (
            <CarouselSkeleton key={alias} count={3} />
          ))
        ) : (
          grouped.map(({ alias, rus, items }) => (
            <section key={alias} style={{ minWidth: 260 }}>
              <Typography name='title3' text={rus} />
              <Carousel entries={items} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <button
                    style={{ padding: "6px 10px", cursor: "pointer" }}
                    onClick={() => navigate(`${encodeURIComponent(alias)}`)}
                  >
                    Показать все
                  </button>
                </div>
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  )
}

export default Gallery