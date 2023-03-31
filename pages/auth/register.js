import React, { useState } from "react";
import axios from "axios";
// import { useRouter } from "next/router";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
import Link from "next/link";

export default function Home() {
  // hook
  // const router = useRouter();

  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [ok, setOk] = useState(false)

  // function
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(`/api/auth/register`, { name, email, password })
      .then((response) => {
        if(response.data?.error){
          setErrorMessage(response.data.error)
        }else{
          // router.replace("/auth/login")
          setErrorMessage("")
          setOk(true)
        }
      }) 
      .catch((err) => setErrorMessage(err.response.data.error));
  };
  return (
    <LayoutMain page={"register"}>
      <main>
        <Jumbotron
          title={"REGISTER PAGE"}
          subTitle={"Please Register before Login"}
        />
        {ok? <div className="text-center text-2xl">Please check your email inbox to comfirmation register</div>:<div>
          <form
            onSubmit={submitHandler}
            className="flex flex-col max-w-sm mx-auto my-5"
          >
            {errorMessage && (
              <div className="form-error-message">{errorMessage}</div>
            )}
            <input
              id="name"
              className="input-text"
              type={"text"}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              REGISTER
            </button>
          </form>
          <p className="text-center">
            If you have an account please{" "}
            <Link href={"/auth/login"} className="text-blue-400">
              Login
            </Link>
          </p>
        </div>}
      </main>
    </LayoutMain>
  );
}
