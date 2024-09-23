"use server";
import { redirect } from "next/navigation";
import { requireUser } from "./require-user";
import prisma from "@/app/utils/db";

// Create Section

export const ForExampleDemo = async (prevState: any, formData: FormData) => {
  const user = await requireUser();
  const givenName = (formData.get("given_name") as string) || "";
  const email = (formData.get("email") as string) || "";
  const surname = (formData.get("surname") as string) || "";
  const username = (formData.get("username") as string) || "";
  const slug = (formData.get("slug") as string) || "";
  const type = (formData.get("type") as string) || "";
  const orgName = (formData.get("orgname") as string) || "";

  try {
    const response = await prisma.user.create({
      data: {
        id: user.id,
        email: email,
        name: givenName,
        surname: surname,
        username: username,
        slug: slug,
        type: type,
        orgname: orgName,
      },
    });

    return redirect(`/${slug}`);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const AddNewLink = async (prevState: any, formData: FormData) => {
  const user = await requireUser();
  const title = (formData.get("title") as string) || "";
  const link = (formData.get("link") as string) || "";

  try {
    const response = await prisma.link.create({
      data: {
        title: title,
        link: link,
        userId: user.id,
      },
    });
    return response;
  } catch (error) {
    console.error("Error creating link:", error);
  }
};
