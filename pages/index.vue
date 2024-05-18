<script setup lang="js">
import { useStoryStore } from '~/stores/story'
import { formatDateTime } from '~/helpers/formatDate.ts'
import { imageUrl } from "~/helpers/globalVariable";
const stories = useStoryStore();
stories.getAllStory()
</script>

<template>
  <div>
    <section
      class="hero d-flex justify-content-center align-items-center flex-column"
    >
      <h1 class="headline text-center">
        Welcome to <span><span>st</span>orytime</span>
      </h1>
      <h3 class="sub-headline mt-4 mt-md-2 text-center">
        The world's most-loved social storytelling platform. <br />
        Story time connects a global community of 90 million readers and writers
        through the power of story.
      </h3>
    </section>
    <section class="story">
      <div class="row justify-content-between">
        <div class="col-md-5 col-lg-4 col-xl-3">
          <div class="input-group mb-3">
            <input
              type="search"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <button type="button" class="input-group-text" id="basic-addon1">
              <svg
                width="408"
                height="408"
                viewBox="0 0 408 408"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1862_2)">
                  <path
                    class="search-icon"
                    d="M-0.430176 389.44C2.37982 385.49 4.69982 381.05 8.06982 377.67C41.1898 344.54 74.4798 311.59 107.72 278.59C108.94 277.37 110.23 276.22 111.83 274.71C110.14 272.45 108.59 270.36 107.02 268.29C89.0898 244.54 78.1598 217.94 74.5398 188.38C68.7198 140.86 81.0398 98.2703 111.18 61.4103C139.08 27.2903 175.35 6.89026 219.33 1.29026C266.94 -4.76974 309.72 7.61024 346.73 37.8302C380.87 65.7102 401.17 101.97 406.95 145.92C411.75 182.44 404.83 216.81 387.22 249.09C383.48 255.95 376.88 259.47 370.17 258.29C363.17 257.06 357.61 251.91 357.08 244.67C356.81 240.95 357.88 236.69 359.62 233.34C367.43 218.34 372.98 202.67 375.18 185.87C379.12 155.89 373.84 127.58 359.07 101.22C344.22 74.7203 322.64 55.3402 294.88 43.0602C276.12 34.7602 256.35 31.0603 235.83 31.8903C206.8 33.0703 180.61 42.3703 157.72 60.3203C129.38 82.5503 112.12 111.53 106.69 147.17C101.44 181.62 108.57 213.68 127.92 242.59C147.34 271.59 174.24 290.65 208.24 299.04C241.18 307.16 272.87 303.28 303.17 287.97C306.23 286.43 309.4 284.71 312.71 284.13C320.39 282.78 327.57 287.34 330.06 294.46C332.66 301.91 329.81 310.13 322.34 313.79C312.46 318.62 302.48 323.57 292.05 326.9C250.94 340.02 210.37 337.65 171.16 319.7C159.54 314.38 149.09 306.52 138.11 299.8C136.89 299.05 135.77 298.14 134.43 297.18C133.23 298.32 132.16 299.29 131.15 300.3C97.5298 333.68 63.9698 367.11 30.2298 400.38C26.9198 403.65 22.5798 405.87 18.7198 408.58C16.5898 408.58 14.4598 408.58 12.3298 408.58C5.89983 406.5 1.6498 402.22 -0.450195 395.8C-0.430195 393.69 -0.430176 391.56 -0.430176 389.44Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1862_2">
                    <rect width="408" height="408" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
        <div class="col-md-5 col-lg-4 col-xl-3">
          <select class="form-select" aria-label="Default select example">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      <div
        class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 g-lg-4 mt-4 mt-md-0"
      >
        <div
          class="col"
          v-for="(story, index) in stories.storyList"
          :key="index"
        >
          <NuxtLink
            :to="'/story/' + story.id"
            class="card w-100"
            style="width: 18rem"
          >
            <div class="wrapper-image position-relative">
              <img
                :src="imageUrl + story.cover_image.url"
                class="card-img-top thumbnail-story position-relative"
                alt="Story Thumbnail"
              />
              <div
                class="wrapper-icon position-absolute d-flex align-items-center justify-content-center"
              >
                <div class="bookmark-icon bookmark-add"></div>
              </div>
            </div>
            <div class="card-body">
              <div class="card-text">
                <div
                  class="wrapper d-flex align-items-center gap-3 justify-content-between mb-1"
                >
                  <h6 class="card-title">{{ story.title }}</h6>
                  <p class="card-caption" style="text-wrap: nowrap">
                    by {{ story.author.name }}
                  </p>
                </div>
                <p class="card-caption description mb-1">{{ story.content }}</p>
                <p class="card-caption date">
                  {{ formatDateTime(story.createdAt) }}
                </p>
                <p class="card-tag">{{ story.category.name }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="row justify-content-center mt-4">
        <div class="col-12 d-flex justify-content-center">
          <button type="button" class="button-outline-dark text-center">
            Load More
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
