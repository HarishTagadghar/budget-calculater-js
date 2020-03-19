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
        inputbtn: '.add__btn',
        appendIncome: '.income__list',
        appendExpense: '.expenses__list'
    }



    return {
        getinput: function () {
            return {
                type: document.querySelector(domstring.inputtype).value,
                description: document.querySelector(domstring.inputdescription).value,
                value: document.querySelector(domstring.inputvalue).value
            }
        },
        addNewItem: function (obj,type) {
            let html , newhtml ,element;
            if(type === 'inc'){
                    element = domstring.appendIncome;
              html =   '<div class="item clearfix" id="%ID%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }else if (type === 'exp'){
                element = domstring.appendExpense;
                html =  '<div class="item clearfix" id="%ID%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
 
            }

            newhtml = html.replace('%ID%',obj.id);
            newhtml = newhtml.replace('%DESCRIPTION%',obj.description);
            newhtml = newhtml.replace('%VALUE%',obj.value);
                
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml)
        },
        clearfeald:function(){
            
            fealds = document.querySelectorAll(domstring.inputdescription +', '+ domstring.inputvalue);
            
            fealdsArray = Array.prototype.slice.call(fealds);

            fealdsArray.forEach(function(currentitem,intex,array){
                currentitem.value = ''
            })
            fealdsArray[0].focus();



        },
        dominput: function () {
            return domstring;
        }
    }



})();

let controller = (function (bdtctl, uictl) {

    let cntAddItem = function () {
        let input = uictl.getinput();
        let  newitem =  budgetcontroller.addItem(input.type,input.description,input.value);
        uictl.addNewItem(newitem,input.type);
        uictl.clearfeald();
        bdtctl.view();
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