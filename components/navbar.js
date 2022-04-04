/*  ./components/Navbar.jsx     */
import Link from 'next/link';
import Image from 'next/image'
import styles from '../styles/Navbar.module.scss'
import { useRouter } from "next/router";


export const Navbar = () => {
  const router = useRouter();

  return (
    <>
      
      <nav className={styles.container}>
        <Link href='/'>
          <a className={styles.logo}>
            <Image
              src="/../public/ramleela-logo.png"
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
              <a className={router.pathname == "/" ? styles.active : ""}>
                Bill
              </a>
            </Link>
            <Link href='/Detail'>
              <a className={router.pathname == "/Detail" ? styles.active  : ""}>
                Details
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};