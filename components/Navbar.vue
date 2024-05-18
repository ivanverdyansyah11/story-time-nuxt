<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
    <div class="container">
      <NuxtLink class="navbar-brand" to="/">
        <img
          src="~/assets/images/brand/brand-logo.svg"
          alt="Brand Logo"
          height="40"
        />
      </NuxtLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarNavAltMarkup"
      >
        <div class="navbar-nav gap-2 mt-4 pb-4">
          <NuxtLink href="/register" class="button-outline-dark text-center"
            >Register</NuxtLink
          >
          <NuxtLink href="/login" class="button-dark text-center"
            >Login</NuxtLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>
