import {
  Platform,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import colors from "./shared/colors";
import { useAuth, useUser, useSSO } from "@clerk/clerk-expo"; //18. import useSSO
import { useCallback, useEffect, useState } from "react";
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
  const { isSignedIn } = useAuth()//16. redirect if signed in

  const router = useRouter(); //23. add  const router
  const { user } = useUser();
  console.log(user?.primaryEmailAddress?.emailAddress)
  const [loading, setLoading] = useState(true);  //24. add loading state

  useEffect(() => { //16. redirect if signed in
    if (isSignedIn) { 
    }
    if (!isSignedIn != undefined) { //24. check for undefined
      setLoading(false)
    }
  }, [isSignedIn])


  useWarmUpBrowser() //20. use the useWarmUpBrowser hook

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
        paddingTop: Platform.OS == "android" ? 40 : 30, //2. add padding for android status bar
        justifyContent: "center",
      }}
    >
      <Image
        source={require("./../assets/images/Little Dreamtime.jpg")} //3.add image
        style={{
          width: Dimensions.get("screen").width * 0.85, //4. add style
          height: 280,
          resizeMode: "contain",
        }}
      />
      <View>
        <Text                 //5. add welcome text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
            color: colors.primary, //7. use colors file
          }}
        >
          Welcome
        </Text>
        <Text //8. add subtitle
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
      {/* 25. only show button when not loading */}
      {!loading && <TouchableOpacity //9. add button view first //10.change to TouchableOpacity
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
      </TouchableOpacity>}


      {loading && //26. show loading indicator
      <ActivityIndicator size={"large"}/>
      }
    </View>
  );
}
