import styles from './Typography.module.scss'

const Typography = ({name, text}) => {
  return(
    <>
      {name == 'title1' && (<h1 className={styles.title1}>{text}</h1>)}
      {name == 'title2' && (<h2 className={styles.title2}>{text}</h2>)}
      {name == 'subtitle1' && (<h3 className={styles.subtitle1}>{text}</h3>)}
      {name == 'caption1' && (<span className={styles.caption1}>{text}</span>)}
      {name == 'caption2' && (<span className={styles.caption2}>{text}</span>)}
    </>
  )
}

export default Typography