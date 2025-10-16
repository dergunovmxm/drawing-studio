import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import styles from "./Carousel.module.scss"

const CarouselSkeleton = ({ key, count }) => (
  <Swiper
    modules={[Autoplay]}
    spaceBetween={20}
    slidesPerView={3}
    slidesPerGroup={3}
    simulateTouch={true}
    navigation={false}
    breakpoints={{
      320: { slidesPerView: 1, slidesPerGroup: 1 },
      640: { slidesPerView: 2, slidesPerGroup: 2 },
      1024: { slidesPerView: 2, slidesPerGroup: 2 },
      1366: { slidesPerView: 3, slidesPerGroup: 3 },
      Infinity: { slidesPerView: 4, slidesPerGroup: 4 },
    }}
  >
    {Array.from({ length: count }).map(() => (
      <SwiperSlide key={key}>
        <div className={styles.entry}>
          <div className={styles.media}>
            <div className={styles.skeletonImage} />
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
)

export default CarouselSkeleton
