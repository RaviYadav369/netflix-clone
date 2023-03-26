import { MovieVideoInfo, MovieVideoResult } from "../component/Movie-Card";
import { fetchRequest } from "./api";
import { ENDPOINT } from "./endpoint";

type description = "width" | "original"
export function createImageUrl(path: string, width: number,type:description) {
    return type === "width" 
    ? `${import.meta.env.VITE_BASE_IMAGE_URI}w${width}${path}`
    : `${import.meta.env.VITE_BASE_IMAGE_URI}${type}${path}`;
  }

 export async function fetchMovieInfo(id:string) {
    const response = await fetchRequest<MovieVideoResult<MovieVideoInfo[]>>(
      ENDPOINT.MOVIES_VIDEO.replace("{movie_id}", id.toString())
    );
    // console.log(response);
    return response.results.filter(
      (result) =>
        result.site.toLowerCase() === "youtube" &&
        result.type.toLowerCase() === "trailer" &&
        result.official === true
    );
  }