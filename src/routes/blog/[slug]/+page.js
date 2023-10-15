export function load({ params, route }) {
  const paramstr = JSON.stringify(params)
  const routstr = JSON.stringify(route)
  console.log(`params: ${paramstr}`)
  console.log(`route: ${routstr}`)

  return {
    title: params.slug,
    content: params.slug
  }
}

export const prerender = false;
