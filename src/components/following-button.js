import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

function FollowButton({className, username, dataId, caption }) {
  useEffect(() => {
    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.twttr.widgets.load();
    }
  }, []);

  return (
    <Container className={className || ''}>
      <a
        href={`https://twitter.com/intent/follow?screen_name=${username}`}
        className={`twitter-follow-button`}
        data-size="large"
        data-show-screen-name="true"
        data-id={dataId}
      >
        {caption || 'Follow'}
      </a>
    </Container>
  );
}

FollowButton.propTypes = {
  username: PropTypes.string.isRequired,
  dataId: PropTypes.string.isRequired,
};

export default FollowButton;

const Container = styled.div`
  a, #twitter-follow-button {
    display: flex;
    align-items: center;
    display: none;
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.28;
    padding: 2px 32px;
    text-decoration: none;
    background: black;
    color: white !important;
    border-radius: 100px;
    height: 51px;

  }
`