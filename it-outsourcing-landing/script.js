// Mobile nav, form validation, testimonials carousel, and active nav highlighting
document.addEventListener('DOMContentLoaded', function(){
  // Nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  navToggle.addEventListener('click', ()=>{
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? '' : 'block';
  });

  // Testimonials slider
  const testimonials = document.querySelectorAll('.testimonial');
  let tIndex = 0;
  const showTestimonial = (i)=>{
    testimonials.forEach((t)=> t.style.display = 'none');
    testimonials[i].style.display = 'block';
  }
  showTestimonial(tIndex);
  document.querySelector('.t-btn.next').addEventListener('click', ()=>{ tIndex = (tIndex+1)%testimonials.length; showTestimonial(tIndex); });
  document.querySelector('.t-btn.prev').addEventListener('click', ()=>{ tIndex = (tIndex-1 + testimonials.length)%testimonials.length; showTestimonial(tIndex); });

  // Form validation
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let valid = true;
    const name = form.name; const email = form.email; const message = form.message;
    // Clear previous errors
    form.querySelectorAll('.error').forEach(el=>el.textContent='');

    if(!name.value || name.value.trim().length < 2){ valid = false; name.nextElementSibling.textContent = 'Please enter your name.' }
    if(!email.value || !/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email.value)){ valid = false; email.nextElementSibling.textContent = 'Please enter a valid email.' }
    if(!message.value || message.value.trim().length < 10){ valid = false; message.nextElementSibling.textContent = 'Tell us a bit more about your project.' }

    if(!valid) return;

    // Simulate success
    success.hidden = false;
    form.querySelector('button[type="submit"]').disabled = true;
    setTimeout(()=>{
      success.hidden = false;
      form.reset();
      form.querySelector('button[type="submit"]').disabled = false;
      setTimeout(()=> success.hidden = true, 4000);
    }, 800);
  });

  // Active nav on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const id = entry.target.getAttribute('id');
      const link = document.querySelector('.nav-list a[href="#'+id+'"]');
      if(entry.isIntersecting){
        navLinks.forEach(l=>l.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    });
  },{root:null,threshold:0.45});
  sections.forEach(s=>obs.observe(s));

  // Close mobile nav after clicking a link
  document.querySelectorAll('.nav-list a').forEach(a=>{
    a.addEventListener('click', ()=>{ if(window.innerWidth < 768){ nav.style.display=''; navToggle.setAttribute('aria-expanded','false'); } });
  });

  // Accessibility & small enhancements
  document.querySelectorAll('a[href="#contact"]').forEach(a=> a.addEventListener('click', ()=>{
    const el = document.getElementById('name'); setTimeout(()=> el.focus(), 500);
  }));
});