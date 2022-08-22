/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;
const nextConfig = {
  poweredByHeader: process.env.NODE_ENV === "development",
  reactStrictMode: process.env.NODE_ENV === "development",
  swcMinify: true,

  async rewrites() {
    return [
      {
        source: `/api/movies/popular`,
        destination: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_watch_providers=337&watch_region=KR&language=ko&include_adult=true&sort_by=popularity.desc`,
      },
      {
        source: `/api/movies/latest`,
        destination: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_watch_providers=337&watch_region=KR&language=ko&include_adult=true&sort_by=release_date.desc`,
      },
      {
        source: `/api/movies/vote`,
        destination: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_watch_providers=337&watch_region=KR&language=ko&include_adult=true&sort_by=vote_average.desc`,
      },
      {
        source: `/api/movies/:id`,
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}&language=ko`,
      },
      {
        source: `/api/movies/:id/videos`,
        destination: `https://api.themoviedb.org/3/movie/:id/videos?api_key=${API_KEY}&language=ko`,
      },
      {
        source: `/api/tv/popular`,
        destination: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_watch_providers=337&watch_region=KR&language=ko&include_adult=true&sort_by=popularity.desc`,
      },
      {
        source: `/api/tv/latest`,
        destination: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_watch_providers=337&watch_region=KR&language=ko&include_adult=true&sort_by=first_air_date.desc`,
      },
      {
        source: `/api/tv/vote`,
        destination: `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_watch_providers=337&watch_region=KR&language=ko&include_adult=true&sort_by=vote_average.desc`,
      },
      {
        source: `/api/tv/:id`,
        destination: `https://api.themoviedb.org/3/tv/:id?api_key=${API_KEY}&language=ko`,
      },
      {
        source: `/api/tv/:id/videos`,
        destination: `https://api.themoviedb.org/3/tv/:id/videos?api_key=${API_KEY}&language=ko`,
      },
    ];
  },
};

module.exports = nextConfig;
