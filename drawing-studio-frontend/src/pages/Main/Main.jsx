import Typography from '../../components/ui'
import { useFetchImage } from "../../hooks/uaeFetchImage"
import { useScrollPulse } from "../../hooks/useScrollPulse";
import styles from './Main.module.scss'

const Main = () => {

  const {data, isLoading, isFetching, isPending, error} = useFetchImage()

  useScrollPulse({ delay: 2000, distance: 100, duration: 600, enabled: true })
  
  return (
    <main className={styles.root}>

      <section className={styles.main}>
        <Typography name='title1' text="Кирилл Пастушенко" />
        <Typography name='caption1' text={`"Время неумолимо бежит вперед, оставляя всё более ясные воспоминания о начале пути."`} />
      </section>

      <section className={styles.content}>
        <Typography name='caption' text="Занятия в нашей мастерской – это живопись, рисунок, композиция под руководством профессионального художника. Это три важнейших компонента, которые уже с самого начала их изучения предоставят вам огромную творческую свободу и инструменты для воплощения любых идей." />
      </section>

      <section className={styles.gallery}>


      </section>

    </main>
  )
}

export default Main