import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { verifyRecovery } from "@/libs/clientRequest/user";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
import Link from "next/link";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export default function ComfirmRecovery({ token, email }) {
  let myInterval = null;

  // state
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const [sec, setSec] = useState(10);

  // hook
  const router = useRouter();
  const recoveryMutation = useMutation(verifyRecovery, {
    onSuccess: (response) => {
      if (response?.error) {
        setErrorMessage(response.error);
      } else {
        setErrorMessage("");
        setOk(true);
        myInterval = setInterval(() => {
          setSec((prev) => prev - 1);
        }, 1000);
      }
    },
  });

  // function
  
  const submitHandler = (e) => {
    e.preventDefault();
    recoveryMutation.mutate({ token, password });
  };

  useEffect(() => {
    if (sec <= 0) {
      clearInterval(myInterval);
      router.push("/auth/login");
      return;
    }
  }, [sec]);

  return (
    <LayoutMain>
      <Jumbotron title="Confirm Recovery" subTitle={email} />
      {ok ? (
        <div>
          <p className="text-2xl my-5 text-center">Your recovery is success</p>
          <p className="text-2xl my-5 text-center">
            We will bring you to Login page in {sec} second
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
      ) : (
        <form
          onSubmit={submitHandler}
          className="flex flex-col max-w-sm mx-auto my-5"
        >
          {errorMessage && (
            <div className="form-error-message">{errorMessage}</div>
          )}
          <input
            id="password"
            className="input-text"
            type={"password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" id="btnSubmit" className="btn-submit">
            RECOVERY
          </button>
        </form>
      )}
    </LayoutMain>
  );
}

export async function getServerSideProps(context) {
  // console.log(context.params)
  const { token } = context.params;
  const { email } = jwt.verify(token, process.env.NEXTAUTH_SECRET);
  return {
    props: { token, email },
  };
}
