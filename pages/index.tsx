import Seo from "components/Seo";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

export interface Content {
  id: string,
  poster_path: string,
  backdrop_path: string,
  original_title: string | undefined,
  original_name : string | undefined,
  production_companies: Array<Company> | undefined,
}

export interface Movie {
  id: string,
  poster_path: string,
  backdrop_path: string,
  original_title: string | undefined,
  original_name : string | undefined,
  title: string,
  release_date: string,
  runtime: string,
  overview: string,
  genres: Array<Genre> | undefined,
}
export interface Tv {
  id: string,
  poster_path: string,
  backdrop_path: string,
  original_title: string | undefined,
  original_name : string | undefined,
  title: string,
  overview: string,
  genres: Array<Genre> | undefined,
  first_air_date: string,
  number_of_seasons: string,
}

export interface Company {
  logo_path: string,
}
export interface Genre {
  id: string,
  name: string,
}
export interface Video {
  id: string,
  key: string,
}

export interface SliderProps {
  list: Array<Content>,
  dv: string,
}

export default function Home():JSX.Element {
  const AutoSliderNoSSR = dynamic(() => import("components/AutoSlider"), {
    ssr: false,
  });
  const [movies, setMovies] = useState<Content[]>([]);
  const [tvs, setTvs] = useState<Content[]>([]);
  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies/popular`)).json();
      setMovies(results);
    })();
    (async () => {
      const { results } = await (await fetch(`/api/tv/popular`)).json();
      setTvs(results);
      // console.log(`tvs: ${results}`);
    })();
  }, []);

  return (
    <>
      <div className="container">
        <Seo title="Home" />
        {movies && tvs && (
          <>
            <div className="contents_row">
              <h4>Movies</h4>
              <AutoSliderNoSSR list={movies} dv="movies" />
            </div>
            <div className="contents_row">
              <h4>TV</h4>
              <AutoSliderNoSSR list={tvs} dv="tv" />
            </div>
          </>
        )}

        <style jsx>{`
          .container {
            display: grid;
            padding: 20px 0;
          }
          .contents_row {
            overflow-x: visible;
            overflow-y: visible;
          }
          .contents_row h4 {
            text-align: left;
          }
          h4 {
            text-align: center;
            margin: 10px 0 -10px;
            font-size: 20px;
          }
        `}</style>
      </div>
    </>
  );
}

// export async function getServerSideProps() {
//   const { results } = await (
//     await fetch(`http://localhost:3000/api/movies`)
//   ).json();
//   return {
//     props: { results },
//   };
// }
