let budgetcontroller = (function () {

    let Expenses = function (id,description,value){
        this.id = id;
        this.description = description;
        this.value = value ;
    }
    let incomes = function (id,description,value){
        this.id = id;
        this.description = description;
        this.value = value ;
    }

    let data = {
        allitems:{
            exp:[],
            inc:[]
        },
        total:{
            exp:0,
            inc:0
        }
    }

        return {
            addItem: function(type,des,vlu){
                let newItem , id ;
                    
                if (data.allitems[type].length > 0){
                    id = data.allitems[type][data.allitems[type].length - 1].id + 1;

                }else{
                    id = 0
                }
                if(type === 'exp'){
                    newItem = new Expenses(id,des,vlu)
                }else if (type === 'inc'){
                    newItem = new incomes(id,des,vlu)
                }
        


                data.allitems[type].push(newItem);
                return newItem;

            },
            view:function(){
                console.log(data);
                
            }
        }



})(); // therse types of functions are called iifi function 



let uicontroller = (function () {

    let domstring = {
        inputtype: '.add__type',
        inputdescription: '.add__description',
        inputvalue: '.add__value',
        inputbtn: '.add__btn'
    }



    return {
        getinput: function () {
            return {
                type: document.querySelector(domstring.inputtype).value,
                description: document.querySelector(domstring.inputdescription).value,
                value: document.querySelector(domstring.inputvalue).value
            }
        },
        dominput: function () {
            return domstring;
        }
    }



})();

let controller = (function (bdtctl, uictl) {

    let cntAddItem = function () {
        let input = uictl.getinput();
        budgetcontroller.addItem(input.type,input.description,input.value);
    }

    let seteventlistener = function () {
        let dom = uictl.dominput();

        document.querySelector(dom.inputbtn).addEventListener('click', cntAddItem);

        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13) {
                cntAddItem()
            }
        })
    }





    return {
        init: function () {
            console.log('application is started');
            seteventlistener();

        }
    }





})(budgetcontroller, uicontroller);


controller.init();