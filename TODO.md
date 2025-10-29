# TODO: Push Project to GitHub and Deploy to Surge.sh

## Steps to Complete

- [x] Initialize Git repository
- [x] Add all files to Git
- [x] Commit changes with message "Initial commit"
- [x] Set remote origin to <https://github.com/Seotsanyana/Student-Feedback-System.git>
- [x] Push to GitHub
- [x] Update next.config.mjs for static export (add output: 'export')
- [x] Build project for static export
- [x] Install Surge CLI
- [x] Deploy to Surge.sh

## Notes

- API routes (e.g., /api/feedback) will not function on Surge.sh as it is static hosting. Consider using Vercel or Netlify for full functionality.
- Ensure .gitignore excludes node_modules, .next, etc.
