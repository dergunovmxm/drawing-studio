import styles from './Gallery.module.scss'
import Carousel from "../../components/Carousel"
import Typography from "../../components/ui"
import { useGroupImage } from "../../hooks/useGroupImage"
import CarouselSkeleton from "../../components/Carousel/CarouselSkeleton"
import { useNavigate } from "react-router"
import { useFetchImage } from "../../hooks/uaeFetchImage"
import Breadcrumbs from "../../components/Breadcrumbs"
import Button from "../../components/ui/Button"
import { description } from "./description"


const Gallery = () => {
 
  const navigate = useNavigate()
  const {data, isLoading, isFetching, isPending, error} = useFetchImage()

  const {grouped} = useGroupImage(data ?? [])
  const placeholderAliases = ["section-1", "section-2", "section-3"]
  const shouldShowSkeleton = isLoading || isFetching || isPending || (Array.isArray(data) && data.length === 0)

  if (error) return <div>Ошибка: {error?.message}</div>

  return (
    <main className={styles.root}>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Галерея", href: "/gallery" }]} separator="|" />
      <Typography name='title2_secondary' text="Галерея" className={styles.title}/>
      
      <section className={styles.galleryAddon}>
        <Typography name='caption3_secondary_italic' text={description.addon} />
      </section>

      <section className={styles.container}>

        { shouldShowSkeleton  ? (
          placeholderAliases.map((alias) => (
            <CarouselSkeleton key={alias} count={4} />
          ))
        ) : (
          grouped.map(({ alias, rus, items }) => (
            <section key={alias} style={{ minWidth: 260 }}>
              <Typography name='title3_secondary' text={rus} />
              <Carousel entries={items} />
              <div className={styles.buttonContainer}>
                <Button variant='secondary' className={styles.button} onClick={() => navigate(`/gallery/${alias}`)}>
                  <Typography name='caption4' text='Открыть проект'/>
                </Button>
              </div>
            </section>
          ))
        )}
      </section>
    </main>
  )
}

export default Gallery