import React,{useEffect} from 'react'
import ContentRows from '../component/content-rows'
import { ENDPOINT } from '../common/endpoint'
import Banner from '../component/Banner'


const Browse = () => {
  return (
    <section className=' top-0'>
      <Banner />
        <ContentRows endpoint={ENDPOINT.MOVIES_POPULAR} title="new & Popular" />
        <ContentRows endpoint={ENDPOINT.MOVIES_TOP_RATED} title="Top Rated" />
        <ContentRows endpoint={ENDPOINT.MOVIES_NOW_PLAYING} title="Now Playing" />
    </section>
  )
}

export default Browse