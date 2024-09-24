import prisma from "@/app/utils/db";
import Link from "next/link";
import React from "react";
import AddLink from "./add-link";
import { requireUser } from "@/app/require-user";

const Items = async ({ slug }: { slug: any }) => {
  try {
    const user = await requireUser();
    const userData = await prisma.user.findUnique({
      where: { slug: slug },
    });
    if (!userData) {
      return <div>User not found</div>;
    }

    const userLinks = await prisma.link.findMany({
      where: {
        userId: userData.id,
      },
    });
    return (
      <div className="flex flex-col gap-5 w-full">
        {userLinks?.map((item) => (
          <Link
            className="p-5 border border-white/50 rounded-2xl w-full text-center flex flex-row items-center justify-center gap-4 capitalize hover:bg-[#77B0AA] duration-300"
            key={item.id}
            href={item.link}
          >
            {item.title}
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching user data or links:", error);
    return <div>Something went wrong. Please try again later.</div>;
  }
};

export default Items;
