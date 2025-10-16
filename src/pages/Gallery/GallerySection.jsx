import { useNavigate, useParams } from "react-router";
import { useFetchImage } from "../../hooks/uaeFetchImage";
import { useGroupImage } from "../../hooks/useGroupImage";
import { useEffect, useMemo, useState } from "react";
import Typography from "../../components/ui";
import Button from "../../components/ui/Button";
import styles from './GallerySection.module.scss'
import { description } from "./description";
import React from "react";
import ImageDetail from "../../components/ImageDetail";
import Breadcrumbs from "../../components/Breadcrumbs";
import Loader from "../../components/ui/Loader";


const GallerySection = () => {
  const { alias } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetchImage();
  const { grouped, aliasNames } = useGroupImage(data ?? []);
  const group = useMemo(() => grouped.find(g => g.alias === alias), [grouped, alias]);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    window.scrollTo(0,0)
    setToggle(true);
    const timer = setTimeout(() => setToggle(false), 500);
    return () => clearTimeout(timer);
  }, [alias]);

  const openAt = (i) => {
    setIndex(i);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  if (isLoading) return <Loader />
  if (error) return <Error error={error}/>
  if (!group) return (
    <div>
      <Typography name='title3' text='Раздел не найден' />
      <Button variant='ghost' onClick={() => navigate('/gallery')}>
        <Typography name='caption2' text='Вернуться' />
      </Button>
    </div>
  );

  return (
    <main className={styles.root}>

      <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Галерея", href: "/gallery" }, { label: `${aliasNames[alias]}`, href: `/gallery/${alias}` }]} separator="|" />
      <Typography name='title2_secondary' text="Галерея" className={styles.title}/>

      <div className={styles.section}>
        <Typography name="caption3_secondary_italic" text={description[alias]}/>
      </div>  

      <div className={styles.header}>
        <Typography name="title2_secondary" text={`"${aliasNames[alias]}"`}/>
      </div>

      <div className={styles.content}>
        {toggle ? (
           [1,2,3,4,5,6].map(i => (
            <div key={i} className={styles.skeletonImage} />
          ))
        ) : (
          group.items
            .map((item, i) => (
              <div key={i} onClick={() => {openAt(i); window.scrollTo(0, 0)}}>
                <img src={item.link} alt={item.name} />
              </div>
            ))
        )}
      </div>

      <ImageDetail
        open={open}
        onClose={handleClose}
        images={group.items.filter(Boolean)}
        index={index}
        onChangeIndex={(i) => setIndex(i)}
      />
      
    </main>
  )
}

export default GallerySection