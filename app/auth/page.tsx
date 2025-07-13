"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "../components/Toast";
import Card from "../components/card";
import TextInput from "../components/input";
import Button from "../components/button";
import styles from "./page.module.sass";
import { useUser } from "../hooks/useUser";
import { useRouter } from "next/navigation";
// Yup validation schema
const loginSchema = yup
  .object({
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^09\d{9}$/, "Please enter a valid phone number"),
  })
  .required();

type LoginFormData = yup.InferType<typeof loginSchema>;

export default function Page() {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();
  const phoneNumber = watch("phoneNumber");
  const { login } = useUser();

  const onSubmit = async () => {
    try {
      await login().then((user) => {
        toast.success(`Welcome ${user.name.first}`);
        router.push("/");
      });
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Enter your phone number to continue</p>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.inputGroup}>
              <TextInput
                value={phoneNumber || ""}
                onChange={(value) => setValue("phoneNumber", value)}
                placeholder="Enter your phone number"
                type="tel"
                name="phoneNumber"
              />
              {errors.phoneNumber && (
                <span className={styles.error}>
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
