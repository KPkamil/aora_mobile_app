import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  ScrollView,
  Image,
  Text,
  KeyboardAvoidingView,
} from "react-native";

import { images } from "@constants";
import { useSignIn } from "@hooks";
import { CustomButton, FormField } from "@components";

const SignIn = () => {
  const { form, submit, changeForm, isSubmitting } = useSignIn();

  return (
    <SafeAreaView className="bg-primary h-full">
      <KeyboardAvoidingView behavior="padding">
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
              handleChangeText={(text) => changeForm("email", text)}
            />
            <FormField
              title="Password"
              value={form.password}
              otherStyles="mt-7"
              handleChangeText={(text) => changeForm("password", text)}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
