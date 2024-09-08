import { Link } from "expo-router";
import {
  View,
  ScrollView,
  Image,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSignUp } from "@hooks";
import { images } from "@constants";
import { CustomButton, FormField } from "@components";

const SignUp = () => {
  const { form, submit, changeForm, isSubmitting } = useSignUp();

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <KeyboardAvoidingView behavior="padding">
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
              handleChangeText={(text) => changeForm("username", text)}
            />
            <FormField
              title="Email"
              value={form.email}
              otherStyles="mt-7"
              keyboardType="email-address"
              handleChangeText={(text) => changeForm("email", text)}
            />
            <FormField
              title="Password"
              value={form.password}
              otherStyles="mt-7"
              handleChangeText={(text) => changeForm("password", text)}
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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
