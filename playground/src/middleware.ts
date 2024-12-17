import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((context, next) => {
    const url = new URL(context.request.url);
    // console.log("middleware url", context.request.url);
    const urlCIDParam = url.searchParams.get("cid");
    // console.log("middleware",urlCIDParam);

    return next();
});
