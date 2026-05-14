# Digital Invitation — Single Repo, QR Built-In

## Two URLs, one project

| URL | What opens |
|-----|-----------|
| `https://USERNAME.github.io/REPO/?guest=Kamal+Perera` | Kamal ගේ invitation |
| `https://USERNAME.github.io/REPO/?admin=true` | QR generator (ඔයා විතරක්) |

---

## Deploy steps

1. `vite.config.ts` ෙල් `base` eka oya eka repo name ekak change කරන්න:
   ```ts
   base: '/your-repo-name/',
   ```

2. GitHub repo create → push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPO.git
   git push -u origin main
   ```

3. GitHub → Settings → Pages → Source = **GitHub Actions**

4. Deploy වෙලා ගිය ගමන්:
   - Admin page: `https://USERNAME.github.io/REPO/?admin=true`
   - Guest example: `https://USERNAME.github.io/REPO/?guest=Kamal+Perera`

---

## QR code workflow

1. Admin URL open කරන්න browser ෙල්
2. Guest names 25 ක් type කරන්න
3. **Generate** → QR codes appear වෙනවා
4. **Print All** → browser print dialog → cut → hand over
5. Individual **Save** → PNG download (WhatsApp share කරන්නත් පුළුවන්)

---

## Local dev

```bash
npm install
npm run dev
# Admin: http://localhost:5173/?admin=true
# Guest: http://localhost:5173/?guest=Test+Guest
```
