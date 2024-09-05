import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Image, Text, Alert } from "react-native";

import { images } from "@constants";
import { useGlobalContext } from "@context";
import { getCurrentUser, signIn } from "@lib";
import { CustomButton, FormField } from "@components";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
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
      await signIn(form);
      const result = await getCurrentUser();

      if (!result) {
        Alert.alert("Error", "Login failed. Please try again.");
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
            Log in to Aora
          </Text>
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
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary-100"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
