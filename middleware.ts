import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ['/papss', '/profile', '/register/company'],
};