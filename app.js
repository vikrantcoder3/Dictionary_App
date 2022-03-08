let input = document.querySelector("#input");
let searchBtn = document.querySelector("#search");
let notFound = document.querySelector(".not_found");
let resultfound = document.querySelector(".def");
let audiobox = document.querySelector(".audio");
let loading = document.querySelector('.loading');
let apiKey = 'a77d80e9-c2a4-494b-b957-bd68d66cb1f9'


searchBtn.addEventListener('click',function(e){

    e.preventDefault();
    
    // clear old data

    audiobox.innerHTML='';
    notFound.innerText='';
    resultfound.innerText='';
      


    // get input data
  
     let word = input.value;

    // call API get data

     if(word ===''){
         return alert('word is required');
     }

     getdata(word);

}) 

async function getdata(word){

    loading.style.display = 'block';
    // Ajax call
    const respone = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`)
    const data = await respone.json();

    
    // if empty result

    if(!data.length){
        loading.style.display = 'none';
        notFound.innerText =' No result found'
    }
 
    // suggestions

    if(typeof data[0] === 'string'){

        loading.style.display = 'none';
        let heading = document.createElement('h3')
        
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading); 
        data.forEach(Element =>{
           let suggetion = document.createElement( 'span')
           suggetion.classList.add('suggested');

           suggetion.innerText = Element;
           notFound.appendChild(suggetion)

        })

        return;
    }

    // result found


    loading.style.display = 'none'; s
    let defination = data[0].shortdef[0];
    resultfound.innerText = defination;


    // audio 

    const soundName = data[0].hwi.prs[0].sound.audio;

    if(soundName){
        renderSound(soundName);
    }

    console.log(data);
}

function renderSound(soundName){
  
     // https://media.merriam-webster.com/soundc11

     let subfolder = soundName.charAt(0);

     let soundsrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

     let aud = document.createElement('audio');

     aud.src = soundsrc;
     aud.controls = true;

     audiobox.appendChild(aud);


}
