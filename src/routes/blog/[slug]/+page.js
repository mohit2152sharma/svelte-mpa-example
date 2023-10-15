// export const prerender = false;
// export const csr = true;
// export const ssr = false;

export function load ({ params }) {
    return {
        title: params.slug,
        content: params.slug
    }
}
