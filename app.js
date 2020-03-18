let budgetcontroller = (function(){

})(); // therse types of functions are called iifi function 


let uicontroller = (function () {

})();

let controller = (function(){

    let cntAddItem = function (){
        console.log('it works');
    }

    document.querySelector('.add__btn').addEventListener('click',cntAddItem);

   document.addEventListener('keypress',function(e){
       if ( e.keyCode === 13){
           cntAddItem()
       }
   })



})();