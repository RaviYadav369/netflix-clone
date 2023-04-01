import React from "react";
import Profiles from "../component/Profiles";

export default function ProfilePage({edit = false}:{edit?:boolean}) {
  return (
    <article className="grid min-h-screen place-content-center place-items-center">
      <Profiles edit={edit} />
    </article>
  );
}