import * as React from 'react';
import Helmet from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';

import 'normalize.css';

import ContentWrapper from '../components/ContentWrapper';
import Logo from '../components/Logo';

const calloutBackground = require('../static/background.svg') as string;

class Index extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <GlobalStyle />
        <Helmet>
          <script async type="text/javascript">
            {`!function () {
              if (window.JOINUP_WIDGET_ID) {
                console.warn("JoinUp snippet included twice");
              } else {
                window.JOINUP_WIDGET_ID = "2795b2ff-12be-4136-8850-84ee0c1e7552";
                var n, o;
                o = document.createElement("script");
                o.src = "https://js.joinup.io/init.js", o.defer = !0, o.type = "text/javascript", o.async = !0, o.crossorigin = "anonymous";
                n = document.getElementsByTagName("script")[0], n.parentNode.insertBefore(o, n);
              }
            }()`}
          </script>
        </Helmet>
        <Callout>
          <ContentWrapper>
            <Logo />
            <Introduction>IT expertise out of the jungle.</Introduction>
          </ContentWrapper>
        </Callout>
      </div>
    );
  }
}

export default Index;

const GlobalStyle = createGlobalStyle`
	body {
		font-family: Menlo, "Courier New", monospace;
		font-size: 16px;
		line-height: 1.2;
		box-sizing: border-box;
		color:#bdc7d6;
		background:linear-gradient(120deg, #142d3d, #1b3549);
		background-attachment: fixed;
	}
	h1, 
	h2,
	h3 {
		text-rendering: optimizeLegibility;
		font-family: "Bebas", Monaco, monospace;
	}
`;

const Callout = styled.div`
	background-color: rgba(0,0,0,.3);
	background-image: 
		radial-gradient(circle, rgba(20,45,61,1), transparent),
		
		url('${calloutBackground}');
	background-size: 100%, 30%;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 100px;

	color: #ffffff;

  @media (min-width: 768px) {
    padding-top: 240px;
    padding-bottom: 240px;
  }
`;

const Introduction = styled.p`
  margin: 20px auto 50px;
  max-width: 500px;
`;
