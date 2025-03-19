import Link from "next/link";
import { ThemeToggle } from "../actions/ThemeToggle";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import { api } from "@/utils";

export const Header = () => {
  const { data: user } = api.user.getProfile.useQuery();
  return (
    <header className="flex w-full items-center justify-between px-5 py-3">
      <Link href={"/"}>
        <Heading size={"h3"}>UD WIJAYAKUSUMA</Heading>
      </Link>
      <div className="flex items-center gap-5">
        {user ? (
          <Link href={"/dashboard"}>
            <Button variant={"outline"} size={"sm"}>
              Dashboard
            </Button>
          </Link>
        ) : (
          <Link href={"/login"}>
            <Button variant={"outline"} size={"sm"}>
              Login
            </Button>
          </Link>
        )}

        <ThemeToggle />
      </div>
    </header>
  );
};
