import styles from './pageheading.module.css'

const PageHeading = ({ heading }) => {

    return (

        <p className={`txt-lg txt-600 txt-secondary txt-ucase pd-btm-xs ${styles.pgHeading}`}>
            {heading}
        </p>
    )
}

export default PageHeading