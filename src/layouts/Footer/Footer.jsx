import { useNavigate } from 'react-router'
import { data }  from './data'
import styles from './Footer.module.scss'
import Typography from '../../components/ui/Typography'

const Footer = () => {
  const navigate = useNavigate()
  const { links, contacts, button, social } = data
  return (
    <footer className={styles.root}>
      
      <section className={styles.footerMain}>

        <div className={styles.links}>
          {links.map((item) => (
            <div onClick={() => {navigate(`${item.link}`); window.scrollTo(0, 0)}}>
              <Typography text={item.name} name='caption_footer' />
            </div>
          ))}
        </div>

        <div className={styles.info}>

          {contacts.map((item, index) => (
            <div key={index} className={styles.contactItem}>
              {/* {item.svg} */}
              <div className={styles.textWrapper}>
                <Typography name='subtitle_footer' text={item.title} />
                <Typography name='caption_footer' text={item.info} />
              </div>
            </div>
          ))}

          <div className={styles.footerSocial}>
            <Typography name='caption_footer' text={social.title} />
            <div className={styles.socialIcons}>
              {social.links.map((item) => (
                <a href={item.link} target='_blank'>{item.svg}</a>
              ))}
            </div>
          </div>

        </div>

      </section>

      <div className={styles.divider}/>


      <section className={styles.footerAdd}>
        <div className={styles.toUpButton} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Typography name='caption_footer' text={button.title} />
          {button.svg}
        </div>
      </section>
    </footer>
  )
}

export default Footer