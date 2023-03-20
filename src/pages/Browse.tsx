import React,{useEffect} from 'react'
import { fetchRequest } from '../common/api'


const Browse = () => {

    async function fetchPopularMovies() {
        const popularMovies = await fetchRequest<MovieResponse<MovieResults>>(
            ENDPOINT.MOVIES_POPULAR
        )
        console.log(popularMovies);
        
    }

    useEffect(() => {
      fetchPopularMovies();
   
    }, [])
    

  return (
    <section>
        <section>Banner Image</section>
        <section>Categories</section>
    </section>
  )
}

export default Browse