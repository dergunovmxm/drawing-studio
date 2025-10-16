import React from 'react';
import Typography from '../../components/ui';
import styles from './Main.module.scss';
import Carousel from '../../components/Carousel';
import { headers } from './description'

const Main = () => {

  return (
    <main className={styles.root}>
      <section className={styles.main}>
        <Typography name="title1" text="Кирилл Пастушенко" />
        <Typography name="caption1" text="Время неумолимо бежит вперед, оставляя всё более ясные воспоминания о начале пути." />
      </section>

      <section className={styles.content}>
        <Typography name='caption3_secondary_italic' text="Проекты" />
      </section>

      <section>
        <Carousel 
          entries={headers} 
          spaceBetween={0} 
          entryClassName={styles.imageHeaders} 
          mediaClassName={styles.imageHeadersMedia}
          imageClassName={styles.imageHeadersImage}
          onClickType={'navigator'}
          title
        />
      </section>
    </main>
  );
};

export default Main;
