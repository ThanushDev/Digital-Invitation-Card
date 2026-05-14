import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// NOTE: Change 'your-repo-name' to your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/Digital-Invitation-Card/',
})
