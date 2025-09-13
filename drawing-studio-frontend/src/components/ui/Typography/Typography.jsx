import cs from 'clsx'
import styles from './Typography.module.scss'

const Typography = ({name, text, className}) => {
  return(
    <>
      {name == 'title1' && (<h1 className={cs(styles.title1, className)}>{text}</h1>)}
      {name == 'title2' && (<h2 className={cs(styles.title2, className)}>{text}</h2>)}
      {name == 'title3' && (<h2 className={cs(styles.title3, className)}>{text}</h2>)}
      {name == 'subtitle1' && (<h3 className={cs(styles.subtitle1, className)}>{text}</h3>)}
      {name == 'caption1' && (<span className={cs(styles.caption1, className)}>{text}</span>)}
      {name == 'caption2' && (<span className={cs(styles.caption2, className)}>{text}</span>)}
    </>
  )
}

export default Typography