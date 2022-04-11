import logo from 'assets/sneakerhood-logos_white.png'
import { HomeMain } from 'components/Home'

const Home = () => {

    return (
        <div
            style={{
                minHeight: '100vh',
            }}
            className='flx flx-center bg-off-secondary'
        >
            <img srcSet={logo} style={{
                width: '50vw'
            }} />

            <HomeMain />

        </div>
    )
}

export default Home