



document.addEventListener('DOMContentLoaded',()=>{

    buy_btn = document.querySelectorAll('.buy_now');
    buy_btn.forEach(Element => Element.addEventListener('click',(e)=>{

        book_id = e.target.id;
        book_name = e.path[2].children[1].innerText;
        console.log(book_id,book_name)
        const link = document.createElement('a');
        link.id = "book_id"
        link.style.display = "none"
        link.href = `/buybook/${book_id}&${book_name}`
        Element.appendChild(link)
        document.getElementById('book_id').click();
    }))



})