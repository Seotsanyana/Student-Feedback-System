# TODO: Push Project to GitHub and Deploy to Surge.sh

## Steps to Complete

- [ ] Initialize Git repository
- [ ] Add all files to Git
- [ ] Commit changes with message "Initial commit"
- [ ] Set remote origin to <https://github.com/Seotsanyana/Student-Feedback-System.git>
- [ ] Push to GitHub
- [ ] Update next.config.mjs for static export (add output: 'export')
- [ ] Build project for static export
- [ ] Install Surge CLI
- [ ] Deploy to Surge.sh

## Notes

- API routes (e.g., /api/feedback) will not function on Surge.sh as it is static hosting. Consider using Vercel or Netlify for full functionality.
- Ensure .gitignore excludes node_modules, .next, etc.
