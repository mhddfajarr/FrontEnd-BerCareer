<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-5">
    <!-- Main content -->
    <div
      class="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-8 sm:p-8 border"
    >
      <div
        class="mb-6 md:mb-8 flex flex-col items-center text-center justify-center"
      >
        <div class="w-fit items-center p-5">
          <img
            src="/src/assets/images/berCareer-logo.png"
            alt="Logo"
            class="h-20 items-center justify-center"
          />
        </div>
        <div v-if="!errorText">
          <!-- <h1 class="text-lg">Redirecting you in, please wait</h1> -->
          <div v-if="loginState">
            <p class="text-green-500">Login Success!</p>
          </div>
          <div v-else>
            <h1>Signing in<span class="dots"></span></h1>
            <span class="loading loading-dots loading-lg text-primary'"></span>
          </div>
        </div>
        <div v-else>
          <p class="text-red-500 mt-2 ml-1">Error : {{ errorText }}</p>
          <p>Redirecting you back<span class="dots"></span></p>
          <span class="loading loading-lg loading-dots text-primary"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { createUserGoogle, loginGoogle } from "../../Services/Api/AuthService"; // Import createUserGoogle and loginGoogle functions
import Swal from "sweetalert2";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const userRef = ref(null);
    const router = useRouter();
    const errorText = ref(null);
    const loginState = ref(false);

    // Watch for changes in isLoading and isAuthenticated
    watch(
      [isLoading, isAuthenticated],
      ([newIsLoading, newIsAuthenticated]) => {
        if (!newIsLoading && newIsAuthenticated) {
          userRef.value = user.value;
          registerUser();
        }
      }
    );

    // If the user that has google account reset password, send password to email registered
    // B̶y̶ c̶r̶e̶a̶t̶i̶n̶g̶ a̶ n̶e̶w̶ b̶a̶c̶k̶e̶n̶d̶ A̶P̶I̶ t̶h̶a̶t̶ n̶e̶e̶d̶e̶d̶ o̶o̶a̶u̶t̶h̶I̶d̶ a̶n̶d̶ e̶m̶a̶i̶l̶
    // T̶h̶e̶ A̶P̶I̶ w̶i̶l̶l̶ r̶e̶t̶u̶r̶n̶ t̶h̶e̶ r̶a̶n̶d̶o̶m̶i̶z̶e̶d̶ p̶a̶s̶s̶w̶o̶r̶d̶
    // Send the password to the email registered through backend when user is created

    const generateRandomPassword = (length) => {
      const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      return password;
    };

    const registerUser = async () => {
      const user = {
        oauthId: userRef.value?.sub,
        firstName: userRef.value?.given_name,
        lastName: userRef.value?.family_name,
        profileImage: userRef.value?.picture,
        email: userRef.value?.email,
        password: generateRandomPassword(8),
      };
      const loginData = {
        oauthId: userRef.value?.sub,
        email: user.email,
      };
      try {
        console.log(user);
        // Create account based on google info
        await createUserGoogle(user);
        //Then try login it
        loginUser(loginData);
        router.push("/");
      } catch (error) {
        if (error.response.data.statusCode == 409) {
          loginUser(loginData);
        } else {
          // Show with p instead
          errorText.value = error.response.data.message;
          // wait for 3 seconds
          setTimeout(() => {
            router.push("/");
          }, 3000);
          // router.push("/");
        }
      }
    };

    const loginUser = async (data) => {
      try {
        // Call the login API and send data
        const response = await loginGoogle(data);
        localStorage.setItem("authToken", response.data);
        loginState.value = true;
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/");
      } catch (error) {
        // console.error("Error logging in user:", error);
        errorText.value = error.response.data.message;
        // wait for 3 seconds
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    };

    return { errorText, loginState };
  },
};
</script>

<style scoped>
@keyframes dots {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: black;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
  }
}

.dots::after {
  content: ".";
  animation: dots 1s steps(5, end) infinite;
}
</style>
