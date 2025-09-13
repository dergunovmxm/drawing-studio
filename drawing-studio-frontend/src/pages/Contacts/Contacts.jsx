import Breadcrumbs from "../../components/Breadcrumbs"
import YandexMap from "../../components/YandexMap"
import Typography from '../../components/ui'
import styles from './Contacts.module.scss'

const Contacts = () => {
  return (
    <main className={styles.root}>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Контакты", href: "/contacts" }]} separator="/" />
      <Typography name='title2' text="Контакты" className={styles.title}/>
      <section className={styles.content}>
        <div>Какая-то инфа</div>
        <YandexMap />
      </section>
      
    </main>
  )
}

export default Contacts