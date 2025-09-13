import Typography from '../../components/ui'
import Button from '../../components/ui/Button';
import { getRandomItems } from '../../helper/getRandomImages';
import { useFetchImage } from "../../hooks/uaeFetchImage"
import useResponsiveGallery from '../../hooks/useResponsiveGrid';
import { useScrollPulse } from "../../hooks/useScrollPulse";
import styles from './Main.module.scss'

const Main = () => {

  const {data, isLoading, isFetching, isPending, error} = useFetchImage()

  useScrollPulse({ delay: 2000, distance: 100, duration: 600, enabled: true })
  const images = Array.isArray(data) ? data : (data && Array.isArray(data.items) ? data.items : []);
  const { cols, filled } = useResponsiveGallery(getRandomItems(images, 12), 12);

  return (
    <main className={styles.root}>

      <section className={styles.main}>
        <Typography name='title1' text="Кирилл Пастушенко" />
        <Typography name='caption1' text={`"Время неумолимо бежит вперед, оставляя всё более ясные воспоминания о начале пути."`} />
        <Button variant='ghost' className={styles.button}>
          <Typography name='caption2' text='О художнике'/>
        </Button>
      </section>

      <section className={styles.content}>
        <Typography name='caption' text="Занятия в нашей мастерской – это живопись, рисунок, композиция под руководством профессионального художника. Это три важнейших компонента, которые уже с самого начала их изучения предоставят вам огромную творческую свободу и инструменты для воплощения любых идей." />
      </section>

      <section
        className={styles.gallery}
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        aria-label="gallery"
      >
        {filled.map((item, i) => (
          item
            ? <div key={i} className={styles.cell}><img src={item.link} alt={item.alt ?? `img-${i}`} /></div>
            : <div key={`ph-${i}`} className={styles.cell} aria-hidden="true"><div className={styles.placeholder} /></div>
        ))}
      </section>

    </main>
  )
}

export default Main