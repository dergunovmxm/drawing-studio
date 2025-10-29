import React, { useEffect, useCallback, useState, useRef } from 'react';
import Portal from '../ui/Portal';
import styles from './ImageDetail.module.scss';
import Magnifier from "react-glass-magnifier";
import Typography from '../ui';

const ImageDetail = ({ open, onClose, images = [], index = 0, onChangeIndex }) => {
  const validIndex = Math.max(0, Math.min(index, images.length - 1));
  const image = images[validIndex];
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const lastTouchDistance = useRef(0);

  // Минимальное расстояние свайпа
  const minSwipeDistance = 50;

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

  // Сброс зума при смене картинки
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setIsZoomed(false);
  }, [validIndex]);

  // Обработчики свайпа для навигации
  const onTouchStart = (e) => {
    if (isZoomed) return; // Если увеличено, не обрабатываем навигацию
    
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (isZoomed) return; // Если увеличено, не обрабатываем навигацию
    
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (isZoomed || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrev();
    }
  };

  // Обработчики для масштабирования
  const handleTouchStartZoom = (e) => {
    if (e.touches.length === 2) {
      // Начало жеста масштабирования
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      lastTouchDistance.current = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
    }
  };

  const handleTouchMoveZoom = (e) => {
    if (e.touches.length === 2) {
      // Жест масштабирования
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const currentDistance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );

      if (lastTouchDistance.current > 0) {
        const newScale = Math.max(1, Math.min(3, scale * (currentDistance / lastTouchDistance.current)));
        setScale(newScale);
        setIsZoomed(newScale > 1);
      }

      lastTouchDistance.current = currentDistance;
    } else if (isZoomed && e.touches.length === 1) {
      // Перемещение увеличенного изображения
      e.preventDefault();
      const touch = e.touches[0];
      setPosition(prev => ({
        x: touch.clientX - (touch.target.offsetWidth * scale) / 2,
        y: touch.clientY - (touch.target.offsetHeight * scale) / 2
      }));
    }
  };

  const handleTouchEndZoom = () => {
    lastTouchDistance.current = 0;
  };

  // Двойное нажатие для зума
  const handleDoubleTap = (e) => {
    if (scale === 1) {
      setScale(2);
      setIsZoomed(true);
    } else {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsZoomed(false);
    }
  };

  // Сброс зума при клике на backdrop
  const handleBackdropClick = (e) => {
    if (isZoomed) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsZoomed(false);
    } else {
      onClose?.();
    }
  };

  useEffect(() => {
    if (!open) return;
    
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setScale(1);
          setPosition({ x: 0, y: 0 });
          setIsZoomed(false);
        } else {
          onClose?.();
        }
      }
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
  }, [open, onClose, onNext, onPrev, images.length, isZoomed]);

  // Очищаем localStorage при закрытии компонента
  useEffect(() => {
    if (!open) {
      // Удаляем флаг просмотра подсказки при закрытии
      localStorage.removeItem('imageDetailSwipeHintSeen');
    }
  }, [open]);

  if (!open || !image) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;

  return (
    <Portal>
      <div 
        className={styles.backdrop} 
        onMouseDown={handleBackdropClick} 
        role="dialog" 
        aria-modal="true"
      >
        <button className={styles.close} aria-label="Close" onClick={onClose}>×</button>

        <div 
          className={styles.content} 
          onMouseDown={(e) => e.stopPropagation()}
          ref={contentRef}
        >     
          <div className={styles.imageWrapper}>
            {/* Для десктопа используем Magnifier */}
            {!isMobile && (
              <Magnifier 
                key={image.link}
                imageUrl={image.link}
                largeImageUrl={image.link}
                zoomFactor={2}
                glassDimension={250}
                glassBorderColor="#000000cc"
                glassBorderWidth={2}
              />
            )}
            
            {/* Для мобильных - кастомное увеличение */}
            {isMobile && (
              <img 
                ref={imageRef}
                className={`${styles.mobileImage} ${isZoomed ? styles.zoomed : ''}`}
                src={image.link} 
                alt='image'
                style={{
                  transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                  transformOrigin: 'center center',
                  transition: isZoomed ? 'none' : 'transform 0.3s ease'
                }}
                // Обработчики для навигации (только когда не увеличено)
                {...(!isZoomed && {
                  onTouchStart,
                  onTouchMove,
                  onTouchEnd
                })}
                // Обработчики для масштабирования
                onTouchStart={handleTouchStartZoom}
                onTouchMove={handleTouchMoveZoom}
                onTouchEnd={handleTouchEndZoom}
                onDoubleClick={handleDoubleTap}
              />
            )}
          </div>

          {/* Подсказка о свайпе */}
          {isMobile && images.length > 1 && showSwipeHint && !isZoomed && (
            <div className={styles.swipeHint}>
              <div className={styles.swipeArrows}>
                <span className={styles.arrowRight}>›››</span>
              </div>
              <Typography 
                name='caption3' 
                text="Свайп для просмотра картинок" 
              />
              <Typography 
                name='caption6' 
                text="Двойное нажатие для увеличения" 
                className={styles.zoomHint}
              />
            </div>
          )}

          {/* Подсказка при зуме */}
          {isMobile && isZoomed && (
            <div className={styles.zoomHintActive}>
              <Typography 
                name='caption6' 
                text="Коснитесь экрана чтобы выйти из режима увеличения" 
              />
            </div>
          )}

          {/* Показываем кнопки навигации только на десктопе */}
          {!isMobile && (
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
          )}

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