import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "components/Seo";
import dynamic from "next/dynamic";
import VideoSlider from "components/VideoSlider";
import { Company, Tv, Genre, Video } from "pages";

export default function Detail():JSX.Element {
  // const VideoSliderNoSSR = dynamic(() => import("components/VideoSlider"), {
  //   ssr: false,
  // });
  const [tv, setTv] = useState<Tv>();
  const [videos, setVideos] = useState<Video[]>();
  const [title, setTitle] = useState<string>();
  const [company, setCompany] = useState<Company>();
  const router = useRouter();

  useEffect(() => {
    if (router.query.params !== undefined) {
      const param = router.query.params;
      setTitle(param[0]);
      if (param) {
        (async () => {
          const response = await (await fetch(`/api/tv/${param[1]}`)).json();
          setTv(response);
          // console.log("tv: ", response);
          if (response.production_companies)
            setCompany(response.production_companies[0]);
          // console.log("company: ", company);
        })();
        (async () => {
          const { results } = await (
            await fetch(`/api/tv/${param[1]}/videos`)
          ).json();
          setVideos(results);
          // console.log("video: ", results);
        })();
      }
    }
  }, [router.query.params]);

  return (
    <>
      {title ? (
        <div className="container">
          {<Seo title={title} />}
          {tv && (
            <>
              <div id="back_poster">
                <img
                  src={`http://image.tmdb.org/t/p/original${tv.backdrop_path}`}
                  alt=""
                />
                <div id="back_color"></div>
              </div>

              <div className="movie_section">
                <div className="poster_wrap">
                  <img
                    src={`http://image.tmdb.org/t/p/w300${tv.poster_path}`}
                    className="poster"
                  />
                </div>
                <div className="info">
                  {company && company.logo_path && (
                    <img
                      src={`http://image.tmdb.org/t/p/w300${company.logo_path}`}
                      className="company_logo"
                    />
                  )}
                  <h2 className="title">{tv.title}</h2>
                  <div className="genres">
                    {tv.first_air_date && (
                      <span>{tv.first_air_date.substring(0, 4)}</span>
                    )}

                    {tv.number_of_seasons && (
                      <>
                        <span>·</span>
                        <span>시즌 {tv.number_of_seasons}</span>
                      </>
                    )}

                    <span>·</span>
                    {tv.genres &&
                      tv.genres.map((genre) => (
                        <span key={genre.id}>{genre.name}</span>
                      ))}
                  </div>
                  <div className="desc">{tv.overview}</div>
                </div>
              </div>
              {videos && videos.length > 0 && (
                <div className="video_section">
                  <h2>Teaser</h2>
                  <div>
                    <VideoSlider list={videos} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
      <style jsx>
        {`
          .container {
            position: relative;
            margin-top: 50px;
          }
          #back_poster {
            left: 0px;
            opacity: 1;
            position: fixed;
            right: 0px;
            top: 0px;
            transition: opacity 200ms ease 0s;
            width: 100%;
            z-index: -1;
          }
          #back_poster > img {
            position: relative;
            width: 100vw;
            top: 0;
            right: 0;
          }
          #back_color {
            background-image: radial-gradient(
              farthest-side at 73% 21%,
              transparent,
              rgb(26, 29, 41) 100%
            );
            position: absolute;
            inset: 0px;
          }
          .movie_section {
            display: flex;
            flex-direction: row;
          }
          .poster_wrap {
            max-width: 300px;
            width: 100%;
          }
          .poster_wrap > img {
            width: 100%;
            min-width: 200px;
          }
          .company_logo {
          }
          .info {
            padding-left: 20px;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-end;
            gap: 10px;
          }
          .title {
            margin: 5px 0 0;
          }
          .genres > span {
            font-size: 15px;
            margin-left: 10px;
          }
          .genres > span:first-of-type {
            margin-left: 0;
          }
          .desc {
            line-height: 24px;
          }
          .video_section {
            display: block;
            margin: 30px 0 50px;
          }

          @media (max-width: 1020px) {
            .container {
              margin-top: 10px;
            }
            #back_color {
              background-image: linear-gradient(transparent 0%, rgb(22 25 34));
            }
            .movie_section {
              flex-direction: column;
              gap: 10px;
            }
            .poster_wrap {
              max-width: auto;
            }
            .poster_wrap > img {
              width: 100%;
              max-width: 200px;
              min-width: 120px;
            }
            .info {
              padding-left: 0;
            }
            .company_logo {
              max-width: 300px;
              width: 80%;
            }
          }
          @media (max-width: 640px) {
            .poster_wrap > img {
              display: none;
            }
            .movie_section {
              margin-top: 35%;
            }
            .video_section {
              margin: 40px 0 50px;
            }
          }
        `}
      </style>
    </>
  );
}

// export function getServerSideProps({ params: { params } }) {
//   return {
//     props: { params },
//   };
// }
