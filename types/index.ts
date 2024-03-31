import {
  DomisiliUsaha,
  Kelahiran,
  Kematian,
  KeteranganBelumMenikah,
  KeteranganSuamiIstri,
  KeteranganUsaha,
  Letter,
  PengantarSKCK,
  TidakMampu,
  TidakMampuSekolah,
  TinggalPenduduk,
  User,
} from "@prisma/client";

export interface ChildrenType {
  children: Readonly<React.ReactNode>;
}
export interface LetterAllRelation extends Letter {
  user: User;
  domisiliUsaha: DomisiliUsaha | null;
  tinggalPenduduk: TinggalPenduduk | null;
  kelahiran: Kelahiran | null;
  kematian: Kematian | null;
  tidakMampuSekolah: TidakMampuSekolah | null;
  pengantarSKCK: PengantarSKCK | null;
  keteranganUsaha: KeteranganUsaha | null;
  tidakMampu: TidakMampu | null;
  keteranganSuamiIstri: KeteranganSuamiIstri | null;
  keteranganBelumMenikah: KeteranganBelumMenikah | null;
}
