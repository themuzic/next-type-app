import { useCallback, useState } from "react";
import Slider from "react-slick";
import "node_modules/slick-carousel/slick/slick.css";
import "node_modules/slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { Content } from "pages";

type SliderProps = {
  list: Array<Content>,
  dv: string,
}

const ManualSlider = ({ list, dv }: SliderProps) => {
  const [dragging, setDragging] = useState(false);
  const router = useRouter();

  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const onClick = (e:React.MouseEvent<HTMLDivElement>, obj:Content) => {
    if (dragging) {
      e.stopPropagation();
      return;
    } else {
      let title;
      if (dv === "movies") {
        title = obj.original_title;
      } else {
        title = obj.original_name;
      }
      router.push(`/${dv}/${title}/${obj.id}`);
    }
  };

  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    arrows: true,
    draggable: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    cssEase: "linear",
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1740,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1220,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 999,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider_bg">
      <div className="slider_wrap">
        <Slider {...settings}>
          {list.map(
            (obj) =>
              obj.poster_path !== null && (
                <div
                  className="movie_wrap"
                  key={obj.id}
                  onClick={(event) => onClick(event, obj)}
                >
                  <div className="movie">
                    <img
                      src={`http://image.tmdb.org/t/p/w500${obj.poster_path}`}
                    />
                  </div>
                </div>
              )
          )}
        </Slider>
      </div>
      <style jsx global>
        {`
          .slider_bg {
            overflow-x: visible;
            overflow-y: visible;
            padding: 50px 0 100px;
            margin: 0 -15px;
          }
          .slider_wrap {
            overflow: visible;
            position: relative;
            width: calc(100vw - 8vw - 24px);
          }
          .slick-list {
            overflow: visible;
          }
          .slick-slide {
            padding: 0 15px;
          }
          .slick-slide img {
            transform: scale(1);
            box-shadow: none;
          }
          .slick-active:hover .movie_wrap {
            box-shadow: rgb(0 0 0/80%) 0px 15px 50px 10px,
              rgb(0 0 0/72%) 0px 35px 22px -10px;
            transform: scale(1.1, 1.1) translateZ(0px)
              translate3d(0px, 0px, 0px);
            transition-duration: 300ms;
            transition-property: transform, box-shadow;
            transition-timing-function: ease-out;
          }
          .slick-active {
            opacity: 1 !important;
          }
          .movie_wrap {
            position: relative;
            transition: transform 0.2s ease-in-out;
            cursor: pointer;
            border-radius: 12px;
          }
          .movie_wrap::after {
            border-radius: 12px;
            border: 4px solid transparent;
            content: "";
            position: absolute;
            transition: border 300ms ease-out 0s;
            inset: 0;
          }
          .movie_wrap:hover::after {
            border: 4px solid rgba(249, 249, 249, 0.8);
          }
          .movie {
            position: relative;
            text-align: center;
            cursor: pointer;
            border-radius: 12px;
            padding-bottom: 150%;
          }
          .movie_wrap:focus-visible {
            outline: none;
          }
          .movie img {
            width: 100%;
            height: 100%;
            margin: auto;
            border-radius: 12px;
            position: absolute;
          }
          .slick-next {
            right: 0;
            transform: translateX(90%);
          }
          .slick-prev {
            left: 0;
            transform: translateX(-90%);
          }
          .slick-prev,
          .slick-next {
            top: 0;
            width: calc(3.5vw + 24px);
            height: 100%;
            z-index: 100;
          }
          .slick-prev.slick-disabled:before,
          .slick-next.slick-disabled:before {
            opacity: 0;
          }
          .slick-prev:before,
          .slick-next:before {
            font-size: 30px;
            opacity: 0.3;
            transition: opacity 0.2s ease-in-out;
          }
          @media (max-width: 1024px) {
            .slider_bg {
              padding: 35px 0 65px;
            }
          }
          @media (max-width: 640px) {
            .slider_wrap {
              width: calc(100vw - 5vw - 24px);
            }
            .slick-next {
              margin-right: 13px;
            }
            .slick-prev {
              margin-left: 13px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ManualSlider;
