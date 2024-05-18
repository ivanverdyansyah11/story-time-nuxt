<template>
  <div>
    <section class="user">
      <div class="row justify-content-center">
        <SidebarUser />
        <div class="col-6">
          <div class="card-user">
            <div
              class="wrapper-header d-flex align-items-center justify-content-between"
            >
              <h5 class="header-title mb-0">My Profile</h5>
              <a
                href="#"
                class="button-outline-dark"
                :class="{ 'd-none': $route.path === '/user/edit' }"
                >Edit Profile</a
              >
            </div>
            <div class="wrapper-body">
              <form>
                <div class="row">
                  <div class="col-4 d-flex align-items-center flex-column">
                    <img
                      src="~/assets/images/story/story-sample.jpg"
                      class="profile-image"
                      alt="Profile Image"
                    />
                    <input type="file" id="image" class="input-hide" />
                    <label
                      for="image"
                      class="button-outline-dark w-100 text-center mt-3"
                      >Choose Image</label
                    >
                  </div>
                  <div class="col-8">
                    <div class="mb-2">
                      <label for="name" class="form-label">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="name"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div class="mb-2">
                      <label for="email" class="form-label">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div class="mb-4">
                      <label for="about" class="form-label">About Me</label>
                      <textarea
                        class="form-control"
                        id="about"
                        placeholder="Enter your about"
                        rows="4"
                      ></textarea>
                    </div>
                    <div class="d-flex gap-2 justify-content-end">
                      <nuxt-link to="/user" class="button-outline-dark"
                        >Cancel</nuxt-link
                      >
                      <button type="submit" class="button-dark">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
