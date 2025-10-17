import Breadcrumbs from '../../components/Breadcrumbs'
import Typography from '../../components/ui'
import styles from './About.module.scss'
import { data } from './data'

const About = () => {
  const { main, addon, kredo, exhibitions } = data
  return (
    <main className={styles.root}>
      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "О художнике", href: "/about" }]} separator="|" />
      <Typography name='title2_secondary' text="О художнике" className={styles.title}/>

      <section className={styles.aboutMain}>
        <div className={styles.imageWripper}>
          <img src='photo1.jpg' alt='main' />
        </div>
        <article>
          {main.map((item) => (
            <p><Typography name='caption3_secondary' text={item} /></p>
          ))}
        </article>
      </section>

      <Typography name='title2_secondary' text='Творческое кредо' />
      <section className={styles.aboutAddon}>
          {kredo.map((item) => (
            <p><Typography name='caption3_secondary' text={item} /></p>
          ))}
      </section>

      <Typography name='title2_secondary' text='Творческий путь' />
      <section className={styles.aboutAddon}>
          {addon.map((item) => (
            <p><Typography name='caption3_secondary' text={item} /></p>
          ))}
      </section>

      <Typography name='title2_secondary' text='Выставки' />
      <section>
        {exhibitions.map((item) => (
          <p className={styles.exhibitionItem}>
            <Typography name='caption3_secondary_bold' text={item.date} />
            <Typography name='caption3_secondary' text={item.description} />
          </p>
        ))}
      </section>

    </main>
  )
}

export default About