<template>
  <div class="box_login">
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-sm bg-white rounded-2xl shadow-xl p-6">
        <h1 class="text-2xl font-bold text-gray-800 text-center mb-6">Register</h1>

        <form class="space-y-4">
          <!-- username -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700"
              >username</label
            >
            <input
              required
              v-model="form.username"
              class="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              v-model="form.password"
              required
              class="mt-1 block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <!-- Remember + Forgot Password -->
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2">
              <input type="checkbox" class="rounded border-gray-300" />
              Remember me
            </label>
            <a href="#" class="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <!-- Submit Button -->
          <button
            type="button"
            @click="register()"
            class="w-full bg-blue-600 text-white py-2.5 rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Register
          </button>
        </form>

        <!-- Register Link -->
        <p class="text-center text-sm text-gray-600 mt-4">
          Don't have an account?
          <a href="#" class="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { userRoute } from "~/composables/routes/user";
import { ifetch } from "@/components/ifetch";

interface registerForm {
  username: string;
  password: string;
}

const form = reactive<registerForm>({
  username: "",
  password: "",
});

const register = async () => {
  const res = await ifetch(userRoute.register, form);
  if (res.status == 200) {
    form.username = "";
    form.password = "";
  }
};

const onReset = () => {
  (form.username = ""), (form.password = "");
  return;
};
</script>
