import { useNavigate } from 'react-router';
import styles from './Header.module.scss';
import { navs } from './navigation';
import Typography from '../../components/ui';
import cs from 'clsx'
import { useScrollVisibility } from '../../hooks/useScrollVisibility';
import { createRef, useRef, useState } from 'react';
import Dropdown from '../../components/ui/Dropdown';
import Driver from '../../components/ui/Driver';

const Header = () => {
  const navigate = useNavigate()
  const refs = useRef({})
  const visible = useScrollVisibility(70)
  const isRoot = location.pathname === '/'

  const [openDropdown, setOpenDropdown] = useState(null)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeTimeout = useRef(null)

  const handleMouseEnter = (path) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
    }
    setOpenDropdown(path)
  }

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 100)
  }
  
  if (!visible) return null

  return (

    <header className={cs(styles.root, { [styles.root_with_bg]: !isRoot })}>
      <ul className={styles.navs}>
        {navs.map(item => {
          const hasDropdown = Array.isArray(item.dropdown) && item.dropdown.length > 0
          const isOpen = openDropdown === item.path

          if (!refs.current[item.path]) {
            refs.current[item.path] = createRef()
          }

          return (
            <li
              key={item.path}
              className={styles.navItem}
              onMouseEnter={() => hasDropdown && handleMouseEnter(item.path)}
              onMouseLeave={() => hasDropdown && handleMouseLeave()}
            >
              <div
                ref={refs.current[item.path]}
                onClick={() => {
                  navigate(item.path)
                }}
                className={styles.navLink}
              >
                <Typography text={item.name} name={isRoot ? 'caption2' : 'caption4'} />
              </div>

              {hasDropdown && isOpen && (
                <Dropdown
                  items={item.dropdown}
                  onClose={() => setOpenDropdown(null)}
                  anchorRef={refs.current[item.path]}
                  onMouseEnter={() => {
                    if (closeTimeout.current) clearTimeout(closeTimeout.current)
                    setOpenDropdown(item.path)
                  }}
                  onMouseLeave={handleMouseLeave}
                />
              )}
            </li>
          )
        })}
      </ul>
      
      <Driver />
    </header>

   
  )
}

export default Header