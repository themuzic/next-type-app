import { useRouter } from "next/router";
import Router from "./Router";

export default function Header() {
  const router = useRouter();
  return (
    <nav>
      <Router path="/" name="" isActive={false} isLogo={true} />
      <div id="navbar">
        <Router
          path="/movies"
          name="Movies"
          isActive={router.pathname.includes("movies")}
          isLogo={false}
        />
        <Router
          path="/tv"
          name="TV"
          isActive={router.pathname.includes("tv")}
          isLogo={false}
        />
      </div>
      <style jsx global>{`
        nav {
          display: flex;
          gap: 10px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 20px;
          padding-bottom: 10px;
        }
        nav > a > img {
          width: 100px;
          margin-bottom: 5px;
        }
        nav a {
          font-weight: 600;
          font-size: 18px;
          position: relative;
          color: #fff;
          text-decoration: none;
        }
        nav a > span {
          opacity: 0.3;
          transition: opacity 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        }
        #navbar > a:not(:first-of-type) {
          margin-left: 5px;
        }
        #navbar a > span::before {
          background-color: rgba(249, 249, 249, 0.4);
          border-radius: 0px 0px 4px 4px;
          bottom: -6px;
          content: "";
          height: 2px;
          left: 0px;
          opacity: 0;
          position: absolute;
          right: 0px;
          transform-origin: left center;
          transform: scaleX(0);
          transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
          visibility: hidden;
          width: auto;
        }
        #navbar a:hover span {
          opacity: 1;
        }
        #navbar a:hover span::before {
          background-color: rgb(249, 249, 249);
          transform: scaleX(1);
          visibility: visible;
          opacity: 1 !important;
        }
        .active > span {
          opacity: 1 !important;
        }
        nav div {
          display: flex;
          gap: 10px;
        }
        @media (max-width: 1020px) {
          nav {
            flex-direction: row;
            justify-content: flex-start;
            padding: 15px 0 10px 20px;
          }
          nav a {
            font-size: 16px;
          }
          nav a > span {
            vertical-align: sub;
            vertical-align: -webkit-baseline-middle;
          }
          nav > a > img {
            width: 80px;
          }
          #navbar {
            margin-left: 5px;
          }
        }
        @media (max-width: 400px) {
          nav {
            padding: 10px 0 10px 15px;
          }
        }
      `}</style>
    </nav>
  );
}
