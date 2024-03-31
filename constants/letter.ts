export type FormulirType =
  | "Domisili Usaha"
  | "Tinggal Penduduk"
  | "Kelahiran"
  | "Kematian"
  | "Tidak Mampu (Sekolah)"
  | "Pengantar SKCK"
  | "Usaha"
  | "Tidak Mampu (Umum)"
  | "Suami Istri"
  | "Belum Menikah";

export const formulirList = [
  "Domisili Usaha",
  "Tinggal Penduduk",
  "Kelahiran",
  "Kematian",
  "Tidak Mampu (Sekolah)",
  "Pengantar SKCK",
  "Usaha",
  "Tidak Mampu (Umum)",
  "Suami Istri",
  "Belum Menikah",
];

export const tableHeadDomisiliUsaha = [
  "User",
  "Pemilik",
  "Alamat",
  "Jenis",
  "Nama",
  "Nik",
  "Foto KTP",
  "Foto",
  "Dibuat",
];

export const tableHeadTinggalPenduduk = [
  "User",
  "Nama",
  "NIK",
  "Tempat Lahir",
  "Tanggal Lahir",
  "Alamat Asal",
  "Alamat Sekarang",
  "Foto KTP",
  "Foto KK",
  "Dibuat",
];

export const tableHeadKelahiran = [
  "User",
  "Jenis Kelamin",
  "Tanggal Lahir",
  "Tempat Lahir",
  "Agama",
  "Nama Ayah",
  "Tempat Lahir Ayah",
  "Tanggal Lahir Ayah",
  "Agama Ayah",
  "Pekerjaan Ayah",
  "Nama Ibu",
  "Tempat Lahir Ibu",
  "Tanggal Lahir Ibu",
  "Agama Ibu",
  "Pekerjaan Ibu",
  "Foto KTP Ayah",
  "Foto KTP Ibu",
  "Foto KK",
  "Dibuat",
];

export const tableHeadKematian = [
  "User",
  "Nama",
  "NIK",
  "Tanggal Lahir",
  "Tanggal Kematian",
  "Tempat Lahir",
  "Jenis Kelamin",
  "Alamat",
  "Agama",
  "Pekerjaan",
  "Alamat Kematian",
  "Tempat Kematian",
  "Foto KTP",
  "Foto KK",
  "Dibuat",
];

export const tableHeadTidakMampuSekolah = [
  "User",
  "Nama",
  "Tempat Lahir",
  "Tanggal Lahir",
  "Jenis Kelamin",
  "Agama",
  "Alamat",
  "Alasan Tidak Mampu",
  "Nama Ayah",
  "NIK Ayah",
  "Tempat Lahir Ayah",
  "Tanggal Lahir Ayah",
  "Agama Ayah",
  "Pekerjaan Ayah",
  "Foto KTP Ayah",
  "Foto Rumah",
  "Dibuat",
];

export const tableHeadPengantarSKCK = [
  "User",
  "Nama",
  "NIK",
  "Jenis Kelamin",
  "Tempat Lahir",
  "Tanggal Lahir",
  "Alamat",
  "Pekerjaan",
  "Keperluan",
  "Foto KTP",
  "Dibuat",
];

export const tableHeadKeteranganUsaha = [
  "User",
  "Nama",
  "NIK",
  "Tempat Lahir",
  "Tanggal Lahir",
  "Agama",
  "Pekerjaan",
  "Alamat",
  "Foto Usaha",
  "Nama Usaha",
  "Jenis Usaha",
  "Lokasi Usaha",
  "Foto KTP",
  "Dibuat",
];

export const tableHeadTidakMampu = [
  "User",
  "Nama",
  "NIK",
  "Jenis Kelamin",
  "Tempat Lahir",
  "Tanggal Lahir",
  "Agama",
  "Alasan Tidak Mampu",
  "Pendapatan",
  "Alamat",
  "Pekerjaan",
  "Foto KTP",
  "Foto Rumah",
  "Keperluan",
  "Dibuat",
];

export const tableHeadKeteranganSuamiIstri = [
  "User",
  "Nama Suami",
  "NIK Suami",
  "Tempat Lahir Suami",
  "Tanggal Lahir Suami",
  "Agama Suami",
  "Alamat Suami",
  "Pekerjaan Suami",
  "Nama Istri",
  "NIK Istri",
  "Tempat Pernikahan",
  "Tanggal Pernikahan",
  "Agama Istri",
  "Alamat Istri",
  "Pekerjaan Istri",
  "Foto KTP Suami",
  "Foto KTP Istri",
  "Foto Buku Nikah",
  "Dibuat",
];

export const tableHeadKeteranganBelumMenikah = [
  "User",
  "Nama",
  "Tempat Lahir",
  "Tanggal Lahir",
  "Agama",
  "Alamat",
  "Pekerjaan",
  "NIK",
  "Foto KTP",
  "Foto KK",
  "Foto Akta Kelahiran",
  "Dibuat",
];
