document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');

  function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  }

  themeToggle.addEventListener('click', toggleTheme);

  // Voice Search
  const voiceSearch = document.getElementById('voiceSearch');
  const searchInput = document.getElementById('searchInput');

  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      searchInput.value = result;
    };

    voiceSearch.addEventListener('click', () => {
      recognition.start();
      voiceSearch.querySelector('i').classList.add('fa-pulse');
    });

    recognition.onend = () => {
      voiceSearch.querySelector('i').classList.remove('fa-pulse');
    };
  } else {
    voiceSearch.style.display = 'none';
  }

  // Search Suggestions
  searchInput.addEventListener('input', (e) => {
    // Add your search suggestion logic here
    // This is where you would typically make an API call to get suggestions
  });

  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
  }

  document.querySelector('.next').addEventListener('click', () => showSlide(currentSlide + 1));
  document.querySelector('.prev').addEventListener('click', () => showSlide(currentSlide - 1));

  // Auto-advance slides
  setInterval(() => showSlide(currentSlide + 1), 5000);

  // Countdown Timer
  function updateCountdown() {
    const countdowns = document.querySelectorAll('.countdown');

    countdowns.forEach(countdown => {
      const endDate = new Date(countdown.dataset.end).getTime();
      const now = new Date().getTime();
      const distance = endDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdown.querySelector('.days').textContent = String(days).padStart(2, '0');
      countdown.querySelector('.hours').textContent = String(hours).padStart(2, '0');
      countdown.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
      countdown.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
    });
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // Cart Functionality
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
  }

  function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;

    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" width="50">
        <div class="item-details">
          <h4>${item.name}</h4>
          <p>$${item.price}</p>
        </div>
        <button onclick="removeFromCart('${item.id}')">Remove</button>
      </div>
    `).join('');

    updateCartTotals();
  }

  function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
  }

  function applyDiscount() {
    const code = document.getElementById('discountCode').value;
    if (code === 'SUMMER20') {
      const subtotal = parseFloat(document.getElementById('subtotal').textContent.slice(1));
      const discount = subtotal * 0.2;
      document.getElementById('discount').textContent = `-$${discount.toFixed(2)}`;
      document.getElementById('total').textContent = `$${(subtotal - discount).toFixed(2)}`;
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  function initMap() {
    const map = document.getElementById('trackingMap');
    if (!map) return;

    const deliveryRoute = new google.maps.Map(map, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }

  // Initialize map if on checkout page
  if (document.getElementById('trackingMap')) {
    initMap();
  }

  // Update cart display on page load
  updateCartDisplay();

  // Wishlist Toggle
  document.querySelectorAll('.wishlist').forEach(button => {
    button.addEventListener('click', () => {
      const icon = button.querySelector('i');
      icon.classList.toggle('fas');
      icon.classList.toggle('far');
    });
  });

  // Product Reviews
  const reviews = [
    { author: 'John D.', rating: 5, text: 'Excellent quality and comfort!' },
    { author: 'Sarah M.', rating: 4, text: 'Great chair, slightly pricey.' }
  ];

  const reviewList = document.getElementById('reviewList');
  reviews.forEach(review => {
    const reviewEl = document.createElement('div');
    reviewEl.className = 'review';
    reviewEl.innerHTML = `
      <div class="stars">★★★★★</div>
      <p>${review.text}</p>
      <span class="author">- ${review.author}</span>
    `;
    reviewList.appendChild(reviewEl);
  });

  // Q&A Section
  const qaList = document.getElementById('qaList');
  const qaPairs = [
    { 
      question: 'Is this chair suitable for long working hours?',
      answer: 'Yes, it\'s ergonomically designed for extended use.'
    },
    {
      question: 'Does it come assembled?',
      answer: 'Partial assembly required, instructions included.'
    }
  ];

  qaPairs.forEach(qa => {
    const qaEl = document.createElement('div');
    qaEl.className = 'qa-item';
    qaEl.innerHTML = `
      <div class="question"><strong>Q:</strong> ${qa.question}</div>
      <div class="answer"><strong>A:</strong> ${qa.answer}</div>
    `;
    qaList.appendChild(qaEl);
  });

  // Comparison Tool
  const comparisonGrid = document.querySelector('.comparison-grid');
  const similarProducts = [
    {
      name: 'Classic Lounger',
      price: '$499.99',
      rating: '4.0/5',
      features: ['Leather', 'Traditional design', 'Brown only']
    },
    {
      name: 'Modern Chair Plus',
      price: '$649.99',
      rating: '4.5/5',
      features: ['Premium leather', 'Modern design', 'Multiple colors']
    }
  ];

  similarProducts.forEach(product => {
    const productEl = document.createElement('div');
    productEl.className = 'comparison-item';
    productEl.innerHTML = `
      <h4>${product.name}</h4>
      <p class="price">${product.price}</p>
      <p class="rating">Rating: ${product.rating}</p>
      <ul>
        ${product.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    `;
    comparisonGrid.appendChild(productEl);
  });

  // Chatbot functionality
  window.toggleChat = function() {
    const chatBody = document.getElementById('chat-body');
    chatBody.style.display = chatBody.style.display === 'none' ? 'flex' : 'none';
  };

  window.sendMessage = function() {
    const input = document.getElementById('user-message');
    const messages = document.getElementById('chat-messages');
    
    if (input.value.trim()) {
      // Add user message
      messages.innerHTML += `
        <div class="message user-message">
          <p>${input.value}</p>
        </div>
      `;

      // Simulate AI response
      setTimeout(() => {
        messages.innerHTML += `
          <div class="message bot-message">
            <p>Thank you for your message! How can I help you with your shopping today?</p>
          </div>
        `;
        messages.scrollTop = messages.scrollHeight;
      }, 1000);

      input.value = '';
      messages.scrollTop = messages.scrollHeight;
    }
  };

  // Initialize product carousels with Swiper
  const productCarousels = document.querySelectorAll('.product-grid');
  productCarousels.forEach(carousel => {
    new Swiper(carousel, {
      slidesPerView: 'auto',
      spaceBetween: 20,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }
    });
  });

  // Social sharing functionality
  function shareWishlist() {
    if (navigator.share) {
      navigator.share({
        title: 'My Wishlist',
        text: 'Check out my wishlist on Unibun!',
        url: window.location.href
      });
    }
  }
});