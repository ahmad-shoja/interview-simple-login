"use client";
import { useRouter } from "next/navigation";
import Button from "./components/button";
import { useUser } from "./hooks/useUser";
import styles from "./page.module.sass";
import { useEffect } from "react";

export default function Home() {
  const { logout, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/auth");
  }, [user]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to the App {user?.name.first} {user?.name.last}
      </h1>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
}
