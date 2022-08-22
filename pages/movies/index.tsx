import { useState, useEffect } from "react";
import Seo from "components/Seo";
import dynamic from "next/dynamic";
import ManualSlider from "components/ManualSlider";
import { Content, Company } from "pages";

export default function MovieHome() {
  const ManualSliderNoSSR = dynamic(() => import("components/ManualSlider"), {
    ssr: false,
  });
  const [popular, setPopular] = useState<Content[]>([]);
  const [latest, setLatest] = useState<Content[]>([]);
  const [vote, setVote] = useState<Content[]>([]);

  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/movies/popular`)).json();
      setPopular(results);
    })();
    (async () => {
      const { results } = await (await fetch(`/api/movies/latest`)).json();
      setLatest(results);
    })();
    (async () => {
      const { results } = await (await fetch(`/api/movies/vote`)).json();
      setVote(results);
    })();
  }, []);

  return (
    <div className="container">
      <Seo title="Movies" />
      {popular && latest && vote && (
        <>
          <div className="contents_row">
            <h4>Popular</h4>
            <ManualSliderNoSSR list={popular} dv="movies" />
          </div>
          <div className="contents_row">
            <h4>Latest</h4>
            <ManualSliderNoSSR list={latest} dv="movies" />
          </div>
          <div className="contents_row">
            <h4>Top Rated</h4>
            <ManualSliderNoSSR list={vote} dv="movies" />
          </div>
        </>
      )}
      <style jsx global>{`
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
  );
}
