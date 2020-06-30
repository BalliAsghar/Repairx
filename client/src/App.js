import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    axios({
      method: "post",
      url: "/user/register",
      headers: {
        "content-type": "application/json",
      },
      data: {
        username: data.username,
        password: data.password,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="username" ref={register} />
        <input name="password" ref={register} />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
