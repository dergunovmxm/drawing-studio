import Breadcrumbs from '../../components/Breadcrumbs'
import Typography from '../../components/ui'
import styles from './About.module.scss'

const About = () => {
  return (
    <main className={styles.root}>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "О художнике", href: "/about" }]} separator="/" />
      <Typography name='title2' text="О художнике" className={styles.title}/>
    </main>
  )
}

export default About