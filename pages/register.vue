<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { setAlert } from "~/helpers/globalVariable";
import { useField, useForm } from 'vee-validate';
import { navigateTo } from "nuxt/app";
import * as yup from 'yup';

const authStore = useAuthStore();

const schema = yup.object({
  name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  password_confirmation: yup.string().min(6, 'Password confirmation must be at least 6 characters').required('Password confirmation is required'),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField('name');
const { value: username, errorMessage: usernameError } = useField('username');
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');
const { value: password_confirmation, errorMessage: passwordConfirmationError } = useField('password_confirmation');

const register = handleSubmit(async (values) => {
  await authStore.register(values);
  if (authStore.status_code === 200) {
    setAlert('Successfully register account', 'Register');
    navigateTo('/login')
  }
});
</script>

<template>
  <div>
    <section class="register">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card-auth">
            <h5 class="auth-title">Register</h5>
            <form @submit="register">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" name="name" class="form-control" id="name" placeholder="Enter your name" v-model="name"/>
                <p class="invalid-label">{{ nameError }}</p>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" name="username" class="form-control" id="username" placeholder="Enter your username" v-model="username"/>
                <p class="invalid-label">{{ usernameError }}</p>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" name="email" class="form-control" id="email" placeholder="Enter your email" v-model="email"/>
                <p class="invalid-label">{{ emailError }}</p>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="password" placeholder="Enter your password" v-model="password"/>
                <p class="invalid-label">{{ passwordError }}</p>
              </div>
              <div class="mb-3">
                <label for="password_confirmation" class="form-label">Password Confirmation</label>
                <input type="password" name="password_confirmation" class="form-control" id="password_confirmation" placeholder="Enter your password confirmation" v-model="password_confirmation"/>
                <p class="invalid-label">{{ passwordConfirmationError }}</p>
              </div>
              <button type="submit" class="button-dark text-center w-100 text-center">Register Account</button>
              <p class="text-redirect mt-4 text-center">Already have account? <NuxtLink to="/login">Login</NuxtLink></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
