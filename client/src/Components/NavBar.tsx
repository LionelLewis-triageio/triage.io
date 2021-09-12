import React from 'react';
import '../Pages/Styles/navbar.css'

export default function NavBar() {
  return (
    <body>
      <nav>
        <a>
          <Link to='home'>
            Home
          </Link>
        </a>
        <a>About</a>
        <a>Blog</a>
        <a>Portfolio</a>
        <a>Contact</a>
        <div className="animation start-home"></div>
      </nav>
    </body>
  );
}
