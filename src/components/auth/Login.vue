<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-5">
    <!-- Main content -->
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-8 sm:p-8 border">
      <div class="mb-6 md:mb-8 flex justify-center">
        <img src="/src/assets/images/berCareer-logo.png" alt="Logo" class="h-20" />
      </div>

      <form class="space-y-4 md:space-y-6">
        <!-- Email input -->
        <div>
          <label class="block text-gray-700 text-sm md:text-md font-bold mb-2" for="email">
            Email
          </label>
          <div :class="['input input-bordered flex items-center gap-2 bg-white w-full', { 'input-error': emailError }]">
            <input
              ref="emailInput"
              type="email"
              class="grow text-gray-600 w-full"
              v-model="email"
              placeholder="Enter your email"
              @input="validateEmail"
            />
          </div>
          <p v-if="emailError" class="text-red-500 text-xs mt-2 ml-1">{{ emailError }}</p>
        </div>

        <!-- Password input -->
        <div>
          <label class="block text-gray-700 text-sm md:text-md font-bold mb-2" for="password">
            Password
          </label>
          <div :class="['input input-bordered flex items-center gap-2 bg-white w-full', { 'input-error': passwordError }]">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="grow text-gray-600 w-full"
              v-model="password"
              placeholder="Enter your password"
              @input="validatePassword"
            />
            <i
              :class="showPassword ? 'fas fa-eye h-4 w-4 text-gray-400 cursor-pointer' : 'fas fa-eye-slash h-4 w-4 text-gray-400 cursor-pointer'"
              @click="togglePassword"
            ></i>
          </div>
          <p v-if="passwordError" class="text-red-500 text-xs mt-2 ml-1">{{ passwordError }}</p>
        </div>

        <!-- Sign In button -->
        <div class="flex flex-col items-center justify-center pt-2">
          <button
            v-if="!buttonLogin"
            type="submit"
            class="w-full bg-primary text-white font-bold py-2.5 px-4 rounded-xl hover:bg-primaryHover focus:outline-none transition-colors"
            @click.prevent="loginUser"
          >
            Sign In
          </button>
          <span :class="buttonLogin ? 'loading loading-dots loading-lg text-primary' : ''"></span>
        </div>

        <!-- Divider -->
        <div :class="buttonLogin ? 'hidden' : 'flex items-center'">
          <hr class="flex-grow border-t border-gray-300" />
          <span class="px-4 text-sm text-gray-600">or</span>
          <hr class="flex-grow border-t border-gray-300" />
        </div>

        <!-- Google Login Button -->
        <div :class="buttonLogin ? 'hidden' : 'flex justify-center'">
          <button type="button" class="w-full flex font-semibold items-center justify-center gap-2 bg-white text-black py-2.5 px-4 rounded-xl hover:bg-gray-100 focus:outline-none border-[1.4px] border-gray-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-5 h-5">
              <!-- Google icon SVG here -->
            </svg>
            Continue with Google
          </button>
        </div>

        <div :class="buttonLogin ? 'hidden' : 'text-center sm:text-left'">
          <span class="text-sm text-gray-600">
            Don’t have an account? 
            <router-link to="register" class="text-primary hover:text-primaryHover font-semibold transition-colors">Register</router-link>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { login } from "../../Services/Api/AuthService"; // Mengimpor service API login
import Swal from "sweetalert2"; // Mengimpor SweetAlert2

export default {
  setup() {
    const email = ref("");
    const emailError = ref("");
    const password = ref("");
    const passwordError = ref("");
    const showPassword = ref(false);
    const buttonLogin = ref(false);
    const router = useRouter();

    // Validasi input email
    const validateEmail = () => {
      if (!email.value) {
        emailError.value = "Email is required!";
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = "Invalid email address, use format example@domain.com!";
      } else {
        emailError.value = "";
      }
    };

    // Validasi input password
    const validatePassword = () => {
      if (!password.value) {
        passwordError.value = "Password is required!";
      } else {
        passwordError.value = "";
      }
    };

    // Fungsi untuk login
    const loginUser = async () => {
      validateEmail();
      validatePassword();

      // Jika tidak ada error, lanjutkan dengan login
      if (!emailError.value && !passwordError.value) {
        buttonLogin.value = true;
        try {
          const userData = {
            email: email.value,
            password: password.value,
          };
          // Memanggil API login dan mengirim data
          const response = await login(userData);

          console.log("Login successful:", response);

          localStorage.setItem('authToken', response.data);

          // Menampilkan toast
          Swal.fire({
            toast: true,
            position: "top-end", // Posisi di pojok kanan atas
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 1500, // Menampilkan toast selama 1.5 detik
            timerProgressBar: true,
            didClose: () => {
              router.push({ name: "Home" });
            },
          });
        } catch (error) {
          // Tampilkan pesan error jika login gagal
          Swal.fire({
            title: error.response.data.message,
            icon: "error",
            confirmButtonText: "OK",
          });
          buttonLogin.value = false;
        }
      }
    };

    // Fungsi untuk toggle visibility password
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      email,
      emailError,
      password,
      passwordError,
      showPassword,
      buttonLogin,
      validateEmail,
      validatePassword,
      loginUser, // Menggunakan loginUser untuk login
      togglePassword,
    };
  },
  mounted() {
    // Fokuskan input email setelah komponen dimuat
    this.$nextTick(() => {
      this.$refs.emailInput.focus();
    });
  },
};
</script>
