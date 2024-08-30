import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <img className="hero__substitle" src={require('@site/static/img/sausage-128.png').default} />
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <p>路漫漫其修远兮，吾将上下而求索</p>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'Programmer',
    img: require('@site/static/img/cpp_logo.png').default,
    description: (
      <>
        A life long programmer.<br/>
        Programming for fun.
      </>
    ),
  },
  {
    title: 'Minecrafter',
    img: require('@site/static/img/crafting_table.webp').default,
    description: (
      <>
        A faithful Minecraft player.<br/>
        As well as a Terrarian.
      </>
    ),
  },
  {
    title: 'UESTCer',
    img: require('@site/static/img/UESTC.png').default,
    description: (
      <>
        SICE & SCSE, UESTC.<br/>
        CNSS DevOps
      </>
    ),
  },
];

function Feature({img, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureImg} src={img} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}


export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout 
      title={siteConfig.title}
      description={`${siteConfig.title} - ${siteConfig.tagline}`}>
      <div className={styles.background}>
        <HomepageHeader />
        <HomepageFeatures />
      </div>
    </Layout>
  );
}
