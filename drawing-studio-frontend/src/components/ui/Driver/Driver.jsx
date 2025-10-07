import React, { useState } from 'react'
import styles from './Driver.module.scss'
import { useNavigate } from 'react-router'
import { navs } from '../../../layouts/Header/navigation';
import Typography from '../Typography';
import {data} from './data.jsx'

const RightSlideMenu = ({ isOpen, onClose, children }) => {
  return (
    <>
      <div
        className={styles.menu_root}
        onClick={onClose}
        onTouchMove={e => e.stopPropagation()}
      />

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-100%',
          width: '100%',
          height: '100vh',
          backgroundColor: '#fff',
          transition: 'right 0.3s ease-in-out',
          zIndex: 100,
          overflowY: 'auto',
          padding: '20px',
        }}
      >
        <div onClick={onClose} style={{ marginBottom: 20 }}>
          {data.close}
        </div>
        {children}
      </div>
    </>
  )
}

const Driver = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className={styles.root}>
      <div onClick={() => setMenuOpen(true)}>
        {data.burger}
      </div>
      <RightSlideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
        <nav className={styles.navs}>
         {
          navs.map((item) => (
            <div
            onClick={() => {
              navigate(item.path)
              setMenuOpen(false)
            }}
            className={styles.navLink}
          >
            <Typography text={item.name} name='caption3_secondary' />
          </div>
          ))
         }
        </nav>
      </RightSlideMenu>
    </div>
  )
}

export default Driver
