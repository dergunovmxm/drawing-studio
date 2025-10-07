import React, {  useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styles from './Dropdown.module.scss'
import Typography from '../Typography'


const Dropdown = ({ items, onClose, anchorRef, onMouseEnter, onMouseLeave, delay = 100 }) => {
  const navigate = useNavigate()
  const ref = useRef(null)
  const timerRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [visible, setVisible] = useState(false)
  const [windowWidth, _] = useState(window.innerWidth)

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      })
      timerRef.current = setTimeout(() => setVisible(true), delay)
    }

    return () => {
      clearTimeout(timerRef.current)
      setVisible(false)
    }
  }, [anchorRef, delay])

  if (windowWidth <= 1024) return null

  if (!position || !visible) return null

  const onItemClick = (link) => {
    navigate(link)
    onClose()
  }

  return (
    <ul
      className={styles.dropdown}
      ref={ref}
      style={{ position: 'absolute', top: position.top, left: position.left - 100 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {items.map(({ name, link }) => (
        <li
          key={link}
          onClick={() => onItemClick(link)}
          className={styles.dropdownItem}
          style={{ cursor: 'pointer' }}
        >
          <Typography text={name} name='caption3_secondary' />
        </li>
      ))}
    </ul>
  )
}



export default Dropdown