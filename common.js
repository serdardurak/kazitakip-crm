// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// KAZI TAKÄ°P CRM â€” Ortak YapÄ±landÄ±rma
// TÃ¼m sayfalar (index.html, app.html, abonelik.html, super-admin.html)
// bu dosyayÄ± <script src="common.js"></script> ile yÃ¼kler.
// Supabase baÄŸlantÄ± bilgisi TEK yerden yÃ¶netilir.
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

const SUPABASE_URL = 'https://wqqdcowrtlvfruvsmtew.supabase.co';
const SUPABASE_KEY = 'sb_publishable_bfPBnm138vlmJa_z4Pi95w_EsYw2zkB';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const ROL_ETIKETLERI = { yonetici: 'YÃ¶netici', saha_personeli: 'Saha Personeli', sadece_rapor: 'Sadece Rapor' };
const PLAN_ETIKETLERI = { deneme: 'Deneme SÃ¼rÃ¼mÃ¼', aktif: 'Aktif', gecikmis: 'GecikmiÅŸ Ã–deme', iptal: 'Ä°ptal Edildi' };
const KULLANICI_BASI_FIYAT = 149; // â‚º/ay â€” tek yerden deÄŸiÅŸtirilir

async function ortakOturumKontrol(girisSayfasi = 'index.html') {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) { window.location.href = girisSayfasi; return null; }
  return session;
}

async function ortakProfilYukle(userId) {
  return await sb
    .from('kullanicilar')
    .select('id, ad_soyad, email, rol, firma_id, firmalar ( ad, plan_durumu, deneme_bitis_tarihi )')
    .eq('id', userId)
    .single();
}

async function ortakCikisYap(girisSayfasi = 'index.html') {
  await sb.auth.signOut();
  window.location.href = girisSayfasi;
}
