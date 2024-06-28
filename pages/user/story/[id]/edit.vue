<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCategoryStore } from '~/stores/category';
import { useStoryStore } from '~/stores/story';
import { Form, useForm, useField } from 'vee-validate';
import { useNuxtApp, useRoute, navigateTo } from '#app';
import { imageUrl, setAlert } from "~/helpers/globalVariable";
import * as yup from "yup";

definePageMeta({
  layout: 'user',
})

const categoryStore = useCategoryStore();
const storyStore = useStoryStore();
const contentEditor = ref(null);
const updateDataImage = ref();
const route = useRoute();
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
const storyId = route.params.id;

const previewImage = (e:any) => {
  file.value = e.target.files[0];
  cover_image.value = file.value;
  if (!file.value) return;
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") {
      updateDataImage.value = reader.result;
    }
    e.target.value = "";
  };
  reader.readAsDataURL(file.value);
}

const loadStory = async () => {
  await storyStore.getStoryById(storyId);
  const story = storyStore.story;
  setValues({
    title: story.title,
    category: story.category.id,
    content: story.content,
    cover_image: story.cover_image ? story.cover_image.url : null,
  });
  updateDataImage.value = story.cover_image ? imageUrl + story.cover_image.url : 'https://placehold.co/600x400?text=Image+Not+Found';
};

const submitUpdate = handleSubmit(async (values) => {
  try {
    const updateFormStory = {
      data: {
        title: values.title,
        category: values.category,
        content: values.content,
      }
    };
    await storyStore.updateStory(storyId, updateFormStory);

    if (storyStore.status_code === 200) {
      setAlert('Successfully update story', 'Story');
      if (file.value) {
        if (storyStore.story?.cover_image?.id) {
          await storyStore.removeStoryImage(storyStore.story.cover_image.id);
        }
        await storyStore.getAllStory();

        const formDataImage = new FormData();
        formDataImage.append('files', file.value);
        formDataImage.append('refId', storyStore.storyAll[0].id);
        formDataImage.append('ref', 'api::story.story');
        formDataImage.append('field', 'cover_image');

        try {
          await storyStore.uploadImageStory(formDataImage);
          navigateTo('/user/story');
        } catch (error) {
          console.error(error.message);
        }
      } else {
        navigateTo('/user/story');
      }
    }
  } catch (error) {
    console.error(error.message);
  }
});

await categoryStore.getAllCategory();
await loadStory();

onMounted(() => {
  const { $Quill } = useNuxtApp();
  const quill = new $Quill(contentEditor.value, {
    theme: 'snow',
    placeholder: 'Enter your content...',
  });
  quill.root.innerHTML = content.value;
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
        Edit Story
      </h5>
      <div class="wrapper-body">
        <form @submit="submitUpdate" enctype="multipart/form-data">
          <div class="row">
            <div class="col-12">
              <div class="mb-2">
                <label for="title" class="form-label">Title</label>
                <input type="text" name="title" class="form-control" id="title" placeholder="Enter your title" v-model="title" />
                <p class="invalid-label">{{ titleError }}</p>
              </div>
              <div class="mb-2">
                <label for="category" class="form-label">Category</label>
                <select required class="form-control" id="category" v-model="category">
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
                  <img :src="updateDataImage" class="profile-image" alt="Profile Image" style="border-radius: 4px;"/>
                </div>
                <div class="wrapper">
                  <input type="file" name="cover_image" id="image" class="input-hide" @change="previewImage" />
                  <label for="image" class="button-outline-dark w-100 text-center mt-3">Choose Image</label>
                  <p class="invalid-label">{{ coverImageError }}</p>
                </div>
              </div>
              <div class="d-flex gap-2 justify-content-end">
                <NuxtLink to="/user/story" class="button-outline-dark">Cancel Edit</NuxtLink>
                <button type="submit" class="button-dark">Save Changes</button>
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
