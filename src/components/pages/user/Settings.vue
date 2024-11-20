<template>
  <div class="p-6 flex flex-col justify-center w-full md:w-2/3 mx-auto">
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-full mx-auto">
      <div v-if="isGoogle">
        <div v-if="!isVerified">
          <!--? Warning text -->
          <div role="alert" class="alert m-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="stroke-info h-6 w-6 shrink-0"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                stroke="#0A4D80"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span
              >Your account is created from Google sign in, get your temporary
              password from your email</span
            >
          </div>
        </div>
      </div>
      <h2 class="text-2xl font-bold text-left text-gray-700 mb-6">
        Change Password
      </h2>

      <!-- Form -->
      <form @submit.prevent="submitForm" id="formChangePassword">
        <!-- Old Password -->
        <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <label
            for="oldPassword"
            class="w-full sm:w-1/3 text-sm font-semibold text-gray-600 mb-2 sm:mb-0"
            >Old Password</label
          >
          <input
            :type="showPassword ? 'text' : 'password'"
            id="oldPassword"
            v-model="oldPassword"
            class="w-full sm:w-2/3 px-4 py-2 bg-white text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryHover focus:border-transparent"
            placeholder="Enter your old password"
            required
          />
        </div>

        <!-- New Password -->
        <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <label
            for="newPassword"
            class="w-full sm:w-1/3 text-sm font-semibold text-gray-600 mb-2 sm:mb-0"
            >New Password</label
          >
          <input
            :type="showPassword ? 'text' : 'password'"
            id="newPassword"
            v-model="newPassword"
            class="w-full sm:w-2/3 px-4 py-2 bg-white text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryHover focus:border-transparent"
            placeholder="Enter your new password"
            required
          />
        </div>

        <!-- Repeat Password -->
        <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
          <label
            for="repeatPassword"
            class="w-full sm:w-1/3 text-sm font-semibold text-gray-600 mb-2 sm:mb-0"
            >Repeat Password</label
          >
          <div class="w-full sm:w-2/3">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="repeatPassword"
              v-model="repeatPassword"
              class="w-full px-4 py-2 bg-white text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryHover focus:border-transparent"
              placeholder="Repeat your new password"
              required
            />
            <div
              v-if="repeatPassword && validationMessage"
              class="text-red-500 text-xs mt-1"
            >
              {{ validationMessage }}
            </div>
          </div>
        </div>

        <!-- Show Password Checkbox -->
        <div class="mb-4 flex items-center justify-start sm:justify-end">
          <input
            type="checkbox"
            id="showPassword"
            v-model="showPassword"
            class="mr-2"
          />
          <label for="showPassword" class="text-sm font-semibold text-gray-600"
            >Show Passwords</label
          >
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center mb-4">
          <button
            v-if="buttonSubmit"
            type="submit"
            class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primaryHover focus:ring-offset-2"
          >
            Change Password
          </button>
          <span
            v-if="!buttonSubmit"
            class="loading loading-dots loading-lg text-primary"
          ></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import {
  changePassword,
  getProfileUser,
  checkGoogleUser,
} from "../../../Services/Api/UserService";
import { decodeToken } from "../../../Services/JWT/JwtDecode";
import Swal from "sweetalert2";

export default {
  setup() {
    const id = ref("");
    const oldPassword = ref("");
    const newPassword = ref("");
    const repeatPassword = ref("");
    const showPassword = ref(false);
    const buttonSubmit = ref(true);
    const dataProfile = ref({});
    const isGoogle = ref(false);
    const isVerified = ref(false);

    const validationMessage = computed(() => {
      if (repeatPassword.value && repeatPassword.value !== newPassword.value) {
        return "Repeat password must match the new password";
      }
      return "";
    });

    const submitForm = async () => {
      if (validationMessage.value) {
        return;
      }
      buttonSubmit.value = false;
      const dataPassword = {
        userId: id.value,
        oldPassword: oldPassword.value,
        newPassword: newPassword.value,
      };
      try {
        await changePassword(dataPassword);
        resetForm();
        await checkGoogleStatus();
        await fetchProfileUser();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Success change password!",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
        buttonSubmit.value = true;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Invalid old password!",
            showConfirmButton: true,
          });
          buttonSubmit.value = true;
        }
      }
    };

    // Fetch user profile data
    const fetchProfileUser = async () => {
      try {
        const userId = id.value;
        const data = await getProfileUser(userId);
        dataProfile.value = data.data;
        if (dataProfile.value && dataProfile.value.postDate) {
          dataProfile.value.postDate = moment(
            dataProfile.value.postDate
          ).format("MMMM DD, YYYY");
        }
        // console.log(dataProfile.value);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const checkGoogleStatus = async () => {
      try {
        const userId = id.value;
        const data = await checkGoogleUser(userId);
        if (data.data.isGoogle) {
          isGoogle.value = true;
        }
        if (data.data.isVerified) {
          isVerified.value = true;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const resetForm = () => {
      oldPassword.value = "";
      newPassword.value = "";
      repeatPassword.value = "";
    };

    const getUserId = async () => {
      try {
        const dataUser = await decodeToken();
        id.value = dataUser.uid;
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    };

    onMounted(async () => {
      await getUserId();
      await fetchProfileUser();
      await checkGoogleStatus();
    });

    return {
      id,
      oldPassword,
      newPassword,
      repeatPassword,
      showPassword,
      validationMessage,
      submitForm,
      resetForm,
      buttonSubmit,
      isGoogle,
      isVerified,
    };
  },
};
</script>

<style></style>
