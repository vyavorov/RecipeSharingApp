// Layout.js
import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

export default function Layout({ children }){
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
      <Header />
      <div style={{ flex: 1, position: 'relative', padding: "15px 30px"}}>
        {children}
      </div>
      <Footer style={{ position: 'sticky', bottom: 0 }} />
    </div>
  );
};