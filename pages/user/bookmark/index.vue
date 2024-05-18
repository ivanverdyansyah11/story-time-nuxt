<template>
  <div>
    <section class="user">
      <div class="row justify-content-center">
        <SidebarUser />
        <div class="col-6">
          <div class="card-user">
            <h5 class="header-title mb-0">My Bookmark</h5>
            <div class="wrapper-body">
              <div class="row row-cols-1 row-cols-md-2 g-3 g-lg-4 mt-4 mt-md-0">
                <div class="col">
                  <a href="#" class="card w-100" style="width: 18rem">
                    <div class="wrapper-image position-relative">
                      <img
                        src="~/assets/images/story/story-sample.jpg"
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
                        <h6 class="card-title">Lorem ipsum dolor sit amet.</h6>
                        <p class="card-caption">Caption</p>
                        <p class="card-caption">Caption</p>
                        <p class="card-caption">Caption</p>
                        <p class="card-tag">Romance</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
