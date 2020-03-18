let budgetcontroller = (function(){

})(); // therse types of functions are called iifi function 


let uicontroller = (function () {
    
    let domstring = {
            inputtype:'.add__type',
            inputdescription:'.add__description',
            inputvalue:'.add__value',
            inputbtn:'.add__btn'
    }



    return {
        getinput: function (){
            return {
                type : document.querySelector(domstring.inputtype).value,
                description : document.querySelector(domstring.inputdescription).value,
                value : document.querySelector(domstring.inputvalue).value
            }
        },
        dominput : function(){
           return domstring ;
        }
    }



})();

let controller = (function(bdtctl,uictl){

    let cntAddItem = function (){
        console.log(uictl.getinput());
    }

let seteventlistener = function(){
    let dom = uictl.dominput();

    document.querySelector(dom.inputbtn).addEventListener('click',cntAddItem);

    document.addEventListener('keypress',function(e){
        if ( e.keyCode === 13){
            cntAddItem()
        }
    })
}

   
return {
    init : function(){
        console.log('application is started');
        seteventlistener();
        
    }
}   

   



})(budgetcontroller,uicontroller);


controller.init();