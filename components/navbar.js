/*  ./components/Navbar.jsx     */
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Navbar.module.scss'


export const Navbar = () => {
  return (
    <>
      
      <nav className={styles.container}>
        <Link href='/'>
          <a className={styles.logo}>
            <Image
              src="../public/ramleela-logo.png"
              alt="Ramleela"
              width={100}
              height={40}
            >
            </Image>
          </a>
        </Link>

        <div className={styles.nav}>
          <div className=''>
            <Link href='/'>
              <a className=''>
                Bill
              </a>
            </Link>
            <Link href='/detail'>
              <a className=''>
                Details
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};