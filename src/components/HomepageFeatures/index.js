import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Docs',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    link: "/docs/intro",
    description: (
      <>
        Guidance on how to model different Equipment Types & Systems, classify points, and validate models for downstream use!
      </>
    ),
  },
  {
    title: 'Ontology Explorer',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    link: "https://building-ontology-browser.web.app",
    description: (
      <>
        Interactively explore our modelling ontology; see how Points, Equipment, Locations and more fit together.
      </>
    ),
  },
  {
    title: 'Point Tagging Guide (legacy)',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    link: "https://building-tagging-guide.web.app",
    description: (
      <>
        A full table of points that may be found on a building network. This has been superceeded by the Ontology Explorer.
      </>
    ),
  },
];

function Feature({Svg, title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <a href={link}>
          <Svg className={styles.featureSvg} role="img" />
        </a>
      </div>
      <div className="text--center padding-horiz--md">
        <h3><a href={link}>{title}</a></h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
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
