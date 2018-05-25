import React from 'react'

import Hero from "../components/Hero";

export default (props) => {
  console.log(props);
  const entry = props.entry;
  const title = entry.getIn(['data', 'title']);
  const heroImg = props.getAsset(props.widgetsFor('heroImage').getIn(['data', 'url']));
  const primaryImg = props.getAsset(props.widgetsFor('primaryImage').getIn(['data', 'image']));
  const secondaryImg = props.getAsset(props.widgetsFor('secondaryImage').getIn(['data', 'image']));
  const infoObjects = props.widgetsFor('infoObject');

  return (
    <div>
      <div className="container
                      bp-1_paddingTop-2 bp-2_paddingTop-5
                      bp-1_marginBottom-3 bp-2_marginBottom-6">
        <div className="project-name">
          <h2 className='f-page-title'>{title}</h2>
        </div>
      </div>
      
      <div>{title}</div>
      <img src={heroImg.toString()} alt="hero image" />
      <div>{entry.getIn(['data', 'headline'])}</div>
      <div className="marginBottom-5 bp-1_marginBottom-5 bp-2_marginBottom-10"
        dangerouslySetInnerHTML={{ __html: entry.getIn(['data', 'body']) }}
      />
      {infoObjects.map((infoObject, i) => {
        return (
          <div key={i}>
            <p>{infoObject.getIn(['data', 'title'])}</p>
            <p>{infoObject.getIn(['data', 'description'])}</p>
          </div>
        )
      })}
      <img src={primaryImg.toString()} alt="primary image" />
      <img src={secondaryImg.toString()} alt="secondary image" />
    </div>
  )
};
