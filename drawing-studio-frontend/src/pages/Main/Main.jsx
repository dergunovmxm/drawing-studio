import Typography from '../../components/ui'
import styles from './Main.module.scss'

const Main = () => {

  return (
    <main className={styles.root}>
      <div className={styles.content}>
        <Typography name='title1' text="Кирилл Пастушенко" />
        <Typography name='caption1' text={`"Время неумолимо бежит вперед, оставляя всё более ясные воспоминания о начале пути."`} />
      </div>
    </main>
  )
}

export default Main