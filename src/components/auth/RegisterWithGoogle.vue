<template>
  <div>
    <h1>test</h1>
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

    // Check the token first, if its deleted manually then call this function to logout the auth0
    // auth0.logout({
    //       logoutParams: {
    //         returnTo: window.location.origin
    //       }
    //     });

    // If the user that has google account reset password, send password to email registered
    // By creating a new backend API that needed ooauthId and email
    // The API will return the randomized password
    // Send the password to the email registered

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
        await createUserGoogle(user);
        loginUser(loginData);
        router.push("/login");
      } catch (error) {
        console.log(user);
        if (error.response.data.statusCode == 409) {
          loginUser(loginData);
        } else {
          Swal.fire({
            title: "Error!",
            text: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
          }).then(() => {
            // Redirect to home page after user clicks OK
            router.push("/");
          });
        }
      }
    };

    const loginUser = async (data) => {
      try {
        // Call the login API and send data
        const response = await loginGoogle(data);
        localStorage.setItem("authToken", response.data);
        Swal.fire({
          title: "Registration successful!",
          text: "You can log in now.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Redirect to home page after user clicks OK
          router.push("/login");
        });
      } catch (error) {
        console.error("Error logging in user:", error);
      }
    };

    return {};
  },
};
</script>

<style lang="scss" scoped></style>
