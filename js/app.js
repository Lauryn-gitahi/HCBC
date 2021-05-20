const TypeWriter = function(txtElement, words, wait=3000){
    this.txtElement=txtElement;
    this.words=words;
    this.txt='';
    this.wordIndex=0;
    this.wait=parseInt(wait, 10);
    this.type();
    this.isDeleting= false;
}

// type method
TypeWriter.prototype.type = function(){

    const current =this.wordIndex %  this.words.length;
    const fullTxt= this.words[current];

    // Check if deleting
    if(this.isDeleting){
        // remove char
        this.txt=fullTxt.substring(0, this.txt.length-1);
    }else{
        // Add char
        this.txt=fullTxt.substring(0, this.txt.length+1);
    }

    // insert txt into element
    this.txtElement.innerHTML=`<span class="txt">${this.txt}</span>`;

    // type speed
    let typeSpeed=300;
     if(this.isDeleting){
         typeSpeed /=2;
        }

        if(!this.isDeleting && this.txt === fullTxt){
            typeSpeed =this.wait;
            this.isDeleting=true;
        }else if(this.isDeleting && this.txt === ""){
            this.isDeleting=false;
            // move to next word
            this.wordIndex++;
            // Pause before typing
            typeSpeed=500;
        }
        
    setTimeout(() => this.type(),typeSpeed)
}

// INIT on DOM load
document.addEventListener('DOMContentLoaded', init);

// init app
function init() {
    const txtElement = document.querySelector('.txt-type');
    // const words=txtElement.getAttribute('data-words');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }