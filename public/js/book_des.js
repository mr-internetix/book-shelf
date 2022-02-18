

document.addEventListener("DOMContentLoaded",()=>{

    var notyf = new Notyf({
        position: {
          x: "right",
          y: "top",
        },
      });
    

    document.getElementById('share').addEventListener('click',()=>{

        console.log('share clicked')
        url = window.location.href;
        // console.log(url)
        navigator.clipboard.writeText(url)
        notyf.success('copied url')
    })


})