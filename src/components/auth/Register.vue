<template>
    <div class="min-h-screen bg-slate-50 flex items-center justify-center p-5">
      <!-- Main content -->
      <div class="w-full max-w-md bg-white rounded-lg border shadow-md p-6 mb-8 sm:p-8">
        <div class="mb-6 md:mb-8 flex justify-center">
          <img src="/src/assets/images/berCareer-logo.png" alt="Logo" class="h-20" />
        </div>
  
        <form class="space-y-4 md:space-y-6">
          <!-- First Name -->
          <div>
            <label class="block text-gray-700 text-sm md:text-md font-bold mb-2" for="firstName">
              First Name
            </label>
            <div :class="['input  input-bordered flex items-center gap-2 bg-white w-full', { 'input-error': firstNameError }]">
              <input
                ref="firstNameInput"
                type="text"
                class="grow text-gray-600 w-full"
                v-model="firstName"
                placeholder="Enter your First Name"
                @input="validateFirstName"
              />
            </div>
            <p v-if="firstNameError" class="text-red-500 text-xs mt-2 ml-1">{{ firstNameError }}</p>
          </div>

          <!-- Last Name -->
          <div>
            <label class="block text-gray-700 text-sm md:text-md font-bold mb-2" for="firstName">
              Last Name
            </label>
            <div :class="['input input-bordered flex items-center gap-2 bg-white w-full', { 'input-error': lastNameError }]">
              <input
                type="text"
                class="grow text-gray-600 w-full"
                v-model="lastName"
                placeholder="Enter your Last Name"
                @input="validateLastName"
              />
            </div>
            <p v-if="lastNameError" class="text-red-500 text-xs mt-2 ml-1">{{ lastNameError }}</p>
          </div>
  
          <!-- Email input -->
          <div>
            <label class="block text-gray-700 text-sm md:text-md font-bold mb-2" for="email">
              Email
            </label>
            <div :class="['input input-bordered flex items-center gap-2 bg-white w-full', { 'input-error': emailError }]">
              <input
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

          <!-- repeatPassword input -->
          <div>
            <label class="block text-gray-700 text-sm md:text-md font-bold mb-2" for="repeatPassword">
              Repeat Password
            </label>
            <div :class="['input input-bordered flex items-center gap-2 bg-white w-full', { 'input-error': repeatPasswordError }]">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="grow text-gray-600 w-full"
                v-model="repeatPassword"
                placeholder="Repeat Your Password"
                @input="validateRepeatPassword"
              />
              <i
                :class="showPassword ? 'fas fa-eye h-4 w-4 text-gray-400 cursor-pointer' : 'fas fa-eye-slash h-4 w-4 text-gray-400 cursor-pointer'"
                @click="togglePassword"
              ></i>
            </div>
            <p v-if="repeatPasswordError" class="text-red-500 text-xs mt-2 ml-1">{{ repeatPasswordError }}</p>
          </div>
  
          <!-- Sign In button -->
          <div class="flex flex-col items-center justify-center pt-2">
            <button
              v-if="!buttonLogin"
              type="submit"
              class="w-full bg-primary text-white font-bold py-2.5 px-4 rounded-xl hover:bg-primaryHover focus:outline-none transition-colors"
              @click.prevent="login"
            >
              Register
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
            <button
              type="button"
              class="w-full flex font-semibold items-center justify-center gap-2 bg-white text-black py-2.5 px-4 rounded-xl hover:bg-gray-100 focus:outline-none border-[1.4px] border-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-5 h-5">
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              Continue with Google
            </button>
          </div>
  
          <div :class="buttonLogin ? 'hidden' : 'text-center sm:text-left'">
            <span class="text-sm text-gray-600">
              Already have an account?
              <RouterLink to="login" class="text-primary hover:text-primaryHover font-semibold transition-colors">sign in</RouterLink>
            </span>
          </div>
        </form>
      </div>
    </div>
  </template>
<script>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

export default {
  setup() {
    const firstName = ref('');
    const firstNameError = ref('');
    const lastName = ref('');
    const lastNameError = ref('');
    const email = ref('');
    const emailError = ref('');
    const password = ref('');
    const passwordError = ref('');
    const repeatPassword = ref('');
    const repeatPasswordError = ref('');
    const showPassword = ref(false);
    const buttonLogin = ref(false);

    const validateFirstName = () => {
      if (!firstName.value) {
        firstNameError.value = "First name is required!";
      } else {
        firstNameError.value = ""; 
      }
    };
    const validateLastName = () => {
      if (!lastName.value) {
        lastNameError.value = "Last Name is required!";
      } else {
        lastNameError.value = ""; 
      }
    };

    const validateEmail = () => {
      if (!email.value) {
        emailError.value = "Email is required!";
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = "Email must be a valid email address!";
      } else {
        emailError.value = ""; 
      }
    };

    const validatePassword = () => {
      if (!password.value) {
        passwordError.value = "Password is required!";
      } else {
        passwordError.value = ""; 
      }
    };

    const validateRepeatPassword = () => {
      if (!repeatPassword.value) {
        repeatPasswordError.value = "Repeat Password is required!";
      } else if(repeatPassword.value !== password.value){
        repeatPasswordError.value = "repeat password must be the same as password!";
      }else {
        repeatPasswordError.value = ""; 
      }
    };

    const login = () => {
      validateFirstName();
      validateLastName();
      validateEmail();
      validatePassword();
      validateRepeatPassword();
      if (!firstNameError.value && !emailError.value && !passwordError.value) {
        buttonLogin.value = true;
        // Perform login logic here
      }
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      email,
      emailError,
      password,
      passwordError,
      repeatPassword,
      repeatPasswordError,
      showPassword,
      buttonLogin,
      validateFirstName,
      validateLastName,
      validateEmail,
      validatePassword,
      validateRepeatPassword,
      login,
      togglePassword
    };
  },mounted() {
    // Fokuskan input email setelah komponen dimuat
    this.$nextTick(() => {
      this.$refs.firstNameInput.focus();
    });
  },
};
</script>
