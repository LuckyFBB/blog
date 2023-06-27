import { Helmet, Link } from 'dumi';
import React from 'react';
import Features from '../Features';
import Hero from '../Hero';

export default function Homepage() {
  return (
    <>
      <Helmet>
        <title>Welcome to FBB's blog，have something you need</title>
        <meta name="author" content="FBB" />
      </Helmet>
      <Hero />
      <Features />
    </>
  );
}
