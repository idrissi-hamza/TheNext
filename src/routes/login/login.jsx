import React, { useState } from "react";
import Button from "../../components/Button";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const submitHandler = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form
      className="max-w-sm my-10 bg-white mx-auto p-5 border shadow rounded text-slate-600"
      onSubmit={submitHandler}
    >
      <h2 className="text-xl font-semibold ">Login</h2>

      <label className="block my-8 mx-auto">
        <span className="block mb-2"> Email:</span>
        <input
          className="py-2 px-1 text-md h-8 border-gray-300  border min-w-full rounded focus:border-gray-500  outline-none"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="block my-8 mx-auto">
        <span className="block mb-2"> Password</span>
        <input
          className="py-2 px-1 text-md h-8 border-gray-300  border min-w-full rounded focus:border-gray-500  outline-none"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {!isPending && <Button title={"Login"} />}
      {isPending && <Button title={"Loading.."} />}
      {error && <p>{error}</p>}
    </form>
  );
}
