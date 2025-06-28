import { sequence } from "astro:middleware";
import { loadCatalogFromSession } from "@/middlewares/session";
import authMiddleware from "./middlewares/auth";

export const onRequest = sequence(loadCatalogFromSession, authMiddleware);
