import Header from "components/Header";

export default function Layout({ children }:React.PropsWithChildren) {
  return (
    <>
      <Header />
      <div id="background"></div>
      <div id="section">{children}</div>
      <style jsx>
        {`
          #background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -5;
            background: radial-gradient(#14161f, #191b27, #05070c);
          }
          #section {
            position: relative;
            overflow-x: visible;
            padding: 0 calc(3.5vw + 24px);
          }
        `}
      </style>
    </>
  );
}
