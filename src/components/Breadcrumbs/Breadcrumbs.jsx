import React from "react";
import styles from './Breadcrumbs.module.scss'
import Typography from "../ui";

export const Breadcrumbs = ({
  items,
  maxItems = 5,
  separator = "›",
  crumbClassName = "",
  activeClassName = "",
  renderItem,
}) => {
  if (!items || items.length === 0) return null;

  const len = items.length;
  const needCollapse = len > maxItems;
  const visible = [];

  if (!needCollapse) {
    items.forEach(i => visible.push(i));
  } else {
    const headCount = Math.ceil((maxItems - 1) / 2);
    const tailCount = Math.floor((maxItems - 1) / 2);

    for (let i = 0; i < headCount; i++) visible.push(items[i]);
    visible.push({ ellipsis: true });
    for (let i = len - tailCount; i < len; i++) visible.push(items[i]);
  }

  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbs}>
      <ol className={styles.list}>
        {visible.map((it, idx) => {
          if (it && it.ellipsis) {
            return (
              <li key={`ell-${idx}`} className={crumbClassName} aria-hidden>
                <span style={{ padding: "0 4px", color: "#666" }}>…</span>
                {idx !== visible.length - 1 && <span aria-hidden style={{ margin: "0 4px" }}>{separator}</span>}
              </li>
            );
          }

          const item = it;
          const isLast = items.indexOf(item) === items.length - 1;
          const key = item.id ?? item.href ?? `${idx}-${String(item.label)}`;

          const defaultRender = (
            <>
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  className={crumbClassName}
                  style={{ textDecoration: "none" }}
                >
                  <Typography name='caption4' text={item.label}/>
                </a>
              ) : (
                <Typography 
                  className={isLast ? `${crumbClassName} ${activeClassName}` : crumbClassName} 
                  name={isLast ? 'caption4' : 'caption5'} 
                  text={item.label}
                />
              )}
            </>
          );

          return (
            <li key={key}  style={{ display: "flex", alignItems: "center" }}>
              {renderItem ? renderItem(item, isLast, idx) : defaultRender}
              {idx !== visible.length - 1 && <Typography name='caption4' className={styles.separator} text={separator} />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
