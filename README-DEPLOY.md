        Quick deploy notes

        Vercel:
- Import the repository in Vercel.
- Set environment variables (OPENAI_API_KEY, GOOGLE_API_KEY).
- For image uploads, consider using signed uploads to S3 or GCS; serverless file storage is ephemeral.

Netlify:
- Netlify requires functions in a specific folder; adapt api/ to netlify functions or use Netlify Edge handlers.

Security:
- Never commit real API keys. Use environment variables in the hosting platform.

Gemini endpoint included: api/askGemini.js (forces Portuguese). Ensure GOOGLE_API_KEY is set in Vercel dashboard.
