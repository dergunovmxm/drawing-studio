import { useNavigate } from 'react-router';
import styles from './Header.module.scss';
import { navs } from './navigation';
import Typography from '../../components/ui';

const Header = () => {
  const navigate = useNavigate()
  return (
    <header className={styles.root}>
      <ul className={styles.navs}>
        {navs.map(item => <li key={item.patn} onClick={() => navigate(item.path)}><Typography text={item.name} name='caption2' /></li>)}
      </ul>
      {/* <div>
        icons
      </div> */}
    </header>
  )
}

export default Header