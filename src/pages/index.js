import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

const FeatureList = [
  {
    title: 'Sausageous',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        A quick fox jumps over the brown lazy dog.
      </>
    ),
  },
  {
    title: 'All in one solution',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        A quick fox jumps over the brown lazy dog.
      </>
    ),
  },
  {
    title: 'Powered by Yaossg',
    Svg: require('@site/static/img/logo.svg').default,
    description: (
      <>
        A quick fox jumps over the brown lazy dog.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
      <HomepageHeader />
      <HomepageFeatures />
    </Layout>
  );
}
