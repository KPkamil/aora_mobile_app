import { useState } from "react";
import { Link, router } from "expo-router";
import { View, ScrollView, Image, Text, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@constants";
import { useGlobalContext } from "@context";
import { createUser, getCurrentUser } from "@lib";
import { CustomButton, FormField } from "@components";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { login } = useGlobalContext();

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

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white font-semibold mt-10 font-psemibold">
            Sign up to Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            otherStyles="mt-7"
            handleChangeText={(text) => setForm({ ...form, username: text })}
          />
          <FormField
            title="Email"
            value={form.email}
            otherStyles="mt-7"
            keyboardType="email-address"
            handleChangeText={(text) => setForm({ ...form, email: text })}
          />
          <FormField
            title="Password"
            value={form.password}
            otherStyles="mt-7"
            handleChangeText={(text) => setForm({ ...form, password: text })}
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
