import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from './Carousel.module.scss'
import cs from 'clsx'
import { useNavigate } from "react-router"
import { useGroupImage } from "../../hooks/useGroupImage"
import Typography from "../ui"

const Carousel = ({
  entries, 
  spaceBetween = 20, 
  entryClassName,
  mediaClassName,
  imageClassName, 
  title,
  onClickType,
  breakpoints
  }) => {

  const navigate = useNavigate()
  const { aliasNames } = useGroupImage(entries)

  const handlers = {
    none: undefined,
    open: (item) => () => { /* логика открытия, например window.open(item.link) */ window.open(item.link, '_blank') },
    select: (item) => () => { /* логика выбора */ console.log('selected', item.id) },
    navigator: (item) => () => navigate(`/gallery/${item.alias}`)
  };
  
  const defaultBreakPoints = {
    320: { slidesPerView: 1, slidesPerGroup: 1 },
    640: { slidesPerView: 2, slidesPerGroup: 2 },
    1024: { slidesPerView: 2, slidesPerGroup: 2 },
    1366: { slidesPerView: 3, slidesPerGroup: 3 },
    Infinity: { slidesPerView: 4, slidesPerGroup: 4 },
  }

  return(
    <Swiper
      modules={[Autoplay]}
      spaceBetween={spaceBetween}
      slidesPerView={3}
      slidesPerGroup={3}
      speed={2500}
      autoplay={{
        delay:4000,
        // pauseOnMouseEnter: true
      }}
      breakpoints={breakpoints || defaultBreakPoints}
    >
    {entries.map((item) => {
      const handlerFactory = handlers[onClickType] ?? handlers.none;
      const onClick = handlerFactory ? handlerFactory(item) : undefined;

      return (
        <SwiperSlide key={item.id}>
          <div
            className={cs(styles.entry, entryClassName)}
            onClick={onClick}
          >
            <div className={cs(styles.media, mediaClassName)}>
              <img src={item.link} alt={item.name || ''} loading="lazy" className={cs(styles.image, imageClassName)} />
              {title && <Typography name='title3' className={styles.title} text={aliasNames[item.alias]}/>}
            </div>
          </div>
        </SwiperSlide>
        );
      })
    }

    </Swiper>
  )
}

export default Carousel