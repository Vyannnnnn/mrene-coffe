# Merene Coffee & Eatery

Starter website multi-halaman menggunakan React + Vite + Tailwind CSS.

## Menjalankan lokal
```bash
npm install
npm run dev
```

## Build produksi
```bash
npm run build
npm run preview
```

## Halaman
- `/` Beranda
- `/menu` Menu
- `/tentang` Tentang
- `/event` Event & Lunch Box
- `/galeri` Galeri
- `/lokasi` Lokasi
- `/kontak` Kontak

## Catatan sebelum publikasi
- Nomor WhatsApp di `src/data.js` adalah kandidat dari katalog dan wajib dikonfirmasi.
- Harga contoh dan item menu di `src/data.js` harus diverifikasi dengan katalog final.
- Foto dari Unsplash adalah placeholder, bukan foto resmi Merene.
- Alamat, jam operasional, dan pin Google Maps perlu data resmi.
- Tambahkan favicon, OG image, analytics, dan SEO final setelah aset brand tersedia.

## Jika Vite masih menampilkan error export/icon lama
Hentikan server (`Ctrl+C`), lalu jalankan:
```bash
rm -rf node_modules/.vite
npm run dev -- --force
```
Jika masih bermasalah, jalankan `npm install` lagi untuk menyelaraskan dependency.
