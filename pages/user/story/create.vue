<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useCategoryStore } from '~/stores/category';
import { useStoryStore } from '~/stores/story';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useNuxtApp, useRouter } from '#app';

definePageMeta({
  layout: 'user',
})

const categoryStore = useCategoryStore();
const storyStore = useStoryStore();
const contentEditor = ref(null);
const createDataImage = ref('https://placehold.co/600x400?text=Image+Not+Found');
const file = ref(null);
const router = useRouter();

const previewImage = (e:any) => {
  file.value = e.target.files[0];
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

const createDataInput = reactive({
  title: '',
  category: '',
  content: ''
});

const submitCreate = async () => {
  try {
    const formData = new FormData();
    formData.append('title', createDataInput.title);
    formData.append('category', createDataInput.category);
    formData.append('content', createDataInput.content);

    await storyStore.createStory(formData);

    if (storyStore.status_code === 200 && file.value) {
      await storyStore.getAllStory();

      const formDataImage = new FormData();
      formDataImage.append('files', file.value);
      formDataImage.append('refId', storyStore.storyAll[0].id);
      formDataImage.append('ref', 'api::story.story');
      formDataImage.append('field', 'cover_image');

      try {
        await storyStore.uploadImageStory(formDataImage);
        router.push('/user/story');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  } catch (error) {
    console.error('Error creating story:', error);
  }
};

await categoryStore.getAllCategory();
onMounted(() => {
  const { $Quill } = useNuxtApp();
  const quill = new $Quill(contentEditor.value, {
    theme: 'snow',
    placeholder: 'Enter your content...',
  });

  quill.on('text-change', () => {
    createDataInput.content = quill.root.innerHTML;
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
        <Form @submit="submitCreate" enctype="multipart/form-data">
          <div class="row">
            <div class="col-12">
              <div class="mb-2">
                <label for="title" class="form-label">Title</label>
                <Field type="text" name="title" class="form-control" id="title" placeholder="Enter your title" v-model="createDataInput.title" />
                <ErrorMessage name="title" class="invalid-label" />
              </div>
              <div class="mb-2">
                <label for="category" class="form-label">Category</label>
                <select required class="form-control" id="category" v-model="createDataInput.category">
                  <option value="">Select category story</option>
                  <option v-for="category in categoryStore.categoryAll" :value="category.id">{{ category.name }}</option>
                </select>
              </div>
              <div class="mb-2">
                <label for="content" class="form-label">Content</label>
                <div ref="contentEditor" style="height: 100px;"></div>
              </div>
              <div class="mb-2 d-flex gap-3 align-items-end">
                <div class="wrapper d-flex flex-column">
                  <label for="cover_image" class="form-label">Thumbnail Story</label>
                  <img :src="createDataImage" class="profile-image" alt="Profile Image" style="border-radius: 4px;"/>
                </div>
                <div class="wrapper">
                  <Field type="file" name="cover_image" id="image" class="input-hide" @change="previewImage" />
                  <label for="image" class="button-outline-dark w-100 text-center mt-3">Choose Image</label>
                  <ErrorMessage name="cover_image" class="invalid-label" />
                </div>
              </div>
              <div class="d-flex gap-2 justify-content-end">
                <NuxtLink to="/user/story" class="button-outline-dark">Cancel Add</NuxtLink>
                <button type="submit" class="button-dark">Add Story</button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
