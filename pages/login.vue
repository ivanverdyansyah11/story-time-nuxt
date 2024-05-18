<template>
  <div>
    <section class="login">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card-auth">
            <h5 class="auth-title">Login</h5>
            <form>
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
              <button
                type="button"
                class="button-dark text-center w-100 text-center"
              >
                Login Account
              </button>
              <p class="text-redirect mt-4 text-center">
                Don't have an account yet?
                <NuxtLink to="/register">Register</NuxtLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
