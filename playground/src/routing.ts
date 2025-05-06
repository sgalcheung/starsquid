export const routes = {
  home: () => "/",
  docs: () => "/docs",
  intro(slug: string) {
    return `/intro/${slug}`;
  },
}
