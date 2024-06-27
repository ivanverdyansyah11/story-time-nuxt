<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { imageUrl, setAlert } from '~/helpers/globalVariable';
import { navigateTo } from "nuxt/app";
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

definePageMeta({
  layout: 'user',
})

const authStore = useAuthStore();
const profileDataImage = ref();
const file = ref(null);
const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  biodata: yup.string().required('Biodata is required'),
});

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField('name');
const { value: email, errorMessage: emailError } = useField('email');
const { value: biodata, errorMessage: biodataError } = useField('biodata');

const fetchUser = async () => {
  await authStore.loadUserFromCookies();
  const userLogin = authStore.user;
  if (userLogin) {
    setValues({
      name: userLogin.name,
      email: userLogin.email,
      biodata: userLogin.biodata,
    });
    profileDataImage.value = userLogin.profile_picture !== null ? imageUrl + userLogin.profile_picture.url : 'https://placehold.co/600x400?text=Image+Not+Found';
  }
};

const previewImage = (event: any) => {
  file.value = event.target.files[0];
  if (!file.value) return;
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") {
      profileDataImage.value = reader.result;
    }
    event.target.value = "";
  };
  reader.readAsDataURL(file.value);
};

const saveChanges = handleSubmit(async (values) => {
  try {
    const updateFormProfile = {
      name: values.name,
      biodata: values.biodata,
    };
    await authStore.updateProfile(updateFormProfile);

    if (authStore.status_code === 200) {
      setAlert('Successfully update profile', 'Update');
      if (file.value) {
        if (authStore.user?.profile_picture?.id) {
          await authStore.removeProfilePicture(authStore.user.profile_picture.id);
        }

        const formDataImage = new FormData();
        formDataImage.append('files', file.value);
        formDataImage.append('refId', authStore.user?.id);
        formDataImage.append('ref', 'plugin::users-permissions.user');
        formDataImage.append('field', 'profile_picture');

        try {
          await authStore.uploadProfilePicture(formDataImage);
          navigateTo('/user');
        } catch (error) {
          console.error(error.message);
        }
      } else {
        navigateTo('/user');
      }
    } else {
      console.log('Failed to update profile.')
    }
  } catch (error) {
    console.error(error.message);
  }
});

onMounted(fetchUser);
</script>

<template>
  <div class="col-6">
    <div class="card-user">
      <div class="wrapper-header d-flex align-items-center justify-content-between">
        <h5 class="header-title mb-0">My Profile</h5>
        <NuxtLink to="/user/edit" class="button-outline-dark" :class="{ 'd-none': $route.path === '/user/edit' }">Edit Profile</NuxtLink>
      </div>
      <div class="wrapper-body">
        <Form @submit="saveChanges" enctype="multipart/form-data">
          <div class="row">
            <div class="col-4 d-flex align-items-center flex-column">
              <img :src="profileDataImage" class="profile-image" alt="Profile Image"/>
              <input type="file" name="profile_picture" id="image" class="input-hide" @change="previewImage"/>
              <label for="image" class="button-outline-dark w-100 text-center mt-3">Choose Image</label>
            </div>
            <div class="col-8">
              <div class="mb-2">
                <label for="name" class="form-label">Name</label>
                <input required type="text" name="name" class="form-control" id="name" placeholder="Enter your name" v-model="name">
                <p class="invalid-label">{{ nameError }}</p>
              </div>
              <div class="mb-2">
                <label for="email" class="form-label">Email</label>
                <input readonly type="email" class="form-control" id="email" placeholder="Enter your email" v-model="email"/>
                <p class="invalid-label">{{ emailError }}</p>
              </div>
              <div class="mb-4">
                <label for="biodata" class="form-label">Biodata</label>
                <textarea class="form-control" id="biodata" placeholder="Enter your biodata" rows="4" v-model="biodata"></textarea>
                <p class="invalid-label">{{ biodataError }}</p>
              </div>
              <div class="d-flex gap-2 justify-content-end">
                <NuxtLink to="/user" class="button-outline-dark">Cancel</NuxtLink>
                <button type="submit" class="button-dark">Save Changes</button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
