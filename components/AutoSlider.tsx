const version = Date.now();
import Slider from "react-slick";
import "node_modules/slick-carousel/slick/slick.css";
import "node_modules/slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { Content } from "pages";

type SliderProps = {
  list: Array<Content>,
  dv: string,
}

const AutoSlider = ({ list, dv }: SliderProps) => {
  const [dragging, setDragging] = useState(false);
  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);
  const router = useRouter();
  let settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    draggable: true,
    autoplaySpeed: 4000,
    variableWidth: true,
    arrows: false,
    className: "center",
    centerMode: true,
    beforeChange: handleBeforeChange,
    afterChange: handleAfterChange,
    cssEase: "linear",
    speed: 400,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const onClick = (e:React.MouseEvent<HTMLElement>, obj:Content) => {
    if (dragging) {
      e.stopPropagation();
      return;
    } else {
      const classes = e.target.parentElement.parentElement.classList;
      if (classes.contains("slick-active")) {
        let title;
        if (dv === "movies") {
          title = obj.original_title;
        } else {
          title = obj.original_name;
        }
        router.push(`/${dv}/${title}/${obj.id}`);
      }
    }
  };

  return (
    <div className="slider_bg">
      <div className="slider_wrap">
        <Slider {...settings}>
          {list.map((obj) => (
            <div
              className="movie_wrap"
              key={obj.id}
              onClick={(event) => onClick(event, obj)}
            >
              <div className="movie">
                <img src={`http://image.tmdb.org/t/p/w500${obj.poster_path}`} />
              </div>
            </div>
          ))}
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
            max-width: 1320px;
            width: 100vw;
            margin: auto;
          }
          .slick-list {
            overflow: visible;
          }
          .slick-track {
            display: flex;
          }
          .slick-slide {
            opacity: 0.4;
            padding: 0 25px;
          }
          .slick-active {
            opacity: 1;
          }
          .slick-center {
            padding: 0 40px;
          }
          .slick-active .movie_wrap {
            box-shadow: rgb(0 0 0 / 80%) 0px 15px 50px -16px,
              rgb(0 0 0 / 72%) 0px 35px 22px -10px;
            transform: scale(1.1, 1.1) translateZ(0px)
              translate3d(0px, 0px, 0px);
            cursor: pointer;
          }
          .slick-center .movie_wrap {
            transform: scale(1.2, 1.2) translateZ(0px)
              translate3d(0px, 0px, 0px);
          }
          .slick-active:hover .movie_wrap {
            box-shadow: rgb(0 0 0/80%) 0px 15px 50px 10px,
              rgb(0 0 0/72%) 0px 35px 22px -10px;
            transform: scale(1.3, 1.3) translateZ(0px)
              translate3d(0px, 0px, 0px);
            transition-duration: 300ms;
            transition-property: transform, box-shadow;
            transition-timing-function: ease-out;
          }
          .movie_wrap {
            position: relative;
            transition: transform 0.2s ease-in-out;
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
          .slick-active .movie_wrap:hover::after {
            border: 4px solid rgba(249, 249, 249, 0.8);
          }
          .movie {
            width: 200px !important;
            text-align: center;
          }
          .movie img {
            width: 100%;
            height: 300px;
            margin: auto;
            transition: transform 0.2s ease-in-out;
            border-radius: 12px;
          }
          .movie_wrap:focus-visible {
            outline: none;
          }
          @media (max-width: 1440px) {
            .slider_wrap {
              transform: translateX(-4vw);
            }
          }
          @media (max-width: 400px) {
            .slider_bg {
              padding: 40px 0 50px;
            }
            .slick-active .movie_wrap {
              transform: scale(1.03, 1.03) translateZ(0px)
                translate3d(0px, 0px, 0px);
              cursor: pointer;
            }
            .slick-center .movie_wrap {
              transform: scale(1.05, 1.05) translateZ(0px)
                translate3d(0px, 0px, 0px);
            }
            .slick-active:hover .movie_wrap {
              transform: scale(1.05, 1.05) translateZ(0px)
                translate3d(0px, 0px, 0px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AutoSlider;
