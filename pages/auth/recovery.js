import React, { useState } from "react";
import { useMutation } from "react-query";
import { recovery } from "@/libs/clientRequest/user";
// import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";

export default function Recovery() {
  // state
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [ok, setOk] = useState(false);

  // hook
  const recoveryMutation = useMutation(recovery, {
    onSuccess: (response) => {
      if (response?.error) {
        setErrorMessage(response.error);
      } else {
        setErrorMessage("");
        setOk(true);
      }
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    recoveryMutation.mutate({ email });
  };
  return (
    // <LayoutMain>
    <main>
      <Jumbotron
        title="Recovery password"
        subTitle="Please input you email to recovery"
      />
      {ok ? (
        <div className="text-center mt-5">
          Please check you email inbox for comfirm your recovery
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
            id="email"
            className="input-text"
            type={"text"}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" id="btnSubmit" className="btn-submit">
            Recovery
          </button>
        </form>
      )}
      </main>
    // </LayoutMain>
  );
}
