// Mobiel menu
(function(){
  var btn=document.querySelector('.menu-toggle'),hdr=document.querySelector('header');
  if(btn){
    btn.addEventListener('click',function(){
      var open=hdr.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded',open);
      btn.setAttribute('aria-label',open?'Menu sluiten':'Menu openen');
    });
    document.querySelectorAll('#menu a').forEach(function(a){
      a.addEventListener('click',function(){hdr.classList.remove('menu-open');btn.setAttribute('aria-expanded','false');});
    });
  }
})();

// Contactformulier: verstuurt de aanvraag rechtstreeks naar de mailbox (via FormSubmit)
(function(){
  var form=document.getElementById('offerte-form');
  if(!form||!window.fetch) return;
  var status=form.querySelector('.form-status');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=form.querySelector('button[type=submit]');
    btn.disabled=true; btn.textContent='Bezig met verzenden…';
    status.className='form-status'; status.textContent='';
    var data={};
    new FormData(form).forEach(function(v,k){data[k]=v;});
    fetch(form.action.replace('formsubmit.co/','formsubmit.co/ajax/'),{
      method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)
    }).then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};});})
    .then(function(res){
      if(res.ok && String(res.j.success)!=='false'){
        form.reset(); status.className='form-status ok';
        status.textContent='Bedankt! Uw aanvraag is verzonden. We nemen zo snel mogelijk contact met u op.';
      } else { throw new Error(); }
    }).catch(function(){
      status.className='form-status err';
      status.innerHTML='Er ging iets mis bij het verzenden. Bel ons op <a href="tel:+32474609797">0474 60 97 97</a> of mail naar <a href="mailto:thomas@meyfrootelektro.be">thomas@meyfrootelektro.be</a>.';
    }).then(function(){btn.disabled=false; btn.textContent='Offerte aanvragen';});
  });
})();
