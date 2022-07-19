import React from "react";
import { getSession, GetSessionParams } from "next-auth/react";
import { Session } from "next-auth";
import ContactsScreen from "../components/ContactsScreen";

function UserContacts() {
  return (
    <div className="bg-drk w-full h-full ">
      <ContactsScreen />
    </div>
  );
}
export async function getServerSideProps(context: GetSessionParams) {
  const session: Session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/Login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default UserContacts;
