
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMobileMenu = document.getElementById('close-mobile-menu');
const overlay = document.querySelector('.overlay');
mobileMenuToggle?.addEventListener('click', () => {
  mobileMenu.classList.remove('hidden');
  overlay.classList.add('open');
  document.body.classList.add('no-scroll');
  setTimeout(() => mobileMenu.classList.add('show'), 10);
});
function closeMenu() {
  mobileMenu.classList.remove('show');
  overlay.classList.remove('open');
  document.body.classList.remove('no-scroll');
  setTimeout(() => mobileMenu.classList.add('hidden'), 300);
}
closeMobileMenu?.addEventListener('click', closeMenu);
overlay?.addEventListener('click', closeMenu);
document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', function () {
    const dropdown = this.nextElementSibling;
    const icon = this.querySelector('.fa-chevron-down');
    dropdown.classList.toggle('show');
    icon.classList.toggle('rotate-180');
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) { // Tailwind 'lg' breakpoint
    closeMenu();
  }
});

  // countdown js 
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 3);

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = deadline.getTime() - now;

    const countdownBox = document.getElementById("countdown");

    if (distance < 0) {
      if (countdownBox) {
        countdownBox.innerHTML =
          '<span class="text-red-500 font-bold text-2xl">⏳ Expired</span>';
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // update only if elements exist
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.innerText = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, "0");
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();


   // Counter Animation
 function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 300;

  counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;

      if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(animateCounters, 100);
      } else {
          counter.innerText = target;
      }
  });
}
// Run counter animation when stats section is in view
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
      animateCounters();
      observer.unobserve(entries[0].target);
  }
}, { threshold: 0.5 });

const statsSection = document.querySelector('section.bg-secondary');
if (statsSection) {
  observer.observe(statsSection);
}

// pricing card js
document.addEventListener('DOMContentLoaded', function () {
    // Get all package buttons
    const packageBtns = document.querySelectorAll('.package-btn');

    // Add click event to each button
    packageBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove border from all cards
            document.querySelectorAll('.package-card').forEach(card => {
                card.classList.remove('border-primary', 'border-2');
                card.classList.add('border-2', 'border-gray-200');
            });

            // Add border to selected card
            const card = this.closest('.package-card');
            card.classList.remove('border-2', 'border-gray-200');
            card.classList.add('border-primary', 'border-2');
        });
    });
});
  
// faq page js
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon = btn.querySelector('i:last-child');
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  
  // Close all other FAQs
  document.querySelectorAll('.faq-question').forEach(b => {
    if (b !== btn) {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.add('hidden');
      b.querySelector('i:last-child').className = 'fas fa-plus text-gray-600 ml-2 transition-transform';
    }
  });
  
  // Toggle clicked FAQ
  if (isOpen) {
    btn.setAttribute('aria-expanded', 'false');
    answer.classList.add('hidden');
    icon.className = 'fas fa-plus text-gray-600 ml-2 transition-transform';
  } else {
    btn.setAttribute('aria-expanded', 'true');
    answer.classList.remove('hidden');
    icon.className = 'fas fa-minus text-gray-600 ml-2 transition-transform';
  }
}

document.querySelectorAll('.faq-question').forEach(btn => {
  btn.onclick = () => toggleFaq(btn);
});


