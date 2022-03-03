import React from 'react'
import { withRouter, } from 'react-router'
import { Link } from 'react-router-dom'

const Footer = (props) => {
    return (
        <footer className={props.darkMode ? 'made-with-love dark-mode-component' : 'made-with-love'}>
            <p>
                Made with 💓 by <Link className="link" to='http://www.franp.xyz'>Francisco Pessano</Link>{/*<a href="http://www.franp.xyz">Francisco Pessano</a>*/}.
            </p>

            <Link className="link" to='/credits-page'>Credits</Link>
        </footer>
    )
}

export default withRouter(Footer)