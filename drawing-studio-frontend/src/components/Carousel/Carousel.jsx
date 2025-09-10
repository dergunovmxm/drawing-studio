import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styles from './Carousel.module.scss'

const Carousel = ({entries}) => (
  <Swiper
    modules={[Autoplay]}
    spaceBetween={20}
    slidesPerView={3}
    slidesPerGroup={3}
    speed={1500}
    autoplay={{
      delay:3000,
      pauseOnMouseEnter: true
    }}
    breakpoints={{
      320: { slidesPerView: 1, slidesPerGroup: 1 },
      640: { slidesPerView: 2, slidesPerGroup: 2 },
      1024: { slidesPerView: 3, slidesPerGroup: 3 },
      1366: { slidesPerView: 4, slidesPerGroup: 4 },
    }}
  >
    {entries.map((item) => (
     <SwiperSlide key={item.id}>
     <div className={styles.entry}>
       <div className={styles.media}>
         <img
           src={item.link}
           alt={item.name || ""}
           loading="lazy"
           className={styles.image}
         />
       </div>

       {item.name && <div style={{ marginTop: 8 }}>{item.name}</div>}
     </div>
   </SwiperSlide>
    ))}
  </Swiper>
)

export default Carousel