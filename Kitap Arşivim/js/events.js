// js/events.js

import { kitapService } from "./services/kitapService.js";
import { renderKitaplar } from "./ui.js";

export function registerEvents() {
  // Form, modallar ve butonlar için DOM referansları
  const form = document.getElementById("kitapForm");
  const silModal = new bootstrap.Modal(document.getElementById("silModal"));
  const duzenleModal = new bootstrap.Modal(document.getElementById("duzenleModal"));
  let silinecekID = null; // Silinecek kitabın ID'sini geçici olarak saklar

  // Kitap ekleme formu gönderildiğinde çalışır
  form.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(form); // Form verilerini al
    const yeni = {
      id: Date.now(),
      ad: fd.get("ad"),
      yazar: fd.get("yazar"),
      tur: fd.get("tur"),
      kapak: fd.get("kapak"),
      okundu: document.getElementById("okundu").checked ? "Okundu" : "Bilinmiyor"
    };
    kitapService.add(yeni); // Kitabı ekle
    form.reset(); // Formu sıfırla
    renderKitaplar(); // Listeyi yeniden çiz
  });

  // Kitap listesi üzerinde tıklama olaylarını dinler
  document.getElementById("kitapListesi").addEventListener("click", e => {
    const id = parseInt(e.target.dataset.id);
    const action = e.target.dataset.action;
    if (!id || !action) return;

    if (action === "delete") {
      // Silme işlemi için ID'yi ata ve modalı aç
      silinecekID = id;
      silModal.show();
    }

    if (action === "edit") {
      // Kitabı bul ve modal alanlarını doldur
      const kitap = kitapService.getAll().find(k => k.id === id);
      document.getElementById("duzenleID").value = kitap.id;
      document.getElementById("duzenleAdi").value = kitap.ad;
      document.getElementById("duzenleYazar").value = kitap.yazar;
      document.getElementById("duzenleTur").value = kitap.tur;
      document.getElementById("duzenleKapak").value = kitap.kapak;
      document.getElementById("duzenleOkundu").checked = kitap.okundu === "Okundu";
      document.getElementById("duzenleOkunmadi").checked = kitap.okundu === "Okunmadı";
      duzenleModal.show();
    }
  });

  // Silme onay butonuna basıldığında çalışır
  document.getElementById("silOnayBtn").addEventListener("click", () => {
    kitapService.delete(silinecekID); // Kitabı sil
    renderKitaplar(); // Listeyi güncelle
    silModal.hide(); // Modalı kapat
  });

  // Düzenleme formu gönderildiğinde
  document.getElementById("duzenleForm").addEventListener("submit", e => {
    e.preventDefault();
    const guncel = {
      id: parseInt(document.getElementById("duzenleID").value),
      ad: document.getElementById("duzenleAdi").value,
      yazar: document.getElementById("duzenleYazar").value,
      tur: document.getElementById("duzenleTur").value,
      kapak: document.getElementById("duzenleKapak").value,
      okundu: document.getElementById("duzenleOkundu").checked
        ? "Okundu"
        : document.getElementById("duzenleOkunmadi").checked
        ? "Okunmadı"
        : "Bilinmiyor"
    };
    kitapService.update(guncel); // Güncellenmiş kitabı kaydet
    renderKitaplar(); // Listeyi güncelle
    duzenleModal.hide(); // Modalı kapat
  });

  // Modal içi checkbox'ları radio gibi çalıştırır
  ["duzenleOkundu", "duzenleOkunmadi"].forEach(id => {
    document.getElementById(id).addEventListener("change", function () {
      const other = id === "duzenleOkundu" ? "duzenleOkunmadi" : "duzenleOkundu";
      if (this.checked) document.getElementById(other).checked = false;
    });
  });
} 
