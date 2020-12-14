import React from 'react'
import Header from '../include/header'
import Footer from '../include/footer'
export default function DefaultLayout(props) {
    return (
        <div className="page" >
            <div className="page-main" >
                <Header />
                {props.children}
            </div>
            <Footer />
        </div>
    )
}
