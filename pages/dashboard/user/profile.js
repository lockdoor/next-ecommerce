import React, { useState, useEffect } from "react";
import LayoutMain from "@/components/layout/layoutMain";
import LayoutUser from "@/components/layout/layoutUser";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function Profile() {
  const [name, setName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setComfirmPassword] = useState("");
  const [showFormName, setShowFromName] = useState(true);
  const [showFormPassword, setShowFormPassword] = useState(false);

  const { data } = useSession();

  // function
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password and confirm password not match");
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (name === data?.token.name) return;
    // if (password !== confirmPassword) {
    //   toast.error("Password and confirm password not match");
    // }
  };

  const handleShowFormName = () => {
    setShowFromName(true);
    setShowFormPassword(false);
    setPassword("")
    setOldPassword("")
    setComfirmPassword("")
  };

  const handleShowFormPassword = () => {
    setShowFromName(false);
    setShowFormPassword(true);
    setName(data.token?.name || "")
  };

  useEffect(() => {
    if (data?.token) {
      setName(data.token?.name || "");
    }
  }, [data?.token]);
  return (
    <LayoutMain>
      <LayoutUser headText={"Setting Profile"} page={"userProfile"}>
        <main>
          {/* btn select form */}
          <div className="flex justify-around">
            <button
              onClick={handleShowFormName}
              className={`w-44 py-2 rounded-md ${
                showFormName
                  ? "bg-green-300"
                  : "border border-slate-200 text-slate-200"
              } hover:bg-green-600 hover:text-white`}
            >
              Change Name
            </button>
            <button
              onClick={handleShowFormPassword}
              className={`w-44 py-2 rounded-md ${
                showFormPassword
                  ? "bg-green-300"
                  : "border border-slate-200 text-slate-200"
              } hover:bg-green-600 hover:text-white`}
            >
              Change Password
            </button>
          </div>

          {/* form */}
          <div>
            {/* form name */}
            <form
              onSubmit={handleNameSubmit}
              className={`max-w-lg mx-auto ${!showFormName && "hidden"}`}
            >
              <input
                type="text"
                value={name}
                className="form-input my-3"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="text-right">
                <button
                  type="submit"
                  className={`w-1/3 bg-blue-400  py-3 rounded-md mb-5`}
                >
                  Submit
                </button>
              </div>
            </form>

            {/* form password */}
            <form
              className={`max-w-lg mx-auto ${!showFormPassword && "hidden"}`}
              onSubmit={handlePasswordSubmit}
            >
              <input
                type="password"
                value={oldPassword}
                placeholder="* * * old password * * *"
                onChange={(e) => setOldPassword(e.target.value)}
                className="form-input my-3"
                required
              />
              <input
                type="password"
                value={password}
                placeholder="* * *  new password * * *"
                onChange={(e) => setPassword(e.target.value)}
                className="form-input my-3"
                required
              />
              <input
                type="password"
                value={confirmPassword}
                placeholder="* * * comfirm new password * * *"
                onChange={(e) => setComfirmPassword(e.target.value)}
                className="form-input my-3"
                required
              />
              <div className="text-right">
                <button
                  type="submit"
                  className="w-1/3 bg-blue-400 py-3 rounded-md mb-5"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </LayoutUser>
    </LayoutMain>
  );
}
