const temaButonu = document.getElementById("temaButonu");
const basvuruFormu = document.getElementById("basvuruFormu");
const sonucAlani = document.getElementById("sonucAlani");

const varsayilanSonuc = "Henüz başvuru özeti oluşturulmadı. Formu doldurduktan sonra sonuç burada görünecek.";

temaButonu.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const koyuTemaAktif = document.body.classList.contains("dark-theme");

    temaButonu.textContent = koyuTemaAktif ? "Açık Temaya Geç" : "Koyu Temaya Geç";
    temaButonu.classList.toggle("btn-outline-dark", !koyuTemaAktif);
    temaButonu.classList.toggle("btn-outline-light", koyuTemaAktif);
});

basvuruFormu.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = new FormData(basvuruFormu);
    const adSoyad = form.get("adSoyad").trim();
    const eposta = form.get("eposta").trim();
    const bolum = form.get("bolum").trim();
    const sinif = form.get("sinif");
    const oturum = form.get("oturum");
    const katilim = form.get("katilim");
    const mesaj = form.get("mesaj").trim();
    const onay = document.getElementById("onay").checked;

    if (!adSoyad || !eposta || !bolum || !sinif || !oturum || !katilim || !mesaj || !onay) {
        sonucAlani.className = "alert alert-warning fs-5 mb-0 rounded-4";
        sonucAlani.innerHTML = "<strong>Eksik alan var.</strong> Lütfen tüm form alanlarını doldurup onay kutusunu işaretleyin.";
        sonucAlani.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    if (!epostaGecerliMi(eposta)) {
        sonucAlani.className = "alert alert-warning fs-5 mb-0 rounded-4";
        sonucAlani.innerHTML = "<strong>E-posta biçimi hatalı.</strong> Lütfen geçerli bir e-posta adresi girin.";
        sonucAlani.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
    }

    sonucAlani.className = "alert alert-success fs-5 mb-0 rounded-4";
    sonucAlani.innerHTML = `
        <div class="d-flex flex-column flex-lg-row justify-content-between gap-3">
            <div>
                <h3 class="h4 fw-bold mb-3">Başvuru Özeti Oluşturuldu</h3>
                <p class="mb-2"><strong>Ad Soyad:</strong> ${guvenliMetin(adSoyad)}</p>
                <p class="mb-2"><strong>E-posta:</strong> ${guvenliMetin(eposta)}</p>
                <p class="mb-2"><strong>Bölüm / Sınıf:</strong> ${guvenliMetin(bolum)} - ${guvenliMetin(sinif)}</p>
                <p class="mb-2"><strong>Oturum:</strong> ${guvenliMetin(oturum)}</p>
                <p class="mb-2"><strong>Katılım Türü:</strong> ${guvenliMetin(katilim)}</p>
                <p class="mb-0"><strong>Kısa Mesaj:</strong> ${guvenliMetin(mesaj)}</p>
            </div>
            <span class="badge text-bg-success align-self-start px-3 py-2">Kayıt Alındı</span>
        </div>
    `;
    sonucAlani.scrollIntoView({ behavior: "smooth", block: "center" });
});

basvuruFormu.addEventListener("reset", () => {
    sonucAlani.className = "alert alert-info fs-5 mb-0 rounded-4";
    sonucAlani.textContent = varsayilanSonuc;
});

function guvenliMetin(deger) {
    const span = document.createElement("span");
    span.textContent = deger;
    return span.innerHTML;
}

function epostaGecerliMi(eposta) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta);
}
