import React, { useState } from "react";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
import { getToken } from "next-auth/jwt";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getSession } from "next-auth/react";

export default function Login({callbackUrl}) {
  // state
  const [email, setEmail] = useState("lockdoor@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [errorMessage, setErrorMessage] = useState("");

  // hook
  const router = useRouter();

  //function
  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (response.error) {
      setErrorMessage(response.error);
    } else {
      const {token} = await getSession()
      if(!token){
        setErrorMessage('token not found');
      }
      else {
        setErrorMessage("");
        callbackUrl 
          ? router.push(callbackUrl) 
          : router.push(`/dashboard/${token?.role === 1 ? 'admin' : 'user'}`) 
      }
    }
  };

  return (
    <LayoutMain page={"login"}>
      <main>
        <Jumbotron title={"LOGIN PAGE"} subTitle={"Please Login to my shop."} />
        {/* <FromLogin /> */}
        <div>
          <form
            onSubmit={submitHandler}
            className="flex flex-col max-w-sm mx-auto my-5"
          >
            {errorMessage && (
              <div className="form-error-message">{errorMessage}</div>
            )}
            <input
              id="email"
              className="input-text"
              type={"text"}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              className="input-text"
              type={"password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" id="btnSubmit" className="btn-submit">
              LOGIN
            </button>
          </form>
          <p className="text-center">
            If you not have an account please{" "}
            <Link href={"/auth/register"} className="text-blue-400">
              Register
            </Link>
          </p>
          <p className="text-center">
            If you forget password please{" "}
            <Link href={"/auth/recovery"} className="text-blue-400">
              Recovery
            </Link>
          </p>
        </div>
      </main>
    </LayoutMain>
  );
}

export async function getServerSideProps(context) {
  const {req} = context
  const token = await getToken({ req });
  const {callbackUrl} = context.query 
  if (!token) {
    return {
      props: {callbackUrl: callbackUrl || null},
    };
  } else if (token?.role === 1) {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/admin",
      },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/dashboard/user",
      },
    };
  }
}
