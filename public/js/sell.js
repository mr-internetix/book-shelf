






document.addEventListener('DOMContentLoaded',()=>{
    

    // notification 
    
    var notyf = new Notyf({
        position: {
          x: 'right',
          y: 'top',
        }
      });
    // csrf token
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const uid = window.location.pathname.substr(6)
    console.log(uid)
    // referencing buttons 
    // home = document.querySelector('#home');
    // ads  = document.querySelector('#ads');
    // account = document.querySelector('#account');
    logout = document.querySelector('#logout');
    book_image = document.querySelector('#book-img');

    // hamburger effect 
    const sidebar = document.querySelector(".sidebar");
    var inner_width = window.innerWidth;
    console.log(inner_width)
    if(inner_width < 760){

        book_image.addEventListener('click',()=>{
            const sidebar = document.querySelector(".sidebar");
            const style = getComputedStyle(sidebar)
            const display_value = style.display;
    
            if(display_value === 'flex'){
                sidebar.style.display = "none";
               
                
    
            }
            else{
                sidebar.style.display = "flex";
    
            }
            
        })  
        const navlink = document.querySelectorAll('.nav_link');
        navlink.forEach(Element => Element.addEventListener('click',(event)=>{
            sidebar.style.display = "none"
    
        }))



    }
   




    // referencing containers

    home_container = document.querySelector('#home_container');
    ads_container = document.querySelector('#your_ads');
    account_container = document.querySelector('#account_container');

    // upload animation 

    document.querySelector("#sell_now").addEventListener('mouseover',function(){
        document.getElementById('angle').classList.add('angle')
    })
    
    document.querySelector("#sell_now").addEventListener('mouseout',function(){
        document.getElementById('angle').classList.remove('angle')
    })

    document.querySelector('#sell_now').addEventListener('click',()=>{
        document.getElementById('modal').classList.remove('hidden')
        document.getElementById('sell_now').classList.add('hidden')
        document.getElementById('home_banner_text').classList.add('hidden')
    })


    document.querySelector('#close').addEventListener('click',()=>{
        document.getElementById('modal').classList.add('hidden')
        document.getElementById('sell_now').classList.remove('hidden')
        document.getElementById('home_banner_text').classList.remove('hidden')
    })

  

    // hidden code 

    document.querySelector('#home').addEventListener('click',()=>{
        home_container.classList.remove('hidden');
        ads_container.classList.add('hidden');
        account_container.classList.add('hidden')
    })

    document.querySelector('#ads').addEventListener('click',()=>{
        home_container.classList.add('hidden');
        account_container.classList.add('hidden');
        ads_container.classList.remove('hidden');
    })

    document.querySelector('#account').addEventListener('click',()=>{
        home_container.classList.add('hidden');
        ads_container.classList.add('hidden');
        account_container.classList.remove('hidden')
    })

    document.querySelector('#logout').addEventListener('click',()=>{
        window.location.assign('/')
    })


    // sending book data to server 

    document.getElementById('book_submit').addEventListener('click',(e)=>{
        // document.getElementById('book_sumit').value = "please wait";
        notyf.success('please wait')
        bookName = document.getElementById('book_name').value.trim();
        
        authorName = document.getElementById('author_name').value.trim();
       
        BookLanguage= document.getElementById('options');
        book_language = BookLanguage.selectedOptions[0].text.trim();
        
        BookType = document.getElementById('select_drop_down');
        book_type = BookType.selectedOptions[0].text.trim();
        
        purchaseYear = document.getElementById('purchase_year').value.trim();
        
        bookCondition = document.getElementById('book_condition').value.trim();


        description = document.getElementById('description').value.trim();


        phoneNo = document.getElementById('phone_no').value.trim();

        BookImage = document.getElementById('book_image');


        const Data = {"bookName":bookName,
        "authorName":authorName,
        "language":book_language,
        "type":book_type,
        "purchaseYear":purchaseYear,
        "condition":bookCondition,
        "description":description,
        "phoneNo":phoneNo,
        "uid":uid
    }
    
        const data = JSON.stringify(Data)

        const files = BookImage.files[0];
        // console.log(files)
        
        const formData = new FormData();

        
        formData.append('data',data);
        formData.append('uploaded_file',BookImage.files[0]);


        let upload_url = '/api/bookupload'
        
        fetch(upload_url,{
            method:'POST',
            headers:{
                "CSRF-Token": token
            },
            
            body: formData

        }).then((response)=>{
            notyf.success('your post uploaded')
            document.querySelector('#close').click()
            notyf.success('check your ads section for further')

        })


    })

    // delete post section 

    // your ads - book  section 
     document.getElementById('ads').addEventListener('click',()=>{
            console.log(uid)

      
        card_container = document.getElementById('card_container');
         card_container.innerHTML = ``;
         fetch(`/yourads/${uid}`,{
             method:'GET',
             headers:{
                 "CSRF-Token":token
             }

         }).then(response => data = response.json())
         .then(data => {
             for(let i =0; i<data.books.bookName.length;i++ ){
                 card_container.innerHTML += `<div class="card box">
                 <img src='${data.books.path[i]}' alt="rosted meat" />
                 <div id="${i}"  class="blogcontent"> ADD TO SOLD
                 </div>
               </div>`

             }
            

         }).then(()=>{
            post = document.querySelectorAll('.blogcontent');
            post.forEach(Element => Element.addEventListener('click',async(e)=>{
                console.log(e)
                const id = e.srcElement.id;
                fetch('https://bookshelf-app-68.herokuapp.com/delpost',{
                    method:'POST',
                    headers:{
                        "CSRF-Token":token,
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        id,uid
                    })
                }).then(response => data = response.json())
                .then(setTimeout(document.getElementById('ads').click()),3000)
                .then(notyf.success('post deleted'))

               

            }));
       
         })


        
         
        
     })


      

     
    
     
    // deleteing account 

    document.getElementById('deactivate_account').addEventListener('click',()=>{
        if(confirm('Are you sure you want to deactivate account')){
            fetch('/deleteaccount',{

            })
            console.log('account will be deleted ')
        }
        else{
            console.log('nahi kar rha delete')
        }
    })

    
    


})

