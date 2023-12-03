import { useState } from "react";

export default function useForm(submitHandler, initialValues) {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(""); // Add error state

  const onChange = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitHandler(values);
    } catch (err) {
      const errorMsg = "Username or password is incorrect";
      setError(errorMsg);
    }
  };

  return {
    values,
    onChange,
    onSubmit,
    error,
  };
}
