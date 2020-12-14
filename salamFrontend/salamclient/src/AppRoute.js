import React from 'react';
import { Route } from 'react-router-dom';
import Footer from './include/footer'
import Header from './include/header.js';

export default function AppRoute({ path, component }) {
    return (
        <>
            <Header />
            <Route path={path} component={component} />
            <Footer />
        </>

    )
}