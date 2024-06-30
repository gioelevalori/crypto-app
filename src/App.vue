<template>
  <header class="bg-gray-800 text-white p-4">
    <nav class="container mx-auto flex justify-between items-center">
      <div class="text-2xl font-bold">
        <router-link to="/">CryptoApp</router-link>
      </div>
    </nav>
  </header>
  <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>
