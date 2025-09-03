import React from 'react'

export default function useAnime() {
    async function getRandom() {
        const data = await fetch(
          location.origin + "/api/random",
          { cache: 'no-store' }
        );
        let json = await data.json();
        console.log(json);
        return json;
      }
      async function getSearch(id) {
        const data = await fetch(
          location.origin + `/api/search/${id}`,
          { cache: 'no-store' }
        );
        let json = await data.json();
        console.log(json);
        return json;
      }
  return {
    getRandom,
    getSearch,
  }
}

