<template>
  <div>
    <section class="register">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card-auth">
            <h5 class="auth-title">Register</h5>
            <form>
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Enter your username"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <div class="mb-3">
                <label for="password_confirmation" class="form-label"
                  >Password Confirmation</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="password_confirmation"
                  placeholder="Enter your password confirmation"
                />
              </div>
              <button
                type="button"
                class="button-dark text-center w-100 text-center"
              >
                Register Account
              </button>
              <p class="text-redirect mt-4 text-center">
                Already have account? <NuxtLink to="/login">Login</NuxtLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
