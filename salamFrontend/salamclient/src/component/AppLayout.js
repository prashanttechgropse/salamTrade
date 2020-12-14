import React from 'react';
import Header from '../include/header';
import Footer from '../include/footer';

const AppLayout = (props) => {
    return (
        <>
            <Header />
            {props.children}
            <Footer/>
        </>
    )
}

export default AppLayout;