<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '~/stores/category';
import { useStoryStore } from '~/stores/story';
import { useForm, useField } from 'vee-validate';
import { useNuxtApp } from '#app';
import { navigateTo } from 'nuxt/app';
import * as yup from 'yup';
import { setAlert } from "~/helpers/globalVariable";

definePageMeta({
  layout: 'user',
})

const categoryStore = useCategoryStore();
const storyStore = useStoryStore();
const contentEditor = ref(null);
const createDataImage = ref('https://placehold.co/600x400?text=Image+Not+Found');
const file = ref(null);

const schema = yup.object({
  title: yup.string().required('Title is required'),
  category: yup.number().required('Category is required'),
  content: yup.string().required('Content is required'),
  cover_image: yup.mixed().required('Cover image is required'),
});

const { handleSubmit, resetForm, setValues } = useForm({
  validationSchema: schema,
});

const { value: title, errorMessage: titleError } = useField('title');
const { value: category, errorMessage: categoryError } = useField('category');
const { value: content, errorMessage: contentError } = useField('content');
const { value: cover_image, errorMessage: coverImageError } = useField('cover_image');

const previewImage = (e: any) => {
  file.value = e.target.files[0];
  cover_image.value = file.value;
  if (!file.value) return;
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") {
      createDataImage.value = reader.result;
    }
    e.target.value = "";
  };
  reader.readAsDataURL(file.value);
}

const submitCreate = handleSubmit(async (values) => {
  try {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('category', values.category);
    formData.append('content', values.content);
    formData.append('cover_image', values.cover_image);

    await storyStore.createStory(formData);

    if (storyStore.status_code === 200 && file.value) {
      setAlert('Successfully create new story', 'Story');
      await storyStore.getAllStory();
      const formDataImage = new FormData();
      formDataImage.append('files', file.value);
      formDataImage.append('refId', storyStore.storyAll[0].id);
      formDataImage.append('ref', 'api::story.story');
      formDataImage.append('field', 'cover_image');

      try {
        await storyStore.uploadImageStory(formDataImage);
        navigateTo('/user/story')
      } catch (error) {
        console.error(error.message);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
});

await categoryStore.getAllCategory();
onMounted(() => {
  const { $Quill } = useNuxtApp();
  const quill = new $Quill(contentEditor.value, {
    theme: 'snow',
    placeholder: 'Enter your content...',
  });

  quill.on('text-change', () => {
    setValues({
      content: quill.root.innerHTML,
    });
  });
});
</script>

<template>
  <div class="col-6">
    <div class="card-user">
      <h5 class="header-title mb-3 d-flex align-items-center gap-2">
        <NuxtLink to="/user/story" style="color: rgba(52, 52, 52, 1); font-size: 1.125rem;"><font-awesome-icon :icon="['fas', 'arrow-left']" /></NuxtLink>
        Create New Story
      </h5>
      <div class="wrapper-body">
        <form @submit="submitCreate" enctype="multipart/form-data">
          <div class="row">
            <div class="col-12">
              <div class="mb-2">
                <label for="title" class="form-label">Title</label>
                <input type="text" name="title" class="form-control" id="title" placeholder="Enter your title" v-model="title" />
                <p class="invalid-label">{{ titleError }}</p>
              </div>
              <div class="mb-2">
                <label for="category" class="form-label">Category</label>
                <select class="form-control" id="category" v-model="category">
<!--                  <option value="">Select category story</option>-->
                  <option v-for="category in categoryStore.categoryAll" :value="category.id">{{ category.name }}</option>
                </select>
                <p class="invalid-label">{{ categoryError }}</p>
              </div>
              <div class="mb-2">
                <label for="content" class="form-label">Content</label>
                <div ref="contentEditor" style="height: 100px;"></div>
                <p class="invalid-label">{{ contentError }}</p>
              </div>
              <div class="mb-2 d-flex gap-3 align-items-end">
                <div class="wrapper d-flex flex-column">
                  <label for="cover_image" class="form-label">Thumbnail Story</label>
                  <img :src="createDataImage" class="profile-image" alt="Profile Image" style="border-radius: 4px;"/>
                </div>
                <div class="wrapper">
                  <input type="file" name="cover_image" id="image" class="input-hide" @change="previewImage" />
                  <label for="image" class="button-outline-dark w-100 text-center mt-3">Choose Image</label>
                  <p class="invalid-label">{{ coverImageError }}</p>
                </div>
              </div>
              <div class="d-flex gap-2 justify-content-end">
                <NuxtLink to="/user/story" class="button-outline-dark">Cancel Add</NuxtLink>
                <button type="submit" class="button-dark">Add Story</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
