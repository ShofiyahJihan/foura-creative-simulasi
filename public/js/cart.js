document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.add-to-cart-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button');
      const itemName = form.querySelector('input[name="item"]').value;
      const originalText = btn.textContent;

      fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        },
        body: new URLSearchParams(new FormData(form))
      })
        .then(function (res) {
          if (res.status === 401) {
            window.location.href = '/login?tab=masuk';
            return null;
          }
          return res.json();
        })
        .then(function (data) {
          if (!data) return;

          const countEl = document.querySelector('.cart-pill .count');
          if (countEl) countEl.textContent = data.cartCount;

          btn.textContent = '✓ Ditambahkan';
          btn.disabled = true;
          setTimeout(function () {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 1500);

          showToast(itemName + ' ditambahkan ke keranjang!');
        })
        .catch(function (err) { console.error(err); });
    });
  });

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notif';
    toast.textContent = '✓ ' + message;
    document.body.appendChild(toast);
    setTimeout(function () { toast.classList.add('show'); }, 10);
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, 2500);
  }
});