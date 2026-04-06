import { supabase } from './supabaseClient';

export async function uploadPDF(file) {
  if (!file) throw new Error("No file provided");

  const timestamp = Date.now();
  const filePath = `product-pdf/${timestamp}_${file.name}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('product-pdf')
    .upload(filePath, file);

  if (error) throw error;

  // Return public URL
  const { publicUrl } = supabase.storage
    .from('product-pdf')
    .getPublicUrl(filePath);

  return { url: publicUrl };
}