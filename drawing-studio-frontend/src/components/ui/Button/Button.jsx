import React from 'react';
import styles from './Button.module.scss';

const Button = ({
  children,
  variant = 'primary',
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  fullWidth = false,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  const cls = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    isDisabled ? styles.disabled : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={cls}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : leftIcon ? (
        <span className={styles.iconLeft}>{leftIcon}</span>
      ) : null}

      <span className={styles.content}>{children}</span>

      {!loading && rightIcon ? (
        <span className={styles.iconRight}>{rightIcon}</span>
      ) : null}
    </button>
  );
};

export default Button;
