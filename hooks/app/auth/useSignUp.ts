import { useState } from "react";
import { router } from "expo-router";
import { Alert } from "react-native";

import { useGlobalContext } from "@context";
import { createUser, getCurrentUser } from "@lib";

export const useSignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { login } = useGlobalContext();

  const changeForm = (key: keyof typeof form, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  const submit = async () => {
    if (Object.values(form).some((value) => !value)) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await createUser(form);
      const result = await getCurrentUser();

      if (!result) {
        Alert.alert("Error", "Login failed. Please try again.");
        router.replace("/sign-in");
        return;
      }

      login(result);
      router.replace("/home");
    } catch (err) {
      if (typeof err === "string") Alert.alert("Error", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    submit,
    changeForm,
    isSubmitting,
  };
};
