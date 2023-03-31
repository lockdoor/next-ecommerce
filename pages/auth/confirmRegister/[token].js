import React, { useState } from "react";
import { useQuery } from "react-query";
import { verifyRegister } from "@/libs/clientRequest/user";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
import Link from "next/link";
import { useRouter } from "next/router";

const WAITSECOND = 10000;

export default function ComfirmRegister({ token }) {
  // hook
  const router = useRouter();
  const { isLoading, isError, data, error } = useQuery(
    ["verifyRegister", token],
    () => verifyRegister(token),
    {
      onSuccess: (response) => {
        if (response?.error) {
          setErrorMessage(response.error);
        } else {
          setErrorMessage("");
          setTimeout(() => {
            router.push("/auth/login");
          }, WAITSECOND);
        }
      },
    }
  );

  // state
  const [errorMessage, setErrorMessage] = useState("");

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <LayoutMain loading={isLoading}>
      <Jumbotron title="Confirm Registation" />
      {errorMessage ? (
        <div className="text-center my-5">
          <div className="text-2xl my-5">{errorMessage}</div>
          <Link
            className="text-4xl my-5 text-blue-500 hover:text-blue-700"
            href={"/auth/register"}
          >
            Register
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-2xl my-5 text-center">
            Your Registation is success
          </p>
          <p className="text-2xl my-5 text-center">
            We will bring you to Login page in {WAITSECOND / 1000} second
          </p>
          <p className="text-2xl my-5 text-center">
            If Login page not open please click link below to login
          </p>
          <p className="text-4xl my-5 text-center">
            <Link
              className="text-blue-500 hover:text-blue-700"
              href={"/auth/login"}
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </LayoutMain>
  );
}

export async function getServerSideProps(context) {
  // console.log(context.params)
  const { token } = context.params;
  return {
    props: { token },
  };
}
