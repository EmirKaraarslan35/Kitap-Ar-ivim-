// js/ui.js

import { kitapService } from "./services/kitapService.js";

// Kitapları HTML tabloya basan fonksiyon
export function renderKitaplar() {
  const kitaplar = kitapService.getAll(); // kitapları getir
  const tbody = document.getElementById("kitapListesi"); // tablo gövdesi seçimi
  tbody.innerHTML = ""; // önceki verileri temizle

  // Eğer hiç kitap yoksa bilgilendirici satır ekle
  if (kitaplar.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">Henüz kitap eklenmedi.</td></tr>`;
    return;
  }

  // Her kitap için tablo satırı oluştur
  kitaplar.forEach(k => {
    const tr = document.createElement("tr");

    // Kitap verilerini tabloya işliyoruz
    tr.innerHTML = `
      <td><img src="${k.kapak || 'https://via.placeholder.com/50x70'}" width="50" height="70"></td>
      <td>${k.ad}</td>
      <td>${k.yazar}</td>
      <td>${k.tur}</td>
      <td>${k.okundu}</td>
      <td>
        <!-- Her kitap için düzenle ve sil butonları oluşturuluyor -->
        <button class="btn btn-warning btn-sm me-1" data-id="${k.id}" data-action="edit">Düzenle</button>
        <button class="btn btn-danger btn-sm" data-id="${k.id}" data-action="delete">Sil</button>
      </td>
    `;

    // Satırı tabloya ekle
    tbody.appendChild(tr);
  });
} 
