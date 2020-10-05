/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = (doc) => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = (props) => (
        <div className="homeContainer">
          <div className="homeSplashFade">
            <div className="wrapper homeWrapper">{props.children}</div>
          </div>
        </div>
    );

    const Logo = (props) => (
        <div className="projectLogo">
          <img src={props.img_src} alt="Project Logo"/>
        </div>
    );

    const ProjectTitle = (props) => (
        <h2 className="projectTitle">
          {props.title}
          <small>{props.tagline}</small>
        </h2>
    );

    const PromoSection = (props) => (
        <div className="section promoSection">
          <div className="promoRow">
            <div className="pluginRowBlock">{props.children}</div>
          </div>
        </div>
    );

    const Button = (props) => (
        <div className="pluginWrapper buttonWrapper">
          <a className="button" href={props.href} target={props.target}>
            {props.children}
          </a>
        </div>
    );

    return (
        <SplashContainer>
          <Logo img_src={`${baseUrl}img/undraw_Playful_cat_rchv.svg`}/>
          <div className="inner">
            <ProjectTitle tagline={siteConfig.tagline}
                          title={siteConfig.title}/>
            <PromoSection>
              <Button
                  href="https://discord.com/api/oauth2/authorize?client_id=746452184777883690&permissions=2147483639&scope=bot">Try
                It Out</Button>
              <Button
                  href={'https://github.com/MagnusDot/MegaBot'}>Contribute</Button>
              <Button href={docUrl('MegaBot')}>Docs</Button>
            </PromoSection>
          </div>
        </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;
    const {baseUrl} = siteConfig;

    const Block = (props) => (
        <Container
            padding={['bottom', 'top']}
            id={props.id}
            background={props.background}>
          <GridBlock
              align="center"
              contents={props.children}
              layout={props.layout}
          />
        </Container>
    );

    const TryOut = () => (
        <Block id="try">
          {[
            {
              content:
                  'We want to give you the maximum and that means making our code open source!' +
                  ' If you want a new addition you just have to ask [**here**](https://github.com/MagnusDot/MegaBot/issues).' +
                  '\n' +
                  'don\'t hesitate to check out our news in our blog!',
              image: `${baseUrl}img/undraw_news_go0e.svg`,
              imageAlign: 'left',
              title: 'Open Source',
            },
          ]}
        </Block>
    );

    const Description = () => (
        <Block background="dark">
          {[
            {
              content:
                  'We operate and evolve thanks to user contributions!' +
                  '\n' +
                  'Do not hesitate to help us and to make us evolve! Take part in our project!'
              ,
              image: `${baseUrl}img/undraw_different_love_a3rg.svg`,
              imageAlign: 'right',
              title: 'Contribution',
            },
          ]}
        </Block>
    );

    const LearnHow = () => (
        <Block background="light">
          {[
            {
              content:
                  'We want to give you a tool that will allow you to make your server look like you!',
              image: `${baseUrl}img/undraw_warning_cyit.svg`,
              imageAlign: 'right',
              title: 'Customizable',
            },
          ]}
        </Block>
    );

    const Features = () => (
        <Block layout="fourColumn">
          {[
            {
              content: 'MegaBot is a bot aimed for moderation',
              image: `${baseUrl}img/undraw_warning_cyit.svg`,
              imageAlign: 'top',
              title: 'Moderation',
            },
            {
              content: 'Fun content',
              image: `${baseUrl}img/undraw_Playful_cat_rchv.svg`,
              imageAlign: 'top',
              title: 'A world of fun',
            },
            {
              content: 'MegaBot is fully customizable',
              image: `${baseUrl}img/undraw_personalization_triu.svg`,
              imageAlign: 'top',
              title: 'Customizable',
            },

          ]}
        </Block>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users.filter((user) => user.pinned).
          map((user) => (
              <a href={user.infoLink} key={user.infoLink}>
                <img src={user.image} alt={user.caption} title={user.caption}/>
              </a>
          ));

      const pageUrl = (page) =>
          baseUrl + (language ? `${language}/` : '') + page;

      return (
          <div className="productShowcaseSection paddingBottom">
            <h2>Who is Using MegaBot?</h2>
            <p>This project is used by all these servers</p>
            <div className="logos">{showcase}</div>
            <div className="more-users">
              <a className="button" href={pageUrl('users.html')}>
                More {siteConfig.title} Users
              </a>
            </div>
          </div>
      );
    };

    return (
        <div>
          <HomeSplash siteConfig={siteConfig} language={language}/>
          <div className="mainContainer">
            <Features/>
            <LearnHow/>
            <TryOut/>
            <Description/>
            <Showcase/>
          </div>
        </div>
    );
  }
}

module.exports = Index;
