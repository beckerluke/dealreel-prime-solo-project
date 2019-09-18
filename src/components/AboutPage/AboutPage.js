import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <p>
        DealReel is a promotional platform where businesses can create and set real-time deals in a quick and efficient manner.
        DealReel will give a business the flexibility to broadcast these real-time deals to all of their potential patrons near their area.
      </p>
      <p>
        DealReel gives patrons an easy, one-stop-shop to surf all of the current deals going on in their area.
      </p>
    </div>
  </div>
);

export default AboutPage;
