import { useState, useEffect } from "react";
import Seo from "components/Seo";
import dynamic from "next/dynamic";
import ManualSlider from "components/ManualSlider";
import { Company } from "pages";

export interface Content {
  id: string,
  poster_path: string,
  backdrop_path: string,
  original_title: string | undefined,
  original_name : string | undefined,
  production_companies: Array<Company> | undefined,  
}

export default function MovieHome() {
  const ManualSliderNoSSR = dynamic(() => import("components/ManualSlider"), {
    ssr: false,
  });
  const [popular, setPopular] = useState<Content[]>([]);
  const [latest, setLatest] = useState<Content[]>([]);
  const [vote, setVote] = useState<Content[]>([]);
  useEffect(() => {
    (async () => {
      const { results } = await (await fetch(`/api/tv/popular`)).json();
      setPopular(results);
    })();
    (async () => {
      const { results } = await (await fetch(`/api/tv/latest`)).json();
      setLatest(results);
    })();
    (async () => {
      const { results } = await (await fetch(`/api/tv/vote`)).json();
      setVote(results);
    })();
  }, []);

  return (
    <div className="container">
      <Seo title="TV" />
      {popular && latest && vote && (
        <>
          <div className="contents_row">
            <h4>Popular</h4>
            <ManualSliderNoSSR list={popular} dv="tv" />
          </div>
          <div className="contents_row">
            <h4>Latest</h4>
            <ManualSliderNoSSR list={latest} dv="tv" />
          </div>
          <div className="contents_row">
            <h4>Top Rated</h4>
            <ManualSliderNoSSR list={vote} dv="tv" />
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
