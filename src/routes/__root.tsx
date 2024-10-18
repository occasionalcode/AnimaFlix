import Navbar from "@/layout/-Navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="font-Montserrat  w-screen bg-mainBackground  flex justify-center items-center">
      <div className="max-w-screen-2xl  w-full">
        <Navbar />
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
