// export const prerender = true;
// export const csr = true;
// export const ssr = false;

export function load ({ url }) {
    return {
        id: url.searchParams.get('id')
    }
}
