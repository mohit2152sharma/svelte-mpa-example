export function load({ params, url }) {
  const paramstr = JSON.stringify(params);
  console.log(`params for qna: ${paramstr}`);
  const urlstr = JSON.stringify(url);
  console.log(`url for qna: ${urlstr}`);
  const id = url.searchParams.get('id');
  return {
    id: id
  };
}

export const prerender = false; 
