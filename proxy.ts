import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // //if logged in and has no portfolio -> redirect to onboarding
    // if (token && path === "/dashboard" && !token.hasPortfolio) {
    //   return NextResponse.redirect(new URL("/onboarding", req.url));
    // }

    //if logged in and visiting -> redirect to dashboard
    if (token && (path === "/login" || path === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        //public routes
        if (path === "/" || path === "/login" || path === "/register") {
          return true;
        }

        return !!token;
      },
    },
  },
);

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard", "/onboarding"],
};
