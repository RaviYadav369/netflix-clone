import React,{useState} from "react";
import { BiPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import YoutubeModal from "./Youtube-Modal";
import {FaPlusCircle} from 'react-icons/fa'
import Netflixlogo from '../assets/Netflix-Logo.png'

export default function Profiles({ edit }: { edit: boolean }) {
  const navigate = useNavigate();
  const [isProfileEditOpen, setisProfileEditOpen] = useState(false);
  function manageProfile() {
    navigate("/manageprofile");
  }
  function closeProfile(){
    setisProfileEditOpen(false)
  }
  function openEditor(){
    setisProfileEditOpen(true)
  }
  const heading = edit ? "Who's watching?" : "Manage Profile";
  return (
    <>
      <h1 className="text-6xl mb-8">{heading}</h1>
      <section className="flex gap-3">
        <ProfileCard onEditClick={openEditor} edit={edit} />
        <ProfileCard onEditClick={openEditor}  edit={edit} />
        <AddProfile />
      </section>
      <section>
        {edit ? (
          <>
          <ProfileButton className="mt-5 rounded-md">
            Done
          </ProfileButton>
          <EditProfile edit={edit} isOpen={isProfileEditOpen} onClose={closeProfile} title="" />
          </>
        ) : (
          <ProfileButton onClick={manageProfile} className="mt-8" buttonType="secondary">Manage Profile</ProfileButton>
        )}
      </section>
    </>
  );
}

function ProfileButton({
  buttonType = "primary",
  ...props
}: {
  buttonType?: "primary" | "secondary";
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`${
        buttonType === "primary"
          ? "bg-gray-100 text-black hover:bg-red-500 hover:text-white"
          : "border border-white text-gray-100 hover:text-white"
      } py-2 px-4 text-xl ${props.className}`}
    >
      {props.children}
    </button>
  );
}

function ProfileCard({ edit,onEditClick }: { edit: boolean,onEditClick:()=>void }) {
  return (
    <section className="flex flex-col place-items-center gap-2 cursor-pointer hover:text-gray-400 ">
      <section className="relative h-[10vw] min-w-[84px] max-w-[200px] w-[10vw] min-h-[84px] max-h-[200px] overflow-hidden rounded-md hover:border-4 hover:border-gray-100 ">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User Profile image"
        />
        {edit ? (
          <button className="absolute inset-0 grid place-items-center bg-black/50 " onClick={onEditClick}>
            <BiPencil className="w-[25%] text-white text-3xl" />
          </button>
        ) : null}
      </section>
      <h1 className="text-xl">Profile name</h1>
    </section>
  );
}

function AddProfile() {
  return (
    <section className="flex cursor-pointer flex-col place-items-center">
      <button className="grid place-items-center h-[10vw] min-w-[84px] max-w-[200px] w-[10vw] min-h-[84px] max-h-[200px] overflow-hidden rounded-md hover:border-4 hover:border-gray-100 ">
        <FaPlusCircle className="text-6xl" />
      </button>
    </section>
  );
}

function EditProfile(props: {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  title: string;
  edit?: boolean;
}) {

  const heading = props.edit? "Edit Profile": "Add Profile";
  function cancleEdit(){
    props.onClose(false)
  }

  return (
    <YoutubeModal {...props}>
      <section className="h-screen w-screen">
        <section className="mx-auto my-16 max-w-4xl">
          <h2 className="mb-4 text-6xl">{ heading }</h2>
          <section className="grid grid-cols-[200px_auto] gap-4 border-b p-4 text-gray-200">
            <section>
              <img src={Netflixlogo} alt="profile Image" />
            </section>
            <section>
              <input type="text" className="w-full bg-zinc-500 p-2 outline-none" placeholder="Enter the name for the profile" />
            </section>
          </section>
          <section className="mt-8 flex gap-4">
            <ProfileButton>Save</ProfileButton>
            <ProfileButton buttonType="secondary" onClick={cancleEdit} >Cancle</ProfileButton>
          </section>

        </section>
      </section>
    </YoutubeModal>
  );
}
