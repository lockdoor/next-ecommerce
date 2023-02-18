import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
export default function Home() {
  // hook
  const router = useRouter();

  // state
  const [name, setName] = useState("lockdoor");
  const [email, setEmail] = useState("lockdoor@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [errorMessage, setErrorMessage] = useState("");

  // function
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post(`/api/register`, { name, email, password })
      .then(() => router.replace("/login"))
      .catch((err) => setErrorMessage(err.response.data.error));
  };
  return (
    <LayoutMain page={"register"}>
      <main>
        <Jumbotron
          title={"REGISTER PAGE"}
          subTitle={"Please Register before Login"}
        />
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
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
        </div>
      </main>
    </LayoutMain>
  );
}
