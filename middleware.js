import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes:'/'
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)", // Matches all routes except static files and _next
    "/(api|trpc)(.*)",       // Matches all api and trpc routes
    // "/files(.*)",              // Match all routes starting with /files
    // "/upload(.*)"              // Match all routes starting with /upload
  ]
};
