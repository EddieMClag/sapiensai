/**
 * Serverless example: /api/uploadImage
 * - Placeholder to accept multipart/form-data (file upload).
 * - Vercel's serverless environment may require different parsing. This example outlines logic but is not a full parser.
 * - For production, use a cloud storage signed upload (S3, GCS) and return the stored file URL.
 */

export const config = {
  api: { bodyParser: false }
}

export default async function handler(req, res){
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'})
  // This is a placeholder: parsing multipart in serverless needs a library like busboy or formidable.
  return res.status(501).json({error:'Not implemented. Use signed uploads to cloud storage (S3/GCS) or parse multipart with formidable'})
}
