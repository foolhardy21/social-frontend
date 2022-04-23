import { HomeMain } from 'components/Home'
import styles from 'components/Home/home.module.css'
import logo from 'assets/sneakerhood-logos_white.png'

const Home = () => {

    return (
        <div
            style={{
                height: '100vh',
            }}
            className='flx flx-center bg-off-secondary'
        >
            <img srcSet={logo} className={styles.heroImg}
            />
            <HomeMain />
        </div>
    )
}

export default Home