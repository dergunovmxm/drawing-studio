import React, { useEffect, useCallback } from 'react';
import Portal from '../ui/Portal';
import styles from './ImageDetail.module.scss';
import Magnifier from "react-glass-magnifier";
import Typography from '../ui';

const ImageDetail = ({ open, onClose, images = [], index = 0, onChangeIndex }) => {
  const validIndex = Math.max(0, Math.min(index, images.length - 1));
  const image = images[validIndex];

  const goTo = useCallback((newIndex) => {
    if (!onChangeIndex) return;
    const wrapped = ((newIndex % images.length) + images.length) % images.length;
    onChangeIndex(wrapped);
  }, [images.length, onChangeIndex]);

  const onNext = useCallback(() => {
    if (images.length === 0) return;
    goTo(validIndex + 1);
  }, [images.length, validIndex, goTo]);

  const onPrev = useCallback(() => {
    if (images.length === 0) return;
    goTo(validIndex - 1);
  }, [images.length, validIndex, goTo]);

 
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') return onClose?.();
      if (e.key === 'ArrowRight') return onNext();
      if (e.key === 'ArrowLeft') return onPrev();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, onNext, onPrev]);

  if (!open || !image) return null;

  return (
    <Portal>
      <div className={styles.backdrop} onMouseDown={onClose} role="dialog" aria-modal="true">
         
        <div className={styles.content} onMouseDown={(e) => e.stopPropagation()}>     
          
          <div className={styles.imageWrapper}>
              <Magnifier 
                key={image.link}
                imageUrl={image.link}
                largeImageUrl={image.link}
                zoomFactor={2}
                glassDimension={250}
                glassBorderColor="#000000cc"
                glassBorderWidth={2}
              />
          </div>

          <button className={styles.close} aria-label="Close" onClick={onClose}>×</button>

          <button
            className={styles.prev}
            aria-label="Previous"
            onClick={onPrev}
            type="button"
          >‹</button>

          <button
            className={styles.next}
            aria-label="Next"
            onClick={onNext}
            type="button"
          >›</button>

          {image.title && (
            <div className={styles.caption}>
              {image.title && <Typography className={styles.title} name='caption6' text={image.title} />}
            </div>
          )}

        </div>
      </div>
    </Portal>
  );
};

export default ImageDetail;
