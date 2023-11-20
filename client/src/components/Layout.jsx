// Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }){
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1, position: 'relative' }}>
        {children}
      </div>
      <Footer style={{ position: 'sticky', bottom: 0 }} />
    </div>
  );
};