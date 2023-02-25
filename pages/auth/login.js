import React, { useState } from "react";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
import { getToken } from "next-auth/jwt";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
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
      setErrorMessage("");
      router.reload();
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
              className="input-text"
              type={"text"}
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input-text"
              type={"password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn-submit">
              LOGIN
            </button>
          </form>
          <p className="text-center">
            If you not have an account please{" "}
            <Link href={"/auth/register"} className="text-blue-400">
              Register
            </Link>
          </p>
        </div>
      </main>
    </LayoutMain>
  );
}

export async function getServerSideProps({ req }) {
  const token = await getToken({ req });
  if (!token) {
    return {
      props: {},
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
