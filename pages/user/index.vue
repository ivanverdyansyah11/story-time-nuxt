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
              <NuxtLink to="/user/edit" class="button-outline-dark"
                >Edit Profile</NuxtLink
              >
            </div>
            <div class="wrapper-body">
              <div class="row">
                <div class="col-4">
                  <img
                    src="~/assets/images/story/story-sample.jpg"
                    class="profile-image"
                    alt="Profile Image"
                  />
                </div>
                <div class="col-8 d-flex flex-column gap-3">
                  <div class="wrapper-data d-flex">
                    <p>Name</p>
                    <p>Ivan Verdyansyah</p>
                  </div>
                  <div class="wrapper-data d-flex">
                    <p>Email</p>
                    <p>ivanverdyansyah@gmail.com</p>
                  </div>
                  <div class="wrapper-data d-flex">
                    <p>Biodata</p>
                    <p>-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
