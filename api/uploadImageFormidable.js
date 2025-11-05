/**
 * Upload endpoint using formidable to parse multipart/form-data
 * - For Vercel: ensure 'engines' and dependencies are set; large file uploads may require different approaches.
 * - This saves the uploaded file to /tmp and returns a temporary URL (not persisted).
 */
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: { bodyParser: false, sizeLimit: '10mb' }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const form = formidable({ multiples: false, uploadDir: '/tmp', keepExtensions: true });
  form.parse(req, (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });
    const file = files.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });
    // For demo: return file path and a fake analysis result
    return res.status(200).json({
      filename: file.originalFilename || file.newFilename,
      path: file.filepath || file.path,
      analysis: 'Exemplo: imagem recebida. Aqui iriam os passos de processamento com um modelo de visão.'
    });
  });
}
