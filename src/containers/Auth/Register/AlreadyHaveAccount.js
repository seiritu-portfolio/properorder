import React from "react";

export default function AlreadyHaveAccount() {
  return (
    <div className={"flex justify-center mt-6 md:mt-4"}>
      <span className={"text-base text-po-black"}>
        Already have an account?
      </span>
      <a
        href={"/login-with-password"}
        className={"no-underline auth-label-special ml-1"}
      >
        Log in here
      </a>
    </div>
  );
}
