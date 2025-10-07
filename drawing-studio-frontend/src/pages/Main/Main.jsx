import React from 'react';
import Typography from '../../components/ui';
import Button from '../../components/ui/Button';
import { pickRandomPerAlias } from '../../helper/getRandomImages';
import { useFetchImage } from "../../hooks/uaeFetchImage";
import styles from './Main.module.scss';
import Carousel from '../../components/Carousel';

const Main = () => {

  const { data } = useFetchImage();
  const imageHeaders = pickRandomPerAlias(data)

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
          entries={imageHeaders} 
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
