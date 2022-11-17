import React from 'react';
import {client }  from '../lib/client';
import { Product , FooterBanner , HeroBanner } from '../components';
function index({products , bannerData} : {products:any , bannerData:any}) {
  return (
    <div>
      
      <HeroBanner  heroBanner={bannerData.length && bannerData[0]}/>

      <div className='products-heading'>
        <h2>Best selling products</h2>
        <p>Speakers and variations</p>
      </div>

    <div className='products-container'>
      {products?.map((product:any)=> <Product key={product._id} product={product}/>)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </div>
  )
}
// in next js to fetch data we use getserversideprops insted of useeffect and usestate.
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products ,bannerData
    }
  }
}
export default index;