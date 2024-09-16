declare module "virtual:starlight-ssr-schemas" {
  const StarlightSSRSchemas: Record<string, import("./libs/schema").Schema>;

  export default StarlightSSRSchemas;
}
