import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenExpiration } from "../util/auth";

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submit = useSubmit();
  useEffect(() => {
    if (!token) return;
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }
    const duration = getTokenExpiration();
    console.log(duration);
    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, duration);
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
