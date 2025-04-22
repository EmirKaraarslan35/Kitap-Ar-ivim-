// js/services/kitapService.js

// kitapService adında bir nesne oluşturuyoruz ve tüm veritabanı işlemlerini burada tutuyoruz
export const kitapService = {
  // Tüm kitapları getirir (localStorage'dan JSON olarak)
  getAll() {
    const data = localStorage.getItem("kitapArsiv");
    return data ? JSON.parse(data) : [];
  },

  // Yeni kitap ekler
  add(kitap) {
    const liste = this.getAll(); // mevcut kitapları getir
    liste.push(kitap); // yeni kitabı diziye ekle
    this.save(liste); // güncel listeyi kaydet
  },

  // Kitap güncelleme (ID'ye göre)
  update(updated) {
    const liste = this.getAll().map(k => k.id === updated.id ? updated : k);
    this.save(liste);
  },

  // Kitap silme (ID'ye göre)
  delete(id) {
    const liste = this.getAll().filter(k => k.id !== id);
    this.save(liste);
  },

  // localStorage'a veri kaydeder
  save(data) {
    localStorage.setItem("kitapArsiv", JSON.stringify(data));
  }
};
