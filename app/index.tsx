import {
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  Touchable,
  TouchableOpacity,
} from "react-native";
import colors from "./shared/colors";
import { useAuth, useUser, useSSO } from "@clerk/clerk-expo";
import { use, useCallback, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
import { useRouter } from "expo-router";




export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
 
      void WebBrowser.warmUpAsync()
    

    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()


export default function Index() {
  const { isSignedIn } = useAuth()
  const router = useRouter();
  const { user } = useUser();
  console.log(user?.primaryEmailAddress?.emailAddress)
  useEffect(() => {
    if (isSignedIn) {
    }
  }, [isSignedIn])


  useWarmUpBrowser()

  // Use the `useSSO()` hook to access the `startSSOFlow()` method
  const { startSSOFlow } = useSSO()

  const onLoginPress = useCallback(async () => {
    try {
      // Start the authentication process by calling `startSSOFlow()`
      const { createdSessionId, setActive, signIn, signUp } = await startSSOFlow({
        strategy: 'oauth_google',
        // For web, defaults to current path
        // For native, you must pass a scheme, like AuthSession.makeRedirectUri({ scheme, path })
        // For more info, see https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturioptions
        redirectUrl: AuthSession.makeRedirectUri(),
      })

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({
          session: createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/custom-flows/overview#session-tasks
              console.log(session?.currentTask)
              return
            }

            router.push('/')
          },
        })
      } else {
        // If there is no `createdSessionId`,
        // there are missing requirements, such as MFA
        // Use the `signIn` or `signUp` returned from `startSSOFlow`
        // to handle next steps
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS == "android" ? 40 : 30,
        justifyContent: "center",
      }}
    >
      <Image
        source={require("./../assets/images/Little Dreamtime.jpg")}
        style={{
          width: Dimensions.get("screen").width * 0.85,
          height: 280,
          resizeMode: "contain",
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
            color: colors.primary,
          }}
        >
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 18,
            textAlign: "center",
            marginTop: 10,
            color: colors.text,
          }}
        >
          to the Little Dreamtime App
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: "100%",
          padding: 15,
          backgroundColor: colors.primary,
          borderRadius: 5,
        }}
        onPress={onLoginPress}>
        <Text style={{ textAlign: "center", color: colors.text }}>
          Get Startedd
        </Text>
      </TouchableOpacity>
    </View>
  );
}
