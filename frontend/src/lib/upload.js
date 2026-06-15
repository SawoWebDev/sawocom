import { supabase } from './supabaseClient';

export async function uploadPDF(file) {
  if (!file) throw new Error("No file provided");

  const timestamp = Date.now();
  const filePath = `product-pdf/${timestamp}_${file.name}`;

  const { data, error } = await supabase.storage
    .from('product-pdf')
    .upload(filePath, file);

  if (error) throw error;

  const { data: { publicUrl } } = supabase.storage
    .from('product-pdf')
    .getPublicUrl(filePath);

  return { url: publicUrl };
}