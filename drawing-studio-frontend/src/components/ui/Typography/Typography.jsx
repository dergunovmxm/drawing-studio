import cs from 'clsx'
import styles from './Typography.module.scss'

const Typography = ({name, text, className}) => {
  return(
    <>
      {name == 'title1' && (<h1 className={cs(styles.title1, className)}>{text}</h1>)}
      {name == 'title2' && (<h2 className={cs(styles.title2, className)}>{text}</h2>)}
      {name == 'title2_secondary' && (<h2 className={cs(styles.title2_secondary, className)}>{text}</h2>)}
      {name == 'title3' && (<h2 className={cs(styles.title3, className)}>{text}</h2>)}
      {name == 'title3_secondary' && (<h2 className={cs(styles.title3_secondary, className)}>{text}</h2>)}
      {name == 'subtitle1' && (<h3 className={cs(styles.subtitle1, className)}>{text}</h3>)}
      {name == 'subtitle_footer' && (<h3 className={cs(styles.subtitle_footer, className)}>{text}</h3>)}
      {name == 'caption1' && (<span className={cs(styles.caption1, className)}>{text}</span>)}
      {name == 'caption2' && (<span className={cs(styles.caption2, className)}>{text}</span>)}
      {name == 'caption3' && (<span className={cs(styles.caption3, className)}>{text}</span>)}
      {name == 'caption3_secondary' && (<span className={cs(styles.caption3_secondary, className)}>{text}</span>)}
      {name == 'caption3_secondary_italic' && (<span className={cs(styles.caption3_secondary_italic, className)}>{text}</span>)}
      {name == 'caption3_secondary_bold' && (<span className={cs(styles.caption3_secondary_bold, className)}>{text}</span>)}
      {name == 'caption4' && (<span className={cs(styles.caption4, className)}>{text}</span>)}
      {name == 'caption5' && (<span className={cs(styles.caption5, className)}>{text}</span>)}
      {name == 'caption_footer' && (<span className={cs(styles.caption_footer, className)}>{text}</span>)}
      {name == 'withHoverBlack' && (<span className={cs(styles.withHoverBlack, className)}>{text}</span>)}
      {name == 'link' && (<span className={cs(styles.link, className)}>{text}</span>)}
      {name == 'link_secondary' && (<span className={cs(styles.link_secondary, className)}>{text}</span>)}
    </>
  )
}

export default Typography