document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = {
        currentStep: 1,
        totalSteps: 5,
        selectedService: null,
        formData: {},

        init() {
            this.bindEvents();
            this.updateProgress();
            this.showStep(1);
        },

        bindEvents() {
            // Next step buttons
            document.querySelectorAll('.next-step').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const nextStep = parseInt(e.currentTarget.getAttribute('data-next'));
                    if (this.validateCurrentStep()) {
                        this.saveStepData();
                        this.goToStep(nextStep);
                    }
                });
            });

            // Previous step buttons
            document.querySelectorAll('.prev-step').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const prevStep = parseInt(e.currentTarget.getAttribute('data-prev'));
                    this.goToStep(prevStep);
                });
            });

            // Service selection
            document.querySelectorAll('.service-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.selectService(card);
                });
            });



            // Payment method selection
            document.querySelectorAll('.payment-method').forEach(method => {
                method.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.selectPaymentMethod(method);
                });
            });





            // Download receipt button
            const downloadBtn = Array.from(document.querySelectorAll('.btn')).find(btn => 
                btn.textContent.includes('Download Receipt')
            );
            if (downloadBtn) {
                downloadBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.downloadReceipt();
                });
            }

            // Share details button
            const shareBtn = Array.from(document.querySelectorAll('.btn')).find(btn => 
                btn.textContent.includes('Share Details')
            );
            if (shareBtn) {
                shareBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.shareDetails();
                });
            }
        },

        showStep(stepNumber) {
            document.querySelectorAll('.step-content').forEach(step => {
                step.classList.add('hidden');
            });
            const nextStep = document.querySelector(`#step${stepNumber}`);
            if (nextStep) {
                nextStep.classList.remove('hidden');
            }
        },

        goToStep(stepNumber) {
            this.showStep(stepNumber);
            this.currentStep = stepNumber;
            this.updateProgress();

            if (this.currentStep === 5) {
                this.showConfirmation();
            }
        },

        updateProgress() {
            const progressLine = document.querySelector('.progress-line');
            const stepIndicators = document.querySelectorAll('.step-indicator');
            const progressStatus = document.querySelector('.progress-status');
            const stepTitles = [
                'Select Your Service',
                'Enter Your Details',
                'Schedule Pickup & Delivery',
                'Complete Payment',
                'Booking Confirmation'
            ];

            if (!progressLine || !stepIndicators.length || !progressStatus) return;

            // Update progress line
            const progressPercentage = ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
            progressLine.style.width = `${progressPercentage}%`;

            // Update step indicators
            stepIndicators.forEach((indicator, index) => {
                const circle = indicator.querySelector('div');
                const innerCircle = circle?.querySelector('div');
                const title = indicator.querySelector('span:first-of-type');
                const subtitle = indicator.querySelector('span:last-of-type');

                if (!circle || !innerCircle || !title || !subtitle) return;

                if (index + 1 <= this.currentStep) {
                    // Current and completed steps
                    circle.classList.remove('border-gray-200');
                    circle.classList.add('border-primary');
                    innerCircle.classList.remove('bg-gray-200', 'text-gray-600');
                    innerCircle.classList.add('bg-primary', 'text-white');
                    title.classList.remove('text-gray-500');
                    title.classList.add('text-primary');
                    subtitle.classList.remove('text-gray-500');
                    subtitle.classList.add('text-primary/70');
                } else {
                    // Upcoming steps
                    circle.classList.remove('border-primary');
                    circle.classList.add('border-gray-200');
                    innerCircle.classList.remove('bg-primary', 'text-white');
                    innerCircle.classList.add('bg-gray-200', 'text-gray-600');
                    title.classList.remove('text-primary');
                    title.classList.add('text-gray-500');
                    subtitle.classList.remove('text-primary/70');
                    subtitle.classList.add('text-gray-500');
                }
            });

            // Update progress status
            progressStatus.innerHTML = `
                <span class="w-2 h-2 bg-primary rounded-full me-2 animate-pulse"></span>
                Step ${this.currentStep} of ${this.totalSteps}: ${stepTitles[this.currentStep - 1]}
            `;
        },

        selectService(card) {
            const cardDiv = card.querySelector('div');
            
            // Toggle selection state
            const isSelected = card.classList.contains('selected');
            
            if (isSelected) {
                card.classList.remove('selected');
                cardDiv.classList.remove('border-primary');
                cardDiv.classList.add('border-gray-200');
            } else {
                card.classList.add('selected');
                cardDiv.classList.remove('border-gray-200');
                cardDiv.classList.add('border-primary');
            }
            
            // Update selected services array
            this.updateSelectedServices();
        },

        updateSelectedServices() {
            this.selectedService = [];
            document.querySelectorAll('.service-card.selected').forEach(card => {
                this.selectedService.push({
                    name: card.querySelector('h4')?.textContent?.trim() || '',
                    price: card.querySelector('.text-primary')?.textContent || '',
                    id: card.getAttribute('data-service') || ''
                });
            });
        },

        selectPaymentMethod(method) {
            const paymentMethods = document.querySelectorAll('.payment-method');
            const paypalDetails = document.querySelector('.paypal-details');

            // Hide all payment details first
            if (paypalDetails) paypalDetails.classList.add('hidden');

            // Remove selected class from all methods
            paymentMethods.forEach(m => {
                const div = m.querySelector('div');
                if (div) div.classList.remove('border-primary');
            });
            
            // Add selected class to clicked method
            const selectedDiv = method.querySelector('div');
            if (selectedDiv) selectedDiv.classList.add('border-primary');

            // Show relevant payment details based on the selected method
            const methodText = method.querySelector('h4')?.textContent || '';
            if (methodText.includes('Credit Card')) {
                this.formData.paymentMethod = 'Credit Card';
            } else if (methodText.includes('Cash on Delivery')) {
                this.formData.paymentMethod = 'Cash on Delivery';
            } else if (methodText.includes('PayPal') && paypalDetails) {
                paypalDetails.classList.remove('hidden');
                this.formData.paymentMethod = 'PayPal';
            }
        },

        validateCurrentStep() {
            if (this.currentStep === 1) {
                if (!this.selectedService || this.selectedService.length === 0) {
                    alert('Please select at least one service to continue');
                    return false;
                }
            }
            return true;
        },





        saveStepData() {
            if (this.currentStep === 1) {
                this.formData.service = this.selectedService;
            } else if (this.currentStep === 2) {
                this.formData.customerName = document.querySelector('input[placeholder="Enter your full name"]')?.value || '';
                this.formData.email = document.querySelector('input[placeholder="Enter your email"]')?.value || '';
                this.formData.phone = document.querySelector('input[placeholder="Enter your phone number"]')?.value || '';
                this.formData.address = document.querySelector('input[placeholder="Enter your address"]')?.value || '';
                this.formData.numberOfItems = document.querySelector('input[placeholder="Enter the number of items"]')?.value || '';
                this.formData.specialInstructions = document.querySelector('textarea[placeholder="Any special requirements?"]')?.value || '';
            } else if (this.currentStep === 3) {
                this.formData.pickupDate = document.querySelector('input[type="date"]:first-of-type')?.value || '';
                this.formData.pickupTime = document.querySelector('select:first-of-type')?.value || '';
                this.formData.deliveryDate = document.querySelector('input[type="date"]:last-of-type')?.value || '';
                this.formData.deliveryTime = document.querySelector('select:last-of-type')?.value || '';
            }
        },

        showConfirmation() {
            const bookingId = 'LAU' + Math.floor(Math.random() * 1000000);
            this.formData.bookingId = bookingId;
            
            const confirmationDetails = document.querySelector('#step5 .bg-white.rounded-2xl .grid');
            if (!confirmationDetails) return;
            
            confirmationDetails.innerHTML = '';
            
            const serviceNames = this.selectedService && this.selectedService.length > 0 
                ? this.selectedService.map(s => s.name).join(', ') 
                : 'Not selected';
            
            const details = [
                { label: 'Booking ID', value: bookingId },
                { label: 'Service Type', value: serviceNames },
                { label: 'Pickup Date', value: this.formData.pickupDate ? new Date(this.formData.pickupDate).toLocaleDateString() : 'Not selected' },
                { label: 'Pickup Time', value: this.formData.pickupTime || 'Not selected' },
                { label: 'Delivery Date', value: this.formData.deliveryDate ? new Date(this.formData.deliveryDate).toLocaleDateString() : 'Not selected' },
                { label: 'Delivery Time', value: this.formData.deliveryTime || 'Not selected' },
                { label: 'Customer Name', value: this.formData.customerName || 'Not provided' },
                { label: 'Email', value: this.formData.email || 'Not provided' },
                { label: 'Phone', value: this.formData.phone || 'Not provided' },
                { label: 'Address', value: this.formData.address || 'Not provided' },
                { label: 'Payment Method', value: this.formData.paymentMethod || 'Not selected' }
            ];

            details.forEach(detail => {
                const gridItem = document.createElement('div');
                gridItem.innerHTML = `
                    <div class="flex gap-2 text-nowrap justify-between items-center">
                        <p class="text-sm text-gray-600">${detail.label}:</p>
                        <p class="font-semibold text-right">${detail.value}</p>
                    </div>
                `;
                confirmationDetails.appendChild(gridItem);
            });
        },

        downloadReceipt() {
            const receiptContent = `
Booking Receipt
==============

Booking ID: ${this.formData.bookingId || 'N/A'}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Service Details:
---------------
Services: ${this.formData.service && this.formData.service.length > 0 
                ? this.formData.service.map(s => `${s.name} (${s.price})`).join(', ') 
                : 'N/A'}

Customer Details:
----------------
Name: ${this.formData.customerName || 'N/A'}
Email: ${this.formData.email || 'N/A'}
Phone: ${this.formData.phone || 'N/A'}
Address: ${this.formData.address || 'N/A'}

Schedule:
---------
Pickup Date: ${this.formData.pickupDate || 'N/A'}
Pickup Time: ${this.formData.pickupTime || 'N/A'}
Delivery Date: ${this.formData.deliveryDate || 'N/A'}
Delivery Time: ${this.formData.deliveryTime || 'N/A'}

Payment Method: ${this.formData.paymentMethod || 'N/A'}

Thank you for choosing our service!
            `;
            
            const blob = new Blob([receiptContent], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `receipt-${this.formData.bookingId || 'booking'}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        shareDetails() {
            const shareContent = `
My Laundry Booking Details
=========================

Booking ID: ${this.formData.bookingId || 'N/A'}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Services: ${this.formData.service && this.formData.service.length > 0 
                ? this.formData.service.map(s => `${s.name} (${s.price})`).join(', ') 
                : 'N/A'}

Pickup: ${this.formData.pickupDate || 'N/A'} at ${this.formData.pickupTime || 'N/A'}
Delivery: ${this.formData.deliveryDate || 'N/A'} at ${this.formData.deliveryTime || 'N/A'}

Payment Method: ${this.formData.paymentMethod || 'N/A'}
            `;
            
            if (navigator.share) {
                navigator.share({
                    title: 'My Laundry Booking Details',
                    text: shareContent,
                    url: window.location.href
                }).catch(error => {
                    console.log('Error sharing:', error);
                    this.fallbackShare(shareContent);
                });
            } else {
                this.fallbackShare(shareContent);
            }
        },

        fallbackShare(content) {
            const textarea = document.createElement('textarea');
            textarea.value = content;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Booking details copied to clipboard! You can now paste and share them.');
        }
    };

    bookingForm.init();
});



// hero swiper
if (document.querySelector('.hero-slider')) {
    const heroSwiper = new Swiper('.hero-slider', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        effect: "fade",
        ...(document.documentElement.dir === 'rtl' ? { rtl: true } : {}),
        fadeEffect: {
          crossFade: true
        },
        speed: 1000,
        // autoplay: {
        //   delay: 3000,
        //   disableOnInteraction: false,
        // },
        simulateTouch: true, 
        navigation: {
          nextEl: ".hero-arrow.swiper-button-next",
          prevEl: ".hero-arrow.swiper-button-prev",
        },
    });
}

// service swiper
if (document.querySelector('.service-slider')) {
    const serviceSwiper = new Swiper('.service-slider', {
        slidesPerView: 1,
        ...(document.documentElement.dir === 'rtl' ? { rtl: true } : {}),
        speed: 500,
        centeredSlides: true,
        loop:true,
        navigation: {
          nextEl: ".service-arrow.swiper-button-next",
          prevEl: ".service-arrow.swiper-button-prev",
        },
        breakpoints: {
           0: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: false,
            },
           640: {
                slidesPerView: 2,
                spaceBetween: 20,
                centeredSlides: false,
            },
            768: {
              centeredSlides: true,
                slidesPerView: 2.8,
                spaceBetween: 0,
            },
            1024: {
              centeredSlides: true,
                slidesPerView: 3.5,
                spaceBetween: 0,
            },
            1280: {
              centeredSlides: true,
                slidesPerView: 4,
                spaceBetween: 0,
            },
        }
    });
}
// blog swiper
if (document.querySelector('.blog-slider')) {
    const blogSwiper = new Swiper('.blog-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        ...(document.documentElement.dir === 'rtl' ? { rtl: true } : {}),
        speed: 500,
        navigation: {
          nextEl: ".blog-arrow.swiper-button-next",
          prevEl: ".blog-arrow.swiper-button-prev",
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
        }
    });
}

// testimonial swiper
if (document.querySelector('.testimonial-slider')) {
    const testimonialSwiper = new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        ...(document.documentElement.dir === 'rtl' ? { rtl: true } : {}),
        speed: 500,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.testimonial-pagination',
          clickable: true,
          type: 'fraction',
        },
    });
}
// team swiper
if (document.querySelector('.team-slider')) {
  const teamSwiper = new Swiper('.team-slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      ...(document.documentElement.dir === 'rtl' ? { rtl: true } : {}),
      speed: 500,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
          640: {
              slidesPerView: 2,
              spaceBetween: 20,
          },
          768: {
              slidesPerView: 2,
              spaceBetween: 20,
          },
          1024: {
              slidesPerView: 3,
              spaceBetween: 24,
          },
          1280: {
              slidesPerView: 4,
              spaceBetween: 24,
          },
      }
  });
}

// // services filter
function filterServices(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  const services = document.querySelectorAll('.service-card');
  
  // Remove 'active' class from all buttons
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add 'active' class to the clicked button
  event.target.classList.add('active');
  
  services.forEach(service => {
    const serviceCategory = service.getAttribute('data-category'); // Get the category of each card
    let show = false;

    // Show all services if 'all' category is selected
    if (category === 'all') show = true;
    // Show services for the specific category
    else if (category === 'wash' && (serviceCategory === 'wash' || serviceCategory === 'pickup')) show = true;
    else if (category === 'dry' && serviceCategory === 'dry') show = true;
    else if (category === 'special' && serviceCategory === 'special') show = true;

    // Show or hide the service card based on the show flag
    service.style.display = show ? 'flex' : 'none';
  });
}

function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll("#reviewModal .fa-star");
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove("text-gray-300");
            star.classList.add("text-yellow-400");
        } else {
            star.classList.remove("text-yellow-400");
            star.classList.add("text-gray-300");
        }
    });
}