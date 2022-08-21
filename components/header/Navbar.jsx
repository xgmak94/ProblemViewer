import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button className="btn navbar-brand" onClick={router.route !== '/' ? () => router.back() : null}>
        {router.route === '/' ? 'Leetcode' : 'Back'}
      </button>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto">
          <button className="btn nav-item active">
            <a className="nav-link" href="/">
              Home
            </a>
          </button>
          <button className="btn nav-item">
            <a className="nav-link" href="#">
              Questions
            </a>
          </button>
          <button className="btn nav-item">
            <a className="nav-link" href="#">
              Add a question
            </a>
          </button>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
