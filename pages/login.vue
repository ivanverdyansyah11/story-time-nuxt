<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStore = useAuthStore();
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { alertMessage, alertPage } from "~/helpers/globalVariable";
import {navigateTo} from "nuxt/app";

const schema = yup.object({
  identifier: yup.string().required('Identifier is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
});

const { value: identifier, errorMessage: identifierError } = useField('identifier');
const { value: password, errorMessage: passwordError } = useField('password');

const login = handleSubmit( async (values) => {
  await authStore.login(values);
  if (authStore.status_code === 200) {
    navigateTo('/')
  }
});
</script>

<template>
  <div>
    <section class="login">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div v-if="alertPage == 'Register'" class="alert alert-success w-100" role="alert">
            {{ alertMessage }}
          </div>
          <div class="card-auth">
            <h5 class="auth-title">Login</h5>
            <form @submit="login">
              <div class="mb-3">
                <label for="identifier" class="form-label">Email/ Username</label>
                <input type="text" name="identifier" class="form-control" id="identifier" placeholder="Enter your email or username" v-model="identifier"/>
                <p class="invalid-label">{{ identifierError }}</p>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="password" placeholder="Enter your password" v-model="password"/>
                <p class="invalid-label">{{ passwordError }}</p>
              </div>
              <button type="submit" class="button-dark text-center w-100 text-center">Login Account</button>
              <p class="text-redirect mt-4 text-center">Don't have an account yet? <NuxtLink to="/register">Register</NuxtLink></p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
