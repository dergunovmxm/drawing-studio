import React, { useEffect, useCallback } from 'react';
import Portal from '../ui/Portal';
import styles from './ImageDetail.module.scss';
import Magnifier from "react-glass-magnifier";
import Typography from '../ui';
import { useState } from 'react';
import { useRef } from 'react';

const ImageDetail = ({ open, onClose, images = [], index = 0, onChangeIndex }) => {
  const validIndex = Math.max(0, Math.min(index, images.length - 1));
  const image = images[validIndex];
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const contentRef = useRef(null);

  // Минимальное расстояние свайпа
  const minSwipeDistance = 50;
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;

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

  // Обработчики свайпа
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }
  };

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

    // Показываем подсказку только на мобильных устройствах
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;
    if (isMobile && images.length > 1) {
      // Проверяем, не показывали ли уже подсказку
      const hasSeenHint = localStorage.getItem('imageDetailSwipeHintSeen') === 'true';
      if (!hasSeenHint) {
        setShowSwipeHint(true);
        // Сохраняем, что подсказка была показана
        localStorage.setItem('imageDetailSwipeHintSeen', 'true');
        // Автоматически скрываем подсказку через 3 секунды
        const timer = setTimeout(() => {
          setShowSwipeHint(false);
        }, 3000);
        
        return () => {
          document.removeEventListener('keydown', onKey);
          document.body.style.overflow = prevOverflow;
          clearTimeout(timer);
        };
      }
    }
    
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, onNext, onPrev, images.length]);

  // Очищаем localStorage при закрытии компонента
  useEffect(() => {
    if (!open) {
      // Удаляем флаг просмотра подсказки при закрытии
      localStorage.removeItem('imageDetailSwipeHintSeen');
    }
  }, [open]);

  if (!open || !image) return null;


  return (
    <Portal>
      <div className={styles.backdrop} onMouseDown={onClose} role="dialog" aria-modal="true">
        <button className={styles.close} aria-label="Close" onClick={onClose}>×</button>
        <div className={styles.content} onMouseDown={(e) => e.stopPropagation()}  ref={contentRef}
          // Добавляем обработчики свайпа только для мобильных устройств
          {...(isMobile && {
            onTouchStart,
            onTouchMove,
            onTouchEnd
          })}>     
          
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

              <img className={styles.mobileImage} src={image.link} alt='image' 
              // Добавляем обработчики свайпа для мобильного изображения
              {...(isMobile && {
                onTouchStart,
                onTouchMove,
                onTouchEnd
              })}/>
          </div>

            {/* Подсказка о свайпе */}
            {isMobile && images.length > 1 && showSwipeHint && (
            <div className={styles.swipeHint}>
              <div className={styles.swipeArrows}>
                <span className={styles.arrowLeft}>‹‹‹</span>
                <span className={styles.arrowRight}>›››</span>
              </div>
              <Typography 
                name='caption3' 
                text="Свайп для переключения картинок" 
              />
            </div>
          )}

          
          {
            !isMobile ? (
              <>
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
              </>
            ) : null
          }
          

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
