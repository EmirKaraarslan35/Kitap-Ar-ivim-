// js/main.js

// Uygulamanın başlangıç dosyasıdır. Sayfa yüklendiğinde gerekli işlemleri başlatır.

// UI ve event modüllerini içe aktarıyoruz
import { renderKitaplar } from './ui.js';
import { registerEvents } from './events.js';

// Sayfa tamamen yüklendiğinde kitap listesini çizer ve olayları bağlar
document.addEventListener("DOMContentLoaded", () => {
  renderKitaplar();      // Kitap listesini ekrana bas
  registerEvents();      // Tüm event listener'ları aktif et
});
